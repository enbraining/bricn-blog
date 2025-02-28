'use client';

import { IconMenu } from '@tabler/icons-react';
import { useState } from 'react';
import HoverLink from '../basic/HoverLink';
import Link from 'next/link';

export default function Header() {
  const [isToggle, setToggle] = useState(false);

  return (
    <header className="print:hidden sticky top-0 py-4 z-10 flex items-center w-full bg-white">
      <Link
        className="sm:block hidden font-bold text-lg hover:text-bricn-300 duration-300 text-bricn-100 tracking-[0.7em]"
        href={'/'}
      >
        BRICN
      </Link>
      <div className="sm:ml-auto sm:w-min w-full ml-0 flex text-bricn-200 items-center gap-x-6">
        <HoverLink href={'/'}>홈</HoverLink>
        <HoverLink href={'/profile'}>프로필</HoverLink>
        <HoverLink href={'/portfolio'}>포트폴리오</HoverLink>
        <div onClick={() => setToggle(!isToggle)} className="ml-auto">
          <IconMenu size={24} strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}
