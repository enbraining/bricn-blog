'use client';

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Post } from './types/Post';
import H3 from './components/basic/H3';
import { formatYearMonthDay } from './lib/date';
import Image from 'next/image';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import H4 from './components/basic/H4';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchPosts = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      setPosts(fetchPosts.data || []);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        <H3>Hello, this is Kim Donghak.</H3>
        <H4>I mainly like HAM radio, algorithms, and humanities.</H4>
      </div>
      <hr className="border-bricn-700 mt-6 mb-12" />
      <div>
        <div className="relative">
          <Image
            src={'/images/mc_fnd.png'}
            alt="mc_fnd"
            width={1000}
            height={100}
            className="w-full h-fit rounded-sm aspect-video object-cover"
          />
          <div className="absolute bottom-4 font-semibold text-white flex w-full px-5">
            <div className="ml-auto flex items-center gap-x-1">
              <div className="bg-neutral-800 p-1 bg-opacity-50 rounded-sm">
                <IconChevronLeft />
              </div>
              <div className="bg-neutral-800 p-1 bg-opacity-50 rounded-sm">
                <IconChevronRight />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-3 text-white items-center">
          <p>마인크래프트에서 구현한 7세그먼트</p>
          <p className="ml-auto">2025년 2월 25일</p>
        </div>
      </div>
      <div className="mt-14">
        <p>
          {formatYearMonthDay(posts.at(posts.length - 1)?.created_at)}에
          시작해서
        </p>
        <p>지금까지 {posts.length}개의 게시글을 작성했습니다.</p>
      </div>
    </div>
  );
}
