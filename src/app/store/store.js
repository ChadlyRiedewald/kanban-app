import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../../features/theme';
import sidebarReducer from '../../features/nav';

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        sidebar: sidebarReducer,
    },
});
