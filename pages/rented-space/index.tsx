import Head from 'next/head';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import Heading from '../../components/ui/heading';
import NothingFound from '../../components/ui/nothing-found';
import { NextPageWithLayout } from '../page';

const RentedSpace: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Rented Spaces</title>
      </Head>

      <Heading title="My rented spaces" />

      <section>
        <div className="container mx-auto py-2 md:py-8 px-4 md:px-24">
          <NothingFound
            title="No rented space yet"
            desc="When you rent your first storage space, it will appear here"
            btnText="Request Space"
            link="/new-request"
          />
        </div>
      </section>
    </>
  );
};

export default RentedSpace;

RentedSpace.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
