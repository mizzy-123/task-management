import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    username?: string;
    email?: string;
    name?: string;
    accessToken?: string;
  }

  interface User extends DefaultUser {
    username?: string;
    email?: string;
    name?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    email?: string;
    name?: string;
    accessToken?: string;
  }
}
