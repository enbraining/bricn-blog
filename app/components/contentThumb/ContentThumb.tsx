"use client";

import type { Post, Project } from "@/.contentlayer/generated";
import {
    IconCalendarWeek,
    IconStopwatch,
    IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import readingTime from "reading-time";
import { formatYearMonth, formatYearMonthDay } from "../../lib/date";

export default function ContentThumbnail({
	content,
}: { content: Post | Project | undefined }) {
	if (!content) return null;
	const href =
		content.type === "Post"
			? content.url.replace(/posts\//gi, "")
			: content.url.replace(/projects\//gi, "");
	return (
		<li key={content.url}>
			<Link
				href={href}
				className="border-b py-3 border-bricn-100 hover:bg-bricn-100 hover:pl-2 duration-200 grid gap-y-2"
			>
				<div>
					{content.type === "Post" && (
						<p className="text-sm text-bricn-300">{content.category}</p>
					)}
					<h1 className="text-xl text-bricn-500">{content.title}</h1>
				</div>
				{content.type === "Post" ? (
					<div className="flex gap-x-4 text-bricn-200 text-sm">
						<div className="flex gap-x-1 items-center">
							<IconCalendarWeek size={18} stroke={2} />
							<p>{formatYearMonthDay(content.date)}</p>
						</div>
						<div className="flex gap-x-1 items-center">
							<IconStopwatch size={18} stroke={2} />
							<p>{`${(readingTime(content.body.raw || "").minutes + 1) | 0}분`}</p>
						</div>
					</div>
				) : (
					<div className="text-sm text-bricn-200 flex gap-x-3">
						<div className="flex gap-x-2 items-center">
							<IconUsers size={18} stroke={2} />
							<p>{content.team || "개인"}</p>
						</div>
						<div className="flex gap-x-2 items-center">
							<IconCalendarWeek size={18} stroke={2} />
							<p>{formatYearMonth(content.date)}</p>
							<p>–</p>
							<p>{formatYearMonth(content.endDate)}</p>
						</div>
					</div>
				)}
			</Link>
		</li>
	);
}
