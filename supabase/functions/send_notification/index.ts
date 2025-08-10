// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface Payload {
  admin_id: string;
  team_id: string | null;
  message: string;
}

interface ExpoMessage {
  to: string;
  sound?: "default";
  body: string;
}

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export const handler = async (req: Request): Promise<Response> => {
  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const payload = (await req.json()) as Payload;
    if (!payload.message || payload.message.length > 500) {
      return new Response(JSON.stringify({ error: "Invalid message" }), { status: 400 });
    }

    // Insert notification row first
    const { data: notification, error: notifErr } = await supabase
      .from("admin_notifications")
      .insert({ sender_id: payload.admin_id, team_id: payload.team_id, message: payload.message })
      .select("id")
      .single();
    if (notifErr) throw notifErr;

    // Resolve target parents' device tokens
    let tokensQuery = supabase
      .from("device_tokens")
      .select("expo_push_token, user_id");

    if (payload.team_id) {
      const { data: parentIds, error: parentsErr } = await supabase
        .from("parent_links")
        .select("parent_id")
        .in(
          "player_id",
          (
            await supabase.from("players").select("id").eq("team_id", payload.team_id)
          ).data?.map((r: any) => r.id) ?? []
        );
      if (parentsErr) throw parentsErr;
      const ids = parentIds?.map((r: any) => r.parent_id) ?? [];
      tokensQuery = tokensQuery.in("user_id", ids);
    }

    const { data: tokens, error: tokensErr } = await tokensQuery;
    if (tokensErr) throw tokensErr;

    const expoMessages: ExpoMessage[] = (tokens ?? [])
      .filter((t) => typeof t.expo_push_token === 'string' && t.expo_push_token.startsWith('ExponentPushToken'))
      .map((t) => ({ to: t.expo_push_token, sound: "default", body: payload.message }));

    // Chunk sends by 100 (Expo recommendation)
    const chunkSize = 100;
    for (let i = 0; i < expoMessages.length; i += chunkSize) {
      const chunk = expoMessages.slice(i, i + chunkSize);
      await fetch(EXPO_PUSH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chunk)
      });
    }

    // Audit log
    await supabase.from("audit_log").insert({
      actor_id: payload.admin_id,
      action: "NOTIFICATION_SENT",
      entity: "admin_notifications",
      entity_id: notification?.id,
      meta: { team_id: payload.team_id, message_length: payload.message.length, targets: tokens?.length ?? 0 }
    });

    return new Response(JSON.stringify({ ok: true, sent: expoMessages.length }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
};

export default handler;


