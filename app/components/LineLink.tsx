import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

export default function LineLink({
  icon,
  href,
  name,
}: {
  icon: React.ReactNode;
  href: string;
  name: string;
}) {
  return (
    <Link
      href={href}
      className="hover:border-bricn-700 border-bricn-800 duration-500 gap-x-5 text-base flex items-center border rounded-lg py-3 px-5"
      target="_blank"
    >
      <div className="text-bricn-300">{icon}</div>
      <p className="text-bricn-400">{name}</p>
      <IconExternalLink size={20} className="ml-auto text-bricn-400" />
    </Link>
  );
}
