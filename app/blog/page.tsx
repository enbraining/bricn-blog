"use client"

import { getAllPosts } from "@/lib/posts";
import { IconCalendarWeek, IconStopwatch } from '@tabler/icons-react';

import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import readingTime from "reading-time";
import { Post } from "../type/post";

export default function Page(){
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            setPosts(await getAllPosts())
        }
        fetchPosts()
    }, [])

    return (
        <div>
            <ul className="space-y-4">
            {
                posts.map((post) =>
                    <li key={post.slug}>
                        <Link href={`/blog/${post.slug}`}>
                            <div className="flex gap-x-8">
                                <div className="flex gap-x-1 items-center text-neutral-600">
                                    <IconCalendarWeek size={18} stroke={2} />
                                    <p>{dayjs(post.date).format('YYYY년 MM월 DD일')}</p>
                                </div>
                                <div className="flex gap-x-1 items-center text-neutral-600">
                                    <IconStopwatch size={18} stroke={2} />
                                    <p>{`${readingTime(post.content).minutes + 1 | 0}분`}</p>
                                </div>
                            </div>
                            <h1 className="text-xl font-medium text-neutral-700">{post.title}</h1>
                        </Link>
                    </li>
                )
            }
            </ul>
        </div>
    )
}
