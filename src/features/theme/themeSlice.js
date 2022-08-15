import { createSlice } from '@reduxjs/toolkit';
import { getInitialColorMode } from './getInitialColorMode';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        colorMode: getInitialColorMode(),
    },
    reducers: {
        setColorMode: (state, action) => {
            state.colorMode = action.payload;
            window.localStorage.setItem('color-mode', action.payload);
        },
    },
});

export const { setColorMode } = themeSlice.actions;

export default themeSlice.reducer;
