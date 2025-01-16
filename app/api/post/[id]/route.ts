import { supabase } from "@/app/lib/supabase";
import { getBaseUrl } from "@/app/lib/url";
import { Post } from "@/app/types/Post";

async function getPost(id: string){
    return supabase.from('posts').select('*').eq('id', id).single();
}

async function updatePost(id: string, post: Partial<Post>){
    return supabase.from('posts').update({
        title: post.title,
        category: post.category,
        content: post.content
    }).eq('id', id)
}

export async function GET(request: Request, response: Response, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await getPost(id);

    response.headers.set('Access-Control-Allow-Origin', getBaseUrl());
    response.headers.set('Access-Control-Allow-Methods', 'GET');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Post-Category');

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json()

    await updatePost(id, {
        title: body.title,
        content: body.content,
        category: body.json,
    });

    return new Response(null, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
