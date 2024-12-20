import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/posts/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/post/${post._raw.flattenedPath}` },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `**/projects/*.md`,
  fields: {
    team: { type: 'string', required: false },
    title: { type: 'string', required: true },
    startDate: { type: 'date', required: true },
    endDate: { type: 'date', required: false }
  },
  computedFields: {
    url: { type: 'string', resolve: (project) => `/project/${project._raw.flattenedPath}` },
  },
}))

export default makeSource({ contentDirPath: 'content', documentTypes: [Post, Project] })
