// src/firebase/provider.tsx
'use client';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { initializeFirebase } from './config';

export type FirebaseContextValue = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

export const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const firebaseValue = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseContext.Provider value={firebaseValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
