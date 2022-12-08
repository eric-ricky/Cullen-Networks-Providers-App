import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';

interface IFaq {}

const Faq: React.FC<IFaq> = () => {
  return (
    <section>
      <div className="container mx-auto px-12 md:px-0 py-20 pb-32 z-50">
        <div className="text-center mb-10 flex flex-col space-y-4 items-center justify-center">
          <h2 className="headingsm md:headingmd">
            Frequently asked questions?
          </h2>
        </div>

        <div className="w-full md:px-4 px-2">
          <div className="mx-auto w-full max-w-[600px] md:max-w-xl rounded-2xl p-2">
            {[1, 2, 3, 4].map((n) => (
              <Disclosure as="div" className="mt-4" key={n}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-50 px-4 py-4 text-left text-sm font-medium text-blue-900 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>What is your refund policy?</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-blue-500`}
                      />
                    </Disclosure.Button>

                    <Transition
                      enter="transition duration-500 ease-in-out"
                      enterFrom="transform opacity-0"
                      enterTo="transform opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform opacity-100"
                      leaveTo="transform opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        If you're unhappy with your purchase for any reason,
                        email us within 90 days and we'll refund you in full, no
                        questions asked.
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
