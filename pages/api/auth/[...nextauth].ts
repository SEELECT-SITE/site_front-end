import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/utils/mongoAdapter";
import { NextAuthOptions } from "next-auth";
import connect from "@/utils/databaselocal";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role || "USER";
      }
      return session;
    },
    async jwt({ token, user }) {
      const { db } = await connect();
      const data = await db.collection("users").findOne({
        email: token.email,
      });

      if (!data) {
        token.id = user!.id;
        return token;
      }
      return {
        id: data.id,
        name: data.name,
        role: data.role || "USER",
        email: data.email,
        picture: data.image,
      };
    },
  },
  secret: process.env.SECRET,
};
export default NextAuth(authOptions);
