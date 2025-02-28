'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SelectMenu() {
  const pathname = usePathname();

  const getLinkClassname = (path: string) => {
    return `${pathname === path ? 'bg-neutral-200' : 'hover:bg-neutral-100 border-neutral-200 border'} rounded-full py-3`;
  };

  return (
    <div className="grid grid-cols-2 text-center gap-x-3 border-b-900 border-neutral-900 mb-16">
      <Link href={'/profile'} className={getLinkClassname('/profile')}>
        프로필
      </Link>
      <Link
        href={'/profile/portfolio'}
        className={getLinkClassname('/profile/portfolio')}
      >
        포트폴리오
      </Link>
    </div>
  );
}
