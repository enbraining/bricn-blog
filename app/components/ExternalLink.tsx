import { IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";

export default function ExternalLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="group text-base flex items-center text-secondary"
		>
			<p className="group-hover:underline decoration-subtitle underline-offset-4">
				{children}
			</p>
			<IconExternalLink size={20} stroke={2} className="ml-1 text-icon" />
		</Link>
	);
}
