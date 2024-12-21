import Link from "next/link";

export default function HoverLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="text-start text-base hover:text-headerHover text-header"
		>
			{children}
		</Link>
	);
}
