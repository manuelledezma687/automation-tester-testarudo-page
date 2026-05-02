import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });


export default defineConfig({
  testDir: './tests',

  reporter: 'html',

  use: {
    baseURL: 'https://staging.testertestarudo.com/es',
    video: "on",
    screenshot: "only-on-failure",
    viewport: { width: 1200, height: 720},
    trace: 'on-first-retry',
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
