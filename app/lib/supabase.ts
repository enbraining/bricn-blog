import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export const getPosts = async (value: string | null, index: number) => {
  const query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (value) {
    query.eq('tag', value);
  }

  query.range(index, index + 14);

  return query;
};
