import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="grid grid-flow-col items-center py-5">
      <Link
        href={'https://github.com/enbraining/Bricn'}
        className="text-neutral-600"
      >
        ⓒ 2024. enbraining All rights reserved.
      </Link>
    </footer>
  );
}
