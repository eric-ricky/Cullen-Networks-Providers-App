import Image from 'next/image';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative min-h-[55vh] md:min-h-[50vh] shadow-md">
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(39,55,90,0.8)] z-50 grid place-items-center">
        <div className="flex flex-col items-center justify-center px-5 md:px-2 py-4">
          <h1 className="headingsm lg:headingmd lg:w-[52%] w-full mx-auto text-center text-white">
            Post Harvest Storage{' '}
            <span className="text-teal-400">Re-emagined. </span>
          </h1>
          <p className="hidden md:inline-block text-slate-200 lg:w-[45%] mt-4 text-center ">
            <span className="font-bold underline">Cullen</span> is an online
            platform that connects farmers, retailers and households with a vast
            network of storage providers in the region to help them maintain the
            quality of their food and increase its shelf-life 3 to 4 times.
          </p>

          <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={() => router.push('/new-request')}
              className="bg-teal-500 py-2 px-5 rounded-sm text-white hover:opacity-70"
            >
              Rent Storage Space
            </button>

            <button
              onClick={() => router.push('/rented-space')}
              className="border-2 border-teal-500 hover:bg-teal-500 py-2 px-5 rounded-sm text-white"
            >
              Manage Storage Space
            </button>
          </div>
        </div>
      </div>

      <Image
        src="/images/store-2.jpg"
        alt="hero grocery"
        layout="fill"
        objectFit="cover"
        priority
      />
    </section>
  );
};

export default Hero;
