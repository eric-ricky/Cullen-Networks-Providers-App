import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import { RequestData } from '../../lib/dummy-data';
import { NextPageWithLayout } from '../page';

const SingleRequest: NextPageWithLayout = () => {
  const router = useRouter();
  const requestId = router.query.requestId;
  const data = RequestData[0];

  return (
    <>
      <Head>
        <title>Single Request - {requestId}</title>
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

          <div className="flex flex-col space-y-8 bg-slate-100 rounded-sm p-4">
            <div className="relative w-full h-96 rounded-md">
              <div className="absolute bottom-0 left-0 z-50 h-2 w-full text-white rounded-b-md bg-teal-400"></div>

              <Image
                src={data.facilityInfo.featuredPhoto}
                alt="facility"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="headingxs">{data.itemInfo.itemName}</p>

                <p>
                  {data.itemInfo.quantity} {data.itemInfo.unit}{' '}
                  <span>,{data.itemInfo.tempratureRange}</span>
                </p>

                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>

              <button className="py-2 px-6 bg-teal-500 rounded-md text-white flex items-center space-x-2">
                <TrashIcon className="h-6" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleRequest;

SingleRequest.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
