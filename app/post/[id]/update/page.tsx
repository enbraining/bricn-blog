"use client"

import { getBaseUrl } from "@/app/lib/url";
import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const session = useSession()
    const [id, setId] = useState<string>("")
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [content, setContent] = useState("")

    useEffect(() => {
        const fetchId = async () => {
            const { id } = await params
            setId(id)
        }

        fetchId()
    }, [params])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${getBaseUrl()}/api/post/${id}`, {
                credentials: 'include'
            })
            const json = await response.json()

            setTitle(json.title)
            setContent(json.content)
            setCategory(json.category)
        }
        fetchPost()
    }, [id])


    const onChangeContent = useCallback((value?: string) => {
        setContent(value || "")
    }, [])

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    const onChangeCategory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value)
    }, [])

    const onSubmit = useCallback(() => {
        fetch(`/api/post/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                title: title,
                content: content,
                category: category
            }),
        }).then(() => {
            redirect("/")
        })
    }, [id, title, content, category])

    if(!session) {
        return <div>403</div>
    }

    return (
        <div className="grid gap-y-5">
            <div className="grid grid-cols-3 gap-x-3">
                <input placeholder="제목" className="border w-full p-3 text-lg col-span-2" value={title} onChange={onChangeTitle} />
                <input placeholder="카테고리" className="border w-full p-3 text-lg" value={category} onChange={onChangeCategory} />
            </div>
            <div className="container">
                <MDEditor
                    height={600}
                    value={content}
                    onChange={onChangeContent}
                />
            </div>
            <div>
                <button onClick={onSubmit} type="submit" className="px-7 py-3 bg-bricn-100 active:bg-bricn-200">저장하기</button>
            </div>
        </div>
    )
}
