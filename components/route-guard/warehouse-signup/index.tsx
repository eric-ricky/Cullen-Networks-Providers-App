import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getFirebaseClient } from '../../../lib/firebase/config';

export interface IWarehouseSignupGuard {
  children: ReactNode;
}

const WarehouseSignupGuard: React.FC<IWarehouseSignupGuard> = ({
  children,
}) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [user, loading] = useAuthState(auth);

  const hideContent = () => setAuthorized(false);

  useEffect(() => {
    if (loading) return;

    const isUserAdmin = async () => {
      if (!user?.uid) return false;
      // dynamically importing firbase needed
      const firebaseClient = await getFirebaseClient();
      const { db, doc, getDoc } = firebaseClient;

      const warehouseDocRef = doc(db, 'warehouses', user.uid);
      const docSnap = await getDoc(warehouseDocRef);
      return docSnap.exists();
    };

    const checkAuth = async (url: string) => {
      const privatePaths = ['/warehouse/sign-up'];
      const path = url.split('?')[0];

      // check if is not authenticated
      if (!user?.uid && privatePaths.some((pth) => path.includes(pth))) {
        console.log('Not authenticated');
        setAuthorized(false);
        router.push({
          pathname: '/auth/signin',
          query: { returnTo: router.asPath },
        });
        return;
      }

      // check if is user admin
      const isAdmin = await isUserAdmin();
      console.log(isAdmin);
      if (isAdmin && privatePaths.some((pth) => path.includes(pth))) {
        console.log('Already an admin of a warehouse');
        setAuthorized(false);
        router.push('/warehouse/dashboard/');
        return;
      }

      setAuthorized(true);
    };

    checkAuth(router.asPath);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', checkAuth);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', checkAuth);
    };
  }, [user?.uid, router.asPath, router.events, router, loading]);

  return (
    <>
      {authorized ? (
        children
      ) : (
        <div className="w-full h-screen grid place-items-center bg-slate-50">
          <div className="flex items-center justify-center ">
            <div className="w-16 h-16 border-b-4 border-gray-500 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default WarehouseSignupGuard;
