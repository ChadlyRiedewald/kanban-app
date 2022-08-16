import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../ui';
import authReducer from '../../features/auth';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
    },
});
