import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import {
  DEFAULT_REDIRECT,
  AUTH_ROUTE,
  PREFIX_ROUTE,
  VERIFY_ROUTE,
} from "@/constants/route";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLogging = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
  });

  const APIAUTH_ROUTE = nextUrl.pathname.startsWith(PREFIX_ROUTE);
  const isVerify = nextUrl.pathname.startsWith(VERIFY_ROUTE);
  const isAUTH_ROUTE = AUTH_ROUTE.includes(nextUrl.pathname);

  if (APIAUTH_ROUTE || isVerify) {
    return undefined;
  }

  if (isAUTH_ROUTE) {
    if (isLogging) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLogging) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  return undefined;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|model|animations|favicon.ico|test/).*)",
  ],
};
