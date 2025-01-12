"use client"

import { type MouseEvent, useCallback } from "react";

export default function ContentShare({ path }: { path: string }) {
    const copyToClipboard = useCallback(async (event: MouseEvent<HTMLElement>) => {
        event.preventDefault()
        try {
          await navigator.clipboard.writeText(`https://bricn.net${path}`);
          alert('클립보드에 복사되었습니다.');
        } catch (err) {
          console.error('클립보드 복사 실패:', err);
        }
    }, [path])

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div onClick={copyToClipboard}>
            <p>복사하기</p>
        </div>
    )
}
