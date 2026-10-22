import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  expect: { timeout: 12000 },
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4391",
    headless: true,
    launchOptions: {
      executablePath: process.env.SWAT_BROWSER || "/opt/brave.com/brave/brave",
      args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "node scripts/serve.mjs --port 4391",
    url: "http://127.0.0.1:4391",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
