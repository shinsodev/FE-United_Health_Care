import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        code: number,
        message: string,
        token?: string,
        data?: string,
    }
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        code: number,
        message: string,
        token: string,
        token?: string,
        data?: string,

    }

    interface User extends NextAuthUser {
        token?: string; // Thêm thuộc tính token
    }
    
}