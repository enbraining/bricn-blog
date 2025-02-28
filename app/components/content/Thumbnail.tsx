'use client';

import { formatYearMonthDay } from '@/app/lib/date';
import type { Post } from '@/app/types/Post';
import Link from 'next/link';
import H3 from '../basic/H3';
import readingTime from 'reading-time';

export default function Thumbnail({ post }: { post: Post }) {
  if (!post) return null;

  const reading = Math.ceil(readingTime(post.content || '').minutes);

  return (
    <li key={post.id} className="flex gap-x-3">
      <Link
        href={`/post/${post.id}`}
        className="group hover:border-neutral-400 hover:pl-9 duration-300 w-full border rounded-md px-7 py-5 border-neutral-300 bg-neutral-100"
      >
        <p className="text-neutral-700">{post.tag}</p>
        <H3>{post.title}</H3>
        <div className="gap-x-2 text-bricn-400 text-sm flex">
          <p>{`${formatYearMonthDay(post.created_at)}에 작성됨`}</p>
          <p>/</p>
          <p>{reading}분이면 읽음</p>
        </div>
      </Link>
    </li>
  );
}
