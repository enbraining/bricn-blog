'use client';

import Button from '@/app/components/form/Button';
import Input from '@/app/components/form/Input';
import Textarea from '@/app/components/form/Textarea';
import { supabase } from '@/app/lib/supabase';
import { Post } from '@/app/types/Post';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [session, setSession] = useState(false);
  const [id, setId] = useState('');
  const [content, setContent] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [tag, setTag] = useState<string>();

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
      const { data } = (await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()) as { data: Post };

      setTitle(data.title);
      setContent(data.content);
      setTag(data.tag);
    };

    if (id) fetchPost();
  }, [id]);

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

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }, []);

  if (!session) {
    return <div>403</div>;
  }

  return (
    <Form action={onSubmit} className="grid gap-y-2">
      <div className="grid grid-cols-7 gap-x-2" onKeyDown={onKeyDown}>
        <div className="col-span-5">
          <Input
            name="title"
            placeholder="제목"
            content={title}
            setContent={setTitle}
          />
        </div>
        <div className="col-span-2">
          <Input
            name="tag"
            placeholder="태그"
            content={tag}
            setContent={setTag}
          />
        </div>
      </div>
      <Textarea content={content} setContent={setContent} />
      <div>
        <Button type="submit">저장하기</Button>
      </div>
    </Form>
  );
}
