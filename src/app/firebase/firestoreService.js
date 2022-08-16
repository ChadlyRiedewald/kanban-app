import { db } from './config';
import { getDocs, collection } from 'firebase/firestore';

export async function getBoardsFromFirestore() {
    const querySnapshot = await getDocs(collection(db, 'boards'));
    querySnapshot.forEach(doc => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
}
