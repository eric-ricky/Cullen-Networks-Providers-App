import Image from 'next/image';
import React from 'react';
import PrimaryButton from '../../../ui/buttons/primary';

interface ICta {}

const Cta: React.FC<ICta> = () => {
  return (
    <section className="relative h-[50vh] w-full">
      <div className="absolute top-0 left-0 h-[50vh] w-full bg-[rgba(0,0,0,0.5)] z-20"></div>
      <Image
        src="/images/store-5.jpg"
        alt="food"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-[75%] md:w-[50%]">
        <h1 className="headingsm md:headingmd lg:w-[75%] w-full mx-auto text-center text-slate-100">
          Quality and convenience at the click of a button
        </h1>
        <p className="body text-slate-200 mx-auto w-full lg:w-[55%] mt-4 text-center">
          Your trusted partner for improving food storage
        </p>

        <div className="mt-8 w-full flex justify-center">
          <PrimaryButton
            label="Let's get you started!"
            onClick={() => console.log('first')}
          />
        </div>
      </div>
    </section>
  );
};

export default Cta;
