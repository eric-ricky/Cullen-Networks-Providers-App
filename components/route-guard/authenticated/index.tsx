import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../lib/firebase/config';

export interface IAuthRouteGuard {
  children: ReactNode;
}

const AuthRouteGuard: React.FC<IAuthRouteGuard> = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [user, loading] = useAuthState(auth);

  const hideContent = () => setAuthorized(false);

  useEffect(() => {
    if (loading) return;

    const checkAuth = (url: string) => {
      const privatePaths = [
        '/facilities',
        '/new-request',
        '/notifications',
        '/rented-space',
        '/requests',
        '/user',
      ];

      const path = url.split('?')[0];

      if (!user?.uid && privatePaths.some((pth) => path.includes(pth))) {
        console.log('Not authenticated');
        setAuthorized(false);
        router.push({
          pathname: '/auth/signin',
          query: { returnTo: router.asPath },
        });
        return;
      }

      if (!!user?.uid && path.includes('/auth')) {
        router.push(`${router.query.returnTo ? router.query.returnTo : '/'}`);
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

export default AuthRouteGuard;
