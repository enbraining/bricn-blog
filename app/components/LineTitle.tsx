import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export default function LineTitle({
	content,
	date,
    href
}: { content: string; date: string; href: string }) {
	return (
		<Link href={href} className="group gap-x-2 text-base flex items-center text-subtitle border border-line rounded-lg py-4 px-5">
			<h1 className="text-lg font-medium group-hover:underline decoration-neutral-400 underline-offset-4">{content}</h1>
			<p>{date}</p>
            <IconExternalLink size={20} stroke={2} className="ml-auto" />
		</Link>
	);
}
