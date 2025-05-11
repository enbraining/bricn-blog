'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 bg-neutral-100 border-neutral-300 border rounded-b-lg py-2 px-14 flex">
      <div className="mx-auto flex items-center gap-x-12">
        <Link href={'/'}>소개</Link>
        <Link href={'/post'}>블로그</Link>
        <Link href={'/feed.xml'}>RSS</Link>
      </div>
    </header>
  );
}
