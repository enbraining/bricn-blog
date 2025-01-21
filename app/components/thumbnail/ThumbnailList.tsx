"use client";

import type { Post } from "@/app/types/Post";
import ContentThumbnail from "./Thumbnail";

export default function ThumbnailList({
	posts,
}: { posts: Post[] }) {
	return (
		<div className="grid">
            <ul className="mx-auto grid w-full xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {posts.map((post) => (
                    <ContentThumbnail post={post} key={post.id} />
                ))}
		    </ul>
        </div>
	);
}
