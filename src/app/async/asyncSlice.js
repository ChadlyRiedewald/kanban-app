import { createSlice } from '@reduxjs/toolkit';

export const asyncSlice = createSlice({
    name: 'async',
    initialState: {
        loading: false,
        error: null,
    },
    reducers: {
        asyncActionStart: state => {
            state.loading = true;
            state.error = null;
        },
        asyncActionFinish: state => {
            state.loading = false;
        },
        asyncActionError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { asyncActionStart, asyncActionFinish, asyncActionError } =
    asyncSlice.actions;

export default asyncSlice.reducer;
