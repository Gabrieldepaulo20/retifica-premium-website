import assert from 'node:assert/strict';
import test from 'node:test';
import { dispatchAdsConversion, isContactDestination } from '../src/lib/google-ads-dispatch.ts';
import { buildEvaluationMessage } from '../src/lib/whatsapp-message.ts';
import { normalizeEnhancedEmail, normalizeEnhancedPhone, sendEnhancedLead } from '../src/lib/enhanced-leads.ts';
import { readAttributionStorage, writeAttributionStorage, clearAttributionCookie } from '../src/lib/attribution-storage.ts';

test('conversion uses the exact destination, zero revenue and once-only callback', async () => {
  const calls = [];
  const result = await dispatchAdsConversion({ gtag: (...args) => { calls.push(args); args[2].event_callback(); args[2].event_callback(); }, sendTo: 'AW-123/label-123', transactionId: 'RP-20260924-AB12CD34', pageLocation: 'https://example.com/' });
  assert.equal(result, 'processed');
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], 'event');
  assert.equal(calls[0][1], 'conversion');
  assert.equal(calls[0][2].send_to, 'AW-123/label-123');
  assert.equal(calls[0][2].value, 0);
  assert.equal(calls[0][2].event_timeout, 250);
});

test('missing tag, malformed label and thrown tag fail without blocking contact', async () => {
  assert.equal(await dispatchAdsConversion({sendTo:'AW-123/label',pageLocation:''}), 'unavailable');
  assert.equal(await dispatchAdsConversion({gtag:()=>assert.fail(),sendTo:'AW-123',pageLocation:''}), 'unavailable');
  assert.equal(await dispatchAdsConversion({gtag:()=>{throw Error('blocked')},sendTo:'AW-123/label',pageLocation:''}), 'unavailable');
});

test('blocked tag releases navigation on timeout and denied signal has no transaction identity', async () => {
  let payload;
  const result = await dispatchAdsConversion({gtag:(_c,_e,p)=>{payload=p},sendTo:'AW-123/label',pageLocation:'https://example.com/'});
  assert.equal(result, 'timeout');
  assert.equal(Object.hasOwn(payload,'transaction_id'),false);
  assert.equal(Object.hasOwn(payload,'user_data'),false);
});

test('only real contact hosts and tel links qualify for navigation guard', () => {
  assert.equal(isContactDestination('https://wa.me/5516999999999'),true);
  assert.equal(isContactDestination('tel:+551635244661'),true);
  assert.equal(isContactDestination('https://wa.me.example.org/'),false);
  assert.equal(isContactDestination('javascript:alert(1)'),false);
});

test('WhatsApp adds qualification and reference without campaign identifiers or duplicate answers', () => {
  const text = buildEvaluationMessage('Quero avaliação.\nModelo: Gol\nMotor: 1.0\nCidade: Ribeirão Preto\nCabeçote: desmontado','RP-20260924-AB12CD34');
  assert.equal((text.match(/Modelo:/g)||[]).length,1);
  assert.equal((text.match(/Cidade:/g)||[]).length,1);
  assert.match(text,/Referência do atendimento: RP-/);
  assert.doesNotMatch(text,/GCLID|utm_|Campanha:/);
  const blank = buildEvaluationMessage('Olá!');
  for (const field of ['Veículo/modelo:', 'Motor (se souber):', 'Cidade:', 'Cabeçote:']) assert.ok(blank.includes(field));
});

test('enhanced leads normalize, hash and send only after explicit consent and account enablement', async () => {
  assert.equal(normalizeEnhancedEmail(' A.B@gmail.com '),'ab@gmail.com');
  assert.equal(normalizeEnhancedPhone('(16) 99999-8888'),'+5516999998888');
  const calls=[];
  const args={enabled:true,consent:()=>true,allowed:()=>true,gtag:(...a)=>calls.push(a),adsId:'AW-123',email:' A.B@gmail.com ',phone:'(16) 99999-8888'};
  assert.equal(await sendEnhancedLead({...args,enabled:false}),false);
  assert.equal(await sendEnhancedLead({...args,consent:()=>false}),false);
  assert.equal(calls.length,0);
  assert.equal(await sendEnhancedLead(args),true);
  assert.match(calls[0][2].sha256_email_address,/^[a-f0-9]{64}$/);
  assert.match(calls[0][2].sha256_phone_number,/^[a-f0-9]{64}$/);
  assert.deepEqual(calls[1],['event','form_submit',{send_to:'AW-123'}]);
  assert.deepEqual(calls[2],['set','user_data',null]);
  assert.ok(!JSON.stringify(calls).includes('gmail.com'));
});

test('attribution survives localStorage failure via bounded Secure SameSite first-party cookie', () => {
  const oldWindow=globalThis.window,oldDocument=globalThis.document,oldLocation=globalThis.location;
  try {
    globalThis.window={localStorage:{getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}}};
    globalThis.document={cookie:''};globalThis.location={protocol:'https:'};
    const raw=JSON.stringify({gclid:'test-click-id',expiresAt:new Date(Date.now()+3600000).toISOString()});
    writeAttributionStorage(raw,new Date(Date.now()+3600000).toISOString());
    assert.equal(readAttributionStorage(),raw);
    assert.match(document.cookie,/SameSite=Lax; Secure$/);
    clearAttributionCookie();assert.match(document.cookie,/Max-Age=0/);
  } finally {globalThis.window=oldWindow;globalThis.document=oldDocument;globalThis.location=oldLocation;}
});
