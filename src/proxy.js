import { NextResponse } from "next/server";
import { getUserSession } from "./lib/core/getSession";


export async function proxy(request) {
  const session = await getUserSession();

  if (!session) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/all-classes/:path", "/forum/:path"],
};
