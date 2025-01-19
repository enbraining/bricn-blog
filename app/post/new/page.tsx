"use client"

import { config } from "@/app/lib/config";
import { supabase } from "@/app/lib/supabase";
import MDEditor from "@uiw/react-md-editor";
import Form from 'next/form';
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page(){
    const [session, setSession] = useState(false)
    const [content, setContent] = useState<string>("")

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            if(data.session) setSession(!!data.session)
        }
        fetchSession()
    }, [])

    const onChangeContent = useCallback((value?: string) => {
        setContent(value || "")
    }, [])

    const onSubmit = useCallback((formData: FormData) => {
        const title = formData.get("title")
        const category = formData.get("category")
        const thumbnail = formData.get("thumbnail") as File
        const bucketName = config.supabaseBucketName || ""

        const createPost = async () => {
            const { data: savedData } = await supabase.from('posts')
                .insert({
                    title: title,
                    content: content,
                    category: category,
                })
                .select()

            if(thumbnail.size !== 0){
                const savedPost = savedData?.at(0)

                const { data: uploadData } = await supabase.storage.from(bucketName)
                .upload(`thumbnail/${savedPost.id}.jpg`, thumbnail, {
                    upsert: true
                })

                if(uploadData){
                    const imageUrl = await supabase.storage.from(bucketName)
                        .getPublicUrl(uploadData?.path)
                        .data
                        .publicUrl

                    const { error } = await supabase.from('posts')
                        .update({
                            image_url: imageUrl
                        })
                        .eq("id", savedPost.id)

                    console.log(error?.cause)
                }
            }
        }

        createPost()
        redirect("/post")
    }, [content])

    const onKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            event.preventDefault()
        }
    }, [])

    if(!session) {
        return <div>403</div>
    }

    return (
        <Form action={onSubmit} onSubmit={() => { return false }} className="grid gap-y-5">
            <input placeholder="Thumbnail Image" type="file" name="thumbnail" />
            <div className="grid grid-cols-3 gap-x-3">
                <input onKeyDown={onKeyDown} name="title" placeholder="제목" className="border w-full p-3 text-lg col-span-2" />
                <input onKeyDown={onKeyDown} name="category" placeholder="카테고리" className="border w-full p-3 text-lg" />
            </div>
            <div>
                <MDEditor
                    height={600}
                    value={content}
                    onChange={onChangeContent}
                />
            </div>
            <div>
                <button type="submit" className="px-7 py-3 bg-bricn-100 active:bg-bricn-200">저장하기</button>
            </div>
        </Form>
    )
}
