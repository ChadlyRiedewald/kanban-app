import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        currentUser: null,
    },
    reducers: {
        signInUser: state => {
            state.authenticated = true;
        },
        signOutUser: state => {
            state.authenticated = false;
        },
    },
});

export const { signInUser, signOutUser } = authSlice.actions;

export default authSlice.reducer;
