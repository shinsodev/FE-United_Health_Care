import { JWT } from 'next-auth/jwt';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth";
import { sendRequest } from '@/utils/api';

export const authOptions: AuthOptions = {
    secret: process.env.NO_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const res = await sendRequest<JWT>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL_USER}/auth/login`,
                    method: "POST",
                    body: {
                        email: credentials?.email,
                        password: credentials?.password
                    }
                })
                if (res && res.code === 200) {
                    return res as any
                } else {
                    throw new Error(res?.message as string)
                }
            }
        }),

    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.token = user.token
            }

            return token
        },
        async session({ session, token, user }) {
            if (token) {
                session.token! = token.token!
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }