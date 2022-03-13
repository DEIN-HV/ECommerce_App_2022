import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
}

export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if (!userAuth) return;

    const { uid } = userAuth;

    const userRef = firestore.doc(`user/${uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date;
        const userRoles = ["user"];

        try {
            await userRef.set({
                displayName,
                email,
                createDate: timestamp,
                userRoles,
                ...additionalData
            })
        } catch (error) {
            console.log(error)
        }
    }

    return userRef;

}