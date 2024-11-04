import { withAuth } from "next-auth/middleware";

const adminURLList = ["/admin"];

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (adminURLList.includes(req.nextUrl.pathname.slice(0, 6))) {
        return token?.role === "admin";
      }
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/admin"],
};
