import RSS from "rss";
import { supabase } from "../lib/supabase";
import type { Post } from "../types/Post";

async function getPosts(){
    return supabase.from('posts').select('*').order('created_at', { ascending: false })
}

export async function GET() {
    const feed = new RSS({
        title: 'Bricn Blog',
        description: 'Enbraining\'s tech blog',
        feed_url: 'https://bricn.net/feed.xml',
        site_url: 'https://bricn.net',
        copyright: `Copyright ${new Date().getFullYear().toString()}`,
        language: 'ko-KR',
        pubDate: new Date().toUTCString(),
        ttl: 60,
    });

    (await getPosts()).data?.map((post: Post) => {
        feed.item({
            title: post.title || "",
            description: post.content?.substring(0, 100) || "",
            url: `https://bricn.net/post/${post.id}`,
            date: post.created_at || new Date()
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
