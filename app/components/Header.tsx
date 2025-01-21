"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useCallback } from "react";
import IconMoon from "./icons/IconMoon";
import IconSun from "./icons/IconSun";

export default function Header() {
	const { theme, setTheme } = useTheme();

    const onChangeTheme = useCallback(() => {
        setTheme(theme === "white" ? "dark" : "white")
    }, [setTheme, theme])

	return (
		<header className="flex items-center mt-6 mb-16">
			<div className="flex items-center gap-x-16">
				<Link href={"/"}>블로그</Link>
				<Link href={"/profile"}>프로필</Link>
			</div>
			<div className="ml-auto flex items-center gap-x-6">
				<div className="hover:text-headerHover text-header">
					{theme === "white" ? (
						<div onClick={onChangeTheme}>
							<IconSun size={18} />
						</div>
					) : (
						<div onClick={onChangeTheme}>
							<IconMoon size={18} />
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
