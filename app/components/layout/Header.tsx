'use client';

import { IconBlockquote, IconBriefcase, IconHome2 } from '@tabler/icons-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed py-4 flex items-center bottom-0 w-full">
      <div className="grid grid-flow-col text-bricn-200 items-center gap-x-6 mx-auto px-12 py-3 rounded-full bg-neutral-100 bg-opacity-70">
        <Link href={'/'}>
          <IconHome2 />
        </Link>
        <Link href={'/post'}>
          <IconBlockquote />
        </Link>
        <Link href={'/portfolio'}>
          <IconBriefcase />
        </Link>
      </div>
    </header>
  );
}
