'use client';

import {
  IconAt,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="font-semibold my-4 flex items-center">
      <div className="flex items-center gap-x-12">
        <Link href={'/'}>메인</Link>
        <Link href={'/post'}>블로그</Link>
      </div>
      <div className="flex ml-auto gap-x-2 items-center text-neutral-600">
        <Link href={'https://github.com/enbraining'}>
          <IconBrandGithubFilled size={22} />
        </Link>
        <Link href={'https://linkedin.com/in/enbraining'}>
          <IconBrandLinkedinFilled size={22} />
        </Link>
        <Link href={'https://youtube.com/@enbraining'}>
          <IconAt size={22} />
        </Link>
      </div>
    </header>
  );
}
