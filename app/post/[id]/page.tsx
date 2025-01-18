"use server";

import ContentShare from "@/app/components/content/ContentShare";
import ContentTitle from "@/app/components/content/ContentTitle";
import GiscusComment from "@/app/components/content/GiscusComment";
import MarkdownContent from "@/app/components/content/MarkdownContent";
import IconCalendarWeek from "@/app/components/icons/IconCalendarWeek";
import IconStopwatch from "@/app/components/icons/IconStopwatch";
import { formatYearMonthDay } from "@/app/lib/date";
import { getDescription } from "@/app/lib/seo";
import { supabase } from "@/app/lib/supabase";
import { Post } from "@/app/types/Post";
import { Metadata } from "next";
import readingTime from "reading-time";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
    const { id } = await params
    const post: Post = (await supabase.from('posts').select('*').eq('id', id).single()).data;

    return {
        title: post.title,
        description: getDescription(post.content || "")
    }
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
    const { id } = await params
    const query = await supabase.from('posts').select('*').eq('id', id).single();
    const post = query.data

	return (
		<div>
            <ContentTitle>{post?.title}</ContentTitle>
			<div className="mt-5 mb-12 sm:flex sm:gap-y-0 gap-y-4 grid pb-4 border-b">
				<div className="sm:flex grid gap-x-8">
                    <div className="flex gap-x-1 items-center text-bricn-200">
                        <IconCalendarWeek size={18} />
                        <p>{formatYearMonthDay(post?.created_at)}</p>
                    </div>
                    <div className="flex gap-x-1 items-center text-bricn-200">
                        <IconStopwatch size={18} />
                        <p>{`${(readingTime(post?.content || "").minutes + 1) | 0}분`}</p>
                    </div>
                </div>
                <div className="ml-auto">
                    <ContentShare path={`/post/${post?.id}`} title={post?.title || ""} />
                </div>
			</div>
			<MarkdownContent content={post?.content || ""} />
			<GiscusComment />
		</div>
	);
}
