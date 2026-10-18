/* Actual public-page smoke check. No dashboard data is inferred.
   npm install --no-save playwright
   CHROMIUM_PATH=/path/to/chrome node tests/analytics-smoke.cjs */
const fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const report={checkedAt:new Date().toISOString(),url:'https://eseixas89.github.io/ai-evaluation-portfolio/',method:'Actual Chromium page load, without API fixtures',responses:[],requestFailures:[],pageErrors:[],dashboardConfirmed:false,note:'Automated verification traffic is not organic traffic; Cloudflare bot filtering may exclude these events from dashboard counts.'};
const scriptUrl='https://static.cloudflareinsights.com/beacon.min.js';
const isRum=url=>{try{const u=new URL(url);return u.hostname==='cloudflareinsights.com'&&u.pathname==='/cdn-cgi/rum';}catch{return false;}};
let browser;
(async()=>{
 try{
  const options={executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox','--no-zygote','--single-process','--disable-dev-shm-usage']};
  // Use the environment's normal outbound proxy when one is configured.
  if(process.env.HTTPS_PROXY){const p=new URL(process.env.HTTPS_PROXY);options.proxy={server:p.origin,...(p.username?{username:decodeURIComponent(p.username),password:decodeURIComponent(p.password)}:{})};report.environmentProxyUsed=true;}
  browser=await chromium.launch(options);report.browser=browser.version();
  const page=await browser.newPage({viewport:{width:1280,height:900}});
  page.on('response',r=>{if(r.url().startsWith(scriptUrl)||isRum(r.url()))report.responses.push({url:r.url(),method:r.request().method(),status:r.status()});});
  page.on('request',r=>{if(isRum(r.url())&&r.method()==='POST'){report.rumRequestObserved=true;const data=r.postData()||'';report.rumPayloadContainsExpectedSiteToken=data.includes('c3f9d2ab73b44936a3938607ff302428');}});
  page.on('requestfailed',r=>{if(r.url().startsWith(scriptUrl)||isRum(r.url()))report.requestFailures.push({url:r.url(),error:r.failure()?.errorText});});
  page.on('pageerror',e=>report.pageErrors.push(e.message));
  const accepted=page.waitForResponse(r=>isRum(r.url())&&r.request().method()==='POST'&&r.status()>=200&&r.status()<300,{timeout:25000}).catch(()=>null);
  const response=await page.goto(report.url,{waitUntil:'load',timeout:30000});report.pageStatus=response.status();
  const beacon=page.locator('script[src="'+scriptUrl+'"]');report.scriptCount=await beacon.count();report.scriptType=await beacon.getAttribute('type');
  const config=JSON.parse(await beacon.getAttribute('data-cf-beacon'));report.domTokenMatches=config.token==='c3f9d2ab73b44936a3938607ff302428';
  const received=await accepted;report.collectionEndpointAccepted=!!received;
  report.passed=report.pageStatus===200&&report.scriptCount===1&&report.domTokenMatches&&report.responses.some(r=>r.url.startsWith(scriptUrl)&&r.status===200)&&report.collectionEndpointAccepted&&report.rumPayloadContainsExpectedSiteToken===true;
 }catch(error){report.passed=false;report.error=error.message;}
 finally{if(browser)await browser.close();fs.writeFileSync(path.join(__dirname,'../assets/launch/analytics-browser-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(!report.passed)process.exitCode=1;}
})();
