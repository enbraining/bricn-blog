import Link from "next/link";

export default function HoverLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="text-start text-base hover:text-neutral-900 text-neutral-500"
		>
			{children}
		</Link>
	);
}
