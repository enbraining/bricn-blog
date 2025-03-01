'use client';

import Button from '@/app/components/form/Button';
import Input from '@/app/components/form/Input';
import Textarea from '@/app/components/form/Textarea';
import { supabase } from '@/app/lib/supabase';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { KeyboardEvent, useCallback, useEffect, useState } from 'react';

export default function Page() {
  const [session, setSession] = useState(false);
  const [likeTag, setLikeTag] = useState<string[]>([]);
  const [tag, setTag] = useState<string | undefined>();

  useEffect(() => {
    const fetchLikeTag = async () => {
      if (!tag) {
        setLikeTag([]);
        return;
      }

      const { data } = await supabase.rpc('get_unique_tags', {
        search_tag: tag,
      });

      setLikeTag(
        data.map((d: { unique_tag: string }) => d.unique_tag) as string[]
      );
    };
    fetchLikeTag();
  }, [tag]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setSession(!!data.session);
    };
    fetchSession();
  }, []);

  const onSubmit = useCallback((formData: FormData) => {
    const title = formData.get('title');
    const category = formData.get('category');
    const content = formData.get('content');

    const createPost = async () => {
      const { data } = await supabase
        .from('posts')
        .insert({
          title: title,
          content: content,
          tag: category?.toString().toLocaleLowerCase(),
        })
        .select()
        .single();

      redirect(`/post/${data.id}`);
    };

    createPost();
  }, []);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }, []);

  if (!session) {
    return <div>403</div>;
  }

  return (
    <div>
      <div className="flex mb-2 gap-x-4 h-8">
        {likeTag.map((t, index) => (
          <p key={index}>{t}</p>
        ))}
      </div>
      <Form action={onSubmit} className="grid gap-y-5">
        <div className="grid grid-cols-7 gap-x-2 w-full" onKeyDown={onKeyDown}>
          <div className="col-span-5">
            <Input name="title" placeholder="제목" />
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
        <Textarea />
        <div>
          <Button type="submit">저장하기</Button>
        </div>
      </Form>
    </div>
  );
}
