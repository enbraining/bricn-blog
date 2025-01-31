'use client';

import { formatYearMonthDay } from '@/app/lib/date';
import type { Post } from '@/app/types/Post';
import Link from 'next/link';
import H3 from '../basic/H3';
import readingTime from 'reading-time';

export default function Thumbnail({ post }: { post: Post }) {
  if (!post) return null;

  return (
    <li key={post.id}>
      <Link
        href={`/post/${post.id}`}
        className="py-3 grid gap-y-2 group hover:bg-bricn-800 hover:pl-5 duration-300"
      >
        <div>
          <H3>{post.title}</H3>
          <div className="gap-x-4 text-bricn-400 text-sm">
            <p>{`${formatYearMonthDay(post.created_at)}에 작성됨`}</p>
            <p>{`${Math.ceil(readingTime(post.content || '').minutes)}분이면 읽음`}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
