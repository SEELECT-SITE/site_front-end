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
            console.log(userData);
            const { email, auth, role, profile } = userData;
            const { first_name, last_name, ies, age, course, semester, kit } =
              profile;
            const id = auth.id;
            const user: IUser = {
              email,
              name: `${first_name} ${last_name}`,
              semestre: semester || "Sem registro",
              age: age || "Idade não registrada",
              course: course || "Sem curso registrado",
              ies: ies || "Sem instituição de ensino",
              kit: kit || undefined,

              id: auth.token,

              role: role ?? "user",
            };
            console.log(auth.token);
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
      if (user) {
        token.role = user.role;
        token.kit = user.kit;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.ies = token.ies;
        session.user.course = token.course;
        session.user.kit = token.kit;
      }
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
