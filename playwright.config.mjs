import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 2,
  use: {
    baseURL: 'http://127.0.0.1:4173',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
  webServer: {
    command: 'zola serve --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
});
