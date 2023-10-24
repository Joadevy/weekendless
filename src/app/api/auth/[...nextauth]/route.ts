import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { db } from "../../../../server/db";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      const u = new URL(url);
      const redirectUrl = u.searchParams.get("callbackUrl")!;

      if (redirectUrl) return redirectUrl;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
    //   // signOut: "/auth/signout",
    //   // error: "/auth/error",
    //   // verifyRequest: "/auth/verify-request",
    //   // newUser: "/auth/new-user",
  },
  adapter: PrismaAdapter(db),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
