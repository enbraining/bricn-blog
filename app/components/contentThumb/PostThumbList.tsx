"use client";

import type { Post } from "@/app/types/Post";
import ContentThumbnail from "./PostThumb";

export default function ContentThumbnailList({
	posts,
}: { posts: Post[] }) {
	return (
		<ul className="grid">
			{posts.map((post) => (
				<ContentThumbnail post={post} key={post.id} />
			))}
		</ul>
	);
}
