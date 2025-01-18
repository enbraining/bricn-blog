"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Page(){
    const session = useSession()
    const [mounted, setMounted] = useState(false)

    const onSignIn = useCallback(() => {
        signIn("github")
    }, [])

    const onSignOut = useCallback(() => {
        signOut()
    }, [])

    useEffect(() => {
        setMounted(!!session.data)
    }, [session])

    return (
        <div className="grid">
            <div className="mx-auto grid gap-y-2">
                {
                    mounted
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
