import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";

const authRoute = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    if (authRoute.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }
};

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/checkout/:path*"],
};
