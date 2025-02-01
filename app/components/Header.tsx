'use client';

import { IconMenu } from '@tabler/icons-react';
import { useState } from 'react';
import HoverLink from './basic/HoverLink';
import Link from 'next/link';

export default function Header() {
  const [isToggle, setToggle] = useState(false);

  return (
    <header className="sticky top-0 pt-6 pb-24 z-10 flex items-center w-full bg-gradient-to-b from-black to-transparent">
      <Link
        className="sm:block hidden font-semibold hover:text-bricn-300 duration-300 text-bricn-100"
        href={'/'}
      >
        Bricn Tech Blog
      </Link>
      <div className="sm:ml-auto sm:w-min w-full ml-0 flex text-bricn-200 items-center gap-x-6">
        <HoverLink href={'/portfolio'}>Portfolio</HoverLink>
        <HoverLink href={'/post'}>Blog</HoverLink>
        <HoverLink href={'/links'}>Links</HoverLink>
        <div onClick={() => setToggle(!isToggle)} className="ml-auto">
          <IconMenu size={24} strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}
