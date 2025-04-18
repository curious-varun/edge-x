import { DefaultSession, DefaultUser } from "next-auth";
import { ROLE } from "./constants";



declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      email: string;
      image: string;
      role: ROLE;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    email: string;
    image: string;
    role: ROLE;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    image: string;
    role: ROLE;
  }
}
