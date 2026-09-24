import assert from 'node:assert/strict';
import test from 'node:test';

process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_SEND_TO='AW-123/whatsapp';
process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_SEND_TO='AW-123/phone';
const tracking = await import('../src/lib/trackingEvents.ts');
const consent = await import('../src/lib/consent.ts');
const contract = await import('../src/lib/marketing-event-contract.ts');

class MemoryStorage {
  data=new Map();
  getItem(k){return this.data.get(k)??null}
  setItem(k,v){this.data.set(k,String(v))}
  removeItem(k){this.data.delete(k)}
}

test('confirmed city attaches to the visit immediately without Google events, even with ad-only cookies', async () => {
  const original={window:globalThis.window,document:globalThis.document,navigator:Object.getOwnPropertyDescriptor(globalThis,'navigator'),fetch:globalThis.fetch};
  const requests=[], google=[];
  try {
    globalThis.window={location:{hostname:'www.premiumretifica.com.br',origin:'https://www.premiumretifica.com.br',pathname:'/servicos',search:'',href:'https://www.premiumretifica.com.br/servicos'},localStorage:new MemoryStorage(),sessionStorage:new MemoryStorage(),__retificaConsentRuntimeReady:true,innerWidth:390,matchMedia:()=>({matches:true}),dispatchEvent(){},gtag:(...args)=>google.push(args)};
    globalThis.document={referrer:'',title:'Serviços',cookie:''};
    Object.defineProperty(globalThis,'navigator',{value:{userAgent:'Mobile'},configurable:true});
    globalThis.fetch=async (_url,options)=>{requests.push(JSON.parse(options.body));return new Response(JSON.stringify({ok:true,storageSaved:true}),{status:200})};
    for (const prefs of [{analytics:false,advertising:false},{analytics:false,advertising:true}]) {
      consent.saveConsentPreferences(consent.createConsentPreferences(prefs));
      const id=tracking.getOrCreateContactIntent().sessionId;
      assert.equal(tracking.confirmSessionCity('Ribeirão Preto','manual'),true);
      await new Promise(r=>setImmediate(r));
      const event=requests.at(-1);
      assert.equal(event.eventType,'custom');
      assert.equal(event.metadata.eventLabel,'location_confirmed');
      assert.equal(event.metadata.visitorCity,'Ribeirão Preto');
      assert.equal(event.metadata.method,'city_manual');
      assert.equal(event.sessionId,id);
      assert.equal(event.pagePath,'/servicos');
      assert.equal(event.lead,undefined);
    }
    assert.equal(google.length,0);
    assert.doesNotMatch(JSON.stringify(requests),/latitude|longitude/);
    const count=requests.length;
    assert.equal(tracking.confirmSessionCity('-21.17, -47.81','manual'),false);
    window.location.search='?nao-medir=1';
    tracking.confirmSessionCity('Sertãozinho','precise');
    await new Promise(r=>setImmediate(r));
    assert.equal(requests.length,count);
    assert.equal(contract.isConfirmedLocationEvent('custom',{eventLabel:'cta_click',method:'city_manual',visitorCity:'Sertãozinho'}),false);
    assert.equal(contract.isConfirmedLocationEvent('custom',{eventLabel:'location_confirmed',method:'unknown',visitorCity:'Sertãozinho'}),false);
  } finally {
    globalThis.window=original.window;globalThis.document=original.document;globalThis.fetch=original.fetch;
    if(original.navigator)Object.defineProperty(globalThis,'navigator',original.navigator);
  }
});

test('real tracking runtime: denied cookieless conversion, accepted IDs survive navigation, no duplicate, opt-out stops', async () => {
  const original={window:globalThis.window,document:globalThis.document,navigator:Object.getOwnPropertyDescriptor(globalThis,'navigator'),fetch:globalThis.fetch};
  const calls=[], requests=[];
  const loc={hostname:'www.premiumretifica.com.br',origin:'https://www.premiumretifica.com.br',pathname:'/quanto-custa',search:'?gclid=test-ad-click&utm_source=google&utm_medium=cpc&utm_campaign=teste&utm_content=hero',href:'https://www.premiumretifica.com.br/quanto-custa?gclid=test-ad-click'};
  try {
    globalThis.window={location:loc,localStorage:new MemoryStorage(),sessionStorage:new MemoryStorage(),__retificaConsentRuntimeReady:true,innerWidth:390,matchMedia:()=>({matches:true}),dispatchEvent(){},gtag:(...args)=>{calls.push(args);args[2]?.event_callback?.()}};
    globalThis.document={referrer:'https://www.google.com/',title:'Retífica',cookie:''};
    Object.defineProperty(globalThis,'navigator',{value:{userAgent:'Mobile'},configurable:true});
    globalThis.fetch=async (_url, options)=>{requests.push(JSON.parse(options.body));return new Response(JSON.stringify({ok:true,storageSaved:true}),{status:200})};
    tracking.captureTrafficAttribution();
    tracking.trackMarketingEvent('whatsapp_click');
    await new Promise(r=>setImmediate(r));
    assert.equal(calls.filter(a=>a[1]==='conversion').length,1);
    assert.equal(calls[0][2].transaction_id,undefined);
    assert.equal(requests[0].gclid,undefined);
    assert.equal(requests[0].metadata.measurementMode,'essencial');
    tracking.trackMarketingEvent('whatsapp_click');
    assert.equal(calls.filter(a=>a[1]==='conversion').length,1);
    const choice=consent.createConsentPreferences({analytics:true,advertising:true});
    consent.saveConsentPreferences(choice);
    tracking.captureTrafficAttribution();
    assert.equal(tracking.getStoredAttribution().gclid,'test-ad-click');
    assert.equal(tracking.getStoredAttribution().content,'hero');
    loc.search='';loc.href=loc.origin+'/contato';loc.pathname='/contato';
    tracking.captureTrafficAttribution();
    assert.equal(tracking.getStoredAttribution().gclid,'test-ad-click');
    tracking.trackMarketingEvent('phone_click');
    assert.ok(calls.find(a=>a[1]==='conversion'&&a[2].send_to==='AW-123/phone')[2].transaction_id);
    const savedLocal=window.localStorage;
    window.localStorage={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')},removeItem(){throw Error('blocked')}};
    consent.saveConsentPreferences(choice);
    const first=tracking.getOrCreateContactIntent();
    assert.equal(tracking.getOrCreateContactIntent().leadCode, first.leadCode);
    window.localStorage=savedLocal;
    const count=calls.length;
    window.localStorage.setItem('retifica_premium_tracking_opt_out','1');
    loc.search='?nao-medir=1';
    tracking.trackMarketingEvent('phone_click',{transaction_id:'RP-20260924-ZZ12CD34'});
    assert.equal(calls.length,count);
    await new Promise(r=>setImmediate(r));
  } finally {
    globalThis.window=original.window;globalThis.document=original.document;globalThis.fetch=original.fetch;
    if(original.navigator)Object.defineProperty(globalThis,'navigator',original.navigator);
  }
});
