/**
 * Endpoint externo do piloto de marketing da Retífica Premium.
 *
 * Projeto vinculado à planilha "Retífica Premium — Piloto 90 Dias".
 * Não acessa, altera ou sincroniza o Retiflow.
 *
 * Antes de publicar:
 * 1. Em Configurações do projeto > Propriedades do script, criar SITE_KEY.
 * 2. Implantar como app da Web executando como o proprietário.
 * 3. Permitir acesso a "Qualquer pessoa" porque a autenticação é feita pela SITE_KEY.
 * 4. Guardar URL e SITE_KEY somente nas variáveis de ambiente do servidor do site.
 */

const SHEETS = {
  EVENTS: "Eventos",
  LEADS: "Leads",
};

const SPREADSHEET_ID = "13bOaObxv9m-w4qJUacoyq19-WmYEWXt-dtnHST-g8fM";

const EVENT_COLUMNS = {
  EVENT_ID: 1,
  LEAD_CODE: 2,
  OCCURRED_AT: 3,
  SESSION_ID: 5,
  EVENT_TYPE: 6,
  DUPLICATE_COUNT: 21,
  ALERT_STATUS: 22,
};

const FIRST_DATA_ROW = 5;
const DEDUPE_WINDOW_MS = 30 * 60 * 1000;

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function clean_(value, maxLength) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength || 500);
}

function numeric_(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseDate_(value) {
  const parsed = new Date(value || Date.now());
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function propertyKey_() {
  return (
    PropertiesService.getScriptProperties().getProperty("SITE_KEY") || ""
  );
}

function authorized_(body) {
  const configuredKey = propertyKey_();
  const receivedKey = clean_(body && body.siteKey, 300);
  return Boolean(configuredKey && receivedKey && configuredKey === receivedKey);
}

function existingEventRows_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < FIRST_DATA_ROW) return [];

  return sheet
    .getRange(
      FIRST_DATA_ROW,
      1,
      lastRow - FIRST_DATA_ROW + 1,
      EVENT_COLUMNS.ALERT_STATUS
    )
    .getValues();
}

function findEventRow_(rows, eventId) {
  const index = rows.findIndex(
    (row) => clean_(row[EVENT_COLUMNS.EVENT_ID - 1], 100) === eventId
  );
  return index < 0 ? 0 : FIRST_DATA_ROW + index;
}

function findRecentWhatsAppRow_(rows, body, occurredAt) {
  const sessionId = clean_(body.sessionId || body.anonymousId, 180);
  if (!sessionId) return 0;

  for (let index = rows.length - 1; index >= 0; index -= 1) {
    const row = rows[index];
    if (
      clean_(row[EVENT_COLUMNS.EVENT_TYPE - 1], 60) !== "whatsapp_click" ||
      clean_(row[EVENT_COLUMNS.SESSION_ID - 1], 180) !== sessionId
    ) {
      continue;
    }

    const storedAt = parseDate_(row[EVENT_COLUMNS.OCCURRED_AT - 1]);
    const elapsed = occurredAt.getTime() - storedAt.getTime();
    if (elapsed >= 0 && elapsed < DEDUPE_WINDOW_MS) {
      return FIRST_DATA_ROW + index;
    }
  }

  return 0;
}

function appendEvent_(sheet, body, occurredAt) {
  const metadata =
    body.metadata && typeof body.metadata === "object" ? body.metadata : {};

  sheet.appendRow([
    clean_(body.eventId, 100),
    clean_(body.leadCode, 60),
    occurredAt,
    clean_(body.anonymousId, 180),
    clean_(body.sessionId, 180),
    clean_(body.eventType, 60),
    clean_(body.channel, 80),
    clean_(body.pagePath, 500),
    clean_(body.source, 120) || "direto",
    clean_(body.medium, 120),
    clean_(body.campaign, 180),
    clean_(body.term, 180),
    clean_(body.gclid, 240),
    clean_(body.gbraid, 240),
    clean_(body.wbraid, 240),
    clean_(body.deviceType, 60),
    clean_(metadata.lastField, 80),
    clean_(metadata.validationReason, 120),
    numeric_(metadata.elapsedSeconds),
    numeric_(metadata.fieldsCompleted),
    0,
    body.eventType === "whatsapp_click" ? "pending" : "not_required",
  ]);

  return sheet.getLastRow();
}

