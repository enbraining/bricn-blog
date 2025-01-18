"use client"

import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Page(){
    const [session, setSession] = useState<Session | null>(null)

    const onSignOut = useCallback(async () => {
        await supabase.auth.signOut()
        redirect("/auth/signin")
    }, [])

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession()
            setSession(data.session)

            if (!data.session) {
                redirect("/auth/signin");
            }
        }

        fetchSession()
    }, [])

    return (
        <div className="grid">
            <div className="mx-auto grid gap-y-2 text-center">
                    <h1>{session?.user.email}</h1>
                    <button className="border px-52 py-3 rounded-sm" onClick={onSignOut}>로그아웃</button>
                    <Link className="border px-52 py-3 rounded-sm" href="/post/new">작성하기</Link>
            </div>
        </div>
    )
}
