import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const useAuthStateHook = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const init = async () => {
    //   setLoading(true);

    //   const res = await getFirebaseClient();
    //   console.log('res', res?.auth);
    // if (!res) return;

    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsub();
    };
    // };

    // init();
  }, []);

  return { currentUser, loading };
};

export default useAuthStateHook;
