'use client';

import {
  KeyboardEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Skeleton } from './components/ui/skeleton';
import { getPosts, supabase } from './lib/supabase';
import { Tag } from './types/Tag';
import { Post } from './types/Post';
import Thumbnail from './components/content/Thumbnail';
import SearchParams from './components/post/SearchParams';
import Link from 'next/link';
import {
  IconChevronLeft,
  IconChevronRight,
  IconDots,
  IconFilterOff,
  IconReload,
} from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [loadingSearchParams, setLoadingSearchParams] = useState(false);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState<string | null>(null);
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
            .order('created_at', { ascending: false })
            .eq('is_published', true);
          if (data?.length !== 0) {
            setPosts(data as Post[]);
          }
        };
        searchPosts();
      }
    },
    [search]
  );

  const onFilterOff = useCallback(() => {
    const fetchInitialPosts = async () => {
      const { data } = await getPosts(tag, index);
      setPosts(data as Post[]);
      setIndex(data?.length ?? 0);
    };

    setTag(null);
    setSearch(null);
    fetchInitialPosts();
    redirect('/');
  }, [index, tag]);

  return (
    <div>
      <Suspense>
        <SearchParams
          setTag={setTag}
          setLoadingSearchParams={setLoadingSearchParams}
        />
      </Suspense>
      <div>
        <div className="relative">
          <Image
            src={'/images/mc_fnd.png'}
            alt="mc_fnd"
            width={1000}
            height={100}
            className="w-full h-fit rounded-sm aspect-video object-cover"
          />
          <div className="absolute bottom-4 font-semibold text-white flex w-full px-5">
            <div className="ml-auto flex items-center gap-x-1">
              <div className="bg-neutral-800 p-1 bg-opacity-50 rounded-sm">
                <IconChevronLeft />
              </div>
              <div className="bg-neutral-800 p-1 bg-opacity-50 rounded-sm">
                <IconChevronRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-x-6 mt-8">
        <div className="sm:col-span-6 col-span-7">
          <div className="grid gap-y-2">
            <input
              type="text"
              className="rounded-md bg-neutral-950 py-2 px-5 focus:w-full duration-200 outline-none border border-bricn-800"
              placeholder="검색하기"
              name="search"
              value={search ?? ''}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onSearch}
            ></input>
            {posts.length > 0 ? (
              <ul className="mx-auto w-full grid gap-y-2">
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
              className="bg-neutral-800 hover:bg-neutral-700 duration-300 py-2 flex rounded-md"
              onClick={onMorePosts}
            >
              <div className="flex mx-auto gap-x-3 items-center">
                <p>더보기</p>
                <IconReload />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 sm:grid hidden col-span-2 cursor-grab select-none w-full whitespace-nowrap h-fit sticky top-36">
          <div className="mb-3">
            {tags.map((c) => (
              <div
                onClick={() => onFiltertag(c.name)}
                className={`${tag === c.name ? 'text-bricn-100' : 'hover:text-bricn-200 text-bricn-300'} uppercase text-xl font-bold`}
                key={c.name}
              >
                <p className="">{c.name}</p>
              </div>
            ))}
          </div>
          <div className="flex mt-1 gap-x-1">
            <div
              onClick={onFilterOff}
              className="bg-neutral-900 border border-neutral-700 p-2 rounded-full hover:bg-neutral-800"
            >
              <IconFilterOff size={20} />
            </div>
            <Link
              href={'/post/tag'}
              className="bg-neutral-900 border-neutral-700 border hover:bg-neutral-800 p-2 rounded-full"
            >
              <IconDots size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
