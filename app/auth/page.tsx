"use client"

import Link from "next/link";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Page(){
    const [session, setSession] = useState(false)

    const onSignIn = useCallback(() => {
        redirect("/auth/signin")
    }, [])

    const onSignOut = useCallback(async () => {
        await supabase.auth.signOut()
    }, [])

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            if(data.session) setSession(!!data.session)
        }
        fetchSession()
    }, [])

    return (
        <div className="grid">
            <div className="mx-auto grid gap-y-2">
                {
                    session
                        ? (
                            <div className="grid gap-y-2">
                                <button className="border px-52 py-3 rounded-sm" onClick={onSignOut}>로그아웃</button>
                                <Link className="border px-52 py-3 rounded-sm" href="/post/new">작성하기</Link>
                            </div>
                        )
                        : <button className="border px-52 py-3 rounded-sm" onClick={onSignIn}>로그인</button>
                }
            </div>
        </div>
    )
}
