import ContentShare from "./ContentShare";
import ContentTitle from "./ContentTitle";

export default function ContentBio({ title, id }: {
    title: string;
    createdAt: string;
    readingTime: number;
    id: string;
}){
    return (
        <div>
            <div className="grid border-b mt-5 mb-12 pb-3 gap-y-4">
                <ContentTitle>{title}</ContentTitle>
                <ContentShare path={`/post/${id}`} />
            </div>
        </div>
    )
}
