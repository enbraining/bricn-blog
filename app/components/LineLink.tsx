import {
    IconBrandGithubCopilot,
    IconBrandLinkedin,
    IconChessBishop,
    IconCode,
    IconExternalLink,
    IconQuestionMark,
} from "@tabler/icons-react";
import Link from "next/link";

export default function LineLink({
	type,
	href,
	children,
}: {
	type: "GITHUB" | "LINKEDIN" | "CHESSCOM" | "SOLVEDAC";
	href: string;
	children: React.ReactNode;
}) {
	const selectIcon =
		type === "GITHUB" ? (
			<IconBrandGithubCopilot stroke={2} size={18} />
		) : type === "LINKEDIN" ? (
			<IconBrandLinkedin stroke={2} size={18} />
		) : type === "CHESSCOM" ? (
			<IconChessBishop stroke={2} size={18} />
		) : type === "SOLVEDAC" ? (
			<IconCode stroke={2} size={18} />
		) : (
			<IconQuestionMark stroke={2} size={18} />
		);

	return (
		<Link
			href={href}
			className="hover:border-bricn-200 border-bricn-100 gap-x-2 text-base flex items-center border rounded-lg py-3 px-5"
		>
			<div className="text-bricn-300">{selectIcon}</div>
			<p className="text-bricn-400">{children}</p>
			<IconExternalLink size={20} stroke={2} className="ml-auto text-bricn-400" />
		</Link>
	);
}
