import React from 'react';
import { howItWorksSteps } from './data';

interface IHowItWorks {}

const HowItWorks: React.FC<IHowItWorks> = () => {
  return (
    <section>
      <div className="container mx-auto px-12 md:px-0 pb-20 z-[200]">
        <div className="text-center mb-14 flex flex-col space-y-4 items-center justify-center">
          <h2 className="headingsm md:headingmd">How it works</h2>
          <p className="md:w-1/4 mx-auto">
            Your trusted partner for improving food storage
          </p>
        </div>

        <div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:gap-10 z-50">
            {howItWorksSteps?.map((step, i) => (
              <div
                key={i}
                className="flex flex-col space-y-4 min-h-[280px] md:w-[400px] w-[280px] p-10 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer bg-white dark:bg-slate-400"
              >
                <div className="flex items-center space-x-4">
                  {step.icon}
                  <h5 className="headingxs">{step.title}</h5>
                </div>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

{
  /* <div className="absolute md:top-[5%] top-[55%] -left-40 -z-10 opacity-90">
<div className="relative h-[32rem] w-96">
  <Image
    src="/images/bg-ice-2.png"
    layout="fill"
    objectFit="cover"
    alt="ice"
  />
</div>
</div> */
}
