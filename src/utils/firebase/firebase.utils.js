import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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

// Set up providers
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize single auth instantiation
export const auth = getAuth();

// Sign in with Google
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Connect to database
export const db = getFirestore();

// Create User document in database
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

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
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }

    return userDocRef;
  }
};

// Create Auth user 
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}