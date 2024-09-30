import { withAuth } from "next-auth/middleware";

const adminURLList = ["/admin", "/admin/kits-table"];

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (adminURLList.includes(req.nextUrl.pathname)) {
        return token?.role === "admin";
      }
      return !!token;
    },
  },
});

export const config = { matcher: ["/admin", "/admin/kits-table"] };
