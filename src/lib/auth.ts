import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db/prisma";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";
import { LoginT, AuthUser } from "@/features/auth/type";
import { getUserByEmail } from "@/actions/user.action";
import Credentials from "next-auth/providers/credentials";
import bycrypt from "bcryptjs";
import { LoginSchema } from "@/features/auth/schema/auth.schema";
declare module "next-auth" {
  interface User {
    username?: string;
  }
  interface Session {
    user: {
      image?: string;
      name: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image?: string;
    name: string;
  }
}

export const handlers = NextAuth({
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const userData = await getUserByEmail(token.email as string);

      if (!userData) return token;

      token.image = userData.image as string;
      token.name = userData.name as string;
      return token;
    },
    session({ session, token }) {
      if (token.role) {
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role,
            image: token.image,
            name: token.name,
          },
        };
      }
      return session;
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(db as any),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthUser | null> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const validation = await LoginSchema.safeParseAsync({
          email: credentials.email,
          password: credentials.password,
        });

        if (!validation.success) {
          throw new Error(
            JSON.parse(validation.error?.message ?? "{}")[0]?.message
          );
        }

        const userFinder = await getUserByEmail(credentials.email as string);
        if (!userFinder || !userFinder.password) {
          throw new Error("User not found");
        }
        const comparePassword = await bycrypt.compare(
          credentials.password as string,
          userFinder.password as string
        );

        if (comparePassword) {
          return {
            id: userFinder.id,
            email: userFinder.email,
            name: userFinder.name as string,
            image: userFinder.image,
          };
        } else {
          throw new Error("Invalid password");
        }
      },
    }),
  ],
});
