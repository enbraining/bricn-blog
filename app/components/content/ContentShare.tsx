"use client"

import { useCallback } from "react";
import IconBrandX from "../icons/IconBrandX";
import IconCopy from "../icons/IconCopy";

export default function ContentShare({ path, title }: { path: string, title: string }) {
    const copyToClipboard = useCallback(async () => {
        try {
          await navigator.clipboard.writeText(`https://bricn.net${path}`);
          alert('클립보드에 복사되었습니다.');
        } catch (err) {
          console.error('클립보드 복사 실패:', err);
        }
    }, [path])

    const onClickShareX = useCallback(() => {
        const link = `https://bricn.net${path}`;
        const text = `Bricn | ${title}`.replaceAll(" ", "%20");
        const twitterIntent = `https://twitter.com/intent/tweet?text=${text}&url=${link}`;
        window.open(twitterIntent, '_blank');
    }, [path, title])

    return (
        <div className="flex gap-x-2 text-bricn-300">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div onClick={copyToClipboard} className="cursor-pointer">
                <IconCopy size={24} />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div onClick={onClickShareX} className="cursor-pointer">
                <IconBrandX size={24} />
            </div>
        </div>
    )
}
