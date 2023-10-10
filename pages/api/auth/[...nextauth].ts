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
              semestre: "2022.2",
              age: 18,
              course: "Engenharia de Telecomunicações",
              ies: "UFC - Universade Federal do Ceará",
              kit: { name: "iniciante", n_palestras: 2, n_workshop: 2 },
              events: [
                {
                  title:
                    "Uma breve introdução a linguagem de dispositivos IOS, Swift.",
                  location: {
                    name: "Bloco 707 - Sala 25",
                    url: "https://www.google.com/maps/place/Bloco+707+-+Unidade+Did%C3%A1tica+Centro+de+Tecnologia/@-3.7434616,-38.5784209,17z/data=!3m1!4b1!4m6!3m5!1s0x7c74bdb927499d1:0xada60124dc5f0095!8m2!3d-3.743467!4d-38.575846!16s%2Fg%2F11ckqrhn_h?entry=ttu",
                  },
                  tipo: "workshop",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor lacus non neque bibendum lobortis. Quisque et ipsum congue purus tincidunt consequat in. ",
                  hostedBy: "Teste Jr",
                  date: Date.now(),
                  max_inscriptions: 35,
                  inscriptions: 0,
                },
                {
                  title:
                    "Uma breve introdução a linguagem de dispositivos IOS, Swift.",
                  location: {
                    name: "Bloco 707 - Sala 25",
                    url: "https://www.google.com/maps/place/Bloco+707+-+Unidade+Did%C3%A1tica+Centro+de+Tecnologia/@-3.7434616,-38.5784209,17z/data=!3m1!4b1!4m6!3m5!1s0x7c74bdb927499d1:0xada60124dc5f0095!8m2!3d-3.743467!4d-38.575846!16s%2Fg%2F11ckqrhn_h?entry=ttu",
                  },
                  tipo: "palestra",

                  hostedBy: "Empresa X",
                  description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempor lacus non neque bibendum lobortis. Quisque et ipsum congue purus tincidunt consequat in in felis. Praesent pretium velit sit amet turpis faucibus dictum. Nulla eu risus felis. ",
                  date: Date.now(),
                  max_inscriptions: 35,
                  inscriptions: 0,
                },
              ],
              id: id,
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
        token.events = user.events;
        token.kit = user.kit;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.events = token.events;
        session.user.ies = token.ies;
        session.user.course = token.course;
        session.user.kit = token.kit;
      }
      return session;
    },
  },
};

export default NextAuth(nextAuthOptions);
