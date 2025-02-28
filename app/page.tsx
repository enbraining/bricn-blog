'use client';

import {
  KeyboardEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getPosts, supabase } from './lib/supabase';
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
import { Tag } from './types/Tag';

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [tag, setTag] = useState<string>();
  const [loadingSearchParams, setLoadingSearchParams] = useState(false);
  const [lastPostCreatedAt, setLastPostCreatedAt] = useState<string>();
  const [search, setSearch] = useState<string>();
  const isInitialRender = useRef(true);

  const onFiltertag = useCallback(
    async (changedTag: string) => {
      const changeTag = tag === changedTag ? undefined : changedTag;
      setTag(changeTag);

      const { data } = await getPosts({
        value: changeTag,
      });
      setLastPostCreatedAt(data?.at(data.length - 1).created_at);
      setPosts(data as Post[]);
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
      const { data } = await getPosts({
        value: tag,
        cursor: lastPostCreatedAt,
      });
      setPosts(data as Post[]);
      setLastPostCreatedAt(data?.at(data.length - 1).created_at);
    };

    if (posts.length === 0 && loadingSearchParams) {
      fetchInitialPosts();
    }
  }, [loadingSearchParams, tag, lastPostCreatedAt]);

  const onMorePosts = useCallback(() => {
    const fetchPosts = async () => {
      const { data } = await getPosts({
        value: tag,
        search: search,
        cursor: lastPostCreatedAt,
      });
      setPosts((prev) => [...prev, ...(data as Post[])]);
      setLastPostCreatedAt(data?.at(data.length - 1).created_at);
    };

    fetchPosts();
  }, [tag, lastPostCreatedAt, search]);

  const onSearch = useCallback(
    async (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        const { data } = await getPosts({
          search: search,
        });

        setPosts(data as Post[]);
        setLastPostCreatedAt(data?.at(data.length - 1).created_at);
      }
    },
    [search]
  );

  const onFilterOff = useCallback(() => {
    const fetchInitialPosts = async () => {
      const { data } = await getPosts({});
      setPosts(data as Post[]);
      setLastPostCreatedAt(data?.at(data.length - 1).created_at);
    };

    setTag(undefined);
    setSearch(undefined);
    fetchInitialPosts();
    redirect('/');
  }, []);

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
              className="rounded-md bg-neutral-100 border border-neutral-300 py-2 px-7 focus:w-full duration-200 outline-none "
              placeholder="검색하기"
              name="search"
              value={search ?? ''}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={onSearch}
            ></input>
            <ul className="mx-auto w-full grid gap-y-2">
              {posts.map((post) => (
                <Thumbnail post={post} key={post.id} />
              ))}
            </ul>
            <div
              className="bg-neutral-100 border-neutral-300 border hover:bg-neutral-200 duration-300 py-2 flex rounded-md"
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
                className={`${tag === c.name ? 'text-neutral-900' : 'hover:text-neutral-800 text-neutral-400'} uppercase text-xl font-bold`}
                key={c.name}
              >
                <p className="">{c.name}</p>
              </div>
            ))}
          </div>
          <div className="flex mt-1 gap-x-1">
            <div
              onClick={onFilterOff}
              className="bg-neutral-100 border border-neutral-300 p-2 rounded-full hover:bg-neutral-200 duration-300"
            >
              <IconFilterOff size={20} />
            </div>
            <Link
              href={'/post/tag'}
              className="bg-neutral-100 border border-neutral-300 p-2 rounded-full hover:bg-neutral-200 duration-300"
            >
              <IconDots size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
