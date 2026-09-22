import assert from "node:assert/strict";
import test from "node:test";
import { createPageViewMeasurement } from "../src/lib/page-view-measurement.ts";

function fixture() {
  const measurement = createPageViewMeasurement();
  const own = [];
  let analytics = 0;
  let available = true;
  const send = {
    own: (label) => own.push(label),
    analytics: () => { if (!available) return false; analytics++; return true; },
  };
  return { measurement, own, send, count: () => analytics, available: (value) => { available = value; } };
}

test("aceite na primeira página envia ao GA4 sem duplicar contagem própria", () => {
  const f = fixture();
  f.measurement.measure("/quanto-custa", false, f.send);
  assert.equal(f.count(), 0);
  f.measurement.measure("/quanto-custa", true, f.send);
  f.measurement.measure("/quanto-custa", true, f.send);
  assert.deepEqual(f.own, ["page_view"]);
  assert.equal(f.count(), 1);
});

test("recusa e navegação não geram replay histórico quando há aceite", () => {
  const f = fixture();
  f.measurement.measure("/", false, f.send);
  f.measurement.measure("/quanto-custa", false, f.send);
  assert.equal(f.count(), 0);
  f.measurement.measure("/quanto-custa", true, f.send);
  assert.equal(f.count(), 1);
  f.measurement.measure("/", true, f.send);
  assert.equal(f.count(), 2);
  assert.deepEqual(f.own, ["page_view", "spa_navigation", "spa_navigation"]);
});

test("revogação bloqueia GA4; novo aceite só mede página atual", () => {
  const f = fixture();
  f.measurement.measure("/", true, f.send);
  f.measurement.measure("/", false, f.send);
  f.measurement.measure("/quanto-custa", false, f.send);
  assert.equal(f.count(), 1);
  f.measurement.measure("/quanto-custa", true, f.send);
  assert.equal(f.count(), 2);
});

test("tag indisponível pode tentar novamente; sessão nova reinicia os cursores", () => {
  const f = fixture();
  f.available(false);
  f.measurement.measure("/", true, f.send);
  f.available(true);
  f.measurement.measure("/", true, f.send);
  assert.equal(f.count(), 1);
  assert.equal(f.own.length, 1);
  f.measurement.reset();
  f.measurement.measure("/", true, f.send);
  assert.equal(f.count(), 2);
  assert.deepEqual(f.own, ["page_view", "page_view"]);
});
