import axios from "axios";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "./nextauth";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const formData = new URLSearchParams();
        formData.append("email", credentials?.email as string);
        formData.append("password", credentials?.password as string);

        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/login/",
            formData.toString(),
            { headers }
          );
          const userData = response.data;
          if (userData && response.status) {
            const { email, first_name, auth, last_name, role } = userData;
            const id = auth.id;
            const user: IUser = {
              email,
              name: `${first_name} ${last_name}`,
              image: "teste",
              id: id,
              role: role ?? "user",
            };
            return user;
          }
        } catch (error) {
          return null;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
