"use client";

import { useTheme } from "next-themes";
import HoverLink from "./HoverLink";
import { SignToggle } from "./auth/SignToggle";
import IconMoon from "./icons/IconMoon";
import IconSun from "./icons/IconSun";

export default function Header() {
	const { theme, setTheme } = useTheme();

	return (
		<header className="grid grid-flow-col items-center mt-6 mb-16">
			<HoverLink href={"/"}>홈</HoverLink>
			<HoverLink href={"/profile"}>프로필</HoverLink>
			<HoverLink href={"/post"}>블로그</HoverLink>
			<div className="ml-auto flex items-center gap-x-6">
				<SignToggle />
				<div className="hover:text-headerHover text-header">
					{theme === "white" ? (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div onClick={() => setTheme("dark")}>
							<IconSun size={18} />
						</div>
					) : (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div onClick={() => setTheme("white")}>
							<IconMoon size={18} />
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
