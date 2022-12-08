import Head from 'next/head';
import MainLayout from '../../../components/layouts/main';
import AuthRouteGuard from '../../../components/route-guard/authenticated';
import Heading from '../../../components/ui/heading';
import { NextPageWithLayout } from '../../page';

const Settings: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <Heading title="Settings" />
    </>
  );
};

export default Settings;

Settings.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
