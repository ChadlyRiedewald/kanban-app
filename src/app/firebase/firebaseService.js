import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '../util';
import { signIn, signOut } from '../../features/auth';

//=====================
// FIREBASE FUNCTIONS
export function signInWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signOutFirebase() {
    return auth.signOut();
}

//=====================
// ASYNC THUNKS
export const setListener = createAsyncThunk(
    'auth/setListener',
    async (_, { dispatch }) => {
        await delay(1000);
        return onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    signIn({
                        uid: user.uid,
                        email: user.email,
                    })
                );
            } else {
                dispatch(signOut());
            }
        });
    }
);
