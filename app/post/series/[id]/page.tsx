'use client';

import Thumbnail from '@/app/components/content/Thumbnail';
import { Skeleton } from '@/app/components/ui/skeleton';
import { supabase } from '@/app/lib/supabase';
import { Post } from '@/app/types/Post';
import { useEffect, useRef, useState } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [id, setId] = useState('');
  const isInitialRender = useRef(true);

  useEffect(() => {
    const fetchId = async () => {
      const { id } = await params;
      setId(id);
    };
    if (!id) fetchId();
  }, [params, id]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (!id) return;

    const fetchPosts = async () => {
      const { data: seriesPosts } = await supabase
        .from('series_posts')
        .select('*')
        .eq('series_id', id)
        .order('index', { ascending: true });

      const seriesPostIds = seriesPosts?.map(
        (seriesPost) => seriesPost.posts_id
      ) as string[];

      const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .in('id', seriesPostIds);

      setPosts(posts || []);
    };
    fetchPosts();
  }, [id]);

  return (
    <div>
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
