import { config } from "@/app/lib/config";
import { supabase } from "@/app/lib/supabase";

async function getPosts(category?: string){
    if(category){
        return supabase.from('posts').select('*').order('created_at', { ascending: false }).eq('category', category)
    }

    return supabase.from('posts').select('*').order('created_at', { ascending: false })
}

async function createPost({ title, content, category, thumbnail }: { title: string; content: string; category: string; thumbnail: File }){
    const bucketName = config.supabaseBucketName || ""
    const { data: savedData } = await supabase.from('posts')
        .insert({
            title: title,
            content: content,
            category: category,
        })
        .select()
    const savedPost = savedData?.at(0)

    const { data: uploadData } = await supabase.storage.from(bucketName)
        .upload(`thumbnail/${savedPost.id}.jpg`, thumbnail, {
            upsert: true
        })

    if(uploadData){
        const imageUrl = await supabase.storage.from(bucketName)
            .getPublicUrl(uploadData?.path)
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
