import { supabase } from "@/app/lib/supabase";

async function getPosts(category?: string){
    if(category){
        return supabase.from('posts').select('*').order('created_at', { ascending: false }).eq('category', category)
    }

    return supabase.from('posts').select('*').order('created_at', { ascending: false })
}

async function createPost(title: string, content: string, category: string){
    return supabase.from('posts').insert({
        title: title,
        content: content,
        category: category
    }).single()
}

export async function GET(request: Request){
    const { data } = await getPosts(request.headers.get("Post-Category") || undefined)

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function POST(request: Request){
    const body = await request.json();
    await createPost(body.title, body.content, body.category)

    return new Response(null, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
