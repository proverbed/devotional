import { auth } from 'firebase-functions/v2';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../admin';

export const onUserCreated = auth.user().onCreate(async (user) => {
  await db.doc(`users/${user.uid}`).set({
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
});
