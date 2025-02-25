import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
);

export const getPosts = async (value: string | null, index: number) => {
  const query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('is_published', true);

  if (value) {
    query.eq('tag', value);
  }

  query.range(index, index + 14);

  return query;
};

export const POST_TABLE = 'posts';
export const SUPABSE_ADMIN_USER_ID = 'ea4b8e72-85ea-4e23-a53a-d8711680def9';
