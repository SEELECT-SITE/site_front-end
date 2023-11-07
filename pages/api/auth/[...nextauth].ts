import axios from "axios";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "./nextauth";
import { DJANGO_URL } from "@/utils/consts";

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
            `${DJANGO_URL}api/auth/login/`,
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
              semestre: semester,
              age: age,
              course: course,
              ies: ies,
              kit: kit,
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
            `${DJANGO_URL}api/users/${token.role}/${token.id}/`,
            { headers }
          );
          const userData = response.data;
          if (userData && response.status) {
            const { auth, role, profile } = userData;
            const { first_name, last_name, ies, age, course, semester } =
              profile;

            token.role = role;
            token.token = auth.token;
            token.age = age;
            token.semestre = semester;
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
        token.name = user.name;
        token.course = user.course;
        token.ies = user.ies;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Token: token?.token,
      };
      const response = await axios.get(
        `${DJANGO_URL}api/users/${token.role}/${token.id}/`,
        { headers }
      );
      const userData = response.data;
      if (session.user) {
        session.user.token = token.token;
        session.user.name = token.name;
        session.user.ies = token.ies;
        session.user.course = token.course;
        session.user.id = token.id;
        if (userData && response.status) {
          session.user.kit = userData.profile.kit;
        }
      }

      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
