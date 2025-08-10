import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

export function getAdminClient() {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
  if (!url || !serviceKey) throw new Error('Missing Supabase env vars');
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

export function createClientFromCookies(cookies: any) {
  return createServerClient(
    process.env.EXPO_PUBLIC_SUPABASE_URL!,
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookies.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}


