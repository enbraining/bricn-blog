"use client"

import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import Form from 'next/form';
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";

export default function Page(){
    const session = useSession()
    const [content, setContent] = useState<string>("")

    const onChangeContent = useCallback((value?: string) => {
        setContent(value || "")
    }, [])

    const onSubmit = useCallback((formData: FormData) => {
        const title = formData.get("title")
        const category = formData.get("category")
        const thumbnail = formData.get("thumbnail") as File

        const body = new FormData()
        body.append("title", title as string)
        body.append("category", category as string)
        body.append("content", content)
        body.append("thumbnail", thumbnail)

        fetch("/api/post", {
            method: "POST",
            body
        }).then(() => {
            redirect("/")
        })
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
            <div className="container">
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
