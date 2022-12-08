import { ArrowLeftIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import NewRequestForm from '../../components/sections/new-request/new-request-form';

import { NextPageWithLayout } from '../page';

const NewRequest: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>New Request</title>
      </Head>

      <section>
        <div className="container mx-auto py-8 px-4 md:px-24">
          <div
            onClick={() => router.back()}
            className="flex space-x-4 cursor-pointer mb-8 headingxs w-fit"
          >
            <ArrowLeftIcon className="text-teal-500 h-6" />
            <span className="text-gray-500">Back</span>
          </div>

          <div className="w-full">
            <NewRequestForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default NewRequest;

NewRequest.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
