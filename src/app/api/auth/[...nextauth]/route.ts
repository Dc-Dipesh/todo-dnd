import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Adjust this import path based on your project structure

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt" as const, // "jwt" is recommended for stateless sessions
  },
  callbacks: {
    // This callback is triggered when a user signs in
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile?: any;
    }) {
      // Ensure the user has a username (for OAuth users)
      if (!user.username) {
        user.username = profile?.email;
      }

      // Ensure user ID is included in the JWT and session
      if (!user.id) {
        console.error("No user ID available!");
      }

      // Make sure the password is set to null for OAuth users
      user.password = null;

      return true;
    },

    // This callback is triggered when the session is created
    async session({ session, user }: { session: any; user: any }) {
      if (user) {
        // Attach the user ID and username to the session object
        session.user.id = user.id;
        session.user.username = user.username;
      }

      return session;
    },

    // This callback is triggered when the JWT is created
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        // Ensure user ID and username are included in the JWT token
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
