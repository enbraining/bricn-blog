"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import SignIn from "./SignIn"
import { SignOut } from "./SignOut"

export function SignToggle(){
    const [mounted, setMounted] = useState(false)
    const {data: session} = useSession()

    useEffect(() => {
        setMounted(!!session)
    }, [session])

    return (
        mounted ? (
            <div className="flex items-center gap-x-4">
                <Link href="/post/new">작성하기</Link>
                <SignOut />
            </div>
        ) : (
            <SignIn />
        )
    )
}
