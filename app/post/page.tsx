'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';
import { supabase } from '../lib/supabase';
import { Category } from '../types/Category';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import readingTime from 'reading-time';
import SearchParams from '../components/post/SearchParams';
import Link from 'next/link';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [isFilterShort, setFilterShort] = useState(true);
  const isInitialRender = useRef(true);

  const getPosts = useCallback(async () => {
    const query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (category) {
      query.eq('category', category);
    }

    return await query;
  }, [category]);

  const fetchPosts = useCallback(async () => {
    const { data: posts } = await getPosts();
    setPosts(posts || []);
  }, [getPosts]);

  const onFilterCategory = useCallback(
    (changedCategory: string) => {
      if (category === changedCategory) {
        setCategory(null);
      } else {
        setCategory(changedCategory);
      }
    },
    [category]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.rpc('group_by_category');
      setCategories(data.slice(0, 7));
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    fetchPosts();
  }, [fetchPosts, category]);

  return (
    <div>
      <Suspense>
        <SearchParams setCategory={setCategory} />
      </Suspense>
      <div className="flex items-center gap-x-2 mb-3">
        <input
          checked={isFilterShort}
          onChange={() => setFilterShort(!isFilterShort)}
          type="checkbox"
        />
        <label>짧은 글 허용</label>
      </div>
      <div className="mb-3 overflow-x-auto cursor-grab flex select-none gap-x-4 whitespace-nowrap">
        {categories.map((c) => (
          <div
            onClick={() => onFilterCategory(c.name)}
            className={`${category === c.name ? 'text-bricn-300' : 'hover:text-bricn-500 text-bricn-700'}`}
            key={c.name}
          >
            <p className="uppercase">{c.name}</p>
          </div>
        ))}
        <Link href={'/post/category'}>더보기</Link>
      </div>
      {posts.length > 0 ? (
        <div className="grid">
          <ul className="mx-auto w-full">
            {posts
              .filter((post) => {
                if (!isFilterShort) {
                  if (readingTime(post.content || '').minutes > 1) return true;
                  return false;
                }
                return true;
              })
              .map((post) => (
                <Thumbnail post={post} key={post.id} />
              ))}
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
        </div>
      )}
    </div>
  );
}
