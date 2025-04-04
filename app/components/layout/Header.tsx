'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [page, setPage] = useState<'HOME' | 'PUBLICATION' | 'PORTFOLIO'>(
    'HOME'
  );

  return (
    <header className="fixed py-4 flex items-center bottom-0 w-full">
      <div className="text-bricn-200 items-center mx-auto text-center sm:w-1/2 w-5/6 grid grid-flow-col">
        <Link
          href={'/'}
          className={`text-center border py-3 bg rounded-l-full bg-white ${page === 'HOME' && 'bg-black text-white border-none'}`}
          onClick={() => setPage('HOME')}
        >
          Home
        </Link>
        <Link
          href={'/post'}
          className={`text-center border-y bg-white py-3 ${page === 'PUBLICATION' && 'bg-black text-white border-none'}`}
          onClick={() => setPage('PUBLICATION')}
        >
          Publication
        </Link>
        <Link
          href={'/portfolio'}
          className={`text-center bg-white border rounded-r-full py-3 ${page === 'PORTFOLIO' && 'bg-black text-white border-none'}`}
          onClick={() => setPage('PORTFOLIO')}
        >
          Portfolio
        </Link>
      </div>
    </header>
  );
}
