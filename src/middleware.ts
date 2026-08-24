import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // 0. Catch email confirmation code links and forward to /auth/callback
    const authCode = request.nextUrl.searchParams.get('code');
    if (authCode && pathname !== '/auth/callback') {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/callback';
      url.searchParams.set('code', authCode);
      if (!url.searchParams.has('next')) {
        url.searchParams.set('next', '/studio');
      }
      return NextResponse.redirect(url);
    }

    // 1. Protected route: /studio requires a logged-in user
    if (pathname.startsWith('/studio') && !user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    // 2. Protected route: /console requires Master Admin account
    if (pathname.startsWith('/console')) {
      if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('next', '/console');
        return NextResponse.redirect(url);
      }
      if (user.email?.toLowerCase() !== 'chijiokejackson35@gmail.com') {
        const url = request.nextUrl.clone();
        url.pathname = '/studio';
        return NextResponse.redirect(url);
      }
    }

    // 3. Auth pages: redirect to /studio if already logged in
    if ((pathname === '/login' || pathname === '/signup') && user) {
      const url = request.nextUrl.clone();
      url.pathname = '/studio';
      return NextResponse.redirect(url);
    }
  } catch (err) {
    console.error('Middleware auth check error:', err);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|json)$).*)',
  ],
};
