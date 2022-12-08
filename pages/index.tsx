import dynamic from 'next/dynamic';
import Head from 'next/head';
import MainLayout from '../components/layouts/main';
import Benefits from '../components/sections/home/benefits';
import Hero from '../components/sections/home/hero';

const HowItWorks = dynamic(
  () => import('../components/sections/home/how-it-works')
);

import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>

      <Hero />
      <Benefits />
      <HowItWorks />
    </>
  );
};

export default Home;

Home.getLayout = (page) => <MainLayout>{page}</MainLayout>;
