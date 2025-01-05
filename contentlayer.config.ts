import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
	name: "Post",
	filePathPattern: `**/posts/*.md`,
	fields: {
		title: { type: "string", required: true },
		date: { type: "date", required: true },
		category: {
			type: "enum",
			options: ["Computer", "IT", "Science", "Other"],
			required: true,
			default: "Other",
		},
	},
	computedFields: {
		url: {
			type: "string",
			resolve: (post) => `/post/${post._raw.flattenedPath}`,
		},
	},
}));

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: `**/projects/*.md`,
	fields: {
		team: { type: "string", required: false },
		title: { type: "string", required: true },
		date: { type: "date", required: true },
		endDate: { type: "date", required: false },
	},
	computedFields: {
		url: {
			type: "string",
			resolve: (project) => `/project/${project._raw.flattenedPath}`,
		},
	},
}));

export default makeSource({
	contentDirPath: "content",
	documentTypes: [Post, Project],
});
