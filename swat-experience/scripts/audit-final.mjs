import {spawn} from 'node:child_process';import {mkdir,writeFile} from 'node:fs/promises';import {chromium} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
const base='http://127.0.0.1:4391';let server;
try{await fetch(base);}catch{server=spawn(process.execPath,['scripts/serve.mjs','--port','4391'],{stdio:'ignore'});await new Promise(resolve=>setTimeout(resolve,1000));}
let browser;
try{
 await import('./audit-accessibility.mjs');
 await mkdir('screenshots/audit/final',{recursive:true});
 browser=await chromium.launch({executablePath:'/opt/brave.com/brave/brave',args:['--no-sandbox','--enable-unsafe-swiftshader']});const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();
 for(const width of [390,1440]){await page.setViewportSize({width,height:900});for(const route of ['/','/atlas/','/heritage/','/culture/','/environment/','/sources/','/places/mahodand/','/places/kalam/','/places/bahrain/','/places/madyan/','/places/mingora/','/places/barikot/','/places/malam-jabba/','/404.html']){await page.goto(base+route);await page.evaluate(()=>document.fonts.ready);if(route==='/atlas/')await page.waitForSelector('.map-ready');await page.evaluate(async()=>{for(const img of Array.from(document.querySelectorAll('main img'))){img.loading='eager';await img.decode().catch(()=>{});}});const name=route==='/'?'home':route.replace(/^\/+|\/+$/g,'').replaceAll('/','-').replace('.html','');await page.screenshot({path:`screenshots/audit/final/${name}-${width}.png`,fullPage:true});}}
 await page.goto(base+'/places/mahodand/');await page.locator('[data-open-photo]').first().click();await page.locator('#photo-zoom').fill('200');await page.locator('#photo-zoom').dispatchEvent('input');await page.locator('#detail-image').evaluate(img=>img.decode());await page.screenshot({path:'screenshots/audit/final/photo-inspector-1440.png'});const modal=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();await writeFile('docs/audit/photo-dialog-accessibility.json',JSON.stringify({violations:modal.violations,incomplete:modal.incomplete.map(v=>v.id)},null,2));
 console.log('Final captures: 28 page images plus photograph inspector. Modal violations:',modal.violations.length);
}finally{await browser?.close();server?.kill();}
