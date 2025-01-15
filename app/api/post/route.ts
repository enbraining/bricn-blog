import { supabase } from "@/app/lib/supabase";

async function getPosts(){
    return supabase.from('posts').select('*').order('created_at', { ascending: false })
}

async function createPost(title: string, content: string, category: string){
    return supabase.from('posts').insert({
        title: title,
        content: content,
        category: category
    }).single()
}

export async function GET(){
    const posts = await getPosts()
    return new Response(JSON.stringify(posts), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function POST(request: Request){
    const body = await request.json();
    const post = await createPost(body.title, body.content, body.category)

    return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
