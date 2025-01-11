import { type Post, allPosts } from "contentlayer/generated";
import ContentList from "../components/contentThumb/ContentThumbList";
import Seo from "../lib/Seo";

export default function Page() {
	const posts = allPosts.sort((a: Post, b: Post) => {
		if (a.date > b.date) return -1;
		return 1;
	});

	return (
		<div>
            <Seo title="블로그" />
			<ContentList contents={posts} />
		</div>
	);
}
