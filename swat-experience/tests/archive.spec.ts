import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('archive search, filters, URL restoration and photo inspection',async({page})=>{
 await page.goto('/archive/');
 await expect(page.locator('[data-record]:visible')).toHaveCount(6);
 await page.getByRole('button',{name:'Next →',exact:true}).click();
 await expect(page).toHaveURL(/page=2/);
 await expect(page.locator('[data-record]:visible')).toHaveCount(6);
 await page.getByRole('searchbox').fill('Bahrain');
 await expect(page.locator('[data-record]:visible')).toHaveCount(2);
 await page.reload();await expect(page.getByRole('searchbox')).toHaveValue('Bahrain');
 await page.getByRole('combobox',{name:'Subject',exact:true}).selectOption('Heritage');
 await expect(page.locator('#archive-empty')).toBeVisible();
 await page.getByRole('button',{name:'Clear filters'}).click();
 await page.locator('[data-record]:visible [data-open-photo]').first().click();
 await expect(page.locator('#photo-dialog')).toBeVisible();await page.keyboard.press('Escape');
 await expect(page.locator('#photo-dialog')).toBeHidden();
});
test('archive responsive evidence and automated accessibility',async({page})=>{
 for(const width of [320,390,768,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/archive/');await page.evaluate(()=>document.fonts.ready);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.locator('[data-record]:visible img').evaluateAll(async images=>{await Promise.all(images.map(async img=>{(img as HTMLImageElement).loading='eager';await (img as HTMLImageElement).decode();}));});
  await page.screenshot({path:`screenshots/expansion/archive-${width}.png`,fullPage:true});
 }
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations).toEqual([]);
});
