import { supabase } from "@/app/lib/supabase";
import type { NextApiResponse } from "next";

async function getPost(){
    return (await supabase()).from('posts').select('*').order('created_at', { ascending: false })
}

async function createPost(title: string, content: string){
    return (await supabase()).from('posts').insert({
        title: title,
        content: content
    }).single()
}

export async function GET(){
    const posts = await getPost()
    return new Response(JSON.stringify(posts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function POST(
    request: Request,
    response: NextApiResponse
){
    const body = await request.json();
    const post = await createPost(body.title, body.content)

    return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
