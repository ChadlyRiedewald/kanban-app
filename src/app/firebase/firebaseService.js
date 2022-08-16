import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';

export async function signUpUser(email, password) {
    try {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
    } catch (e) {
        console.error(e.message);
    }
}
