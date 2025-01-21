"use server";

import ContentBio from "@/app/components/content/ContentBio";
import GiscusComment from "@/app/components/content/GiscusComment";
import MarkdownContent from "@/app/components/content/MarkdownContent";
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
    const post: Post = query.data

	return (
		<div>
            <ContentBio
                title={post?.title || ""}
                createdAt={formatYearMonthDay(post?.created_at)}
                readingTime={readingTime(post?.content || "").minutes + 1}
                id={post.id || "0"}
            />
			<div className="flex lg:mx-[13rem] md:mx-[0rem] sm:mx-[0rem] gap-x-8">
                <MarkdownContent content={post?.content || ""} />
                <div className="flex-1 sm:block hidden text-bricn-200 whitespace-nowrap text-sm">
                    <p>{`${formatYearMonthDay(post?.created_at)}에 생성함`}</p>
                    <p>{`${formatYearMonthDay(post.modified_at)}에 수정함`}</p>
                </div>
            </div>
			<GiscusComment />
		</div>
	);
}
