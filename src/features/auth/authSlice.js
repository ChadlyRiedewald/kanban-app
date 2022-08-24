import { createSlice } from '@reduxjs/toolkit';
import { setListener } from '../../app/firebase';

//=====================
// SLICE
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        authenticated: false,
        user: null,
        initialized: false,
    },
    reducers: {
        setUser: (state, { payload }) => {
            state.authenticated = true;
            state.initialized = true;
            state.user = {
                uid: payload.uid,
                email: payload.email,
            };
        },
        resetUser: state => {
            state.authenticated = false;
            state.initialized = true;
            state.user = {};
        },
    },
    extraReducers: {
        // AUTH LISTENER
        [setListener.pending]: state => {
            state.loading = true;
        },
        [setListener.fulfilled]: state => {
            state.loading = false;
        },
        [setListener.rejected]: state => {
            state.loading = false;
        },
    },
});

//=====================
// ACTIONS / EXPORTS
export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
