(() => {
    const root = document.documentElement;
    const stylesheets = document.querySelectorAll('link[data-syntax-theme]');

    function syncSyntaxTheme() {
        const selectedTheme = root.getAttribute('data-theme');
        const hasSelectedTheme = selectedTheme === 'light' || selectedTheme === 'dark';

        for (const stylesheet of stylesheets) {
            const theme = stylesheet.dataset.syntaxTheme;
            stylesheet.media = hasSelectedTheme
                ? (theme === selectedTheme ? 'all' : 'not all')
                : `(prefers-color-scheme: ${theme})`;
        }
    }

    // Tabi initializes data-theme before this head script runs. Observe that same
    // attribute so toggles, resets, and automatic OS changes all stay in sync.
    syncSyntaxTheme();
    new MutationObserver(syncSyntaxTheme).observe(root, {
        attributes: true,
        attributeFilter: ['data-theme'],
    });
})();
