import { supabase } from "@/app/lib/supabase";

async function getPosts(category?: string){
    if(category){
        return supabase.from('posts').select('*').order('created_at', { ascending: false }).eq('category', category)
    }

    return supabase.from('posts').select('*').order('created_at', { ascending: false })
}

async function createPost({ title, content, category, thumbnail }: { title: string; content: string; category: string; thumbnail: File }){
    const response = await supabase.from('posts')
        .insert({
            title: title,
            content: content,
            category: category,
        })
        .select()
    const savedPost = response.data?.at(0)

    const { data } = await supabase.storage.from("bricn-image-bucket")
        .upload(`thumbnail/${savedPost.id}.jpg`, thumbnail, {
            upsert: true
        })

    if(data){
        const imageUrl = await supabase.storage.from("bricn-image-bucket")
            .getPublicUrl(data?.path)
            .data
            .publicUrl

        const { error } = await supabase.from('posts')
            .update({
                image_url: imageUrl
            })
            .eq("id", savedPost.id)

        console.log(error?.cause)
    }
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
    const body = await request.formData();
    await createPost({
        title: body.get("title") as string,
        content: body.get("content") as string,
        category: body.get("category") as string,
        thumbnail: body.get("thumbnail") as File
    })

    return new Response(null, {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
