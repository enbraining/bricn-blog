"use client";

import GiscusComment from "@/app/components/content/GiscusComment";
import MarkdownContent from "@/app/components/content/MarkdownContent";
import { formatYearMonth } from "@/app/lib/date";
import { IconCalendarWeek, IconUsers } from "@tabler/icons-react";
import { type Project, allProjects } from "contentlayer/generated";
import { useEffect, useState } from "react";

export default function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [slug, setSlug] = useState<string>("");
	const [project, setProject] = useState<Project>();

	useEffect(() => {
		const fetchSlug = async () => {
			const { slug } = await params;
			setSlug(slug);
		};
		fetchSlug();
	}, [params]);

	useEffect(() => {
		if (!slug) return;
		const fetchProject = allProjects.find((project: Project) => {
			console.log(project.url.replace(/^\/project\/projects\//, ""));
			console.log(project);
			return project.url.replace(/^\/project\/projects\//, "") === slug;
		});
		setProject(fetchProject);
		console.log(fetchProject?.body.html);
	}, [slug]);

	return (
		<div>
			<div className="mb-4">
				<div className="flex gap-x-2 items-center text-bricn-200">
					<IconUsers size={18} stroke={2} />
					<p>{project?.team || "개인"}</p>
				</div>
				<div className="flex gap-x-2 items-center text-bricn-200">
					<IconCalendarWeek size={18} stroke={2} />
					<p>{formatYearMonth(project?.date)}</p>
					<p>–</p>
					<p>{formatYearMonth(project?.endDate)}</p>
				</div>
			</div>
			<div className="flex">
                <h1 className="text-4xl font-semibold text-bricn-500 mb-12">
                    {project?.title}
                </h1>
                <p className="ml-auto">링크 복사</p>
            </div>
			<MarkdownContent content={project?.body.raw || ""} />
			<GiscusComment />
		</div>
	);
}
