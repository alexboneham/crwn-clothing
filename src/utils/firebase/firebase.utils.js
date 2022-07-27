import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB9so17rtDogys8cDX3MruXt-5irrBZhVA',
  authDomain: 'crwn-clothing-db-eede9.firebaseapp.com',
  projectId: 'crwn-clothing-db-eede9',
  storageBucket: 'crwn-clothing-db-eede9.appspot.com',
  messagingSenderId: '537610942835',
  appId: '1:537610942835:web:5b02472914f48745a4ad06',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    // create / set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
        })
    } catch (error) {
        console.log('error creating the user', error.message);
    }

    return userDocRef;
  }
};

