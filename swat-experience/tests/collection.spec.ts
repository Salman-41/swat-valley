import {test,expect} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';
import {mkdir} from 'node:fs/promises';
test('research search and archive place facets restore from URL',async({page})=>{
 await page.goto('/research/?topic=Heritage');await expect(page.locator('[data-source]:visible')).toHaveCount(4);
 await page.getByRole('searchbox').fill('Butkara');await expect(page.locator('[data-source]:visible')).toHaveCount(1);await page.reload();await expect(page.getByRole('searchbox')).toHaveValue('Butkara');
 await page.locator('article:visible summary').first().click();await expect(page.locator('article:visible details')).toHaveAttribute('open','');
 await page.getByRole('searchbox').fill('no-such-source');await expect(page.locator('#research-empty')).toBeVisible();
 await page.goto('/archive/?place=Mahodand');await expect(page.locator('[data-record]:visible')).toHaveCount(2);await page.getByRole('combobox',{name:'Place',exact:true}).selectOption('Islampur');await expect(page.locator('[data-record]:visible')).toHaveCount(1);await expect(page).toHaveURL(/place=Islampur/);
});
test('object inspection preserves source and uncertainty',async({page})=>{
 await page.goto('/objects/marine-deity/');await expect(page.getByText('Swat attribution uncertain',{exact:false})).toBeVisible();await page.getByRole('button',{name:'Inspect image'}).click();await expect(page.locator('#photo-dialog')).toBeVisible();await expect(page.locator('#detail-source')).toHaveAttribute('href',/38789/);await page.locator('#photo-zoom').fill('200');await page.keyboard.press('Escape');await expect(page.locator('#photo-dialog')).toBeHidden();
 await page.goto('/objects/');await expect(page.locator('table')).toContainText('Swat Valley?');
});
test('new routes responsive screenshots, loaded images and accessibility',async({page})=>{
 test.setTimeout(180000);await mkdir('screenshots/expansion/collection',{recursive:true});await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,390,768,1024,1440,1920])for(const route of ['/objects/','/objects/dipankara/','/objects/marine-deity/','/research/']){
 await page.setViewportSize({width,height:900});expect((await page.goto(route))?.status()).toBe(200);await page.evaluate(()=>document.fonts.ready);await page.locator('main img').evaluateAll(async imgs=>{await Promise.all(imgs.map(img=>(img as HTMLImageElement).decode()))});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();await page.screenshot({path:`screenshots/expansion/collection/${route.split('/').filter(Boolean).join('-')}-${width}.png`,fullPage:true});
 if(width===390){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations).toEqual([]);}
 }expect(errors).toEqual([]);
});
