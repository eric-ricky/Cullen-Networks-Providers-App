import Head from 'next/head';
import MainLayout from '../../components/layouts/main';
import AuthRouteGuard from '../../components/route-guard/authenticated';
import Hero from '../../components/sections/notifications/hero';
import NotificationsComponent from '../../components/sections/notifications/notifications';
import { NextPageWithLayout } from '../page';

const Notifications: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Notifications</title>
      </Head>

      <Hero />
      <NotificationsComponent />
    </>
  );
};

export default Notifications;

Notifications.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
