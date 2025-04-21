import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db as prisma } from "@/db";
import { generateUsername } from "@/utils/generate-username";
import { ROLE, PROTECTED_ROUTES, ADMIN_EMAILS } from "@/constants";



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user }) {
      try {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });
        if (!existingUser && user.email) {
          await prisma.user.create({
            data: {
              email: user.email,
              imageUrl: user.image,
              name: user.name ?? generateUsername(user.email),
            },
          });
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.image = user.image;
        // Always check if our env file have those 
        token.role = ADMIN_EMAILS.includes(user.email || '') ? ROLE.ADMIN : ROLE.USER;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.role = token.role as ROLE;
      }
      return session;
    },
    authorized: async ({ auth, request }) => {
      const { nextUrl } = request;

      // Allow NextAuth API routes
      if (nextUrl.pathname.startsWith("/api/auth/")) {
        return true;
      }

      // Admin routes require admin role and logged in
      if (nextUrl.pathname.startsWith("/admin")) {
        return auth?.user?.role === ROLE.ADMIN && !!auth;
      }

      // Protected routes require user to be logged in
      if (PROTECTED_ROUTES.includes(nextUrl.pathname))
        return !!auth;

      return true;
    },
  },
});
