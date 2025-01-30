'use client';

import { formatYearMonthDay } from '@/app/lib/date';
import type { Post } from '@/app/types/Post';
import Image from 'next/image';
import Link from 'next/link';
import H3 from '../basic/H3';

export default function Thumbnail({ post }: { post: Post }) {
  if (!post) return null;
  return (
    <li key={post.id}>
      <Link href={`/post/${post.id}`} className="pb-3 grid gap-y-2 group">
        <div className="rounded-xl aspect-[6/3] bg-bricn-800">
          {post.image_url && (
            <div className="aspect-[6/3] relative overflow-hidden rounded-xl">
              <Image
                src={post.image_url}
                alt="Thumbnail Image"
                className="group-hover:scale-110 rounded-xl absolute inset-0 object-cover transition-transform duration-300"
                fill
              />
            </div>
          )}
        </div>
        <div>
          <H3>{post.title}</H3>
          <div className="flex gap-x-4 text-bricn-100 text-sm">
            <p>{`${formatYearMonthDay(post.created_at)}에 생성됨`}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
