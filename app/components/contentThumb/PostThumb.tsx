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
				className="border-b pb-3 rounded-sm w-[18rem] h-[17rem] border-bricn-100 hover:bg-bricn-100 duration-200 grid gap-y-2"
			>
				<div className="rounded-sm w-[18rem] h-[10rem] bg-black">
                    {post.image_url && (
                        <div className="w-[18rem] h-[10rem] relative">
                            <Image
                            src={post.image_url}
                            alt="Thumbnail Image"
                            className="rounded-sm absolute inset-0 object-cover"
                            fill
                            />
                        </div>
                    )}
                </div>
                <div className="px-2">
                    <div>
                        <p className="text-sm text-bricn-300">{post.category}</p>
                        <h1 className="text-lg text-bricn-500">{post.title}</h1>
                    </div>
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
