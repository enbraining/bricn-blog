
"use client"

import { signIn } from "next-auth/react"
import { useCallback } from "react"

export default function SignIn() {
     const onClick = useCallback(() => {
        signIn("github")
     }, [])

  return <button type="button" onClick={onClick}>로그인</button>
}
