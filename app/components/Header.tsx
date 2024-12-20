import { IconSun } from "@tabler/icons-react";
import HoverLink from "./HoverLink";

export default function Header() {
	return (
		<header className="grid grid-flow-col items-center mt-6 mb-16">
			<HoverLink href={"/"}>홈</HoverLink>
			<HoverLink href={"/profile"}>프로필</HoverLink>
			<HoverLink href={"/post"}>블로그</HoverLink>
			<HoverLink href={"/project"}>프로젝트</HoverLink>
			<div className="flex">
				<IconSun stroke={2} className="ml-auto" />
			</div>
		</header>
	);
}
