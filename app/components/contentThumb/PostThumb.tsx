"use client";

import { formatYearMonthDay } from "@/app/lib/date";
import type { Post } from "@/app/types/Post";
import Image from "next/image";
import Link from "next/link";
import readingTime from "reading-time";
import IconCalendarWeek from "../icons/IconCalendarWeek";
import IconStopwatch from "../icons/IconStopwatch";

export default function PostThumbnail({
	post,
}: { post: Post }) {
	if (!post) return null;
	return (
        <li key={post.id}>
			<Link
				href={`/post/${post.id}`}
				className="pb-3 grid gap-y-2 group"
			>
				<div className="rounded-xl aspect-[6/3] bg-black">
                    {post.image_url && (
                        <div className="aspect-[6/3] relative overflow-hidden rounded-xl">
                            <Image
                            src={post.image_url}
                            alt="Thumbnail Image"
                            className="group-hover:scale-110 rounded-xl absolute inset-0 object-cover transition-transform duration-300"
                            fill
                            />
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-lg text-bricn-500">{post.title}</h1>
                    <div className="flex gap-x-4 text-bricn-200 text-sm">
                        <div className="flex gap-x-1 items-center">
                            <IconCalendarWeek size={18} />
                            <p>{formatYearMonthDay(post.created_at)}</p>
                        </div>
                        <div className="flex gap-x-1 items-center">
                            <IconStopwatch size={18} />
                            <p>{`${(readingTime(post.content || "").minutes + 1) | 0}분`}</p>
                        </div>
                    </div>
                </div>
			</Link>
		</li>
	);
}
