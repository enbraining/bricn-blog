import { allPosts } from "@/.contentlayer/generated";
import RSS from "rss";

interface Content {
    title: string;
    description: string;
    url: string;
    date: string;
}

export async function GET() {
    const feed = new RSS({
        title: 'bricn',
        description: "Bricn Blog",
        feed_url: 'https://bricn.net/feed.xml',
        site_url: 'https://bricn.net',
        copyright: `Copyright ${new Date().getFullYear().toString()}`,
        language: 'ko-KR',
        pubDate: new Date().toUTCString(),
        ttl: 60,
    });

    const allContents: Content[] = allPosts.map((post) => {
        return {
            "title": post.title,
            "description": post.body.raw.substring(0, 100),
            "url": `https://bricn.net${post.url.replace(/posts\//gi, "")}`,
            "date": post.date
        };
    });

    if (allContents) {
        allContents.map((post: Content) => {
            feed.item({
                title: post.title,
                description: post.description,
                url: post.url,
                date: post.date
            });
        });
    }

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
