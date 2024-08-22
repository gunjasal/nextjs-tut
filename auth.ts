import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';

async function getUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return user.rows[0];
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,

    // next auth jwt separated backend example
    // https://www.reddit.com/r/nextjs/comments/12uxomn/how_to_use_nextauth_with_a_custom_separate_backend/
    // https://next-auth.js.org/providers/credentials#options
    // https://dev.to/faranmustafa/next-auth-boilerplate-ts-4ndn
    // https://nextjsstarter.com/blog/next-js-authentication-boilerplate-unpacked-code-examples-galore/
    providers: [  // todo ymkim jwt, google
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET
        // }),
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email); // todo ymkim switch to backend
                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) return user;
                }

                console.log('Invalid credentials');
                return null;
            },
        }),
    ],
});