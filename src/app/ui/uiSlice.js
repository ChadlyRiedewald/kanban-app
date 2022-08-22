import { createSlice } from '@reduxjs/toolkit';
import { getInitialColorMode, getInitialSidebar } from '../util';

const isVisible = getInitialSidebar();

const initialState = {
    dialog: {},
    menu: {},
    theme: {
        colorMode: getInitialColorMode(),
    },
    sidebar: {
        open: isVisible === 'visible',
    },
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        openDialog: (state, action) => {
            const { dialogType, dialogProps } = action.payload;
            state.dialog = { dialogType, dialogProps };
        },
        closeDialog: state => {
            state.dialog = {};
        },
        openMenu: (state, action) => {
            const { menuType, menuProps } = action.payload;
            state.menu = { menuType, menuProps };
        },
        closeMenu: state => {
            state.menu = {};
        },
        openSidebar: state => {
            state.sidebar.open = true;
        },
        closeSidebar: state => {
            state.sidebar.open = false;
        },
        setLightTheme: state => {
            state.theme.colorMode = 'light';
        },
        setDarkTheme: state => {
            state.theme.colorMode = 'dark';
        },
    },
});

export const {
    openDialog,
    closeDialog,
    openMenu,
    closeMenu,
    openSidebar,
    closeSidebar,
    setLightTheme,
    setDarkTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
