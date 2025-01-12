"use client"

import { signOut } from "next-auth/react"
import { useCallback } from "react"

export function SignOut() {
    const onClick = useCallback(() => {
        signOut()
     }, [])

  return <button type="button" onClick={onClick}>로그아웃</button>
}
