import { User } from "next-auth";
import "next-auth/jwt";

type UserId = string;
type UserRole = "USER" | "ADMIN";

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
    };
  }
}
