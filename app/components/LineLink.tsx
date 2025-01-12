import Link from "next/link";
import IconBrandGithubCopilot from "./icons/IconBrandGithubCopilot";
import IconBrandLinkedIn from "./icons/IconBrandLinkedIn";
import IconChessBishop from "./icons/IconChessBishop";
import IconCode from "./icons/IconCode";
import IconExternalLink from "./icons/IconExternalLink";
import IconQuestionMark from "./icons/IconQuestionMark";

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
			<IconBrandGithubCopilot size={18} />
		) : type === "LINKEDIN" ? (
			<IconBrandLinkedIn size={18} />
		) : type === "CHESSCOM" ? (
			<IconChessBishop size={18} />
		) : type === "SOLVEDAC" ? (
			<IconCode size={18} />
		) : (
			<IconQuestionMark size={18} />
		);

	return (
		<Link
			href={href}
			className="hover:border-bricn-200 border-bricn-100 gap-x-2 text-base flex items-center border rounded-lg py-3 px-5"
		>
			<div className="text-bricn-300">{selectIcon}</div>
			<p className="text-bricn-400">{children}</p>
			<IconExternalLink size={20} className="ml-auto text-bricn-400" />
		</Link>
	);
}
