import { DefaultSession, DefaultUser } from "next-auth";
import { ROLE } from "./constants";



declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      image: string;
      role: ROLE;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    image: string;
    role: ROLE;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    image: string;
    role: ROLE;
  }
}
