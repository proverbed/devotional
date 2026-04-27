import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  getDocs,
  onSnapshot,
  type DocumentData,
  type QueryConstraint,
  type WithFieldValue,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';

export const getDocument = async <T extends DocumentData>(path: string): Promise<T | null> => {
  const snap = await getDoc(doc(db, path));
  return snap.exists() ? (snap.data() as T) : null;
};

export const setDocument = <T extends DocumentData>(
  path: string,
  data: WithFieldValue<T>,
): Promise<void> => setDoc(doc(db, path), data);

export const updateDocument = (path: string, data: Partial<DocumentData>): Promise<void> =>
  updateDoc(doc(db, path), data);

export const deleteDocument = (path: string): Promise<void> => deleteDoc(doc(db, path));

export const queryCollection = async <T extends DocumentData>(
  collectionPath: string,
  ...constraints: QueryConstraint[]
): Promise<T[]> => {
  const q = query(collection(db, collectionPath), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as T));
};

export const subscribeToDocument = <T extends DocumentData>(
  path: string,
  onData: (data: T | null) => void,
): Unsubscribe =>
  onSnapshot(doc(db, path), (snap) => {
    onData(snap.exists() ? (snap.data() as T) : null);
  });

export const subscribeToCollection = <T extends DocumentData>(
  collectionPath: string,
  onData: (data: T[]) => void,
  ...constraints: QueryConstraint[]
): Unsubscribe => {
  const q = query(collection(db, collectionPath), ...constraints);
  return onSnapshot(q, (snap) => {
    onData(snap.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as T)));
  });
};
