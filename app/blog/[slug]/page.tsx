"use client"

import { Post } from "@/app/type/post";
import { getPost } from "@/lib/posts";
import { IconCalendarWeek, IconStopwatch } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import readingTime from "reading-time";

export default function Page({ params }: { params: Promise<{ slug: string}> }){
    const [slug, setSlug] = useState<string>('')
    const [post, setPost] = useState<Post | null>(null)

    useEffect(() => {
        const fetchSlug = async () => {
            const { slug } = await params;
            setSlug(slug);
        };

        fetchSlug();
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            const post = await getPost(slug);
            setPost(post);
        };

        fetchPost();
    }, [slug]);

    return (
        <div>
            <div className="flex gap-x-8 mb-4">
                <div className="flex gap-x-1 items-center text-neutral-600">
                        <IconCalendarWeek size={18} stroke={2} />
                        <p>{dayjs(post?.date).format('YYYY년 MM월 DD일')}</p>
                </div>
                <div className="flex gap-x-1 items-center text-neutral-600">
                        <IconStopwatch size={18} stroke={2} />
                        <p>{`${readingTime(post?.content || "").minutes + 1 | 0}분`}</p>
                </div>
            </div>
            <h1 className="text-4xl font-medium text-neutral-700 mb-12">{post?.title}</h1>
            <Markdown className={"markdown-content"}>{post?.content || ""}</Markdown>
        </div>
    )
}
