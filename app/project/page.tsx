import { IconCalendarWeek, IconUsers } from "@tabler/icons-react";

import { type Project, allProjects } from "contentlayer/generated";
import Link from "next/link";
import { formatYearMonth } from "../lib/date";

export default function Page() {
	const projects = allProjects.sort((a: Project, b: Project) => {
		if (a.startDate > b.startDate) return -1;
		return 1;
	});

	return (
		<div>
			<ul className="space-y-4">
				{projects.map((project: Project) => (
					<li key={project.url}>
						<Link href={project.url.replace(/projects\//gi, "")}>
							<div className="text-subtitle">
								<div className="flex gap-x-2 items-center">
									<IconUsers size={18} stroke={2} />
									<p>{project.team || "개인"}</p>
								</div>
								<div className="flex gap-x-2 items-center">
									<IconCalendarWeek size={18} stroke={2} />
									<p>{formatYearMonth(project.startDate)}</p>
									<p>–</p>
									<p>{formatYearMonth(project.endDate)}</p>
								</div>
							</div>
							<h1 className="text-xl text-title">{project.title}</h1>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
