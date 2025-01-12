"use client"

import MDEditor from "@uiw/react-md-editor";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useState } from "react";

export default function Page(){
    const session = useSession()

    const [content, setContent] = useState("**Hello world!!!**");
    const [title, setTitle] = useState("");

    const onChangeContent = useCallback((value?: string) => {
        setContent(value || "");
    }, [])

    const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    const onSubmit = useCallback(() => {
        fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                content: content
            }),
        }).then(() => {
            redirect("/")
        })
    }, [title, content])

    if(!session || session.data?.user?.email !== "me@bricn.net") {
        return <div>403</div>
    }

    return (
        <div className="grid gap-y-5">
            <input placeholder="제목" className="border w-full p-3 text-lg" value={title} onChange={onChangeTitle} />
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
