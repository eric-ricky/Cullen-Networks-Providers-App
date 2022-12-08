import { PlusIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import Heading from '../../components/ui/heading';
import NothingFound from '../../components/ui/nothing-found';
import Spinner from '../../components/ui/spinner';
import useFetchRequests from '../../lib/hooks/useFetchRequests';
import { NextPageWithLayout } from '../page';

const Requests: NextPageWithLayout = () => {
  const router = useRouter();
  const { requestsData, error, loading } = useFetchRequests();

  return (
    <>
      <Head>
        <title>Requests</title>
      </Head>

      <div className="flex items-center justify-between">
        <Heading title="Requests" />
        <div
          onClick={() => router.push('/new-request')}
          className="flex items-center space-x-2 cursor-pointer pr-4 md:pr-24 hover:text-teal-500"
        >
          <PlusIcon className="h-6" />
          <span className="hidden md:flex">New Request</span>
        </div>
      </div>

      <section>
        <div className="container mx-auto py-2 md:py-8 px-4 md:px-24">
          {loading && <Spinner />}

          {error && <div className="text-red-500">Something went wrong</div>}

          {!loading && !requestsData.length && (
            <NothingFound
              title="No active requests"
              desc="All your active request will appear here"
              btnText="Request Space"
              link="/new-request"
            />
          )}

          <div className="flex flex-col space-y-4">
            {!!requestsData.length &&
              requestsData.map((data) => (
                <div
                  key={data.requestId}
                  onClick={() => router.push(`/requests/${data.requestId}`)}
                  className="flex items-center space-x-4 bg-slate-100 hover:bg-slate-200 rounded-sm p-2 cursor-pointer"
                >
                  <div className="relative w-20 h-20 rounded-md">
                    <div className="absolute bottom-0 left-0 z-50 h-2 w-full text-white rounded-b-md bg-teal-400"></div>

                    <Image
                      src={data.facilityInfo.featuredPhoto}
                      alt="facility"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>

                  <div>
                    <p className="headingxs">{data.itemInfo.itemName}</p>

                    <p>
                      {data.itemInfo.quantity} {data.itemInfo.unit}{' '}
                      <span>,{data.itemInfo.tempratureRange}</span>
                    </p>

                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Requests;

Requests.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
