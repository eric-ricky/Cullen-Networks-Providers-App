import React from 'react';
interface IHeading {
  title: string;
}
const Heading: React.FC<IHeading> = ({ title }) => {
  return (
    <>
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex items-center justify-between py-1">
            <div className="headingxs md:headingsm flex items-center space-x-2">
              <span>{title}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Heading;
