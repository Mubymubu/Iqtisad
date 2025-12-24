
'use client';
import { useEffect, useState } from 'react';
import { onSnapshot, type DocumentReference } from 'firebase/firestore';

export function useDoc<T>(ref: DocumentReference | null) {
    const [data, setData] = useState<T | null>(null);

    useEffect(() => {
        if (!ref) {
            setData(null);
            return;
        }
        const unsubscribe = onSnapshot(ref, (doc) => {
            setData(doc.exists() ? doc.data() as T : null);
        });
        return () => unsubscribe();
    }, [ref]);

    return { data };
}
