"use client"

import { MDEditor } from "@/app/components/editor/MDEditor";
import { getBaseUrl } from "@/app/lib/url";
import { Post } from "@/app/types/Post";
import { useSession } from "next-auth/react";
import Form from "next/form";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const session = useSession()
    const [post, setPost] = useState<Post>({
        id: undefined,
        title: undefined,
        content: undefined,
        category: undefined,
        created_at: undefined,
        image_url: undefined
    })

    useEffect(() => {
        const fetchId = async () => {
            const { id } = await params
            setPost((prev) => ({
                ...prev,
                id: id
            }))
        }

        if(!post.id) fetchId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${getBaseUrl()}/api/post/${post.id}`, {
                credentials: 'include'
            })
            const json = await response.json()

            setPost((prev) => ({
                ...prev,
                title: json.title,
                content: json.content,
                category: json.category,
            }))
        }

        if(post.id){
            fetchPost()
        }
    }, [post.id])

    const onChangeContent = useCallback((value?: string) => {
        setPost((prev) => ({
            ...prev,
            content: value
        }))
    }, [])

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({
            ...prev,
            title: e.target.value
        }))
    }, [])

    const onChangeCategory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPost((prev) => ({
            ...prev,
            category: e.target.value
        }))
    }, [])

    const onSubmit = useCallback((formData: FormData) => {
        const body = new FormData()
        body.append("title", formData.get("title") as string)
        body.append("category", formData.get("category") as string)
        body.append("thumbnail", formData.get("thumbnail") as File)
        body.append("content", post.content as string)

        fetch(`/api/post/${post.id}`, {
            method: "PATCH",
            body
        }).then(() => {
            redirect("/")
        })
    }, [post])

    if(!session) {
        return <div>403</div>
    }

    return (
            <Form action={onSubmit} className="grid gap-y-5">
                <input placeholder="Thumbnail Image" type="file" name="thumbnail" />
                <div className="grid grid-cols-3 gap-x-3">
                    <input name="title" placeholder="제목" className="border w-full p-3 text-lg col-span-2" value={post.title} onChange={onChangeTitle} />
                    <input name="category" placeholder="카테고리" className="border w-full p-3 text-lg" value={post.category} onChange={onChangeCategory} />
                </div>
                <div className="container">
                    <MDEditor
                        height={600}
                        value={post.content}
                        onChange={onChangeContent}
                    />
                </div>
                <div>
                    <button type="submit" className="px-7 py-3 bg-bricn-100 active:bg-bricn-200">저장하기</button>
                </div>
            </Form>
    )
}
