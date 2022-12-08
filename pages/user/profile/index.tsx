import MainLayout from '../../../components/layouts/main';
import AuthRouteGuard from '../../../components/route-guard/authenticated';
import { NextPageWithLayout } from '../../page';

const UserProfile: NextPageWithLayout = () => {
  return <div>UserProfile</div>;
};

export default UserProfile;

UserProfile.getLayout = (page) => (
  <MainLayout>
    <AuthRouteGuard>{page}</AuthRouteGuard>
  </MainLayout>
);
