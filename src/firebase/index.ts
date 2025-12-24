import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './config';

function initializeFirebase(config: FirebaseOptions = {}) {
  const apps = getApps();
  const app = apps.length > 0 ? getApp() : initializeApp(config);
  return app;
}

// This is the easiest way to make sure that the app is only initialized once
// and you don't produce an error.
const firebaseApp = initializeFirebase(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { firebaseApp, auth, firestore, initializeFirebase };

export default firebaseApp;
