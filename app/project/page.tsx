import { type Project, allProjects } from "contentlayer/generated";
import ContentList from "../components/contentThumb/ContentThumbList";
import GoogleAds from "../lib/GoogleAds";

export default function Page() {
	const projects = allProjects.sort((a: Project, b: Project) => {
		if (a.date > b.date) return -1;
		return 1;
	});

	return (
		<div>
			<GoogleAds />
			<ContentList contents={projects} />
		</div>
	);
}
