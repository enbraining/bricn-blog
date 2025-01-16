import dynamic from "next/dynamic";

export const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
    ssr: false,
});
