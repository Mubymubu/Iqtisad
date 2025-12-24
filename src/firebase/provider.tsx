// src/firebase/provider.tsx
'use client';
import {
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import type { FirebaseApp } from 'firebase/app';

export const FirebaseContext = createContext<
  | {
      firebaseApp: FirebaseApp;
    }
  | undefined
>(undefined);

export function FirebaseProvider({
  children,
  firebaseApp,
}: {
  children: ReactNode;
  firebaseApp: FirebaseApp;
}) {
  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp,
      }}
    >
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
