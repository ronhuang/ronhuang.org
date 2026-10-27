import { expect, test } from '@playwright/test';

const origin = 'http://127.0.0.1:4173';
const syntaxPalettes = {
  light: {
    background: 'rgb(239, 241, 245)',
    foreground: 'rgb(76, 79, 105)',
    parameter: 'rgb(254, 100, 11)',
  },
  dark: {
    background: 'rgb(48, 52, 70)',
    foreground: 'rgb(198, 208, 245)',
    parameter: 'rgb(239, 159, 118)',
  },
};

async function expectSyntaxPalette(page, theme) {
  const block = page.locator('pre.giallo').first();
  await expect(block).toHaveCSS('background-color', syntaxPalettes[theme].background);
  await expect(block).toHaveCSS('color', syntaxPalettes[theme].foreground);
}

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

for (const colorScheme of ['light', 'dark']) {
  test(`${colorScheme}: Giallo code blocks preserve diagrams, theme colors, and copying`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: async text => { window.copiedCode = text; } },
      });
    });
    await page.goto('/2010/10/16/the-sorrows-of-young-hooman/');
    const blocks = page.locator('pre.giallo.z-code');
    await expect(blocks).toHaveCount(4);
    const firstBlock = blocks.first();
    await expect(firstBlock.locator('.giallo-l')).toHaveCount(7);
    await expect(firstBlock.locator('.giallo-l').first()).toHaveCSS('display', 'inline-block');
    await expectSyntaxPalette(page, colorScheme);
    await expect(firstBlock.locator('code')).toHaveAttribute('data-lang', 'plain');
    const drawing = [
      '         ----------------',
      String.raw`                         \----`,
      String.raw`         ------------- C2     \-`,
      "M1                C2' )         )      F1",
      "         -------------    C1' /-",
      '                         /----',
      '         ----------------     C1',
    ].join('\n');
    expect(await firstBlock.locator('code').textContent()).toBe(drawing);
    await firstBlock.locator('.copy-code').click();
    await expect.poll(() => page.evaluate(() => window.copiedCode)).toBe(drawing);

    // Use Zola's palette without relaxing CSP or depending on the old scope colors.
    await expect(page.locator('link[data-syntax-theme]')).toHaveCount(2);
    const parameter = await firstBlock.locator('code').evaluateHandle(code => {
      const token = document.createElement('span');
      token.className = 'z-variable z-parameter z-function';
      token.textContent = 'parameter';
      code.append(token);
      return token;
    });
    // Tabi's legacy three-class selector otherwise overrides Giallo's parameter color.
    expect(await parameter.evaluate(token => getComputedStyle(token).color))
      .toBe(syntaxPalettes[colorScheme].parameter);
    await parameter.evaluate(token => token.remove());
    await expect(page.locator('pre [style]')).toHaveCount(0);
    const csp = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute('content');
    expect(csp).not.toContain('unsafe-inline');

    await page.goto('/2011/05/08/introducing-calennar/');
    await expect(page.locator('pre.giallo')).toHaveCount(3);
    const calendarBlock = page.locator('pre.giallo').first();
    await calendarBlock.locator('.copy-code').click();
    await expect.poll(() => page.evaluate(() => window.copiedCode))
      .toBe('http://inmate.ronhuang.org/calennar/nuscs.ics');
  });
}

test('only pages with rendered code request syntax stylesheets and selection script', async ({ page }) => {
  const syntaxRequests = [];
  page.on('request', request => {
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/giallo') || path === '/js/syntaxTheme.js') {
      syntaxRequests.push(path);
    }
  });

  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(page.locator('link[data-syntax-theme]')).toHaveCount(0);
  await page.goto('/post/my-gaming-pc-setup/');
  await expect(page.locator('link[data-syntax-theme]')).toHaveCount(0);
  expect(syntaxRequests).toEqual([]);

  const mainStylesheet = await page.request.get('/main.css');
  expect(mainStylesheet.ok()).toBe(true);
  expect(await mainStylesheet.text()).not.toContain('.z-keyword');

  await page.goto('/2011/05/08/introducing-calennar/');
  await expect(page.locator('link[data-syntax-theme]')).toHaveCount(2);
  await expectSyntaxPalette(page, 'light');
  expect(syntaxRequests).toContain('/giallo-light.css');
  expect(syntaxRequests).toContain('/js/syntaxTheme.js');
  expect(syntaxRequests).not.toContain('/giallo.css');
});

for (const theme of ['light', 'dark']) {
  test(`saved ${theme} syntax palette overrides the OS and follows toggles and reset`, async ({ page }) => {
    const systemTheme = theme === 'light' ? 'dark' : 'light';
    await page.emulateMedia({ colorScheme: systemTheme });
    await page.goto('/');
    await page.evaluate(theme => localStorage.setItem('theme', theme), theme);
    await page.goto('/2011/05/08/introducing-calennar/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expectSyntaxPalette(page, theme);
    await expect(page.locator(`#giallo-${theme}`)).toHaveAttribute('media', 'all');
    await expect(page.locator(`#giallo-${systemTheme}`)).toHaveAttribute('media', 'not all');

    await page.reload();
    await expectSyntaxPalette(page, theme);
    await page.locator('.theme-switcher').click();
    await expectSyntaxPalette(page, systemTheme);
    await page.locator('.theme-switcher').click();
    await expectSyntaxPalette(page, theme);

    await page.locator('.theme-resetter').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', systemTheme);
    await expectSyntaxPalette(page, systemTheme);
    expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
  });
}

test('syntax colors follow live OS preference changes in automatic mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/2011/05/08/introducing-calennar/');
  await expectSyntaxPalette(page, 'light');
  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expectSyntaxPalette(page, 'dark');
  await page.emulateMedia({ colorScheme: 'light' });
  await expectSyntaxPalette(page, 'light');
});

test.describe('syntax palettes without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const colorScheme of ['light', 'dark']) {
    test(`uses the ${colorScheme} system preference`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto('/2011/05/08/introducing-calennar/');
      await expectSyntaxPalette(page, colorScheme);
    });
  }
});
