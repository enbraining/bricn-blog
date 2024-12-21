import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function GiscusComment() {
    const { theme } = useTheme();

	return (
		<div className="my-16">
			<Giscus
				category="Announcements"
				categoryId="DIC_kwDONGYlKs4CjueV"
				repo="enbraining/Bricn"
				repoId="R_kgDONGYlKg"
				mapping="pathname"
				strict="0"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="bottom"
				theme={theme === "dark" ? "dark" : "light"}
				lang="ko"
			/>
		</div>
	);
}
