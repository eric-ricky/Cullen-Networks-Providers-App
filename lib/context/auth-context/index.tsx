import { signOut } from 'firebase/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, getFirebaseClient } from '../../firebase/config';
import {
  getUserLocal,
  setUserLocal,
  unsetUserLocal,
} from '../../helpers/auth/cookies';

interface IUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  location: string;
  createdAt: string;
  phone: string;
}

interface IAuthContext {
  user: IUser;
  logout: () => void;
}

const initialValues: IUser = {
  uid: '',
  displayName: '',
  email: '',
  photoURL: '',
  location: '',
  createdAt: '',
  phone: '',
};

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthContextProvider {
  children: ReactNode;
  uid: string | undefined;
}

const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
  uid,
}) => {
  const [user, setUser] = useState<IUser>(initialValues);

  useEffect(() => {
    if (!uid) return setUser(initialValues);

    // setting user from local
    const userLocal = getUserLocal();
    if (userLocal?.uid === uid) {
      console.log('fetching user from local');

      setUser(userLocal);
      return;
    }

    // setting user from firebase
    const fetchUser = async () => {
      console.log('fetching user from firestore');
      try {
        const firebaseClient = await getFirebaseClient();
        const { db, doc, getDoc } = firebaseClient;
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return;

        const payload = {
          uid: docSnap.data().uid,
          displayName: docSnap.data().displayName,
          email: docSnap.data().email,
          photoURL: docSnap.data().photoURL,
          location: docSnap.data().location,
          createdAt: docSnap.data().createdAt,
          phone: docSnap.data().phone,
        };

        setUser(payload);

        // set user to local
        if (typeof window === 'undefined')
          throw new Error('Window is undefined');
        setUserLocal(payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [uid]);

  const logout = async () => {
    try {
      await signOut(auth);
      unsetUserLocal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
