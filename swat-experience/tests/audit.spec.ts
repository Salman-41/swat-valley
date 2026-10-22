import {test,expect} from '@playwright/test';
test('Lenis wheel position and ScrollTrigger progress stay synchronized',async({page})=>{
 await page.goto('/places/kalam/');await expect(page.locator('html')).toHaveAttribute('data-motion-ready','true');
 await page.mouse.wheel(0,1100);await page.waitForTimeout(900);
 const values=await page.evaluate(()=>{const main=document.querySelector('main')!;const progress=document.querySelector('.reading-current')!;const top=main.getBoundingClientRect().top+scrollY;const expected=Math.max(0,Math.min(1,(scrollY-top)/(main.getBoundingClientRect().height-innerHeight)));return {actual:new DOMMatrix(getComputedStyle(progress).transform).a,expected,scroll:scrollY};});
 expect(values.scroll).toBeGreaterThan(500);expect(Math.abs(values.actual-values.expected)).toBeLessThan(.03);
 await page.getByRole('button',{name:'Index',exact:true}).click();const locked=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,500);await page.waitForTimeout(400);expect(Math.abs((await page.evaluate(()=>scrollY))-locked)).toBeLessThan(2);
 for(let i=0;i<8;i++)await page.keyboard.press('Tab');expect(await page.evaluate(()=>!!document.activeElement?.closest('#site-index'))).toBeTruthy();await page.keyboard.press('Escape');
});
test('touch controls connect map to story and photo inspection',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});const page=await context.newPage();await page.goto('http://127.0.0.1:4391/atlas/?place=bahrain');await page.locator('.map-story-jump').tap();await expect(page).toHaveURL(/#atlas-story$/);await expect(page.locator('#atlas-name')).toHaveText('Bahrain');await page.locator('#atlas-link').tap();await page.locator('[data-open-photo]').first().tap();await expect(page.locator('#photo-dialog')).toBeVisible();await page.getByRole('button',{name:'Next photograph',exact:true}).tap();await expect(page.locator('#detail-caption')).toContainText('Umairkhanaks');await page.getByRole('button',{name:'Close ×',exact:true}).tap();await expect(page.locator('#photo-dialog')).toBeHidden();await context.close();
});
