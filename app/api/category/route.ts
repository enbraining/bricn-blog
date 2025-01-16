import { supabase } from "@/app/lib/supabase";

async function getPosts(){
    return await supabase.rpc("group_by_category")
}

export async function GET(){
    const { data } = await getPosts()
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
