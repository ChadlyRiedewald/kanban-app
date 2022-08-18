import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: '',
};

export const asyncSlice = createSlice({
    name: 'async',
    initialState,
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
