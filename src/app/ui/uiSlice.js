import { createSlice } from '@reduxjs/toolkit';
import { getInitialColorMode } from './getInitialColorMode';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        dialog: {},
        menu: {},
        theme: {
            colorMode: getInitialColorMode(),
        },
        sidebar: {
            open: true,
        },
    },
    reducers: {
        openDialog: (state, action) => {
            const { dialogType, dialogProps } = action.payload;
            state.dialog = { dialogType, dialogProps };
        },
        closeDialog: state => {
            state.dialog = {};
        },
        openMenu: (state, action) => {
            const { menuType, variant, portalId } = action.payload;
            state.menu = { menuType, variant, portalId };
        },
        closeMenu: state => {
            state.menu = {};
        },
        setColorMode: (state, action) => {
            state.theme.colorMode = action.payload;
            window.localStorage.setItem('color-mode', action.payload);
        },
        toggleSidebarOpen: (state, action) => {
            state.sidebar.open = action.payload;
            state.sidebar.open
                ? document.documentElement.style.setProperty(
                      '--width-sidebar',
                      '300px'
                  )
                : document.documentElement.style.setProperty(
                      '--width-sidebar',
                      '0px'
                  );
        },
    },
});

export const {
    openDialog,
    closeDialog,
    openMenu,
    closeMenu,
    setColorMode,
    toggleSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
