import { JWT } from 'next-auth/jwt';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { AuthOptions } from "next-auth";
import { sendRequest } from '@/utils/api';
import GoogleProvider from "next-auth/providers/google";

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
                    url: "http://localhost:8080/auth/login",
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

        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),

        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID!,
        //     clientSecret: process.env.GOOGLE_SECRET!
        // })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            if (trigger === "signIn" && account?.provider === "credentials") {
                //@ts-ignore
                token.token = user.token
            }

            // else if (trigger === "signIn" && account?.provider === "google") {
            //     const resToBackEnd = await sendRequest<IBackendRes<IUserBackend>>({
            //         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/social-media`,
            //         method: "POST",
            //         body: {
            //             email: user?.email,
            //             image: user?.image,
            //             name: user?.name,
            //             type: 'GOOGLE'
            //         }
            //     });
            //     if (resToBackEnd?.data?.user) {
            //         const newUser = {
            //             ...resToBackEnd?.data?.user,
            //             avatar: user?.image ?? resToBackEnd?.data?.user?.avatar,
            //             name: user?.name ?? resToBackEnd?.data?.user?.name
            //         }
            //         token.user = newUser;
            //         token.access_token = resToBackEnd?.data?.access_token;
            //     }
            // };

            return token
        },
        async session({ session, token, user }) {
            if (token) {
                session.token! = token.token!
            }
            return session
        },
    },
    // pages: {
    //     signIn: "/login"
    // }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }