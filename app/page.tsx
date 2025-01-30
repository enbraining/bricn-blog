'use client';

import { useCallback, useEffect, useState } from 'react';
import ContentThumbnailList from './components/thumbnail/ThumbnailList';
import { Skeleton } from './components/ui/skeleton';
import { supabase } from './lib/supabase';
import { Category } from './types/Category';
import { Post } from './types/Post';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | null>(null);

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

  useEffect(() => {
    const getPosts = async () => {
      const query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) {
        query.eq('category', category);
      }

      return await query;
    };

    const fetchPosts = async () => {
      const { data: posts } = await getPosts();
      setPosts(posts || []);
    };
    fetchPosts();
  }, [category]);

  const onFilterCategory = useCallback(
    (changedCategory: string) => {
      if (category != null && category === changedCategory) {
        setCategory(null);
      } else {
        setCategory(changedCategory);
      }
    },
    [category]
  );

  return (
    <div>
      <div className="flex my-3">
        <div className="flex gap-x-5 overflow-x-auto">
          {categories.map((c) => (
            <div
              onClick={() => onFilterCategory(c.name)}
              className={`${category === c.name ? 'text-bricn-700' : 'hover:text-bricn-600 text-bricn-800'}`}
              key={c.name}
            >
              <p className="whitespace-nowrap text-2xl uppercase font-bold">{`${c.name} ${c.count}`}</p>
            </div>
          ))}
        </div>
      </div>
      {posts.length > 0 ? (
        <ContentThumbnailList posts={posts} />
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
