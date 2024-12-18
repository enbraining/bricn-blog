"use server"

import { Post } from '@/app/type/post';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'public/posts');

export async function getPost(slug: string){
    const allPosts = await getAllPosts()
    return await allPosts.find((post) => post.slug === slug) as Post;
}

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      ...data,
      content,
    };
  }) as Post[];
}
