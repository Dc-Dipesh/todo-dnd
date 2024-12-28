import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Adjust this import path based on your project structure
import { compare } from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both username and password");
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password || ""
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          ...user,
        };
      },
    }),

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
    strategy: "jwt" as const,
  },
  callbacks: {
    async signIn({ user, profile }: { user: any; profile?: any }) {
      if (!user.username) {
        user.username = profile?.email;
      }
      user.password = null; // Remove sensitive data
      return true;
    },

    async jwt({ token, user }: { token: any; user?: any }) {
      // Attach user data to the token
      if (user) {
        token.id = user.id; // Preserve numeric ID
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      // Include numeric user ID and username in the session
      session.user.id = token.id; // Numeric ID is retained
      session.user.username = token.username;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
