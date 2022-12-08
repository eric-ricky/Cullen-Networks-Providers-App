import React from 'react';
import { useDashboardNavContext } from '../../../lib/context/dashboard-ui';
import SideBar from './sidebar';
import TopNav from './topnav';

export interface IMainLayout extends React.ComponentPropsWithoutRef<'div'> {}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  const dashboardNavCtx = useDashboardNavContext();

  return (
    <div className="grid grid-cols-12 overflow-x-hidden">
      <SideBar />

      <main
        className={`relative ${
          dashboardNavCtx?.showNav
            ? 'col-span-2 overflow-x-hidden w-[100vw]'
            : 'col-span-12 lg:col-span-10'
        }  bg-slate-50 h-screen overflow-y-scroll`}
      >
        <div
          onClick={() =>
            dashboardNavCtx && dashboardNavCtx.setShowNav((prev) => !prev)
          }
          className={`${
            dashboardNavCtx?.showNav ? 'flex' : 'hidden'
          } absolute top-0 left-0 w-full min-h-screen h-full bg-[rgba(0,0,0,0.7)] z-50`}
        >
          .hellod
        </div>
        <TopNav />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
