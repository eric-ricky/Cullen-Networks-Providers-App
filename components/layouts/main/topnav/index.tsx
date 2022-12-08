import { LoginIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../lib/context/auth-context';
import { useDashboardNavContext } from '../../../../lib/context/dashboard-ui';
import Logo from '../../../ui/brand/logo';

const TopNav = () => {
  const router = useRouter();
  const userCtx = useAuthContext();
  const dashboardNavCtx = useDashboardNavContext();

  return (
    <div className="p-4 w-full bg-white shadow-sm dark:bg-slate-500">
      <div className="container mx-auto flex items-center justify-between">
        <div className="md:flex-grow">
          {dashboardNavCtx?.showNav ? (
            <div className="logo md:hidden">
              <Logo />
            </div>
          ) : (
            <div
              className="lg:hidden cursor-pointer"
              onClick={() =>
                dashboardNavCtx && dashboardNavCtx?.setShowNav((prev) => !prev)
              }
            >
              <MenuAlt2Icon className="h-8" />
            </div>
          )}
        </div>

        <div className="flex space-x-4 ">
          {!userCtx?.user.uid ? (
            <div
              onClick={() => {
                router.push('/auth/signin');
              }}
              className="cursor-pointer flex items-center justify-start space-x-2"
            >
              <LoginIcon className="h-6" />
              <span>Sign in</span>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Image
                src={userCtx.user.photoURL}
                alt={userCtx.user.displayName}
                height={40}
                width={40}
                className="rounded-full cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
