import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '../../../components/layouts/main';
import AuthRouteGuard from '../../../components/route-guard/authenticated';
import { NextPageWithLayout } from '../../page';

const GoogleAuthComponent = dynamic(
  () => import('../../../components/sections/auth/google')
);

const Signin: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>

      <section>
        <div className="container mx-auto h-[90vh] grid place-items-center">
          <div className="flex flex-col lg:flex-row lg:items-center h-[27rem] w-[92%] lg:w-[70%] rounded-lg shadow-lg">
            <div className="relative h-full w-1/2 hidden lg:flex">
              <Image
                src="/images/store-1.jpg"
                layout="fill"
                objectFit="cover"
                alt="cold storage"
                className="rounded-l-md"
              />
            </div>

            <div className="bg-white h-full w-full lg:w-1/2 flex flex-col justify-between p-6 lg:p-10">
              <div>
                <h2 className="headingsm">Welcome Back</h2>
                <p>to Cullen Networks</p>
              </div>

              <div className="flex flex-col space-y-4">
                <p className="headingxs ">Continue with:</p>
                <GoogleAuthComponent />
              </div>

              <div className="flex items-center">
                Don't have an account?{' '}
                <span
                  onClick={() => router.push('/auth/signup')}
                  className="headingxs pl-2 cursor-pointer hover:underline"
                >
                  Sign up
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;

Signin.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
