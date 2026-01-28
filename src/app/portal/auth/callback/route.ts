import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const origin = requestUrl.origin;

  // Handle error from Supabase (e.g., expired link)
  if (error) {
    console.error("Auth error:", error, errorDescription);
    return NextResponse.redirect(
      `${origin}/portal/auth?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (exchangeError) {
      console.error("Code exchange error:", exchangeError);
      return NextResponse.redirect(
        `${origin}/portal/auth?error=${encodeURIComponent(exchangeError.message)}`
      );
    }

    // Successfully authenticated, redirect to continue profile setup
    return NextResponse.redirect(`${origin}/portal/auth?authenticated=true`);
  }

  // No code provided, redirect to auth page
  return NextResponse.redirect(`${origin}/portal/auth`);
}
