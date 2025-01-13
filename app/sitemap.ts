import type { MetadataRoute } from 'next'
import { supabase } from './lib/supabase'
import { Post } from './types/Post'

async function getPosts(){
    return supabase.from('posts').select('*').order('created_at', { ascending: false })
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts()
    const sitemap = posts.data?.map((post: Post) => ({
        url: `https://bricn.net/post/${post.id}`,
        lastModified: post.created_at,
        changeFrequency: 'always',
        priority: 1,
    })) || []

    return [
        ...sitemap,
        {
            url: 'https://bricn.net',
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1
        },
        {
            url: 'https://bricn.net/post',
            lastModified: new Date(),
            changeFrequency: 'always',
            priority: 1
        },
        {
            url: 'https://bricn.net/profile',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1
        },
    ] as MetadataRoute.Sitemap
}
