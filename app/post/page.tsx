"use client"

import { useCallback, useEffect, useState } from "react";
import ContentThumbnailList from "../components/contentThumb/PostThumbList";
import { ThumbSkeletonList } from "../components/contentThumb/ThumbSkeletonList";
import Seo from "../lib/Seo";
import { Category } from "../types/Category";
import type { Post } from "../types/Post";

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<string | null>(null)

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchPosts = await fetch("/api/post", {
                next: { revalidate: 20 }
            }).then(res => res.json())
            setPosts(fetchPosts)
        }

        const fetchCategories = async () => {
            const fetchCategories = await fetch("/api/category").then(res => res.json())
            setCategories(fetchCategories)
        }

        fetchPosts()
        fetchCategories()
    }, [])

    useEffect(() => {
        const headers: Record<string, string> = category
        ? { "Post-Category": category }
        : {};

        const fetchPosts = async () => {
            const response = await fetch("/api/post", {
                headers: headers,
                next: { revalidate: 20 },
            }).then(res => res.json())
            setPosts(response)
        }
        fetchPosts()
    }, [category])

    const onFilterCategory = useCallback((changedCategory: string) => {
        if(category != null && category === changedCategory){
            setCategory(null)
        } else {
            setCategory(changedCategory)
        }
    }, [category])

	return (
		<div>
            <Seo title="블로그" />
            <div className="flex">
                <div className="flex gap-x-1 my-3">
                    {
                        categories.map((c) => (
                            <div
                                onClick={() => onFilterCategory(c.name)}
                                className={`p-1 rounded-sm border ${category === c.name ? "bg-bricn-200 text-white" : "hover:bg-bricn-100 hover:text-bricn-300"}`}
                                key={c.name}
                            >
                                    {`${c.name} ${c.count}`}
                            </div>
                        ))
                    }
                </div>
                <div className="ml-auto">
                    <p className="p-1 rounded-sm border">{">"}</p>
                </div>
            </div>
            {
                posts.length > 0 ?
                    <ContentThumbnailList posts={posts} /> :
                    <ThumbSkeletonList />
            }
		</div>
	);
}
