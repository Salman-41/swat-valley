import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
const browser=await chromium.launch({executablePath:process.env.SWAT_BROWSER||'/opt/brave.com/brave/brave',args:['--no-sandbox','--enable-unsafe-swiftshader']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const results=[];
for(const [name,url] of [['siena','https://www.siena.film/'],['vermeer','https://www.rijksmuseum.nl/en/johannes-vermeer'],['bear71','https://bear71vr.nfb.ca/']]){
 try{const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:40000});await page.waitForTimeout(4500);
if(name==='siena'){await page.getByText('ENTER',{exact:true}).first().click({timeout:3000}).catch(()=>{});}
if(name==='vermeer'){await page.getByText('No, rather not',{exact:false}).first().click({timeout:3000}).catch(()=>{});}
if(name==='bear71'){await page.getByText('ENTER EXPERIENCE',{exact:true}).first().click({timeout:3000}).catch(()=>{});}
await page.waitForTimeout(4000);await page.screenshot({path:`screenshots/audit/reference-${name}-entry.png`});const entry=await page.locator('body').innerText();await page.mouse.wheel(0,850);await page.waitForTimeout(1800);await page.screenshot({path:`screenshots/audit/reference-${name}-scroll.png`});results.push({name,url,status:response?.status(),title:await page.title(),text:entry.slice(0,6000)});}catch(error){results.push({name,url,error:String(error)});}
}
await writeFile('docs/audit/reference-observations.json',JSON.stringify(results,null,2));await browser.close();
