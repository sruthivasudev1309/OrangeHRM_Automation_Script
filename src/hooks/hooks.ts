import { BeforeAll, AfterAll, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import path from 'path';

setDefaultTimeout(60 * 1000);
let browser: Browser;
let context: BrowserContext;
export let page: Page;
BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext({
    recordVideo: {
      dir: path.join(process.cwd(), 'reports', 'videos'),
      size: { width: 1280, height: 720 }
    }
  });
  page = await context.newPage();
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });
});
After(async function ({ result, pickle }) {
  if (result?.status === 'FAILED') {
    const screenshot = await page.screenshot();
    this.attach(screenshot, 'image/png');
  }
});
AfterAll(async () => {
  await context.tracing.stop({
    path: path.join(process.cwd(), 'reports', 'trace.zip')
  });

  await page.close();
  await context.close();
  await browser.close();
});
