import Link from 'next/link';

export default function Footer() {
  return (
    <header className="print:hidden grid grid-flow-col items-center mb-5">
      <Link href={'https://github.com/enbraining/Bricn'}>
        ⓒ 2024. enbraining All rights reserved.
      </Link>
    </header>
  );
}
