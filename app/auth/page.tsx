'use client';

import { Session } from '@supabase/supabase-js';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/form/Button';

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  const onSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    redirect('/auth/signin');
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);

      if (!data.session) {
        redirect('/auth/signin');
      }
    };

    fetchSession();
  }, []);

  return (
    <div className="grid">
      <div className="mx-auto grid gap-y-2 text-center md:w-[30vw] w-full">
        <h1>{session?.user.email}</h1>
        <Button onClick={onSignOut}>로그아웃</Button>
        <Link
          className="px-7 py-3 bg-bricn-800 active:bg-bricn-600 hover:bg-bricn-700 border-bricn-700 border rounded-sm"
          href="/post/new"
        >
          작성하기
        </Link>
      </div>
    </div>
  );
}
