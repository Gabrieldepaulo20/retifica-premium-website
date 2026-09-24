import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { locationOptions, requestCity, suggestCity } from '../src/lib/city-location.ts';

const cities = JSON.parse(readFileSync(new URL('../public/data/municipios-sp.json', import.meta.url), 'utf8'));
const coords = { latitude: -21.17, longitude: -47.81, accuracy: 100 };

test('IBGE polygons identify service cities without nearest-city guessing', () => {
  assert.equal(cities.length, 645);
  assert.equal(suggestCity(coords, 'precise', cities), 'Ribeirão Preto');
  assert.equal(suggestCity({ ...coords, latitude: -21.14, longitude: -47.99 }, 'precise', cities), 'Sertãozinho');
  assert.equal(suggestCity({ ...coords, latitude: -23.55, longitude: -46.63 }, 'precise', cities), 'São Paulo');
  assert.equal(suggestCity({ ...coords, latitude: 0, longitude: 0 }, 'precise', cities), null);
  assert.equal(suggestCity({ ...coords, accuracy: 50_000 }, 'precise', cities), null);
  assert.equal(suggestCity({ ...coords, latitude: NaN }, 'precise', cities), null);
});

test('approximate choice coarsens locally even if browser provides precise position', () => {
  const tiny = [{ name: 'Fixture', bounds: [1.001, 1.001, 1.003, 1.003], polygons: [[[[1.001, 1.001], [1.003, 1.001], [1.003, 1.003], [1.001, 1.003], [1.001, 1.001]]]] }];
  const fine = { latitude: 1.002, longitude: 1.002, accuracy: 1 };
  assert.equal(suggestCity(fine, 'precise', tiny), 'Fixture');
  assert.equal(suggestCity(fine, 'approximate', tiny), null);
  assert.equal(locationOptions('approximate').enableHighAccuracy, false);
  assert.equal(locationOptions('precise').enableHighAccuracy, true);
});

test('permission denied does not load map or convert refusal into a city', async () => {
  await assert.rejects(requestCity('precise', new AbortController().signal, {
    getCurrentPosition: (_success, error) => error({ code: 1 }),
  }, () => assert.fail('No map request on denial')), /denied/);
});

test('cancel ignores delayed geolocation and never loads data', async () => {
  let callback;
  const controller = new AbortController();
  const pending = requestCity('precise', controller.signal, {
    getCurrentPosition: (success) => { callback = success; },
  }, () => assert.fail('Cancelled request must not load map'));
  controller.abort();
  await assert.rejects(pending, /cancelled/);
  await callback({ coords });
});

test('cancel while loading rejects and ignores the late map result', async () => {
  let complete;
  const controller = new AbortController();
  const pending = requestCity('approximate', controller.signal, {
    getCurrentPosition: (success) => { void success({ coords }); },
  }, () => new Promise(resolve => { complete = resolve; }));
  controller.abort();
  await assert.rejects(pending, /cancelled/);
  complete(cities);
});

test('map loader receives no position; result contains city only', async () => {
  const result = await requestCity('precise', new AbortController().signal, {
    getCurrentPosition: (success) => { void success({ coords }); },
  }, async (...args) => { assert.deepEqual(args, []); return cities; });
  assert.equal(result, 'Ribeirão Preto');
});
