import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {

    interface Session {
        user: {
            token: string,
            name: string,
            refreshToken: string,
        } & DefaultSession["user"]

    }
}