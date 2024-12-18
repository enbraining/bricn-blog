import { IconSun } from '@tabler/icons-react';
import Link from 'next/link';

export default function Header(){
    return (
        <header className="grid grid-flow-col items-center mt-6 mb-16">
            <HoverLink href={'/'}>홈</HoverLink>
            <HoverLink href={'/profile'}>프로필</HoverLink>
            <HoverLink href={'/link'}>링크</HoverLink>
            <HoverLink href={'/blog'}>블로그</HoverLink>
            <HoverLink href={'/resource'}>자료</HoverLink>
            <div className='flex'>
                <IconSun stroke={2} className='ml-auto' />
            </div>
        </header>
    )
}

function HoverLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-start text-base hover:text-neutral-900 text-neutral-500"
        >
            {children}
        </Link>
    );
}
