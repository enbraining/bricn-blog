'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';
import { supabase } from '../lib/supabase';
import { Category } from '../types/Category';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import readingTime from 'reading-time';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const category = useRef<string | null>(null);
  const [isFilterShort, setFilterShort] = useState(true);

  const getPosts = useCallback(async (categoryParam?: string) => {
    const query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (categoryParam) {
      query.eq('category', categoryParam);
    }

    return await query;
  }, []);

  const fetchPosts = useCallback(
    async (categoryParam?: string) => {
      const { data: posts } = await getPosts(categoryParam);
      setPosts(posts || []);
    },
    [getPosts]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.rpc('group_by_category');
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts(category.current ?? undefined);
  }, [fetchPosts]);

  const onFilterCategory = useCallback(
    (changedCategory: string) => {
      if (category.current === changedCategory) {
        category.current = null;
      } else {
        category.current = changedCategory;
      }

      fetchPosts(category.current ?? undefined);
    },
    [category, fetchPosts]
  );

  return (
    <div>
      <div className="flex items-center gap-x-2 mb-3">
        <input
          checked={isFilterShort}
          onChange={() => setFilterShort(!isFilterShort)}
          type="checkbox"
        />
        <label>짧은 글 허용</label>
      </div>
      <div className="mb-3 overflow-x-auto cursor-grab select-none gap-y-4 whitespace-nowrap">
        <div className="flex gap-x-4">
          {categories.slice(0, categories.length / 2).map((c) => (
            <div
              onClick={() => onFilterCategory(c.name)}
              className={`${category.current === c.name ? 'text-bricn-300' : 'hover:text-bricn-500 text-bricn-700'}`}
              key={c.name}
            >
              <p className="uppercase">{c.name}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-x-4">
          {categories
            .slice(categories.length / 2 + 1, categories.length - 1)
            .map((c) => (
              <div
                onClick={() => onFilterCategory(c.name)}
                className={`${category.current === c.name ? 'text-bricn-300' : 'hover:text-bricn-500 text-bricn-700'}`}
                key={c.name}
              >
                <p className="uppercase">{c.name}</p>
              </div>
            ))}
        </div>
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
