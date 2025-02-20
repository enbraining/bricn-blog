'use client';

import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Skeleton } from '../components/ui/skeleton';
import { getPosts, supabase } from '../lib/supabase';
import { Tag } from '../types/Tag';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import SearchParams from '../components/post/SearchParams';
import Link from 'next/link';
import { IconReload } from '@tabler/icons-react';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [loadingSearchParams, setLoadingSearchParams] = useState(false);
  const [index, setIndex] = useState(0);
  const isInitialRender = useRef(true);

  const onFiltertag = useCallback(
    (changedTag: string) => {
      setTag((prev) => (prev === changedTag ? null : changedTag));

      const fetchFilterPosts = async () => {
        const { data } = await getPosts(tag, index);
        setPosts(data as Post[]);
        setIndex(data?.length ?? 0);
      };
      fetchFilterPosts();
    },
    [index, tag]
  );

  useEffect(() => {
    const fetchTags = async () => {
      const { data: tagData } = await supabase.rpc('group_by_tag');
      setTags(tagData.slice(0, 7));
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const fetchInitialPosts = async () => {
      const { data } = await getPosts(tag, index);
      setPosts(data as Post[]);
      setIndex(data?.length ?? 0);
    };

    if (posts.length === 0 && loadingSearchParams) {
      fetchInitialPosts();
    }
  }, [index, loadingSearchParams, posts.length, tag]);

  const onMorePosts = useCallback(() => {
    const fetchPosts = async () => {
      const { data } = await getPosts(tag, index);
      setPosts((prev) => [...prev, ...(data as Post[])]);
      setIndex((prev) => prev + (data?.length ?? 0));
    };

    fetchPosts();
  }, [tag, index]);

  return (
    <div>
      <Suspense>
        <SearchParams
          setTag={setTag}
          setLoadingSearchParams={setLoadingSearchParams}
        />
      </Suspense>
      <div className="mb-3 overflow-x-auto cursor-grab flex select-none gap-x-4 whitespace-nowrap">
        {tags.map((c) => (
          <div
            onClick={() => onFiltertag(c.name)}
            className={`${tag === c.name ? 'text-bricn-300' : 'hover:text-bricn-500 text-bricn-700'}`}
            key={c.name}
          >
            <p className="uppercase">{c.name}</p>
          </div>
        ))}
        <Link href={'/post/tag'}>더보기</Link>
      </div>
      {posts.length > 0 ? (
        <div className="grid">
          <ul className="mx-auto w-full mb-2">
            {posts.map((post) => (
              <Thumbnail post={post} key={post.id} />
            ))}
          </ul>
          <div
            className="bg-bricn-800 hover:bg-bricn-700 duration-300 py-2 flex rounded-md"
            onClick={onMorePosts}
          >
            <div className="flex mx-auto gap-x-3 items-center">
              <p>더보기</p>
              <IconReload />
            </div>
          </div>
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
