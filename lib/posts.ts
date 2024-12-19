"use server"

import { Post } from '@/app/type/post';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path from 'path';

export async function getPost(slug: string){
    const allPosts = await getAllPosts()
    return await allPosts.find((post) => post.slug === slug) as Post;
}

export async function getAllPosts() {
  const fileNames = await fs.readdir('/public/posts');

  return await Promise.all(fileNames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join('./public/posts', fileName)
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
    };
  })) as Post[];
}
