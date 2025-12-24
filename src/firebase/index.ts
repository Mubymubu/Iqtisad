// src/firebase/index.ts
import { type FirebaseApp } from 'firebase/app';
import { type Firestore } from 'firebase/firestore';
import { type Auth } from 'firebase/auth';

import { useUser } from './auth/use-user';
import { useDoc } from './firestore/use-doc';
import { FirebaseProvider, useFirebase } from './provider';
import { FirebaseClientProvider } from './client-provider';
import { initializeFirebase } from './config';

function useFirebaseApp(): FirebaseApp {
  return useFirebase().firebaseApp;
}

function useFirestore(): Firestore {
  return useFirebase().firestore;
}

function useAuth(): Auth {
  return useFirebase().auth;
}

export {
  FirebaseProvider,
  FirebaseClientProvider,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
  initializeFirebase,
};
