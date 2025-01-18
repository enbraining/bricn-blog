import { config } from "@/app/lib/config";
import { supabase } from "@/app/lib/supabase";

async function getPost(id: string){
    return supabase.from('posts').select('*').eq('id', id).single();
}

async function updatePost({ id, thumbnail, title, content, category }: {
    thumbnail?: File,
    id: string,
    title: string,
    content: string,
    category: string
}){
    const bucketName = config.supabaseBucketName || ""
    let imageUrl: string | null = null

    if(thumbnail?.size !== 0 && thumbnail){
        const { data: uploadData } = await supabase.storage.from(bucketName)
            .upload(`thumbnail/${id}.jpg`, thumbnail, {
                upsert: true
            })

        const path = uploadData?.path as string
        imageUrl = await supabase.storage.from(bucketName)
            .getPublicUrl(path)
            .data
            .publicUrl
    }

    const updateData: Record<string, string | undefined> = {
        title: title,
        category: category,
        content: content,
    }

    if(imageUrl !== null){
        updateData.image_url = imageUrl
    }

    await supabase.from('posts')
        .update(updateData)
        .eq('id', id)
        .select()
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await getPost(id);

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.formData()

    await updatePost({
        id: id,
        title: body.get("title") as string,
        content: body.get("content") as string,
        category: body.get("category") as string,
        thumbnail: body.get("thumbnail") as File
    });

    return new Response(null, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
