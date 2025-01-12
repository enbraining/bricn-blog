"use client";

import type { Post } from "@/app/types/Post";
import ContentThumbnail from "./ContentThumb";

export default function ContentThumbnailList({
	contents,
}: { contents: Post[] }) {
	return (
		<ul className="grid">
			{contents.map((content) => (
				<ContentThumbnail content={content} key={content.title} />
			))}
		</ul>
	);
}
