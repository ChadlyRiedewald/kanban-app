import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../ui';
import authReducer from '../../features/auth';
import dataReducer from '../data';
import asyncReducer from '../async';

//=====================
// REDUX STORE CONFIG
export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        async: asyncReducer,
        data: dataReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
