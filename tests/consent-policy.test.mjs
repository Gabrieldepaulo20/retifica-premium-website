import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  CONSENT_BANNER_MINIMIZE_AFTER_MS,
  shouldMinimizeConsentBanner,
} from "../src/lib/consent-banner-policy.ts";
import {
  CONSENT_POLICY_VERSION,
  CONSENT_PURPOSE_VERSION,
  createConsentPreferences,
} from "../src/lib/consent.ts";

test("cinco segundos sem interação só autorizam minimizar o aviso", () => {
  assert.equal(CONSENT_BANNER_MINIMIZE_AFTER_MS, 5_000);
  assert.equal(
    shouldMinimizeConsentBanner({
      hasStoredPreferences: false,
      isOpen: true,
      isCustomizing: false,
      hasInteracted: false,
    }),
    true
  );
  assert.equal(
    shouldMinimizeConsentBanner({
      hasStoredPreferences: false,
      isOpen: true,
      isCustomizing: false,
      hasInteracted: true,
    }),
    false
  );
});

test("aceite, recusa e escolha parcial são decisões explícitas versionadas", () => {
  const accepted = createConsentPreferences({
    analytics: true,
    advertising: true,
  });
  const refused = createConsentPreferences({
    analytics: false,
    advertising: false,
  });
  const custom = createConsentPreferences({
    analytics: true,
    advertising: false,
  });

  assert.equal(accepted.decision, "accept_all");
  assert.equal(refused.decision, "reject_all");
  assert.equal(custom.decision, "custom");
  for (const preference of [accepted, refused, custom]) {
    assert.equal(preference.version, CONSENT_POLICY_VERSION);
    assert.equal(preference.purposeVersion, CONSENT_PURPOSE_VERSION);
    assert.equal(preference.decisionMethod, "explicit");
    assert.ok(Number.isFinite(Date.parse(preference.savedAt)));
  }
});

test("a interface oferece aceitar e recusar com o mesmo peso e reabertura", async () => {
  const source = await readFile(
    new URL("../src/components/site/CookieConsent.tsx", import.meta.url),
    "utf8"
  );
  assert.match(source, />\s*Recusar medição\s*</);
  assert.match(source, />\s*Aceitar medição\s*</);
  assert.match(source, /Medição desligada · escolher/);
  assert.match(source, /aria-labelledby="privacy-banner-title"/);
  assert.match(source, /focus-visible:outline/);
});
