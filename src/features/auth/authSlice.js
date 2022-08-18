import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    authenticated: true,
    currentUser: {},
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
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
