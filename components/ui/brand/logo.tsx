import { CubeTransparentIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

interface ILogo {}

const Logo: React.FC<ILogo> = () => {
  return (
    <Link href="/">
      <a className="headingxs md:headingsm tracking-wider text-teal-300 flex items-center">
        <CubeTransparentIcon className="h-8 mr-2" />
        <span>Cullen</span>
        <span className="text-slate-50 pl-2">Networks</span>
      </a>
    </Link>
  );
};

export default Logo;
