import {test,expect} from '@playwright/test';
test('atlas filters agree across map, select, list and browser history',async({page})=>{
 await page.goto('/atlas/');await expect(page.locator('#atlas')).toHaveClass(/map-ready/);
 await page.locator('#atlas-kind').selectOption('town');await expect(page.locator('#atlas-results')).toHaveText('2 places');await expect(page.locator('[data-place-link]:visible')).toHaveCount(2);
 await expect(page.getByRole('button',{name:/^Explore /})).toHaveCount(2);await expect(page.locator('#atlas-name')).toHaveText('Bahrain');await page.getByRole('button',{name:'Next place',exact:true}).click();await expect(page.locator('#atlas-name')).toHaveText('Madyan');await page.reload();await expect(page.locator('#atlas-kind')).toHaveValue('town');await expect(page.locator('#atlas-name')).toHaveText('Madyan');
 await page.locator('#atlas-query').fill('Bahrain');await expect(page.locator('#atlas-results')).toHaveText('1 place');await expect(page.locator('#next-place')).toBeDisabled();
 await page.locator('#atlas-query').fill('no-such-place');await expect(page.locator('#atlas-empty')).toBeVisible();await expect(page.locator('#place-select')).toBeDisabled();
 await page.getByRole('button',{name:'Clear filters',exact:true}).click();await expect(page.locator('[data-place-link]:visible')).toHaveCount(7);
 await page.goBack();await expect(page.locator('#atlas-empty')).toBeVisible();
});
test('atlas search captures and fallback stay usable',async({page})=>{
 await page.route('**/data/tiles/**',route=>route.abort());await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [320,390,768,1024,1440,1920]){await page.setViewportSize({width,height:900});await page.goto('/atlas/?kind=archaeology');await expect(page.locator('#atlas-name')).toHaveText('Barikot');await expect(page.locator('[data-place-link]:visible')).toHaveCount(1);await page.evaluate(()=>document.fonts.ready);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBeTruthy();await page.screenshot({path:`screenshots/expansion/atlas-search-${width}.png`,fullPage:true});}
});
