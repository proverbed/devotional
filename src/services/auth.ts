import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithEmail = (email: string, password: string): Promise<UserCredential> =>
  signInWithEmailAndPassword(auth, email, password);

export const signUpWithEmail = (email: string, password: string): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = (): Promise<UserCredential> =>
  signInWithPopup(auth, googleProvider);

export const signOut = (): Promise<void> => firebaseSignOut(auth);
