import dynamic from "next/dynamic";

export const MarkdownEditor = dynamic(() => import("@uiw/react-md-editor"), {
    ssr: false,
});