function appendLead_(spreadsheet, body, occurredAt) {
  if (body.eventType !== "form_submit" || !body.lead) return;

  const sheet = spreadsheet.getSheetByName(SHEETS.LEADS);
  if (!sheet) throw new Error("LEADS_SHEET_NOT_FOUND");

  const leadCode = clean_(body.leadCode, 60);
  const lastRow = sheet.getLastRow();
  if (lastRow >= FIRST_DATA_ROW) {
    const codes = sheet
      .getRange(FIRST_DATA_ROW, 1, lastRow - FIRST_DATA_ROW + 1, 1)
      .getDisplayValues()
      .flat();
    if (codes.includes(leadCode)) return;
  }

  sheet.appendRow([
    leadCode,
    occurredAt,
    clean_(body.channel, 80) || "site_form",
    "novo",
    clean_(body.lead.name, 180),
    clean_(body.lead.phone, 80),
    clean_(body.lead.email, 180),
    clean_(body.source, 120) || "direto",
    clean_(body.medium, 120),
    clean_(body.campaign, 180),
    clean_(body.term, 180),
    clean_(body.pagePath, 500),
    "",
    "",
    "nao_identificado",
    "",
  ]);
}

function updateAlert_(sheet, rows, body) {
  const eventId = clean_(body.eventId, 100);
  const rowNumber = findEventRow_(rows, eventId);
  if (!rowNumber) {
    return jsonResponse_({ ok: false, error: "EVENT_NOT_FOUND" });
  }

  const status = clean_(body.alertStatus, 40);
  if (!["sent", "failed", "already_sent"].includes(status)) {
    return jsonResponse_({ ok: false, error: "INVALID_ALERT_STATUS" });
  }

  sheet.getRange(rowNumber, EVENT_COLUMNS.ALERT_STATUS).setValue(status);
  return jsonResponse_({ ok: true, eventId, alertStatus: status });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    const body = JSON.parse(
      (event && event.postData && event.postData.contents) || "{}"
    );
    if (!authorized_(body)) {
      return jsonResponse_({ ok: false, error: "UNAUTHORIZED" });
    }

    lock.waitLock(5000);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const eventSheet = spreadsheet.getSheetByName(SHEETS.EVENTS);
    if (!eventSheet) throw new Error("EVENTS_SHEET_NOT_FOUND");

    const rows = existingEventRows_(eventSheet);
    if (body.operation === "alert_update") {
      return updateAlert_(eventSheet, rows, body);
    }

    const eventId = clean_(body.eventId, 100);
    const leadCode = clean_(body.leadCode, 60);
    const eventType = clean_(body.eventType, 60);
    if (!eventId || !leadCode || !eventType) {
      return jsonResponse_({ ok: false, error: "INVALID_EVENT" });
    }

    const existingRow = findEventRow_(rows, eventId);
    if (existingRow) {
      return jsonResponse_({
        ok: true,
        eventId,
        leadCode,
        deduplicated: true,
        shouldAlert: false,
      });
    }

    const occurredAt = parseDate_(body.occurredAt);
    if (eventType === "whatsapp_click") {
      const duplicateRow = findRecentWhatsAppRow_(rows, body, occurredAt);
      if (duplicateRow) {
        const counterCell = eventSheet.getRange(
          duplicateRow,
          EVENT_COLUMNS.DUPLICATE_COUNT
        );
        counterCell.setValue(numeric_(counterCell.getValue()) + 1);

        return jsonResponse_({
          ok: true,
          eventId: clean_(
            eventSheet
              .getRange(duplicateRow, EVENT_COLUMNS.EVENT_ID)
              .getValue(),
            100
          ),
          leadCode: clean_(
            eventSheet
              .getRange(duplicateRow, EVENT_COLUMNS.LEAD_CODE)
              .getValue(),
            60
          ),
          deduplicated: true,
          shouldAlert: false,
        });
      }
    }

    const insertedRow = appendEvent_(eventSheet, body, occurredAt);
    appendLead_(spreadsheet, body, occurredAt);

    return jsonResponse_({
      ok: true,
      eventId,
      leadCode,
      insertedRow,
      deduplicated: false,
      shouldAlert: eventType === "whatsapp_click",
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      error: clean_(error && error.message, 200) || "UNEXPECTED_ERROR",
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: "retifica-premium-marketing",
    retiflow: "not_connected",
  });
}
