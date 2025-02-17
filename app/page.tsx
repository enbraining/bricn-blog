'use client';

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Tag } from './types/Tag';
import { Post } from './types/Post';
import H3 from './components/basic/H3';
import { formatYearMonthDay } from './lib/date';
import Link from 'next/link';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchPosts = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      setPosts(fetchPosts.data || []);
    };

    const fetchtags = async () => {
      const query = await supabase.rpc('group_by_tag');
      const data = query.data;
      setTags(data);
    };

    fetchPosts();
    fetchtags();
  }, []);

  return (
    <div className="grid gap-y-8">
      <div>
        <H3>안녕하세요, 저는 김동학입니다.</H3>
        <H3>주로 HAM radio, 알고리즘이나 인문학을 좋아합니다.</H3>
      </div>
      <div>
        {tags.slice(0, 5).map((c) => (
          <Link
            href={'/post'}
            className="hover:text-bricn-500 text-bricn-700"
            key={c.name}
          >
            <p className="uppercase">{`${c.name} ${c.count}`}</p>
          </Link>
        ))}
        <p className="hover:text-bricn-500 text-bricn-700">...</p>
        <p className="mt-4">
          {formatYearMonthDay(posts.at(posts.length - 1)?.created_at)}에
          시작해서
        </p>
        <p>지금까지 {posts.length}개의 게시글을 작성했습니다.</p>
      </div>
      <div>
        <p>제 글을 읽으면서 항상 의심해주세요.</p>
        <p>어떤 글이든지 스스로 판단하고, 검증하는 과정이 필요합니다.</p>
      </div>
    </div>
  );
}
