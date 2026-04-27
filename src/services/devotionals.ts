import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Devotional, DevotionalInput } from '../types/devotional';

const COLLECTION = 'devotionals';

export const saveDevotional = async (
  data: DevotionalInput,
  userEmail: string,
): Promise<string> => {
  const ref = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdBy: userEmail,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

export const deleteDevotional = (id: string): Promise<void> =>
  deleteDoc(doc(db, COLLECTION, id));

export const subscribeToDevotionals = (
  onData: (devotionals: Devotional[]) => void,
): Unsubscribe => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => {
      const raw = d.data();
      return {
        id: d.id,
        theme: raw.theme as string,
        subject: raw.subject as string,
        scripture: raw.scripture as string,
        scripture_ref: raw.scripture_ref as string,
        reflection: raw.reflection as string,
        prayer: raw.prayer as string,
        declaration: raw.declaration as string,
        createdBy: raw.createdBy as string,
        createdAt:
          raw.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      } satisfies Devotional;
    });
    onData(items);
  });
};
