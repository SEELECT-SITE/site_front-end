import axios from "axios";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { cookies } from "next/headers";
import { setCookie } from "nookies";
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
            const { email, auth, role, profile } = userData;
            const { first_name, last_name, ies, age, course, semester, kit } =
              profile;

            const user: IUser = {
              email,
              name: `${first_name} ${last_name}`,
              semestre: semester || "Sem registro",
              age: age || "Idade não registrada",
              course: course || "Sem curso registrado",
              ies: ies || "Sem instituição de ensino",
              kit: kit || undefined,
              id: auth.id,
              token: auth.token,
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
    async jwt({ token, trigger, user }) {
      if (trigger === "update") {
        const headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          Token: token?.token,
        };
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/users/admin/5/",
            { headers }
          );
          const userData = response.data;
          if (userData && response.status) {
            const { email, auth, role, profile } = userData;
            const { first_name, last_name, ies, age, course, semester, kit } =
              profile;

            const user: IUser = {
              email,
              name: `${first_name} ${last_name}`,
              semestre: semester || "Sem registro",
              age: age || "Idade não registrada",
              course: course || "Sem curso registrado",
              ies: ies || "Sem instituição de ensino",
              kit: kit || undefined,
              id: auth.id,
              token: auth.token,
              role: role ?? "user",
            };
            token.role = role;
            token.token = auth.token;
            token.kit = kit;
            token.name = `${first_name} ${last_name}`;
            token.course = course;
            token.ies = ies;
            token.id = auth.id;
            return token;
          }
        } catch (error) {
          null;
        }
      }
      if (user) {
        token.role = user.role;
        token.token = user.token;
        token.kit = user.kit;
        token.name = user.name;
        token.course = user.course;
        token.ies = user.ies;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.token = token.token;
        session.user.name = token.name;
        session.user.ies = token.ies;
        session.user.course = token.course;
        session.user.kit = token.kit;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
