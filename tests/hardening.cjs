/* Browser regression checks. API failures below are fixtures, never live abuse.
   Run: npm install --no-save playwright; npx playwright install firefox
   CHROMIUM_PATH=/path/to/chrome node tests/hardening.cjs [baseline|after]
   A local server is used; no API keys or external requests are required. */
const fs = require('node:fs'), path = require('node:path'), http = require('node:http');
const assert = require('node:assert/strict');
const {chromium, firefox} = require('playwright');
const root = path.resolve(__dirname, '..'), mode = process.argv[2] || 'after';
const sha = 'a'.repeat(40), treeSha = 'b'.repeat(40);
const commit = {sha, commit: {tree: {sha: treeSha}}};
const entry = {type:'blob',path:'fl-07-agent/README.md',size:120};
const tree = {truncated:false,tree:[entry]};
const report = {timestamp:new Date().toISOString(),mode,scope:'Local real browser; intercepted GitHub API fixtures',cases:[]};
const server = http.createServer((req,res)=>{
  const name = decodeURIComponent(new URL(req.url,'http://local').pathname).slice(1) || 'index.html';
  const file = path.resolve(root,name);
  try {
    if (!file.startsWith(root+path.sep)) throw Error('outside root');
    const mime = {'.css':'text/css','.js':'text/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf','.json':'application/json','.xml':'application/xml'};
    res.setHeader('Content-Type',mime[path.extname(file)] || 'text/html'); res.end(fs.readFileSync(name==='live-evidence.js' && process.env.EVIDENCE_SCRIPT ? process.env.EVIDENCE_SCRIPT : file));
  } catch {res.statusCode=404;res.end('Not found');}
});
let base, browser, context;
async function scenario(name,config={},action){
  const page = await context.newPage();
  let calls=0, errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://api.github.com/**',async route=>{
    calls++;
    if(config.network) return route.abort('failed');
    if(config.timeout) return; // Clock advances the application's real abort timer.
    if(config.delay) await new Promise(r=>setTimeout(r,config.delay));
    const isCommit=route.request().url().endsWith('/commits/main');
    const data=isCommit ? (Object.hasOwn(config,'commit')?config.commit:commit) : (Object.hasOwn(config,'tree')?config.tree:tree);
    await route.fulfill({status:config.http||200,headers:{'content-type':'application/json','access-control-expose-headers':'x-ratelimit-remaining',...(config.headers||{})},body:config.invalidJSON?'{broken':JSON.stringify(data)});
  });
  page.setDefaultTimeout(5000);
  await page.goto(base+'/live-evidence.html');
  let assertion;
  try {
    if(action) await action(page,(increment=false)=>{if(increment)calls++;return calls;});
    else {
      await page.locator('#load-evidence').click();
      await page.waitForFunction(()=>document.querySelector('#evidence-status').dataset.state!=='loading');
      if(config.expected) assert.match(await page.locator('#evidence-status').innerText(),config.expected);
      assert.equal(await page.locator('#load-evidence').isEnabled(),true);
      assert.equal(await page.locator('#project').isEnabled(),true);
      assert.equal(await page.locator('#evidence-results').getAttribute('aria-busy'),'false');
    }
    assert.equal(errors.length,0); assertion=true;
  } catch(e) {assertion=e.message;}
  report.cases.push({name,passed:assertion===true,assertion:assertion===true?'passed':assertion,calls,status:await page.locator('#evidence-status').innerText(),pageErrors:errors});
  console.log(name+': '+(assertion===true?'PASS':'FAIL'));
  fs.writeFileSync(path.join(root,'assets/hardening/'+mode+'-tests.json'),JSON.stringify(report,null,2)+'\n');
  await page.close();
}
(async()=>{
  await new Promise(r=>server.listen(0,'127.0.0.1',r)); base='http://127.0.0.1:'+server.address().port;
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox','--no-zygote','--single-process','--disable-dev-shm-usage']});
  context=await browser.newContext({viewport:{width:820,height:1180},hasTouch:true});
  report.chromium=browser.version();
  for(const value of ['', 'garbage', 'constructor', '__proto__']) await scenario('Invalid selection: '+JSON.stringify(value),{},async(p,calls)=>{
    await p.evaluate(value=>{const s=document.querySelector('#project');s.add(new Option('Test',value));s.value=value;document.querySelector('#evidence-form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));},value);
    await p.waitForFunction(()=>document.querySelector('#evidence-status').dataset.state!=='loading');
    assert.match(await p.locator('#evidence-status').innerText(),/Choose a valid project/); assert.equal(calls(),0);
  });
  await scenario('Null commit',{commit:null,expected:/unexpected commit response/});
  await scenario('Invalid commit SHA',{commit:{...commit,sha:'not-a-sha'},expected:/unexpected commit response/});
  await scenario('Malformed JSON',{invalidJSON:true,expected:/unreadable response/});
  await scenario('Null tree',{tree:null,expected:/complete file list/});
  await scenario('Null tree entry',{tree:{...tree,tree:[null]},expected:/unexpected file entry/});
  await scenario('Traversal path',{tree:{...tree,tree:[{...entry,path:'fl-07-agent/../index.html'}]},expected:/unexpected file entry/});
  await scenario('Truncated tree',{tree:{...tree,truncated:true},expected:/complete file list/});
  await scenario('HTTP 404',{http:404,expected:/could not be found/});
  await scenario('HTTP 500',{http:500,expected:/HTTP 500/});
  await scenario('HTTP 429',{http:429,expected:/API limit/});
  await scenario('HTTP 403 exhausted limit',{http:403,headers:{'x-ratelimit-remaining':'0'},expected:/API limit/});
  await scenario('Network failure',{network:true,expected:/could not be reached/});
  await scenario('Timeout', {timeout:true},async p=>{
    await p.clock.install();await p.locator('#load-evidence').click();await p.clock.runFor(15010);
    await p.waitForFunction(()=>document.querySelector('#evidence-status').dataset.state==='error');
    assert.match(await p.locator('#evidence-status').innerText(),/timed out/);assert.equal(await p.locator('#load-evidence').isEnabled(),true);
  });
  await scenario('No matching files',{tree:{...tree,tree:[]},expected:/No matching files/});
  await scenario('Filename treated as text; unavailable negative size',{tree:{...tree,tree:[{...entry,path:'fl-07-agent/<img onerror=alert(1)>.md',size:-1}]}},async p=>{
    await p.locator('#load-evidence').click();await p.locator('#evidence-results').waitFor();
    assert.equal(await p.locator('#evidence-files img').count(),0);
    assert.match(await p.locator('#evidence-files').innerText(),/<img onerror=alert\(1\)>/);
    assert.match(await p.locator('#evidence-files').innerText(),/Size unavailable/);
    assert.match(await p.locator('#evidence-files a').getAttribute('href'),new RegExp('/blob/'+sha+'/'));
  });
  await scenario('Fast double submit; disabled while pending; cache; expiry',{delay:80},async(p,calls)=>{
    await p.clock.install();
    await p.evaluate(()=>{const f=document.querySelector('#evidence-form');f.requestSubmit();f.requestSubmit();});
    assert.equal(await p.locator('#load-evidence').isEnabled(),false);assert.equal(await p.locator('#project').isEnabled(),false);
    await p.locator('#evidence-results').waitFor();assert.equal(calls(),2);
    await p.locator('#load-evidence').click();await p.waitForFunction(()=>document.querySelector('#evidence-status').textContent.includes('earlier in this tab'));assert.equal(calls(),2);
    await p.clock.fastForward(300001);await p.locator('#load-evidence').click();
    await p.waitForFunction(()=>document.querySelector('#evidence-status').dataset.state==='success');assert.equal(calls(),4);
  });
  await scenario('Invalid payload is not cached; retry works',{tree:{...tree,tree:[null]}},async(p,calls)=>{
    await p.locator('#load-evidence').click();await p.waitForFunction(()=>document.querySelector('#evidence-status').dataset.state==='error');
    await p.unroute('https://api.github.com/**');
    await p.route('https://api.github.com/**',async r=>{calls(true);await r.fulfill({json:r.request().url().endsWith('/commits/main')?commit:tree});});
    await p.locator('#load-evidence').click();await p.waitForFunction(()=>document.querySelector('#evidence-status').dataset.state!=='loading');
    assert.equal(await p.locator('#evidence-status').getAttribute('data-state'),'success');assert.equal(calls(),4);
  });
  const nojsContext=await browser.newContext({javaScriptEnabled:false});const nojs=await nojsContext.newPage();await nojs.goto(base+'/live-evidence.html');
  report.cases.push({name:'JavaScript disabled: repository fallback visible',passed:await nojs.locator('noscript a').isVisible()});await nojs.close();
  await browser.close();
  try {
    browser=await firefox.launch({timeout:20000,env:{...process.env,MOZ_DISABLE_CONTENT_SANDBOX:'1'}}); report.firefox=browser.version();
    const p=await browser.newPage({viewport:{width:820,height:1180}});
    await p.route('https://api.github.com/**',r=>r.fulfill({json:r.request().url().endsWith('/commits/main')?commit:tree}));
    await p.goto(base+'/live-evidence.html');await p.locator('#load-evidence').click();await p.locator('#evidence-results').waitFor();
    assert.equal(await p.locator('#evidence-files a').count(),1);
    const overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    report.cases.push({name:'Firefox 153 desktop: lookup, pinned link, tablet width layout',passed:!overflow,overflow});
    await p.screenshot({path:path.join(root,'assets/hardening/firefox-evidence.jpg'),type:'jpeg',quality:80});
    await browser.close();
  } catch(e) {report.cases.push({name:'Firefox browser check',passed:false,error:e.message});if(browser)await browser.close().catch(()=>{});}
  report.passed=report.cases.filter(c=>c.passed).length;report.total=report.cases.length;
  fs.writeFileSync(path.join(root,'assets/hardening/'+mode+'-tests.json'),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));server.close();
  if(mode!=='baseline'&&report.passed!==report.total)process.exitCode=1;
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
