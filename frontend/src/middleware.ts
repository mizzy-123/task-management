import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    const expiresAt = token?.expiresAt ? Number(token.expiresAt) : undefined;
    const isExpired = expiresAt ? Date.now() > expiresAt : false;

    const redirectTo = (path: string) =>
      NextResponse.redirect(new URL(path, req.url));

    const guestRoutes = ["/login", "/signup", "/forgot-password"];

    const protectedRoutes = ["/dashboard2"];

    if (pathname == "/") {
      return redirectTo("/login");
    }

    // jika sudah login (ada token)
    if (
      token &&
      !isExpired &&
      guestRoutes.some((routes) => pathname.startsWith(routes))
    ) {
      return redirectTo("/dashboard");
    }

    // jika user belum login
    if (
      (!token || isExpired) &&
      protectedRoutes.some((route) => pathname.startsWith(route))
    ) {
      return redirectTo("/login");
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
