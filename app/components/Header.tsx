'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center mt-6 mb-16">
      <div className="flex items-center gap-x-16">
        <Link href={'/portfolio'}>Portfolio</Link>
        <Link href={'/'}>Blog</Link>
        <Link href={'/links'}>Links</Link>
      </div>
    </header>
  );
}
