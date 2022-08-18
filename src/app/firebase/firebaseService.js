import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from './config';

export function signInWithEmail(creds) {
    return signInWithEmailAndPassword(auth, creds.email, creds.password);
}

export function signOutFirebase() {
    return signOut(auth);
}
