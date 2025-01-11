import { type Project, allProjects } from "contentlayer/generated";
import ContentList from "../components/contentThumb/ContentThumbList";
import Seo from "../lib/Seo";

export default function Page() {
	const projects = allProjects.sort((a: Project, b: Project) => {
		if (a.date > b.date) return -1;
		return 1;
	});

	return (
		<div>
            <Seo title={"프로젝트 모음"} />
			<ContentList contents={projects} />
		</div>
	);
}
