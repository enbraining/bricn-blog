'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center mt-6 mb-16">
      <div className="flex items-center gap-x-16">
        <Link href={'/'}>블로그</Link>
        <Link href={'/profile'}>프로필</Link>
      </div>
    </header>
  );
}
