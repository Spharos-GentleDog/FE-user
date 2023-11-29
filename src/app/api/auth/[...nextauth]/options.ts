import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentails",
            credentials: {
                userEmail: { label: "email", type: "text", placeholder: "userEmail" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials: any) {
                console.log("credentials : ", credentials)
                if (!credentials?.userEmail || !credentials?.password) return null
                try {
                    const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/signin`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userEmail: credentials?.userEmail,
                            password: credentials?.password,
                        })
                    })
                    const user = await res.json();

                    return user.result
                } catch (e: any) {
                    throw new Error("로그인 에러 : ", e.massage)
                }
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            profile(profile: any) {
                return {
                    id: profile.id,
                    usersName: profile.kakao_account?.name,
                    userEmail: profile.kakao_account?.email,
                    userPhone: profile.kakao_account?.phone_number,
                };
            },
        }),
        {
            id: "naver",
            name: "Naver",
            type: "oauth",
            authorization: {
                url: "https://nid.naver.com/oauth2.0/authorize",
            },
            token: "https://nid.naver.com/oauth2.0/token",
            userinfo: "https://openapi.naver.com/v1/nid/me",
            profile(profile: any) {
                return {
                    id: profile.response?.id,
                    usersName: profile.response?.name,
                    userEmail: profile.response?.email,
                    image: profile.response?.mobile,
                }
            },
            clientId: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET
        },
    ],

    callbacks: {
        async jwt({ token, user }) {

            return { ...token, ...user }
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`

            else if (new URL(url).origin === baseUrl) return url

            return baseUrl
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
        // error: "/my_error",
    },
}