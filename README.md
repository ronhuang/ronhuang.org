# ron.hng.tw

This is the source code of my [personal site].

## Development

Use Zola **0.21.0**, matching the deployment workflow. Zola 0.22 changes the
Markdown configuration format and is not compatible with the current config.

```sh
zola build
```

### Browser regression checks

With Node.js and Zola 0.21.0 on your PATH:

```sh
npm ci
npx playwright install chromium firefox
npm test
```

The tests start Zola on port 4173 and check delayed image/font loading at desktop,
tablet, and mobile widths in Chromium and Firefox, both color schemes, the footer
license link, theme persistence, article navigation, and search. Analytics requests
are blocked during these checks. Node.js is only needed for testing, not deployment.

### Site-specific styling

`sass/skins/ron.scss` imports tabi's Indigo Ingot skin and adds the site's rendering
and accessibility fixes without modifying the theme or adding a stylesheet request.
Inter uses `font-display: optional`: slow first visits retain the fallback font to
avoid shifting text, while the downloaded font can be used on subsequent visits.
The theme's header font subset and its serif/code fonts are unchanged.

## License

[![Creative Commons License][ccimg]][cc]

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License][cc].

[personal site]: https://ron.hng.tw/
[cc]: https://creativecommons.org/licenses/by-sa/4.0/
[ccimg]: https://i.creativecommons.org/l/by-sa/4.0/88x31.png
