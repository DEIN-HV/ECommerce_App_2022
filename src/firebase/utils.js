import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

const firebase = initializeApp(firebaseConfig);

export const auth = auth();
export const firestore = firestore();

// export const handleUserProfile = async ({ userAuth, additionalData }) => {
//     if (!userAuth) return;

//     const { uid } = userAuth;

//     const userRef = firestore.doc(`user/${uid}`);
//     const snapshot = await userRef.get();

//     if (!snapshot.exists) {
//         const { displayName, email } = userAuth;
//         const timestamp = new Date;
//         const userRoles = ["user"];

//         try {
//             await userRef.set({
//                 displayName,
//                 email,
//                 createDate: timestamp,
//                 userRoles,
//                 ...additionalData
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     return userRef;

// }