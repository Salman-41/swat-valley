import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const routes = [
  "/",
  "/atlas/",
  "/heritage/",
  "/culture/",
  "/environment/",
  "/sources/",
  "/places/mahodand/",
  "/places/kalam/",
  "/places/bahrain/",
  "/places/madyan/",
  "/places/mingora/",
  "/places/barikot/",
  "/places/malam-jabba/",
  "/404.html",
];
const widths = [320, 390, 768, 1024, 1440, 1920];
for (const width of widths) {
  test(`all pages render and fit at ${width}px`, async ({ page }) => {
    test.setTimeout(180000);
    await mkdir("screenshots/production", { recursive: true });
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute("data-motion-ready", "true");
      await expect(page.locator("html")).toHaveAttribute("data-intro", "settled");
      await expect(page.locator("main h1")).toBeVisible();
      if (route === "/atlas/")
        await expect(page.locator("#atlas")).toHaveClass(/map-ready/, {
          timeout: 20000,
        });
      await page.evaluate(async () => {
        for (const img of Array.from(
          document.querySelectorAll<HTMLImageElement>("main img"),
        )) {
          img.loading = "eager";
          await img.decode().catch(() => {});
        }
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `overflow ${route} at ${width}`,
      ).toBeTruthy();
      const failed = await page
        .locator("main img")
        .evaluateAll((images) =>
          images
            .filter((image) => !(image as HTMLImageElement).naturalWidth)
            .map((image) => image.getAttribute("src")),
        );
      expect(failed, route).toEqual([]);
      const filename =
        route === "/"
          ? "home"
          : route
              .replace(/^\/+|\/+$/g, "")
              .replaceAll("/", "-")
              .replace(".html", "");
      await page.screenshot({
        path: `screenshots/production/${filename}-${width}.png`,
        fullPage: true,
      });
    }
    expect(errors).toEqual([]);
  });
}
test("atlas lenses preserve location, deep links and browser history", async ({
  page,
}) => {
  await page.goto("/atlas/?place=bahrain&lens=language");
  await expect(page.locator("#atlas")).toHaveClass(/map-ready/);
  await expect(page.locator("#atlas-name")).toHaveText("Bahrain");
  await expect(page.locator("#atlas-text")).toContainText("Torwali");
  await page.getByRole("button", { name: "memory", exact: true }).click();
  await expect(page.locator("#atlas-name")).toHaveText("Bahrain");
  await expect(page.locator("#atlas-text")).toContainText("Manjoora");
  await page
    .getByRole("button", { name: "Explore Kalam", exact: true })
    .click();
  await expect(page.locator("#atlas-name")).toHaveText("Kalam");
  await expect(page).toHaveURL(/place=kalam&lens=memory/);
  await page.goBack();
  await expect(page.locator("#atlas-name")).toHaveText("Bahrain");
  await page.locator("#place-select").selectOption("malam-jabba");
  await page.locator("#atlas-link").click();
  await expect(page.locator("main h1")).toHaveText("Malam Jabba");
});
test("menu, photo detail and archaeological layers work by keyboard", async ({
  page,
}) => {
  await page.goto("/heritage/");
  await page.getByRole("button", { name: "Index" }).click();
  await expect(page.locator("#site-index")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-index")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Index" })).toBeFocused();
  await page.locator("[data-open-photo]").first().click();
  await expect(page.locator("#photo-dialog")).toBeVisible();
  await expect(page.locator("#detail-image")).toHaveJSProperty(
    "complete",
    true,
  );
  await page.keyboard.press("Escape");
  await expect(page.locator("#photo-dialog")).not.toBeVisible();
  await page.getByText("Building, adapting, reusing", { exact: true }).click();
  await expect(page.locator("details").nth(1)).toHaveAttribute("open", "");
});
test("language tabs and catchment controls expose correct states", async ({
  page,
}) => {
  await page.goto("/culture/");
  await page.getByRole("tab", { name: "Torwali", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Gawri", exact: true }),
  ).toBeFocused();
  await expect(page.locator("#gawri")).toBeVisible();
  await expect(page.locator("#torwali")).toBeHidden();
  await page.goto("/environment/");
  await page.getByRole("button", { name: "Settlement", exact: true }).click();
  await expect(page.locator(".diagram-panel")).toContainText(
    "Where people build",
  );
  await expect(
    page.getByRole("button", { name: "Settlement", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("map failure has a usable retry and accurate fallback", async ({
  page,
}) => {
  await page.route("**/data/tiles/**", (route) => route.abort());
  await page.goto("/atlas/");
  await expect(page.locator("#retry-map")).toBeVisible({ timeout: 22000 });
  await expect(page.locator("#coordinate-fallback")).toBeVisible();
  await page.locator("#place-select").selectOption("barikot");
  await expect(page.locator("#atlas-link")).toHaveAttribute(
    "href",
    "/places/barikot/",
  );
  await page.unroute("**/data/tiles/**");
  await page.locator("#retry-map").click();
  await expect(page.locator("#atlas")).toHaveClass(/map-ready/);
});
test("reading and place journeys remain available without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4387/culture/");
  await expect(page.locator("#gawri")).toBeVisible();
  await page.goto("http://127.0.0.1:4387/atlas/");
  await expect(page.locator("#coordinate-fallback")).toBeVisible();
  await page
    .locator("main")
    .getByRole("link", { name: "Kalam ↗", exact: true })
    .click();
  await expect(page.locator("main h1")).toHaveText("Kalam");
  await context.close();
});
test("reduced motion and missing route are usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const response = await page.goto("/a-missing-path/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("main h1")).toHaveText("Lost the thread?");
});

test('photograph inspection zooms, pans and changes the credited image', async ({page})=>{
 await page.goto('/places/mahodand/');await page.locator('[data-open-photo]').first().click();
 await expect(page.locator('#photo-dialog')).toBeVisible();
 await page.locator('#photo-zoom').fill('200');await page.locator('#photo-zoom').dispatchEvent('input');
 await expect(page.locator('#photo-scale')).toHaveText('200%');
 expect(await page.locator('.photo-viewport').evaluate(el=>el.scrollWidth>el.clientWidth)).toBeTruthy();
 await page.getByRole('button',{name:'Next photograph',exact:true}).click();
 await expect(page.locator('#detail-caption')).toContainText('Abeermajid1996');await expect(page.locator('#photo-scale')).toHaveText('100%');
 await page.keyboard.press('Escape');await expect(page.locator('[data-open-photo]').first()).toBeFocused();
});
