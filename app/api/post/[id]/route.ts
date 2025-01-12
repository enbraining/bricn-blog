import { supabase } from "@/app/lib/supabase";

async function getPost(id: string){
    return (await supabase()).from('posts').select('*').eq('id', id).single();
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data } = await getPost(id);

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
