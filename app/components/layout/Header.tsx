'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [page, setPage] = useState<'HOME' | 'PUBLICATION' | 'PORTFOLIO'>(
    'HOME'
  );

  return (
    <header className="sticky top-0">
      <div className="items-center mx-auto text-center grid grid-flow-col">
        <Link
          href={'/'}
          className={`text-center border py-3 bg rounded-es-2xl ${page === 'HOME' ? 'bg-neutral-200' : 'bg-white'}`}
          onClick={() => setPage('HOME')}
        >
          Home
        </Link>
        <Link
          href={'/post'}
          className={`text-center border-y py-3 ${page === 'PUBLICATION' ? 'bg-neutral-200' : 'bg-white'}`}
          onClick={() => setPage('PUBLICATION')}
        >
          Publication
        </Link>
        <Link
          href={'/portfolio'}
          className={`text-center border rounded-ee-2xl py-3 ${page === 'PORTFOLIO' ? 'bg-neutral-200' : 'bg-white'}`}
          onClick={() => setPage('PORTFOLIO')}
        >
          Portfolio
        </Link>
      </div>
    </header>
  );
}
