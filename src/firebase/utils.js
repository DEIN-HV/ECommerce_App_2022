import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
}

export const handleUserProfile = async (userAuth, additionalData) => {
    console.log("userAuth", userAuth)

    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = doc(firestore, `users/${uid}`);
    console.log(userRef)
    const snapshot = await getDoc(userRef);
    console.log(snapshot)

    console.log(snapshot.exists)
    // if (!snapshot.exists) {

    const { displayName, email } = userAuth;
    const timestamp = new Date;
    const userRoles = ["user"];

    try {
        await setDoc(userRef, {
            displayName,
            email,
            createDate: timestamp,
            userRoles,
            ...additionalData
        })
    } catch (error) {
        console.log(error)
    }
    // }

    return userRef;

}