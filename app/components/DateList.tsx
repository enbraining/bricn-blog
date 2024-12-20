import { allPosts, Post } from "@/.contentlayer/generated";
import { getDatesBetween, getFourMonthsAgoMonday } from "../lib/date";

export const DateList = () => {
	const posts: Post[] = allPosts;
	const startDate = getFourMonthsAgoMonday();
	const today = new Date();
	today.setDate(today.getDate() + 1);

	const dates = getDatesBetween(startDate, today);

	return (
		<div className="grid grid-flow-col w-fit grid-rows-7 gap-[0.2rem]">
			{dates.map((date, index) => {
				const hasPost = posts.some(
					(post: Post) => post.date.slice(0, 10) == date.slice(0, 10),
				);
				return (
					<div key={index}>
						{hasPost ? (
							<div className="bg-blue-600 w-[0.75rem] h-[0.75rem] rounded-sm" />
						) : (
							<div className="border bg-neutral-100 w-[0.75rem] h-[0.75rem] rounded-sm" />
						)}
					</div>
				);
			})}
		</div>
	);
};
