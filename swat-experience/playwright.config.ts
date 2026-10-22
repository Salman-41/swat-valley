import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 45000,
  expect: { timeout: 12000 },
  workers: 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4387",
    headless: true,
    launchOptions: {
      executablePath: process.env.SWAT_BROWSER || "/opt/brave.com/brave/brave",
      args: ["--no-sandbox", "--enable-unsafe-swiftshader"],
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run preview -- --port 4387",
    url: "http://127.0.0.1:4387",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
