import { createSlice } from '@reduxjs/toolkit';

//=====================
// INITIAL STATE
const initialState = {
    loading: false,
    error: null,
};

//=====================
// SLICE
export const asyncSlice = createSlice({
    name: 'async',
    initialState,
    reducers: {
        actionStart: state => {
            state.loading = true;
            state.error = null;
        },
        actionFinish: state => {
            state.loading = false;
        },
        actionError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

//=====================
// ACTIONS / EXPORTS
export const { actionStart, actionFinish, actionError } = asyncSlice.actions;

export default asyncSlice.reducer;
