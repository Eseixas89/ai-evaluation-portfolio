/* npm install --no-save playwright axe-core
   CHROMIUM_PATH=/path/to/chrome node tests/site-checks.cjs */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),publicBase='https://eseixas89.github.io/ai-evaluation-portfolio/';
const pages=fs.readdirSync(root).filter(f=>f.endsWith('.html')).sort();
const report={timestamp:new Date().toISOString(),scope:'Local source; Chromium layout, axe, navigation, and metadata checks',pages:[],links:[],primaryActions:[]};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://local').pathname).slice(1)||'index.html';
 try {const file=path.resolve(root,name);if(!file.startsWith(root+path.sep))throw Error('outside root');
 const mime={'.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.pdf':'application/pdf','.xml':'application/xml'};
 res.setHeader('Content-Type',mime[path.extname(file)]||'text/html');res.end(fs.readFileSync(file));
 }catch{res.statusCode=404;res.end('Not found');}
});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox','--no-zygote','--single-process','--disable-dev-shm-usage']});
 const context=await browser.newContext(),page=await context.newPage();const unique=new Set(),external=new Set();
 // Keep local 404 testing independent of production hosting during development.
 await page.route(publicBase+'**',async r=>r.fulfill({response:await context.request.get(r.request().url().replace(publicBase,base+'/'))}));
 for(const file of pages){
  await page.goto(base+'/'+file);
  const entry={file,layouts:[],metadata:await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,ogImage:document.querySelector('meta[property="og:image"]')?.content,ogUrl:document.querySelector('meta[property="og:url"]')?.content,card:document.querySelector('meta[name="twitter:card"]')?.content}))};
  assert.ok(entry.metadata.title&&entry.metadata.description,file+' title/description');
  if(file!=='404.html'){
   assert.equal(entry.metadata.canonical,publicBase+(file==='index.html'?'':file));assert.equal(entry.metadata.ogUrl,entry.metadata.canonical);
   assert.equal(entry.metadata.ogImage,publicBase+'assets/social-preview.png');assert.equal(entry.metadata.card,'summary_large_image');
  }
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:900});
   const overflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-innerWidth));
   entry.layouts.push({width,overflow});assert.equal(overflow,0,file+' overflow at '+width);
  }
  await page.setViewportSize({width:390,height:844});
  await page.addScriptTag({path:process.env.AXE_PATH||require.resolve('axe-core/axe.min.js')});
  const axe=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}));});
  entry.axeViolations=axe;if(axe.length)console.log(JSON.stringify({file,axe}));assert.equal(axe.length,0,file+' axe violations');
  const refs=await page.locator('a[href],link[href],script[src],img[src]').evaluateAll(els=>els.map(e=>e.getAttribute('href')||e.getAttribute('src')));
  for(const href of refs){if(!href||/^(mailto:|tel:|data:)/.test(href))continue;const u=new URL(href,base+'/'+file);if(u.href.startsWith(publicBase)){const normalized=new URL(u.href.replace(publicBase,base+'/'));unique.add(normalized.href);}else if(u.origin===base)unique.add(u.href);else external.add(u.href);}
  report.pages.push(entry);
  if(file==='hardening-review.html')await page.screenshot({path:path.join(root,'assets/hardening/hardening-review-mobile.jpg'),type:'jpeg',quality:80});
 }
 assert.equal(new Set(report.pages.map(x=>x.metadata.title)).size,pages.length,'Unique page titles');
 for(const href of unique){const url=new URL(href),response=await context.request.get(url.origin+url.pathname+url.search);assert.equal(response.status(),200,href);
  if(url.hash&&url.pathname.endsWith('.html')||url.hash&&url.pathname==='/'){
   await page.goto(url.origin+url.pathname);assert.ok(await page.locator('[id]').evaluateAll((els,id)=>els.some(e=>e.id===id),decodeURIComponent(url.hash.slice(1))),href+' anchor');
  }
  report.links.push({target:url.pathname+url.hash,status:response.status()});
 }
 await page.goto(base+'/');await page.getByRole('link',{name:/Explore my work/}).click();assert.match(page.url(),/#work$/);report.primaryActions.push('Explore my work scrolls to #work');
 const downloaded=page.waitForEvent('download');await page.getByRole('link',{name:/Download CV/}).click();const cv=await downloaded;assert.equal(cv.suggestedFilename(),'Eduardo_Seixas_CV.pdf');assert.equal(await cv.failure(),null);report.primaryActions.push('Download CV produces the expected PDF download');
 await page.goto(base+'/');const demo=page.locator('a[href="live-evidence.html"]').first();await demo.click();await page.waitForURL(/live-evidence\.html$/);report.primaryActions.push('Homepage demo link opens the explorer');
 const repo=page.getByRole('link',{name:'Open the public repository ↗',exact:true});assert.equal(await repo.getAttribute('href'),'https://github.com/Eseixas89/ai-evaluation-portfolio');report.primaryActions.push('Direct repository fallback has the expected public destination');
 const contact=await page.locator('a[href="./#contact"]').getAttribute('href');assert.equal(contact,'./#contact');
 report.externalLinks=[...external].sort();report.layoutChecks=report.pages.reduce((n,p)=>n+p.layouts.length,0);report.localReferences=report.links.length;report.passed=true;
 fs.writeFileSync(path.join(root,'assets/hardening/site-checks.json'),JSON.stringify(report,null,2)+'\n');
 console.log(JSON.stringify({pages:pages.length,layouts:report.layoutChecks,localReferences:report.localReferences,axeViolations:0,externalLinks:external.size,primaryActions:report.primaryActions},null,2));
 await browser.close();server.close();
})().catch(e=>{console.error(e);fs.writeFileSync(path.join(root,'assets/hardening/site-checks.json'),JSON.stringify({...report,passed:false,error:e.message},null,2));server.close();process.exit(1);});
