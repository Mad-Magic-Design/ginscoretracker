// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgmnQt0ALt4hRvziIlZ9tNv3fYtcPlhWE",
    authDomain: "gin-score-tracker.firebaseapp.com",
    projectId: "gin-score-tracker",
    storageBucket: "gin-score-tracker.appspot.com",
    messagingSenderId: "154612986985",
    appId: "1:154612986985:web:6ea5d5796fc480b5eb9ef8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        const oneName = 'Player One';
        const twoName = 'Player Two';
        const totalScores = [0, 0];
        const totalWins = [0, 0];
        const currentGame = [0, 0];

        try {
            await setDoc(userDocRef,
                {
                    displayName,
                    email,
                    createdAt,
                    oneName,
                    twoName,
                    totalScores,
                    totalWins,
                    currentGame,
                });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const getUserDoc = async (userAuth) => {
    const docRef = doc(db, 'users', userAuth.uid);
    const docSnap = await getDoc(docRef);
    /* if (docSnap.exists()) {
         console.log("Document data:", docSnap.data());
     } else {
         // doc.data() will be undefined in this case
         console.log("No such document!");
     }*/

    return docSnap.data();
}

export const getUserDocRef = async (userAuth) => {
    const docRef = doc(db, 'users', userAuth.uid);
    return docRef;
}




export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)