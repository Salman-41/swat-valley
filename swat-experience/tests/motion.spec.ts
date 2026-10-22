import { test, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
test("motion state, preference changes and keyboard anchors remain stable", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.locator("[data-motion-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await page.locator("[data-motion-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(await page.locator("html").getAttribute("class")).not.toContain(
    "lenis",
  );
  await page.goto("/heritage/");
  await page.getByRole("link", { name: "Read the layers" }).click();
  await expect(page).toHaveURL(/#layers$/);
  expect(
    await page
      .locator("#layers")
      .evaluate((el) => el.getBoundingClientRect().top),
  ).toBeLessThan(100);
});
test("capture motion states and measured desktop performance", async ({
  page,
}) => {
  test.setTimeout(90000);
  await mkdir("screenshots/motion", { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => {
    const metrics = {
      cls: 0,
      longTasks: [] as number[],
      events: [] as number[],
      lcp: 0,
    };
    (window as any).__swatMetrics = metrics;
    new PerformanceObserver((list) =>
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) metrics.cls += entry.value;
      }),
    ).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) =>
      list
        .getEntries()
        .forEach((entry) => metrics.longTasks.push(entry.duration)),
    ).observe({ type: "longtask", buffered: true });
    new PerformanceObserver((list) =>
      list.getEntries().forEach((entry) => metrics.events.push(entry.duration)),
    ).observe({ type: "event", buffered: true, durationThreshold: 16 } as any);
    new PerformanceObserver((list) =>
      list.getEntries().forEach((entry) => (metrics.lcp = entry.startTime)),
    ).observe({ type: "largest-contentful-paint", buffered: true });
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion-ready", "true");
  await page.waitForTimeout(200);
  await page.screenshot({ path: "screenshots/motion/home-arrival-1440.png" });
  await expect(page.locator("html")).toHaveAttribute("data-intro", "settled");
  await page.screenshot({ path: "screenshots/motion/home-settled-1440.png" });
  const frames = await page.evaluate(async () => {
    const durations: number[] = [];
    let previous = performance.now();
    return new Promise<number[]>((resolve) => {
      let count = 0;
      function frame(now: number) {
        durations.push(now - previous);
        previous = now;
        if (count++ < 120) {
          window.scrollBy(0, 15);
          requestAnimationFrame(frame);
        } else resolve(durations);
      }
      requestAnimationFrame(frame);
    });
  });
  await page.screenshot({ path: "screenshots/motion/home-current-1440.png" });
  await page.getByRole("button", { name: "Index", exact: true }).click();
  await page.waitForTimeout(350);
  await page.screenshot({ path: "screenshots/motion/index-open-1440.png" });
  await page.keyboard.press("Escape");
  const metrics = await page.evaluate(() => ({
    ...(window as any).__swatMetrics,
    heap: (performance as any).memory?.usedJSHeapSize ?? null,
      quality: document.documentElement.dataset.motionQuality,
    resources: performance
      .getEntriesByType("resource")
      .map((r: any) => ({
        name: new URL(r.name).pathname,
        bytes: r.transferSize,
        duration: r.duration,
      })),
  }));
  const sorted = frames.slice(5).sort((a, b) => a - b);
  const report = {
    environment:
      "Headless Brave on local Linux; software GPU, warm local server. Lab observations, not field INP or physical-device FPS.",
    viewport: "1440x900",
    frameSamples: sorted.length,
    medianFrameMs: sorted[Math.floor(sorted.length * 0.5)],
    p95FrameMs: sorted[Math.floor(sorted.length * 0.95)],
    framesOver33ms: sorted.filter((n) => n > 33).length,
    first40AverageMs: frames.slice(5,45).reduce((a,b)=>a+b,0)/40,
    last40AverageMs: frames.slice(-40).reduce((a,b)=>a+b,0)/40,
    ...metrics,
  };
  await writeFile(
    "docs/production/motion-performance.json",
    JSON.stringify(report, null, 2),
  );
  expect(metrics.cls).toBeLessThan(0.1);
  await page.goto("/atlas/?place=kalam");
  await expect(page.locator("#atlas")).toHaveClass(/map-ready/, {
    timeout: 25000,
  });
  await page
    .getByRole("button", { name: "Follow selected place", exact: true })
    .click();
  await page.locator("#place-select").selectOption("bahrain");
  await page.waitForTimeout(250);
  await page.screenshot({
    path: "screenshots/motion/atlas-in-transit-1440.png",
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "screenshots/motion/atlas-bahrain-1440.png" });
  await expect(page.locator("#atlas-name")).toHaveText("Bahrain");
  await page.goto("/culture/");
  await page.getByRole("tab", { name: "Gawri", exact: true }).click();
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "screenshots/motion/culture-gawri-1440.png",
    fullPage: true,
  });
});
test("touch alternative stays native with no horizontal overflow", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4387/");
  await expect(page.locator("html")).toHaveAttribute("data-motion-ready", "true");
  await expect(page.locator("html")).toHaveAttribute("data-intro", "settled");
  await page.evaluate(async()=>{for(const img of Array.from(document.querySelectorAll<HTMLImageElement>("main img"))){img.loading="eager";await img.decode().catch(()=>{});}});
  expect(await page.locator("html").getAttribute("class")).not.toContain(
    "lenis",
  );
  await page.screenshot({
    path: "screenshots/motion/home-touch-390.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
  await context.close();
});
