"use client";

import ContentShare from "@/app/components/content/ContentShare";
import ContentTitle from "@/app/components/content/ContentTitle";
import GiscusComment from "@/app/components/content/GiscusComment";
import MarkdownContent from "@/app/components/content/MarkdownContent";
import Seo from "@/app/lib/Seo";
import { formatYearMonthDay } from "@/app/lib/date";
import { IconCalendarWeek, IconStopwatch } from "@tabler/icons-react";
import { type Post, allPosts } from "contentlayer/generated";
import { useEffect, useState } from "react";
import readingTime from "reading-time";

export default function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [slug, setSlug] = useState<string>("");
	const [post, setPost] = useState<Post>();

	useEffect(() => {
		const fetchSlug = async () => {
			const { slug } = await params;
			setSlug(slug);
		};
		fetchSlug();
	}, [params]);

	useEffect(() => {
		if (!slug) return;
		const fetchPost = allPosts.find((post: Post) => {
			return post.url.replace(/^\/post\/posts\//, "") === slug;
		});
		setPost(fetchPost);
	}, [slug]);

	return (
		<div>
            <Seo title={post?.title || ""} description={post?.body.raw.substring(0, 100) || ""} />
			<ContentTitle>{post?.title}</ContentTitle>
			<div className="mt-5 mb-12 sm:flex sm:gap-y-0 gap-y-4 grid pb-4 border-b">
				<div className="sm:flex grid gap-x-8">
                    <div className="flex gap-x-1 items-center text-bricn-200">
                        <IconCalendarWeek size={18} stroke={2} />
                        <p>{formatYearMonthDay(post?.date)}</p>
                    </div>
                    <div className="flex gap-x-1 items-center text-bricn-200">
                        <IconStopwatch size={18} stroke={2} />
                        <p>{`${(readingTime(post?.body.raw || "").minutes + 1) | 0}분`}</p>
                    </div>
                </div>
                <div className="ml-auto">
                    <ContentShare path={post?.url.replace(/posts\//gi, "") || ""} title={post?.title || ""} />
                </div>
			</div>
			<MarkdownContent content={post?.body.raw || ""} />
			<GiscusComment />
		</div>
	);
}
