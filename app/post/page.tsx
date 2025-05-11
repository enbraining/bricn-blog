'use client';

import {
  KeyboardEvent,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getPosts, supabase } from '../lib/supabase';
import { Post } from '../types/Post';
import Thumbnail from '../components/content/Thumbnail';
import SearchParams from '../components/post/SearchParams';
import Link from 'next/link';
import { IconDots, IconFilterOff, IconReload } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { Tag } from '../types/Tag';

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
      <div className="grid grid-cols-8 gap-x-6 mt-20">
        <div className="md:col-span-6 col-span-8 grid gap-y-2">
          <input
            type="text"
            className="rounded-md bg-neutral-100 border border-neutral-300 py-2 pl-7 outline-none"
            placeholder="검색하기"
            name="search"
            value={search ?? ''}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={onSearch}
          ></input>
          <ul className="grid gap-y-2">
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
        <div className="mb-3 md:grid md:col-span-2 hidden cursor-grab select-none whitespace-nowrap h-fit sticky top-16">
          <div className="mb-3">
            {tags.map((c) => (
              <div
                onClick={() => onFiltertag(c.name)}
                className={`${tag === c.name ? 'text-neutral-900' : 'hover:text-neutral-800 text-neutral-400'} uppercase text-xl font-bold`}
                key={c.name}
              >
                <p className="">{`${c.name.substring(0, 11)}${c.name.length > 12 ? '...' : ''}`}</p>
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
