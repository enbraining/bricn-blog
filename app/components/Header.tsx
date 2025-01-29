'use client';

import { IconBlockquote, IconBriefcase, IconLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed w-full flex py-1 bg-white bg-opacity-80">
      <div className="flex mx-auto items-center gap-x-24">
        <Link
          href={'/portfolio'}
          className="hover:bg-bricn-100 p-3 rounded-full group flex gap-x-3 duration-200"
        >
          <IconBriefcase size={22} />
          <p className="hidden group-hover:block absolute">Portfolio</p>
        </Link>
        <Link
          href={'/'}
          className="hover:bg-bricn-100 p-3 rounded-full group flex gap-x-3 duration-200"
        >
          <IconBlockquote size={22} />
          <p className="hidden group-hover:block absolute">Blog</p>
        </Link>
        <Link
          href={'/links'}
          className="hover:bg-bricn-100 p-3 rounded-full group flex gap-x-3 duration-200"
        >
          <IconLink size={22} />
          <p className="hidden group-hover:block absolute">Links</p>
        </Link>
      </div>
    </header>
  );
}
