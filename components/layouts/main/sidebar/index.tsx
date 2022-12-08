import {
  BellIcon,
  CogIcon,
  HomeIcon,
  LogoutIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PlusCircleIcon,
  XIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../lib/context/auth-context';
import { useDashboardNavContext } from '../../../../lib/context/dashboard-ui';
import Logo from '../../../ui/brand/logo';

const MenuData = [
  {
    icon: <HomeIcon className="h-6 " />,
    title: 'Dashboard',
    link: '/',
  },
  {
    icon: <OfficeBuildingIcon className="h-6 " />,
    title: 'Rented Space',
    link: '/rented-space',
  },
  {
    icon: <NewspaperIcon className="h-6 " />,
    title: 'My Requests',
    link: '/requests',
  },
  {
    icon: <PlusCircleIcon className="h-6 " />,
    title: 'New Request',
    link: '/new-request',
  },
  {
    icon: <BellIcon className="h-6 " />,
    title: 'Notifications',
    link: '/notifications',
  },
  {
    icon: <CogIcon className="h-6 " />,
    title: 'Settings',
    link: '/user/settings',
  },
];

const SideBar = () => {
  const router = useRouter();
  const userCtx = useAuthContext();
  const dashboardNavCtx = useDashboardNavContext();

  return (
    <div
      className={`${
        dashboardNavCtx?.showNav ? 'col-span-10 flex' : 'lg:flex hidden'
      } lg:col-span-2 bg-slate-700 h-screen flex-col justify-between`}
    >
      <div className="py-10 w-full">
        <div className="flex items-center justify-between px-2 md:px-4">
          <Logo />

          <div
            onClick={() =>
              dashboardNavCtx && dashboardNavCtx.setShowNav((prev) => !prev)
            }
            className={`${
              dashboardNavCtx?.showNav ? 'flex' : 'hidden'
            } text-white cursor-pointer`}
          >
            <XIcon className="h-8" />
          </div>
        </div>

        {/* navigation */}
        <div className="flex flex-col space-y-4 w-full bg-slate-0 mt-8 overflow-x-hidden">
          {MenuData.map((data, i) => (
            <div
              key={i}
              onClick={() => {
                dashboardNavCtx?.setShowNav(false);
                router.push(data.link);
              }}
              className={`flex items-center space-x-4 py-2 px-4 hover:bg-slate-500 border-l-4 hover:border-teal-600 cursor-pointer text-white  ${
                router.asPath === data.link
                  ? 'bg-slate-600 border-teal-600 text-teal-400'
                  : 'text-white border-transparent'
              }`}
            >
              {data.icon}
              <p className="font-medium text-sm py-1 no-underline ">
                {data.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 md:py-10 w-full">
        {!userCtx?.user.uid ? (
          <div className="flex flex-col space-y-4 items-center px-8">
            <button
              onClick={() => router.push('/auth/signup')}
              className="px-6 py-2 w-full text-white bg-teal-600 rounded-md text-center"
            >
              Sign up
            </button>

            <span
              onClick={() => router.push('/auth/signin')}
              className="headingxs text-white cursor-pointer hover:underline"
            >
              or Signin
            </span>
          </div>
        ) : (
          <div className="flex flex-col px-4">
            <div className="flex items-center space-x-4">
              <Image
                src={userCtx.user.photoURL}
                alt={userCtx.user.displayName}
                height={55}
                width={55}
                className="rounded-full cursor-pointer"
              />

              <p className="headingxs text-white">
                {userCtx.user.displayName}{' '}
                <span className="body">{userCtx.user.email}</span>
              </p>
            </div>
            <div
              onClick={() => {
                userCtx?.logout();
              }}
              className="cursor-pointer flex items-center justify-start space-x-2 text-white mt-6 bg-teal-"
            >
              <LogoutIcon className="h-6" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
