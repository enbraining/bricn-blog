import { allPosts, Post } from "@/.contentlayer/generated";
import { getDatesBetween, getFourMonthsAgoMonday } from "../lib/date";

export const DateList = () => {
  const posts: Post[] = allPosts;
  const startDate = getFourMonthsAgoMonday();
  const today = new Date();
  today.setDate(today.getDate() + 1);

  const dates = getDatesBetween(startDate, today);

  return (
    <div className="grid grid-flow-col w-fit grid-rows-7 gap-1">
      {dates.map((date, index) => {
        const hasPost = posts.some((post: Post) => post.date.slice(0, 10) == date.slice(0, 10));
        return (
          <div key={index}>
            {hasPost ? <div className="bg-blue-600 w-4 h-4 rounded-sm" /> : <div className="bg-neutral-300 w-4 h-4 rounded-sm" />}
          </div>
        );
      })}
    </div>
  );
};
