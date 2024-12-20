"use client";

import GiscusComment from "@/app/components/GiscusComment";
import { formatYearMonth } from "@/app/lib/date";
import { IconCalendarWeek, IconUsers } from "@tabler/icons-react";
import { Project, allProjects } from "contentlayer/generated";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import gfm from "remark-gfm";

export default function Page({
	params,
}: { params: Promise<{ slug: string }> }) {
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
				<div className="flex gap-x-2 items-center text-neutral-600">
					<IconUsers size={18} stroke={2} />
					<p>{project?.team || "개인"}</p>
				</div>
				<div className="flex gap-x-2 items-center text-neutral-600">
					<IconCalendarWeek size={18} stroke={2} />
					<p>{formatYearMonth(project?.startDate)}</p>
					<p>–</p>
					<p>{formatYearMonth(project?.endDate)}</p>
				</div>
			</div>
			<h1 className="text-4xl font-medium text-neutral-700 mb-12">
				{project?.title}
			</h1>
			<Markdown
				components={{
					code({ inline, className, children, ...props }) {
						const match = /language-(\w+)/.exec(className || "");

						if (!inline && match) {
							return (
								<SyntaxHighlighter {...props} language={match[1]} PreTag="div">
									{String(children).replace(/\n$/, "")}
								</SyntaxHighlighter>
							);
						}
						return (
							<code
								{...props}
								className={`${className || ""} inline-code text-[#905]`}
							>
								{children}
							</code>
						);
					},
				}}
				remarkPlugins={[gfm]}
				className="markdown-content"
			>
				{project?.body.raw || ""}
			</Markdown>
			<GiscusComment />
		</div>
	);
}
