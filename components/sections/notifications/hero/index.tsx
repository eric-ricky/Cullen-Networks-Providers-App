import { BellIcon } from '@heroicons/react/outline';

const Hero = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-24">
        <div className="flex items-center justify-between py-1">
          <h2 className="headingxs md:headingsm flex items-center space-x-2">
            <span>Notifications</span>
            <BellIcon className="h-6" />
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Hero;
