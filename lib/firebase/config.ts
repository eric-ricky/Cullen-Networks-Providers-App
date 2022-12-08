import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { auth };

export const getFirebaseClient = async () => {
  const firebaseAuth = await import('firebase/auth');
  const firebaseStorage = await import('firebase/storage');
  const firebaseFirestore = await import('firebase/firestore');

  const db = firebaseFirestore.getFirestore(app);
  const storage = firebaseStorage.getStorage(app);
  const provider = new firebaseAuth.GoogleAuthProvider();
  const onAuthStateChanged = firebaseAuth.onAuthStateChanged;
  const signInWithPopup = firebaseAuth.signInWithPopup;
  const signOut = firebaseAuth.signOut;
  const doc = firebaseFirestore.doc;
  const collection = firebaseFirestore.collection;
  const query = firebaseFirestore.query;
  const where = firebaseFirestore.where;
  const getDoc = firebaseFirestore.getDoc;
  const getDocs = firebaseFirestore.getDocs;
  const setDoc = firebaseFirestore.setDoc;
  const addDoc = firebaseFirestore.addDoc;
  const updateDoc = firebaseFirestore.updateDoc;
  const getDownloadURL = firebaseStorage.getDownloadURL;
  const ref = firebaseStorage.ref;
  const uploadBytesResumable = firebaseStorage.uploadBytesResumable;
  const deleteObject = firebaseStorage.deleteObject;

  return {
    db,
    provider,
    storage,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    doc,
    collection,
    query,
    where,
    getDoc,
    getDocs,
    setDoc,
    addDoc,
    updateDoc,
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject,
  };

  // const db = getFirestore(app);
  // const auth = getAuth(app);
  // const provider = new GoogleAuthProvider();
  // const storage = getStorage(app);
};

// const initFirebase = async () => {
//   const firebase = await import('firebase/app');

//   await Promise.all([
//     import('firebase/storage'),
//     import('firebase/auth'),
//     import('firebase/firestore'),
//   ]);

//   const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDERID,
//     appId: process.env.NEXT_PUBLIC_APP_ID,
//   };

//   firebase.initializeApp(firebaseConfig);

//   if (global.firebase) {
//     return global.firebase;
//   }

//   if (!firebase) {
//     return Promise.reject(new Error('loading error'));
//   }

//   global.firebase = firebase;

//   const db = getFirestore(app);
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();
//   const storage = getStorage(app);

//   return { db, auth, provider, storage };

//   // const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//   // googleAuthProvider.addScope('https://www.googleapis.com/auth/userinfo.email');

//   // global.firebase.googleAuthProvider = googleAuthProvider;

//   // return global.firebase ? global.firebase : firebase;
// };
