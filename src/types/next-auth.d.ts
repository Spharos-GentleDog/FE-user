import NextAuth, { DefaultSession } from "next-auth/next";

declare module "next-auth" {

    interface Session {
        user: {
            userEmail: string,
            userName: string,
            accessToken: string,
            refreshToken: string,
            role: string,
        } & DefaultSession["user"]

    }
}