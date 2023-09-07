import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    console.log(req.url);
    return NextResponse.redirect(new URL("/userboard", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        return token?.role !== "admin";
      },
    },
  }
);

export const config = { matcher: ["/admin"] };
