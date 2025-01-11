"use client";

import GiscusComment from "@/app/components/content/GiscusComment";
import MarkdownContent from "@/app/components/content/MarkdownContent";
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
			<div className="flex gap-x-8 mb-4">
				<div className="flex gap-x-1 items-center text-secondary">
					<IconCalendarWeek size={18} stroke={2} />
					<p>{formatYearMonthDay(post?.date)}</p>
				</div>
				<div className="flex gap-x-1 items-center text-secondary">
					<IconStopwatch size={18} stroke={2} />
					<p>{`${(readingTime(post?.body.raw || "").minutes + 1) | 0}분`}</p>
				</div>
			</div>
			<h1 className="text-4xl font-medium text-primary mb-12">{post?.title}</h1>
			<MarkdownContent content={post?.body.raw || ""} />
			<GiscusComment />
		</div>
	);
}
