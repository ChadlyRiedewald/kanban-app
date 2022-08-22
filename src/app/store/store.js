import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../ui';
import authReducer from '../../features/auth';
import boardsReducer from '../../features/boards';

//=====================
// REDUX STORE CONFIG
export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        boards: boardsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
