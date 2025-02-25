import Link from 'next/link';

export default function HoverLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-bricn-100 hover:text-bricn-400 duration-200 pr-3 whitespace-nowrap"
    >
      {children}
    </Link>
  );
}
