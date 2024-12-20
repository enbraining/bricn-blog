import { IconCalendarWeek, IconStopwatch } from "@tabler/icons-react";

import { Post, allPosts } from "contentlayer/generated";
import dayjs from "dayjs";
import Link from "next/link";
import readingTime from "reading-time";
import { formatYearMonthDay } from "../lib/date";

export default function Page() {
	const posts = allPosts.sort((a: Post, b: Post) => {
		if (a.date > b.date) return -1;
		return 1;
	});

	return (
		<div>
			<ul className="space-y-4">
				{posts.map((post: Post) => (
					<li key={post.url}>
						<Link href={post.url.replace(/posts\//gi, "")}>
							<div className="flex gap-x-4">
								<div className="flex gap-x-1 items-center text-neutral-600">
									<IconCalendarWeek size={18} stroke={2} />
									<p>{formatYearMonthDay(post.date)}</p>
								</div>
								<div className="flex gap-x-1 items-center text-neutral-600">
									<IconStopwatch size={18} stroke={2} />
									<p>{`${(readingTime(post.body.raw || "").minutes + 1) | 0}분`}</p>
								</div>
							</div>
							<h1 className="text-xl text-neutral-700">{post.title}</h1>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
