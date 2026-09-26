import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"
import fs from "fs"

if (!fs.existsSync(".env.test")) {
  throw new Error(".env.test is missing: e2e tests require a separate test database")
}
dotenv.config({ path: ".env.test" })

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.CI ? {} : { channel: "chrome" }),
      },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    env: { NODE_ENV: "development" },
  },
})
