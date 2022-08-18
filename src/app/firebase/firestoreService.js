import { db } from './config';
import { getDocs, collection } from 'firebase/firestore';

export async function getBoardsFromFirestore() {
    const boardsCollectionRef = collection(db, 'boards');
    const data = await getDocs(boardsCollectionRef);
    return data;
}
