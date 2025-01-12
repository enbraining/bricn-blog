"use server"

import { createClient } from '@supabase/supabase-js';

export const supabase = async () => {
    return createClient(
        process.env.SUPABASE_URL ?? '',
        process.env.SUPABASE_ANON_KEY ?? ''
    )
}
