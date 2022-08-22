//=====================
/* To get the initial sidebar state */
export function getInitialSidebar() {
    const persistedSidebarPreference = window.localStorage.getItem('sidebar');

    if (persistedSidebarPreference === 'visible') {
        document.documentElement.style.setProperty('--width-sidebar', '300px');
        return persistedSidebarPreference;
    } else if (persistedSidebarPreference === 'hidden') {
        document.documentElement.style.setProperty('--width-sidebar', '0px');
        return persistedSidebarPreference;
    } else {
        document.documentElement.style.setProperty('--width-sidebar', '300px');
        window.localStorage.setItem('sidebar', 'visible');
        return 'visible';
    }
}
//=====================
/* To get the initial theme preference */
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
