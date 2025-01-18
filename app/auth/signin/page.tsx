"use client"

import { supabase } from "@/app/lib/supabase"
import Form from "next/form"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export default function Page(){
    const router = useRouter()
    const onSubmit = useCallback((formData: FormData) => {
        const body = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        const fetchToken = async () => {
            await supabase.auth.signInWithPassword(body)
        }

        fetchToken()
        router.push("/auth")
    }, [router])

    return (
        <div className="grid">
            <Form action={onSubmit} className="mx-auto grid gap-y-2">
                <input className="border rounded-sm p-2" type="email" name="email"></input>
                <input className="border rounded-sm p-2" type="password" name="password"></input>
                <button className="border rounded-sm p-2" type="submit">로그인</button>
            </Form>
        </div>
    )
}
