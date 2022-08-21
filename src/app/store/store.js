import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../ui';
import boardsReducer from '../../features/boards/boardsSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        boards: boardsReducer,
    },
});
