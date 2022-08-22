import { createSlice } from '@reduxjs/toolkit';
import { setListener } from '../../app/firebase';

//=====================
// SLICE
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        authenticated: false,
        currentUser: null,
        initialized: false,
    },
    reducers: {
        signIn: (state, { payload }) => {
            state.authenticated = true;
            state.initialized = true;
            state.currentUser = {
                uid: payload.uid,
                email: payload.email,
            };
        },
        signOut: state => {
            state.authenticated = false;
            state.initialized = true;
            state.currentUser = {};
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
export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
