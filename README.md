# ron.hng.tw

This is the source code of my [personal site].

## Development

Use Zola **0.22.1**, matching the deployment workflow.

```sh
zola build
```

### Browser regression checks

With Node.js and Zola 0.22.1 on your PATH:

```sh
npm ci
npx playwright install chromium firefox
npm test
```

The tests start Zola on port 4173 and check delayed image/font loading at desktop,
tablet, and mobile widths in Chromium and Firefox, both color schemes, the footer
license link, theme persistence, article navigation, search, and code block
formatting/copying. Analytics requests are blocked during these checks. Node.js is
only needed for testing, not deployment.

### Site-specific styling

`sass/skins/ron.scss` imports tabi's Indigo Ingot skin and keeps the site's rendering
and accessibility fixes separate from the vendored styles.
Inter uses `font-display: optional`: slow first visits retain the fallback font to
avoid shifting text, while the downloaded font can be used on subsequent visits.
The theme's header font subset and its serif/code fonts are unchanged.

### Syntax highlighting

`[markdown.highlighting]` uses Giallo's built-in Catppuccin Latte (light) and
Catppuccin Frappe (dark) palettes with class-based output, keeping the strict CSP.
The site skin supplies only the required line layout.

Zola generates the ignored `static/giallo-light.css` and `static/giallo-dark.css`
automatically; do not edit them. After changing the highlighting themes or
upgrading Zola, delete these files before rebuilding because Zola does not
overwrite existing copies.

`templates/tabi/extend_head.html` links the generated CSS only when the page or
section content contains rendered Giallo code blocks. `static/js/syntaxTheme.js`
selects the palette from `html[data-theme]` and observes changes made by tabi's
theme switcher, including saved preferences, reset, and automatic OS changes.
It runs in the head to select the saved palette before the body renders. Without
JavaScript, the links' media queries follow the OS color scheme.

The homepage and articles without code request neither the syntax CSS nor the
selection script. CSS links use normal URLs rather than file hashes because
Zola 0.22 generates the files after rendering HTML; this keeps clean builds
working without committing generated palettes.

The vendored theme has one compatibility patch: `themes/tabi/sass/main.scss` no
longer imports `parts/_syntax_theme.scss`. Keep that legacy palette disabled when
updating tabi so its more-specific selectors cannot override Giallo's colors.

## License

[![Creative Commons License][ccimg]][cc]

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc].

[personal site]: https://ron.hng.tw/
[cc]: https://creativecommons.org/licenses/by-sa/4.0/
[ccimg]: https://i.creativecommons.org/l/by-sa/4.0/88x31.png
