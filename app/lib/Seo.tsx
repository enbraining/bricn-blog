import { data } from "./data";

export default function Seo({ title, description }: { title: string; description?: string }) {
    return (
        <>
            <title>{`${data.siteName} | ${title}`}</title>
            <meta name="description" content={description ?? ""} />
        </>
    )
}
