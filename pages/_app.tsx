import { AppProps } from 'next/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import AuthContextProvider from '../lib/context/auth-context';
import DashboardNavContextProvider from '../lib/context/dashboard-ui';
import { auth } from '../lib/firebase/config';
import '../styles/global.css';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="h-screen grid place-items-center bg-white text-lg font-bold">
        <div className="flex items-center justify-center ">
          <div className="w-16 h-16 border-b-4 border-gray-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthContextProvider uid={user?.uid}>
        <DashboardNavContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </DashboardNavContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default MyApp;

// import { ThemeProvider } from 'next-themes';
// import type { AppProps } from 'next/app';
// import Script from 'next/script';

// import AuthContextProvider from '../lib/context/auth-context';
// import { auth } from '../lib/firebase/config';
// import './main.css';

// import { NextPageWithLayout } from './page';

// interface AppPropsWithLayout extends AppProps {
//   Component: NextPageWithLayout;
// }

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
//   // use the layout defined at the page level, if available
//   const getLayout = Component.getLayout || ((page) => page);

//   const [user, loading] = useAuthState(auth);

//   if (loading) {
//     return (
//       <div className="h-screen grid place-items-center bg-white text-lg font-bold">
//         <div className="flex items-center justify-center ">
//           <div className="w-16 h-16 border-b-4 border-gray-500 rounded-full animate-spin"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Script src="https://accounts.google.com/gsi/client" />

//       <ThemeProvider attribute="class">
//         <AuthContextProvider uid={user?.uid}>
//           {getLayout(<Component {...pageProps} />)}
//         </AuthContextProvider>
//       </ThemeProvider>
//     </>
//   );
// }

// export default MyApp;

// const auth = dynamic(()=> import('../lib/firebase/config').then(mod => mod.auth));
