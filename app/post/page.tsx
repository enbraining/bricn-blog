'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';
import { supabase } from '../lib/supabase';
import { Category } from '../types/Category';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import SearchParams from '../components/post/SearchParams';
import Link from 'next/link';
import { Series } from '../types/Series';
import H3 from '../components/basic/H3';
import { formatYearMonthDay } from '../lib/date';
import Hr from '../components/basic/Hr';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [isReload, setReload] = useState(false);
  const isInitialRender = useRef(true);

  const getPosts = useCallback(async (value: string | null) => {
    const query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (value) {
      query.eq('category', value);
    }

    return await query;
  }, []);

  const fetchPosts = useCallback(async () => {
    const { data: posts } = await getPosts(category);
    setPosts(posts || []);
  }, [getPosts, category]);

  const fetchAllPosts = useCallback(async () => {
    const { data: posts } = await getPosts(null);
    setPosts(posts || []);
  }, [getPosts]);

  const onFilterCategory = useCallback((changedCategory: string) => {
    setCategory((prev) => (prev === changedCategory ? null : changedCategory));
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: categoryData } = await supabase.rpc('group_by_category');
      setCategories(categoryData.slice(0, 7));
      setReload(!isReload);
    };

    const fetchSeries = async () => {
      const { data: seriesData } = await supabase.from('series').select('*');
      setSeries(seriesData ?? []);
      console.log(seriesData?.length);
    };

    fetchCategories();
    fetchSeries();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (!category) {
      fetchAllPosts();
    } else {
      fetchPosts();
    }
  }, [fetchPosts, fetchAllPosts, category, isReload]);

  return (
    <div>
      <Suspense>
        <SearchParams setCategory={setCategory} />
      </Suspense>
      <div className="mb-8">
        <H3>Series</H3>
        <div className="grid grid-flow-col mt-2 gap-x-3 overflow-x-scroll py-2">
          {series.map((s) => (
            <Link
              href={`/post/series/${s.id}`}
              className="bg-bricn-800 px-6 py-3 w-80 rounded-sm"
              key={s.id}
            >
              <H3>{s.title}</H3>
              <p>{formatYearMonthDay(s.created_at)}</p>
            </Link>
          ))}
        </div>
        <Hr />
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
            {posts.map((post) => (
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
