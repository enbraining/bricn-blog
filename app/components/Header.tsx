'use client';

import { IconMenu } from '@tabler/icons-react';
import { useState } from 'react';
import HoverLink from './basic/HoverLink';
import Link from 'next/link';

export default function Header() {
  const [isToggle, setToggle] = useState(false);

  return (
    <header className="sticky top-0 py-6 z-10 flex items-center w-full mb-16">
      <Link
        className="sm:block hidden font-semibold hover:text-bricn-300 duration-300 text-bricn-100"
        href={'/'}
      >
        Bricn Tech Blog
      </Link>
      <div className="sm:ml-auto sm:w-min w-full ml-0 flex text-bricn-200 items-center gap-x-6">
        <HoverLink href={'/portfolio'}>Portfolio</HoverLink>
        <HoverLink href={'/'}>Blog</HoverLink>
        <HoverLink href={'/links'}>Links</HoverLink>
        <div onClick={() => setToggle(!isToggle)} className="ml-auto">
          <IconMenu size={24} strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}
