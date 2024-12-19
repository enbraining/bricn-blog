"use client"

import { IconCalendarWeek, IconStopwatch } from "@tabler/icons-react";
import { allPosts, Post } from 'contentlayer/generated';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import readingTime from "reading-time";

export default function Page({ params }: { params: Promise<{ slug: string}> }){
    const [slug, setSlug] = useState<string>('')
    const [post, setPost] = useState<Post>()

    useEffect(() => {
        const fetchSlug = async () => {
            const { slug } = await params;
            setSlug(slug);
        };
        fetchSlug();
    }, [params]);

    useEffect(() => {
        if (!slug) return;

        setPost(allPosts.find((post: Post) => post.url.replace(/^\/blog\//, "") === slug))
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
                        <p>{`${readingTime(post?.body.raw || "").minutes + 1 | 0}분`}</p>
                </div>
            </div>
            <h1 className="text-4xl font-medium text-neutral-700 mb-12">{post?.title}</h1>
            <Markdown className={"markdown-content"}>{post?.body.raw || ""}</Markdown>
        </div>
    )
}
