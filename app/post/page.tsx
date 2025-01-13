"use client"

import { useEffect, useState } from "react";
import ContentThumbnailList from "../components/contentThumb/ContentThumbList";
import { ThumbSkeletonList } from "../components/contentThumb/ThumbSkeletonList";
import Seo from "../lib/Seo";
import type { Post } from "../types/Post";

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchPosts = await fetch("/api/post", {
                next: { revalidate: 10 }
            }).then(res => res.json())
            setPosts(fetchPosts.data)
        }
        fetchPosts()
    }, [])

	return (
		<div>
            <Seo title="블로그" />
            {
                posts.length > 0 ?
                    <ContentThumbnailList contents={posts} /> :
                    <ThumbSkeletonList />
            }
		</div>
	);
}
