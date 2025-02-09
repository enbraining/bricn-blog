'use client';

import {
  Dispatch,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Skeleton } from '../components/ui/skeleton';
import { supabase } from '../lib/supabase';
import { Category } from '../types/Category';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import readingTime from 'reading-time';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SearchParams({
  setQueryString,
}: {
  setQueryString: Dispatch<SetStateAction<string | null>>;
}) {
  const searchParams = useSearchParams();
  setQueryString(searchParams.get('category'));

  return <></>;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [queryString, setQueryString] = useState<string | null>(null);
  const [isFilterShort, setFilterShort] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) {
        query.eq('category', queryString);
      }

      const { data } = await query;

      setPosts(data || []);
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
      <Suspense>
        <SearchParams setQueryString={setQueryString} />
      </Suspense>
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
            className={`${category === c.name ? 'text-bricn-300' : 'hover:text-bricn-500 text-bricn-700'}`}
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
