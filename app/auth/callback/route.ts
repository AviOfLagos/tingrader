import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();
if (code) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  await supabase.auth.exchangeCodeForSession(code);
  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  } else {
    return NextResponse.redirect(`${origin}/app`);
  }
} else {
  // URL to redirect to if there's no code
  return NextResponse.redirect(`${origin}/app`);
}
}
