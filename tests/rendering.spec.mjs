import { expect, test } from '@playwright/test';

const origin = 'http://127.0.0.1:4173';

// Local checks must neither contact analytics nor depend on third-party services.
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    if (new URL(route.request().url()).origin === origin) {
      return route.continue();
    }
    return route.abort();
  });
});

async function settlePaint(page) {
  await page.evaluate(() => new Promise(resolve => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
}

async function geometry(page) {
  return page.evaluate(() => ({
    introductionWidth: document.querySelector('#home-banner-text').getBoundingClientRect().width,
    postsTop: document.querySelector('#posts-list').getBoundingClientRect().top,
    overflow: document.documentElement.scrollWidth > innerWidth,
  }));
}

for (const viewport of [
  { width: 1350, height: 940 },
  { width: 800, height: 900 },
  { width: 390, height: 844 },
]) {
  for (const colorScheme of ['light', 'dark']) {
    test(`${viewport.width}px ${colorScheme}: delayed portrait and Inter do not move content`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.emulateMedia({ colorScheme });

      let releasePortrait;
      let releaseFont;
      const portraitGate = new Promise(resolve => { releasePortrait = resolve; });
      const fontGate = new Promise(resolve => { releaseFont = resolve; });
      await page.route('**/img/author.png', async route => {
        await portraitGate;
        await route.continue();
      });
      await page.route('**/fonts/Inter4.woff2', async route => {
        await fontGate;
        await route.continue();
      });

      try {
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        // Let the font's short optional/block period expire before releasing it.
        await page.waitForTimeout(200);
        await settlePaint(page);
        const before = await geometry(page);

        releasePortrait();
        await page.locator('#banner-home-img').evaluate(image => image.decode());
        await settlePaint(page);
        const afterPortrait = await geometry(page);
        expect(afterPortrait.introductionWidth).toBeCloseTo(before.introductionWidth, 1);
        expect(afterPortrait.postsTop).toBeCloseTo(before.postsTop, 1);

        releaseFont();
        await page.evaluate(() => document.fonts.ready);
        await settlePaint(page);
        const afterFont = await geometry(page);
        expect(afterFont.postsTop).toBeCloseTo(afterPortrait.postsTop, 1);
        expect(afterFont.overflow).toBe(false);

        const interFaces = await page.evaluate(() => [...document.fonts]
          .filter(face => ['Inter', 'Inter Optional'].includes(face.family.replaceAll(/["']/g, '')))
          .map(face => ({ display: face.display, status: face.status })));
        expect(interFaces.at(-1).display).toBe('optional');
        expect(interFaces.filter(face => face.status === 'loaded')
          .every(face => face.display === 'optional')).toBe(true);

        const licenseLink = page.locator('footer p a[href="https://creativecommons.org/licenses/by-sa/4.0/"]');
        await expect(licenseLink).toHaveCSS('text-decoration-line', 'underline');
        const expectedColor = colorScheme === 'light' ? 'rgb(20, 96, 189)' : 'rgb(230, 194, 18)';
        await expect(licenseLink).toHaveCSS('color', expectedColor);
      } finally {
        releasePortrait();
        releaseFont();
      }
    });
  }
}

test('theme switching persists and the article and search remain usable', async ({ page }) => {
  const failedAssets = [];
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      failedAssets.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.locator('.theme-switcher').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.getByRole('link', { name: 'My Gaming PC Setup (2021 Build)', exact: true }).click();
  await expect(page.locator('article')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('footer p a').first()).toHaveCSS('text-decoration-line', 'underline');

  await page.locator('#search-button').click();
  const search = page.locator('#searchInput');
  await expect(search).toBeVisible();
  await search.fill('Gaming');
  await expect(page.locator('#results').getByRole('link', { name: /My Gaming PC Setup/ })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(search).not.toBeVisible();
  expect(failedAssets).toEqual([]);
});
