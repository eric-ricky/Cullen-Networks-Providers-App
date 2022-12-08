import { useRouter } from 'next/router';
import { useState } from 'react';
import { auth, getFirebaseClient } from '../../../lib/firebase/config';
import { IAlert, IUser } from '../../../types';
import GoogleIcon from '../../ui/icons/google';

interface IGoogleAuthComponent {
  signup?: boolean;
}

const GoogleAuthComponent: React.FC<IGoogleAuthComponent> = ({ signup }) => {
  const [alert, setAlert] = useState<IAlert | undefined>(undefined);
  const router = useRouter();

  const handleAuth = async () => {
    console.log('authenticating with google...');
    setAlert(undefined);

    try {
      const firebaseClient = await getFirebaseClient();
      const { provider, signInWithPopup, db, getDoc, doc } = firebaseClient;

      const result = await signInWithPopup(auth, provider);
      const docRef = doc(db, 'users', result.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        const payload: IUser = {
          uid: result.user.uid,
          displayName: `${result.user.displayName}`,
          email: result.user.email,
          photoURL: `${result.user.photoURL}`,
          phone: '',
          location: '',
          createdAt: result.user.metadata.creationTime,
        };

        const authHelpers = await import(
          '../../../lib/helpers/auth/create-user'
        );

        authHelpers.createUser(docRef, payload);
      }

      console.log('authenticated sucessfully!!');

      setAlert({
        message: 'Signed in succesfully!',
        severity: 'success',
      });

      if (router.pathname.includes('/auth'))
        return router.push(
          `${router.query.returnTo ? router.query.returnTo : '/'}`
        );
    } catch (error: { code: string } | any) {
      console.log(error);
      const message = 'Something went wrong';
      setAlert({
        message,
        severity: 'error',
      });
      setTimeout(() => {
        setAlert(undefined);
      }, 4000);
    }
  };

  return (
    <>
      {alert && (
        <p
          className={`text-center my-4 ${
            alert.severity === 'error' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {alert.message}
        </p>
      )}

      <div
        onClick={async () => await handleAuth()}
        className="flex items-center space-x-2 bg-white justify-center py-4 rounded-lg border-2 border-slate-100 hover:bg-slate-50 cursor-pointer shadow-md"
      >
        <GoogleIcon />
        <p className="body pl-2">Sign {signup ? 'up' : 'in'} with Google</p>
      </div>
    </>
  );
};

export default GoogleAuthComponent;
