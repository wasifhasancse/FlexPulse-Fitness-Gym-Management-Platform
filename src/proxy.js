import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    const pathname = request.nextUrl.pathname;
    const redirectUrl = new URL("/protected", request.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // if (!session) {
  //   return NextResponse.redirect(new URL("/protected", request.url));
  // }
}

export const config = {
  matcher: [
    "/profile",
    "/profile/:path*",
    "/add-idea",
    "/my-ideas",
    "/my-interactions",
    "/ideas/:path",
    "/ideas/:path/update",
  ],
};
