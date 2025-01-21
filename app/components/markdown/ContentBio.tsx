import H1 from "../basic/H1";
import ContentShare from "./ContentShare";

export default function ContentBio({ title, id }: {
    title: string;
    createdAt: string;
    readingTime: number;
    id: string;
}){
    return (
        <div>
            <div className="grid border-b mt-5 mb-12 pb-3 gap-y-4">
                <H1>{title}</H1>
                <ContentShare path={`/post/${id}`} />
            </div>
        </div>
    )
}
