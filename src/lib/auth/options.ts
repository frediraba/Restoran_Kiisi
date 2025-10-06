import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { compare, hash } from "bcryptjs";

import { prisma } from "@/lib/prisma-client";

const PASSWORD_PEPPER = process.env.NEXTAUTH_SECRET ?? "";

function withPepper(password: string) {
  return password + PASSWORD_PEPPER;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const normalizedEmail = credentials.email.toLowerCase();
        let user = await prisma.guestProfile.findUnique({
          where: { email: normalizedEmail },
        });

        if (!user) {
          const passwordHash = await hash(withPepper(credentials.password), 12);
          user = await prisma.guestProfile.create({
            data: {
              email: normalizedEmail,
              passwordHash,
            },
          });
        } else if (!user.passwordHash) {
          const passwordHash = await hash(withPepper(credentials.password), 12);
          user = await prisma.guestProfile.update({
            where: { id: user.id },
            data: { passwordHash },
          });
        }

        const isValid = await compare(withPepper(credentials.password), user.passwordHash ?? "");

        if (!isValid) {
          return null;
        }
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        };
      },
    }),
  ],
  pages: {
    signIn: "/account",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

