import Link from 'next/link';
import { IconExternalLink } from '@tabler/icons-react';

export default function LineLink({
  icon,
  href,
  name,
  classname,
}: {
  icon: React.ReactNode;
  href: string;
  name: string;
  classname?: string;
}) {
  return (
    <Link
      href={href}
      className={`${classname || 'hover:border-[#5F5F5F]'} text-bricn-400 hover:text-bricn-100 border-bricn-800 duration-500 gap-x-5 text-base flex items-center border rounded-lg py-3 px-5`}
      target="_blank"
    >
      <div>{icon}</div>
      <p>{name}</p>
      <IconExternalLink size={20} className="ml-auto" />
    </Link>
  );
}
