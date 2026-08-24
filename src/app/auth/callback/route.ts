import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/studio';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The `setAll` method was called from a Server Component / Route Handler.
            }
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Determine base URL: prioritize real production host if request origin is localhost in production
      const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
      const targetBase = isLocalhost && process.env.NODE_ENV === 'production' 
        ? 'https://retake.cloud' 
        : origin;

      return NextResponse.redirect(`${targetBase}${next.startsWith('/') ? next : '/' + next}`);
    }
  }

  // If code is invalid or missing, redirect to login with notification
  return NextResponse.redirect(`${origin}/login?message=Email%20confirmed!%20Please%20log%20in.`);
}
