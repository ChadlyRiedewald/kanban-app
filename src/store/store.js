import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../components/theme';
import sidebarReducer from '../components/nav';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        sidebar: sidebarReducer,
    },
});
