export function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('color-mode');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';

    if (hasPersistedPreference) {
        return persistedColorPreference;
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference && mql.matches) {
        window.localStorage.setItem('color-mode', 'dark');
        return 'dark';
    } else if (hasMediaQueryPreference && !mql.matches) {
        window.localStorage.setItem('color-mode', 'light');
        return 'light';
    }

    return 'light';
}
