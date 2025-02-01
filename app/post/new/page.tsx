'use client';

import Button from '@/app/components/form/Button';
import { MarkdownEditor } from '@/app/components/content/MarkdownEditor';
import { supabase } from '@/app/lib/supabase';
import Form from 'next/form';
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function Page() {
  const [session, setSession] = useState(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) setSession(!!data.session);
    };
    fetchSession();
  }, []);

  const onChangeContent = useCallback((value?: string) => {
    setContent(value || '');
  }, []);

  const onSubmit = useCallback(
    (formData: FormData) => {
      const title = formData.get('title');
      const category = formData.get('category');

      const createPost = async () => {
        await supabase
          .from('posts')
          .insert({
            title: title,
            content: content,
            category: category,
          })
          .select();
      };

      createPost();
      redirect('/post');
    },
    [content]
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    },
    []
  );

  if (!session) {
    return <div>403</div>;
  }

  return (
    <Form
      action={onSubmit}
      onSubmit={() => {
        return false;
      }}
      className="grid gap-y-5"
    >
      <div className="grid grid-cols-7 gap-x-3">
        <input
          onKeyDown={onKeyDown}
          name="title"
          placeholder="제목"
          className="border w-full p-3 text-lg col-span-4"
        />
        <input
          onKeyDown={onKeyDown}
          name="category"
          placeholder="카테고리"
          className="border w-full p-3 text-lg col-span-2"
        />
        <Button type="submit">저장하기</Button>
      </div>
      <div>
        <MarkdownEditor
          height={600}
          value={content}
          onChange={onChangeContent}
        />
      </div>
      <div></div>
    </Form>
  );
}
