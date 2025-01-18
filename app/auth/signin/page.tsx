"use client"

import { supabase } from "@/app/lib/supabase"
import Form from "next/form"
import { useCallback } from "react"

export default function Page(){
    const onSubmit = useCallback((formData: FormData) => {
        const body = {
            email: formData.get("email") as string,
            password: formData.get("password") as string
        }

        const fetchToken = async () => {
            await supabase.auth.signInWithPassword(body)
        }

        fetchToken()
    }, [])

    return (
        <Form action={onSubmit}>
            <input type="email" name="email"></input>
            <input type="password" name="password"></input>
            <button type="submit"></button>
        </Form>
    )
}
