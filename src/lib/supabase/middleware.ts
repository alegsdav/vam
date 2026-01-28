import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define protected routes
  const isPortalRoute = request.nextUrl.pathname.startsWith('/portal') && 
                        !request.nextUrl.pathname.startsWith('/portal/auth');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/portal/auth');

  // If trying to access protected portal routes without auth, redirect to auth
  if (isPortalRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/portal/auth';
    return NextResponse.redirect(url);
  }

  // If authenticated user tries to access auth page, check if profile is complete
  if (isAuthRoute && user) {
    // Check if user has completed profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('username, is_it, is_startup, is_developer')
      .eq('id', user.id)
      .single();

    // If profile is complete, redirect to portal
    if (profile?.username && (profile.is_it || profile.is_startup || profile.is_developer)) {
      const url = request.nextUrl.clone();
      url.pathname = '/portal';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
