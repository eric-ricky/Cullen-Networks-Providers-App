import Image from 'next/image';
import React from 'react';
import { benefitsData } from './data';

interface IBenefits {}

const Benefits: React.FC<IBenefits> = () => {
  return (
    <section>
      <div className="container mx-auto px-12 md:px-0 py-20 md:py-24 z-50">
        <div className="text-center mb-14 flex flex-col space-y-4 items-center justify-center">
          <h2 className="headingsm md:headingmd text-center">
            Why Cullen Networks?
          </h2>
          <p className="md:w-1/4 mx-auto">The future of storage.</p>
        </div>

        <div className="flex flex-col md:flex-row  justify-between">
          <div className="flex-1 w-full">
            <div className="relative mx-auto md:w-[70%] w-[100%] h-48 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/spoiled-1.jpg"
                alt="hero grocery"
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1 px-2 py-14 md:px-0 md:py-0">
            <h5 className="headingsm">No food wastage</h5>
            <p className="body text-slate-600 lg:w-[70%] mt-4">
              <span className="font-bold text-teal-600">1.5 billion</span> tons
              of food is wasted every year, enough to feed all the hungry on the
              planet. You can be the change!
            </p>

            <div className="flex flex-col space-y-4 mt-6">
              {benefitsData.map((benefit, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-teal-400 rounded-md w-11 h-11">
                    {benefit.icon}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <p className="headingxs">{benefit.title}</p>
                    <p className="w-full md:w-[70%] text-gray-500 dark:text-gray-400">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* <div className="flex space-x-4">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
                  <ClipboardCheckIcon className="h-6 text-white" />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="headingxs">Increase product shelf-life.</p>
                  <p className="w-[70%] text-gray-500 dark:text-gray-400">
                    an online platform that connects farmers and retailers in
                    the region.
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
                  <DocumentSearchIcon className="h-6 text-white" />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="headingxs">View and manage your inventory.</p>
                  <p className="w-[70%] text-gray-500 dark:text-gray-400">
                    an online platform that connects farmers and retailers in
                    the region.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
