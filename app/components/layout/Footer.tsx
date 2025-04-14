import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <header className="grid grid-flow-col items-center py-5">
      <Link
        href={'https://github.com/enbraining/Bricn'}
        className="text-neutral-600"
      >
        ⓒ 2024. enbraining All rights reserved.
      </Link>
      <div className="flex ml-auto gap-x-2 items-center text-neutral-600">
        <Link href={'https://github.com/enbraining'}>
          <IconBrandGithub size={25} />
        </Link>
        <Link href={'https://linkedin.com/in/enbraining'}>
          <IconBrandLinkedin size={25} />
        </Link>
        <Link href={'https://youtube.com/@enbraining'}>
          <IconBrandYoutube size={25} />
        </Link>
      </div>
    </header>
  );
}
