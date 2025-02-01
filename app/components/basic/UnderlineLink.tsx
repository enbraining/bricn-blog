import Link from 'next/link';

export default function UnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-bricn-300 hover:text-bricn-400 duration-200 underline underline-offset-4"
    >
      {children}
    </Link>
  );
}
