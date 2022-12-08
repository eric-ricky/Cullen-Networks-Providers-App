import Head from 'next/head';
import MainLayout from '../../components/layouts/main';
import { NextPageWithLayout } from '../page';

const ErrorPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>

      <div className="grid place-items-center h-[70vh] font-bold">
        404 | This page could not be found.
      </div>
    </>
  );
};

export default ErrorPage;

ErrorPage.getLayout = (page) => <MainLayout>{page}</MainLayout>;
