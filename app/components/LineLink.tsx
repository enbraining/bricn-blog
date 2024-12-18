import { IconBrandGithubCopilot, IconBrandLinkedin, IconChessBishop, IconCode, IconExternalLink, IconQuestionMark } from '@tabler/icons-react';
import Link from 'next/link';

export default function LineLink({ type, href, children }: {
    type: "GITHUB" | "LINKEDIN" | "CHESSCOM" | "SOLVEDAC";
    href: string;
    children: React.ReactNode
}) {
    const selectIcon = type === "GITHUB" ? <IconBrandGithubCopilot stroke={2} size={18} />
        : type === "LINKEDIN" ? <IconBrandLinkedin stroke={2} size={18} />
        : type === "CHESSCOM" ? <IconChessBishop stroke={2} size={18} />
        : type === "SOLVEDAC" ? <IconCode stroke={2} size={18} />
        : <IconQuestionMark stroke={2} size={18} />

    return (
        <Link
            href={href}
            className="group gap-x-2 text-base flex items-center text-neutral-600 border rounded-lg py-4 px-5"
        >
            {selectIcon}
            <p className="group-hover:underline decoration-neutral-400 underline-offset-4">
                {children}
            </p>
            <IconExternalLink size={20} stroke={2} className="ml-auto" />
        </Link>
    );
}
