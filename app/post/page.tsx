'use client';

import {
  KeyboardEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const [search, setSearch] = useState<string>('');
  const isInitialRender = useRef(true);

  const onFiltertag = useCallback(
    (changedTag: string) => {
      const changeTag = tag === changedTag ? null : changedTag;
      setTag(changeTag);

      const INITIAL_INDEX = 0;
      const fetchFilterPosts = async () => {
        const { data } = await getPosts(changeTag, INITIAL_INDEX);
        setIndex(data?.length ?? INITIAL_INDEX);
        setPosts(data as Post[]);
      };
      fetchFilterPosts();
    },
    [tag]
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
  }, [index, loadingSearchParams, tag]);

  const onMorePosts = useCallback(() => {
    const fetchPosts = async () => {
      const { data } = await getPosts(tag, index);
      setPosts((prev) => [...prev, ...(data as Post[])]);
      setIndex((prev) => prev + (data?.length ?? 0));
    };

    fetchPosts();
  }, [tag, index]);

  const onSearch = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        console.log(search);
        const searchPosts = async () => {
          const { data } = await supabase
            .from('posts')
            .select('*')
            .ilike('title', `%${search}%`)
            .order('created_at', { ascending: false });
          if (data?.length !== 0) {
            setPosts(data as Post[]);
          }
        };
        searchPosts();
      }
    },
    [search]
  );

  return (
    <div>
      <Suspense>
        <SearchParams
          setTag={setTag}
          setLoadingSearchParams={setLoadingSearchParams}
        />
      </Suspense>
      <div className="grid grid-cols-7 gap-x-5">
        <div className="sm:col-span-5 col-span-7">
          <div className="grid gap-y-2">
            <input
              type="text"
              className="rounded-md bg-bricn-800 py-2 px-5 ml-auto w-1/3 focus:w-full duration-200 outline-none"
              placeholder="검색하기"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onSearch}
            ></input>
            {posts.length > 0 ? (
              <ul className="mx-auto w-full mb-2 grid gap-y-2">
                {posts.map((post) => (
                  <Thumbnail post={post} key={post.id} />
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                <Skeleton className="aspect-square" />
                <Skeleton className="aspect-square" />
                <Skeleton className="aspect-square" />
                <Skeleton className="aspect-square" />
              </div>
            )}
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
        </div>
        <div className="mb-3 overflow-x-auto sm:grid hidden col-span-2 cursor-grab select-none w-full gap-x-4 whitespace-nowrap border rounded-md px-7 py-5 border-bricn-800 h-fit sticky top-36">
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
      </div>
    </div>
  );
}
