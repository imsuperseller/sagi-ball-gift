// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface Payload { image_path: string; routine_id: string }

export const handler = async (req: Request): Promise<Response> => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response("Unauthorized", { status: 401 });
    const jwt = authHeader.replace("Bearer ", "");
    const authed = createClient(SUPABASE_URL, jwt);

    const { image_path, routine_id } = (await req.json()) as Payload;
    if (!image_path || !routine_id) return new Response("Bad Request", { status: 400 });

    // Ensure requester can select the routine per RLS by attempting a select
    const { error } = await authed.from("training_routines").select("id").eq("id", routine_id).single();
    if (error) return new Response("Forbidden", { status: 403 });

    // Generate signed URL (public bucket with signed access)
    const { data: signed, error: urlErr } = await supabase.storage
      .from("routine-media")
      .createSignedUrl(image_path, 60 * 60); // 1 hour
    if (urlErr) throw urlErr;

    return new Response(JSON.stringify({ url: signed.signedUrl }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};

export default handler;


