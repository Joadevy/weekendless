import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.name,
      //     email: profile.email,
      //     image: profile.image,
      //     role: profile.role ?? "user"
      //   };
      // },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.role = user.role;
  //     }
  //     return token;
  //   },

  //   async session({ session, token }) {
  //     if (session.user) {
  //       session.user.role = token.role;
  //     }
  //     return session;
  //   },
  // },
  // pages: {
  //   signIn: "/signin",
  //   // signOut: "/auth/signout",
  //   // error: "/auth/error",
  //   // verifyRequest: "/auth/verify-request",
  //   // newUser: "/auth/new-user",
  // },
  adapter: PrismaAdapter(prisma),
  // session: {
  //   strategy: "jwt",
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
