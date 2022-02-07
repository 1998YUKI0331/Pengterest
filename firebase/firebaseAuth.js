import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_ID, APP_ID, MEASUREMENT_ID } from './key'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

initializeApp(firebaseConfig);
const firebaseAuth = getAuth();

const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(firebaseAuth, provider);
}

const signOutGoogle = () => {
    firebaseAuth.signOut();
}

export { firebaseAuth, signInGoogle, signOutGoogle };