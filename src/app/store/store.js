import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../ui';
import authReducer from '../../features/auth';
import asyncReducer from '../async';
import boardsReducer from '../../features/boards';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        async: asyncReducer,
        board: boardsReducer,
    },
});
