'use client';

import type { Post } from '@/app/types/Post';
import ContentThumbnail from './Thumbnail';

export default function ThumbnailList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid">
      <ul className="mx-auto w-full">
        {posts.map((post) => (
          <ContentThumbnail post={post} key={post.id} />
        ))}
      </ul>
    </div>
  );
}
