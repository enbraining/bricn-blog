"use client"

import { Post } from "@/app/types/Post";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";

export default function Page(){
    const session = useSession()
    const [post, setpost] = useState<Post>({
        id: "",
        title: "",
        content: "",
        created_at: "",
        category: ""
    })

    const onChangeContent = useCallback((value?: string) => {
        setpost((prev) => ({
            ...prev,
            content: value || "",
        }))
    }, [])

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setpost((prev) => ({
            ...prev,
            title: e.target.value
        }))
    }, [])

    const onChangeCategory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setpost((prev) => ({
            ...prev,
            category: e.target.value
        }))
    }, [])

    const onSubmit = useCallback(() => {
        fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title: post.title,
                content: post.content,
                category: post.category
            }),
        }).then(() => {
            redirect("/")
        })
    }, [post])

    if(!session) {
        return <div>403</div>
    }

    return (
        <div className="grid gap-y-5">
            <div className="grid grid-cols-3 gap-x-3">
                <input placeholder="제목" className="border w-full p-3 text-lg col-span-2" value={post.title} onChange={onChangeTitle} />
                <input placeholder="카테고리" className="border w-full p-3 text-lg" value={post.category} onChange={onChangeCategory} />
            </div>
            <div className="container">
                <MDEditor
                    height={600}
                    value={post.content}
                    onChange={onChangeContent}
                />
            </div>
            <div>
                <button onClick={onSubmit} type="submit" className="px-7 py-3 bg-bricn-100 active:bg-bricn-200">저장하기</button>
            </div>
        </div>
    )
}
