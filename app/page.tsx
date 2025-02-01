'use client';

import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Category } from './types/Category';
import { Post } from './types/Post';
import H3 from './components/basic/H3';
import { formatYearMonthDay } from './lib/date';
import Hr from './components/basic/Hr';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchPosts = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      setPosts(fetchPosts.data || []);
    };

    const fetchCategories = async () => {
      const query = await supabase.rpc('group_by_category');
      const data = query.data;
      setCategories(data);
    };

    fetchPosts();
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <H3>안녕하세요, 저는 김동학입니다.</H3>
        <p>주로 HAM radio, 알고리즘이나 체스를 좋아합니다.</p>
      </div>
      <Hr />
      <div className="mb-3">
        {categories.slice(0, 5).map((c) => (
          <div className="hover:text-bricn-500 text-bricn-700" key={c.name}>
            <p className="uppercase">{`${c.name} ${c.count}`}</p>
          </div>
        ))}
        <p className="hover:text-bricn-500 text-bricn-700">...</p>
        <p className="mt-4">
          {formatYearMonthDay(posts.at(posts.length - 1)?.created_at)}에
          시작해서
        </p>
        <p>지금까지 {posts.length}개의 게시글을 작성했습니다.</p>
      </div>
      <div>
        <p>2025년 기준으로 광주소프트웨어마이스터고등학교 재학중이며</p>
        <p>정보처리산업기사와 데이터베이스를 배우고 있습니다.</p>
      </div>
    </div>
  );
}
