import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // 1. Protected routes: /wizard and /studio require a logged-in user
  if ((pathname.startsWith('/wizard') || pathname.startsWith('/studio')) && !user) {
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

  // 3. Auth pages: redirect to /wizard if already logged in
  if ((pathname === '/login' || pathname === '/signup') && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/wizard';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|json)$).*)',
  ],
};
