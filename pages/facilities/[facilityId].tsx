import { ArrowLeftIcon } from '@heroicons/react/outline';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import { FacilitiesData } from '../../lib/dummy-data';
import { NextPageWithLayout } from '../page';

const SingleFacility: NextPageWithLayout = () => {
  const router = useRouter();
  const facilityData = FacilitiesData[0];

  return (
    <>
      <Head>
        <title>New Request {router.query.facilityId}</title>
      </Head>

      <section>
        <div className="container mx-auto py-8 px-4">
          <div
            onClick={() => router.back()}
            className="flex space-x-4 cursor-pointer mb-4"
          >
            <ArrowLeftIcon className="text-green-500 h-6" />
            <span>Back</span>
          </div>

          <div className="bg-white rounded-md p-4 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="relative h-56 md:h-96 w-full md:w-1/3 rounded-md overflow-hidden">
              <Image
                src={`${facilityData.featuredPhoto}`}
                alt="facility"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>

            <div className="w-full md:w-2/3 flex-grow">
              {/* <NewRequestForm facilityId={facilityId ? facilityId : ''} /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleFacility;

SingleFacility.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
