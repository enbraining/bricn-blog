'use client';

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Skeleton } from '../components/ui/skeleton';
import { supabase } from '../lib/supabase';
import { Category } from '../types/Category';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import readingTime from 'reading-time';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function SearchParams({
  onChangeCategory,
}: {
  onChangeCategory: (value: string) => void;
}) {
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  if (category) {
    onChangeCategory(category);
  }

  return <></>;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const category = useRef<string | null>(null);
  const [isFilterShort, setFilterShort] = useState(true);
  const pathname = usePathname();

  const onChangeCategory = (value: string) => {
    category.current = value;
  };

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
  }, [pathname, fetchPosts]);

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

  const memoizedSearchParams = useMemo(
    () => (
      <Suspense>
        <SearchParams onChangeCategory={onChangeCategory} />
      </Suspense>
    ),
    []
  );

  return (
    <div>
      {memoizedSearchParams}
      <div className="flex items-center gap-x-2 mb-3">
        <input
          checked={isFilterShort}
          onChange={() => setFilterShort(!isFilterShort)}
          type="checkbox"
        />
        <label>짧은 글 허용</label>
      </div>
      <div className="mb-3 flex gap-x-5 overflow-x-auto cursor-grab select-none">
        {categories.slice(0, 8).map((c) => (
          <div
            onClick={() => onFilterCategory(c.name)}
            className={`${category.current === c.name ? 'text-bricn-300' : 'hover:text-bricn-500 text-bricn-700'}`}
            key={c.name}
          >
            <p className="whitespace-nowrap uppercase">{c.name}</p>
          </div>
        ))}
        <Link
          href={'/post/category'}
          className={`hover:text-bricn-500 text-bricn-700`}
        >
          <p className="whitespace-nowrap uppercase">더보기</p>
        </Link>
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
