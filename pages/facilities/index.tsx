import {
  FilterIcon,
  LocationMarkerIcon,
  OfficeBuildingIcon,
  XIcon,
} from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import Heading from '../../components/ui/heading';
import { FacilitiesData } from '../../lib/dummy-data';
import { NextPageWithLayout } from '../page';

const Facilities: NextPageWithLayout = () => {
  const facilitiesArray = FacilitiesData;
  const [showFilter, setShowFilter] = useState(false);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Facilities | New Request</title>
      </Head>

      <Heading title="Facilities" />

      <section>
        <div className="relative container mx-auto py-8 flex">
          {/* Filter */}
          <div
            className={`md:relative absolute top-0 left-0 z-50 w-full md:w-[20%] py-10 px-4 bg-slate-200 rounded-md ${
              showFilter ? '' : 'md:block hidden'
            }`}
          >
            <div
              onClick={() => setShowFilter(false)}
              className="text-md font-medium mb-4 flex items-center justify-between"
            >
              <span>Filter By</span>

              <div className="md:hidden flex items-center space-x-2 cursor-pointer ">
                <XIcon className="h-6 text-green-500" />
                <span>Close</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <LocationMarkerIcon className="h-4 text-green-500" />
                  <span className="text-md font-normal">Location</span>
                </div>

                <ul className="flex flex-col space-y-4 pl-8 mt-4">
                  {['Nairobi', 'Kisumu', 'Nakuru', 'Istanbul'].map(
                    (location, i) => (
                      <li key={i}> {location}</li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <OfficeBuildingIcon className="h-4 text-green-500" />
                  <span className="text-md font-normal">Warehouse</span>
                </div>

                <ul className="flex flex-col space-y-4 pl-8 mt-4">
                  {[
                    'ABC Holdings',
                    'Manguzel Coldhubs',
                    'KenChick Storage',
                    'Masive Cold House',
                    'ABC Holdings',
                    'Manguzel Coldhubs',
                    'KenChick Storage',
                    'Masive Cold House',
                  ].map((location, i) => (
                    <li key={i} className="cursor-pointer hover:text-green-500">
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2 px-8">
              <h2 className="headingxs md:headingsm">
                Cold storage facilities
              </h2>

              <div
                onClick={() => setShowFilter(true)}
                className="md:hidden flex items-center space-x-2 cursor-pointer "
              >
                <FilterIcon className="h-5 text-green-500" />
                <span className="text-sm">Filter By</span>
              </div>
            </div>

            {facilitiesArray.length && (
              <div className="grid grid-cols-12 md:gap-8 gap-4 py-4 px-6">
                {facilitiesArray.map((facility, i) => (
                  <div
                    key={i}
                    className="col-span-12 md:col-span-4 bg-slate-50 shadow-md rounded-md flex flex-col cursor-pointer"
                  >
                    <div className="relative h-44 w-full">
                      <Image
                        src={`${facility.featuredPhoto}`}
                        alt="facility"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-md"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-bold">
                        {facility.warehouseName}'s Facility
                      </p>
                      <p className="text-sm mt-2">
                        operated by {facility.operatorInfo.displayName}, located{' '}
                        {facility.location}
                      </p>
                      <div className="flex space-x-2 mt-4">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <StarIcon
                            key={n}
                            className={`h-4 ${
                              [1, 2, 3].includes(n)
                                ? 'text-yellow-500'
                                : 'text-gray-500'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          router.push(`/user/new-request/${facility.id}`)
                        }
                        className="bg-green-500 text-gray-50 shadow-md shadow-green-2/50 flex items-center space-x-2 py-1 px-4 hover:bg-green-400 rounded-sm cursor-pointer mt-4 hover:shadow-lg"
                      >
                        Rent space
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Facilities;

Facilities.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
