import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updatePassword,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './config';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { delay } from '../util';
import { setUser, resetUser } from '../../features/auth';
import { addUserToFirestore } from './firestoreService';

//=====================
// FIREBASE FUNCTIONS

// Sign In
export function signInFirebase(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Sign Up
export async function signUpFirebase(email, password) {
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return await addUserToFirestore(result.user);
    } catch (error) {
        throw error;
    }
}

// Sign Out
export function signOutFirebase() {
    return auth.signOut();
}

// Update Password
export function updatePasswordFirebase(newPassword) {
    const user = auth.currentUser;
    return updatePassword(user, newPassword);
}

// Reset Password
export function resetPasswordFirebase(email) {
    return sendPasswordResetEmail(auth, email);
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
                    setUser({
                        uid: user.uid,
                        email: user.email,
                    })
                );
            } else {
                dispatch(resetUser());
            }
        });
    }
);
