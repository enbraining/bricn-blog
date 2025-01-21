"use client"

import { MDEditor } from "@/app/components/editor/MDEditor";
import { config } from "@/app/lib/config";
import { supabase } from "@/app/lib/supabase";
import { Post } from "@/app/types/Post";
import Form from "next/form";
import { redirect } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const [session, setSession] = useState(false)
    const [id, setId] = useState("")
    const [post, setPost] = useState<Post>({} as Post)

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            if(data.session) setSession(!!data.session)
        }
        fetchSession()
    }, [])

    useEffect(() => {
        const fetchId = async () => {
            const { id } = await params
            setId(id)
        }

        if(!id) fetchId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase.from("posts").select("*").eq("id", id).single()

            const title = data.title
            const content = data.content
            const category = data.category

            setPost((prev) => ({
                ...prev, title, content, category
            }))

            const fileBody = {
                title, content, category
            }

            await supabase.storage.from(config.supabaseBucketName).upload(`history/${new Date().toISOString().slice(0, 19)}.txt`, JSON.stringify(fileBody))
        }

        if(id) fetchPost()
    }, [id])

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
        const thumbnail = formData.get("thumbnail") as File
        const category = formData.get("category") as string
        const title = formData.get("title") as string
        const content = post.content
        const bucketName = config.supabaseBucketName

        const updatePost = async () => {
                let imageUrl: string | null = null

                if(thumbnail?.size !== 0 && thumbnail){
                    const { data: uploadData } = await supabase.storage.from(bucketName)
                        .upload(`thumbnail/${id}.jpg`, thumbnail, {
                            upsert: true
                        })

                    const path = uploadData?.path as string
                    imageUrl = await supabase.storage.from(bucketName)
                        .getPublicUrl(path)
                        .data
                        .publicUrl
                }

                const updateData: Record<string, string | undefined> = {
                    title: title,
                    category: category,
                    content: content,
                }

                if(imageUrl !== null){
                    updateData.image_url = imageUrl
                }

                await supabase.from('posts')
                    .update(updateData)
                    .eq('id', id)
        }

        updatePost()
        redirect(`/post/${id}`)
    }, [post, id])

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
                <div>
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
