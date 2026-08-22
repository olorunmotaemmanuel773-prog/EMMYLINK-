import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
      return response;
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    });

    const pathname = request.nextUrl.pathname;

    const isAdminRoute = pathname.startsWith('/admin');
    const isAuthPageRoute =
      pathname === '/admin/login' ||
      pathname === '/admin/forgot-password' ||
      pathname === '/admin/reset-password';

    // Refresh auth session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // If accessing protected /admin route and user is not logged in
    if (isAdminRoute && !isAuthPageRoute && !user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/admin/login';
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If logged in and visiting login page, redirect to dashboard
    if (isAuthPageRoute && user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/admin';
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    // Fail safe: Never crash middleware with 500
    console.error('Middleware execution notice:', error);
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|videos|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)',
  ],
};
