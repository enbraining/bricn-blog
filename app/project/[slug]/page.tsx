"use client";

import ContentShare from "@/app/components/content/ContentShare";
import ContentTitle from "@/app/components/content/ContentTitle";
import GiscusComment from "@/app/components/content/GiscusComment";
import MarkdownContent from "@/app/components/content/MarkdownContent";
import Seo from "@/app/lib/Seo";
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
		const fetchProject = allProjects.find((project: Project) =>
			project.url.replace(/^\/project\/projects\//, "") === slug
		);
		setProject(fetchProject);
	}, [slug]);

	return (
		<div>
            <Seo title={project?.title || ""} description={project?.body.raw.substring(0, 100) || ""} />
            <ContentTitle>{project?.title}</ContentTitle>
			<div className="mt-5 mb-12 sm:flex sm:gap-y-0 gap-y-4 grid pb-4 border-b">
				<div className="sm:flex grid gap-x-8">
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
                <div className="ml-auto">
                    <ContentShare path={project?.url.replace(/projects\//gi, "") || ""} title={project?.title || ""} />
                </div>
			</div>
			<MarkdownContent content={project?.body.raw || ""} />
			<GiscusComment />
		</div>
	);
}
