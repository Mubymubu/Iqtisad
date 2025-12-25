
'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, type User } from 'firebase/auth';
import { useAuth, useFirestore } from '..';
import { doc, setDoc } from 'firebase/firestore';

export function useUser() {
  const auth = useAuth();
  const firestore = useFirestore();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth || !firestore) return;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Create user document if it doesn't exist
        const userRef = doc(firestore, 'users', currentUser.uid);
        setDoc(userRef, { id: currentUser.uid, tutorialCompleted: false }, { merge: true });

      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
        });
      }
    });

    return () => unsubscribe();
  }, [auth, firestore]);

  return { user, auth, firestore };
}
