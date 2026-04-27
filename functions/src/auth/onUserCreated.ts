import * as functionsV1 from 'firebase-functions/v1';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../admin';

export const onUserCreated = functionsV1.auth.user().onCreate(async (user) => {
  await db.doc(`users/${user.uid}`).set({
    uid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
});
