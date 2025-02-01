import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';

export default function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group text-base flex items-center text-bricn-300"
    >
      <p className="group-hover:underline decoration-subtitle underline-offset-4">
        {children}
      </p>
      <IconExternalLink size={20} className="ml-1 text-bricn-400" />
    </Link>
  );
}
