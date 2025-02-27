'use client';

import Button from '@/app/components/form/Button';
import { supabase } from '@/app/lib/supabase';
import { Post } from '@/app/types/Post';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [session, setSession] = useState(false);
  const [id, setId] = useState('');
  const [post, setPost] = useState<Post>({} as Post);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setSession(!!data.session);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchId = async () => {
      const { id } = await params;
      setId(id);
    };

    if (!id) fetchId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      const title = data.title;
      const content = data.content;
      const tag = data.tag;

      setPost((prev) => ({
        ...prev,
        title,
        content,
        tag,
      }));
    };

    if (id) fetchPost();
  }, [id]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPost((prev) => ({
        ...prev,
        title: e.target.value,
      }));
    },
    []
  );

  const onChangeTag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((prev) => ({
      ...prev,
      tag: e.target.value,
    }));
  }, []);

  const onSubmit = useCallback(
    (formData: FormData) => {
      const tag = formData.get('tag') as string;
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;

      const updatePost = async () => {
        await supabase
          .from('posts')
          .update({
            title: title,
            tag: tag,
            content: content,
          })
          .eq('id', id);
      };

      updatePost();
      redirect(`/post/${id}`);
    },
    [id]
  );

  if (!session) {
    return <div>403</div>;
  }

  return (
    <Form action={onSubmit} className="grid gap-y-5">
      <div className="grid grid-cols-7 gap-x-3">
        <input
          name="title"
          placeholder="제목"
          className="border w-full p-3 text-lg col-span-4"
          value={post.title}
          onChange={onChangeTitle}
        />
        <input
          name="tag"
          placeholder="태그"
          className="border w-full p-3 text-lg col-span-2"
          value={post.tag}
          onChange={onChangeTag}
        />
        <Button type="submit">저장하기</Button>
      </div>
      <textarea
        className="bg-neutral-900 border border-neutral-800 w-full h-[70vh] p-3"
        name="content"
      />
    </Form>
  );
}
