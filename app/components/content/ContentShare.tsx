"use client"

import { useCallback } from "react";

export default function ContentShare({ path }: { path: string }) {
    const copyToClipboard = useCallback(async () => {
        try {
          await navigator.clipboard.writeText(`https://bricn.net${path}`);
          alert('클립보드에 복사되었습니다.');
        } catch (err) {
          console.error('클립보드 복사 실패:', err);
        }
    }, [path])

    return (
        <div className="flex gap-x-2 text-bricn-300">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div onClick={copyToClipboard} className="cursor-pointer">
                <p>공유하기</p>
            </div>
        </div>
    )
}
