'use client';

import Button from '@/app/components/form/Button';
import { supabase } from '@/app/lib/supabase';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const onSubmit = useCallback(
    (formData: FormData) => {
      const body = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      const fetchToken = async () => {
        await supabase.auth.signInWithPassword(body);
      };

      fetchToken();
      router.push('/');
    },
    [router]
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        router.push('/');
      }
    };
    fetchUser();
  }, [router]);

  return (
    <div className="grid">
      <Form action={onSubmit} className="mx-auto grid gap-y-2 w-80">
        <div className="grid gap-y-2 mb-5">
          <input
            className="border rounded-sm p-2 w-full bg-bricn-900"
            type="email"
            name="email"
            placeholder="이메일"
          ></input>
          <input
            className="border rounded-sm p-2 w-full bg-bricn-900"
            type="password"
            name="password"
            placeholder="비밀번호"
          ></input>
        </div>
        <Button type="submit">로그인</Button>
      </Form>
    </div>
  );
}
