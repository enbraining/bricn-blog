"use client";


import { formatYearMonthDay } from "@/app/lib/date";
import type { Post } from "@/app/types/Post";
import Link from "next/link";
import readingTime from "reading-time";
import IconCalendarWeek from "../icons/IconCalendarWeek";
import IconStopwatch from "../icons/IconStopwatch";

export default function ContentThumbnail({
	content,
}: { content: Post }) {
	if (!content) return null;
	return (
		// <li key={content.url}>
        <li key={content.id}>
			<Link
				href={`/post/${content.id}`}
				className="border-b py-3 border-bricn-100 hover:bg-bricn-100 hover:pl-2 duration-200 grid gap-y-2"
			>
				<div>
					<h1 className="text-xl text-bricn-500">{content.title}</h1>
				</div>
				<div className="flex gap-x-4 text-bricn-200 text-sm">
						<div className="flex gap-x-1 items-center">
							<IconCalendarWeek size={18} />
							<p>{formatYearMonthDay(content.created_at)}</p>
						</div>
						<div className="flex gap-x-1 items-center">
							<IconStopwatch size={18} />
							<p>{`${(readingTime(content.content).minutes + 1) | 0}분`}</p>
						</div>
					</div>
			</Link>
		</li>
	);
}
