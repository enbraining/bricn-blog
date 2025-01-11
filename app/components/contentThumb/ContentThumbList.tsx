"use client";

import type { Post, Project } from "@/.contentlayer/generated";
import ContentThumbnail from "./ContentThumb";

export default function ContentThumbnailList({
	contents,
}: { contents: (Post | Project)[] }) {
	return (
		<ul className="grid">
			{contents.map((content: Post | Project) => (
				<ContentThumbnail content={content} key={content.url} />
			))}
		</ul>
	);
}
