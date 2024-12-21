"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import HoverLink from "./HoverLink";

export default function Header() {
	const { theme, setTheme } = useTheme();

	return (
		<header className="grid grid-flow-col items-center mt-6 mb-16">
			<HoverLink href={"/"}>홈</HoverLink>
			<HoverLink href={"/profile"}>프로필</HoverLink>
			<HoverLink href={"/post"}>블로그</HoverLink>
			<HoverLink href={"/project"}>프로젝트</HoverLink>
			<div className="ml-auto hover:text-headerHover text-header">
				{theme === "white" ? (
					<IconSun onClick={() => setTheme("dark")} stroke={2} />
				) : (
					<IconMoon onClick={() => setTheme("white")} stroke={2} />
				)}
			</div>
		</header>
	);
}
