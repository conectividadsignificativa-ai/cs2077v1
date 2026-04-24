import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '@/firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export interface GameSession {
  playerName: string;
  role: string;
  decision: string;
  skills: string[];
  values: string[];
  archetype: string;
}

export async function saveGameSession(session: GameSession) {
  try {
    const docRef = await addDoc(collection(db, 'sessions'), {
      ...session,
      timestamp: serverTimestamp(),
    });
    console.log('Session saved with ID: ', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error saving session: ', e);
    throw e;
  }
}
