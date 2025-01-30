'use client';

import {
  IconBlockquote,
  IconBriefcase,
  IconLink,
  IconMenu2,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isToggle, setToggle] = useState(false);

  return (
    <header className="sticky top-0 py-4 z-10 group flex">
      <div className="ml-auto flex text-bricn-300">
        {isToggle && (
          <div className="flex">
            <Link
              href={'/portfolio'}
              className="hover:bg-bricn-800 bg-opacity-50 p-3 rounded-full flex gap-x-3 duration-200"
            >
              <IconBriefcase size={24} />
              <p className="hidden group-hover:block">Portfolio</p>
            </Link>
            <Link
              href={'/'}
              className="hover:bg-bricn-800 bg-opacity-50 p-3 rounded-full flex gap-x-3 duration-200"
            >
              <IconBlockquote size={24} />
              <p className="hidden group-hover:block">Blog</p>
            </Link>
            <Link
              href={'/links'}
              className="hover:bg-bricn-800 bg-opacity-50 p-3 rounded-full flex gap-x-3 duration-200"
            >
              <IconLink size={24} />
              <p className="hidden group-hover:block">Links</p>
            </Link>
          </div>
        )}
        <div
          onClick={() => setToggle(!isToggle)}
          className="hover:bg-bricn-800 bg-opacity-50 p-3 rounded-full flex gap-x-3 duration-200"
        >
          <IconMenu2 size={24} />
        </div>
      </div>
    </header>
  );
}
