import { type Post, allPosts } from "contentlayer/generated";
import ContentList from "../components/contentThumb/ContentThumbList";
import GoogleAds from "../lib/GoogleAds";

export default function Page() {
	const posts = allPosts.sort((a: Post, b: Post) => {
		if (a.date > b.date) return -1;
		return 1;
	});

	return (
		<div>
			<GoogleAds />
			<ContentList contents={posts} />
		</div>
	);
}
