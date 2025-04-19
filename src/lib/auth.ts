import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db as prisma } from "@/db";
import { generateUsername } from "@/utils/generate-username";
import { ROLE, PUBLIC_ROUTES, AUTHENTICATED_ROUTES, ADMIN_ROUTES } from "@/constants"

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
        // Always set the role to USER for Google provider logins
        token.role = ROLE.USER;
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
      if (
        nextUrl.pathname.startsWith("/api/auth/") // Allow NextAuth API routes
      ) {
        return true
      }


      if (PUBLIC_ROUTES.includes(nextUrl.pathname)) {
        return true;
      }

      // For admin routes, check if user has admin role
      if (ADMIN_ROUTES.includes(nextUrl.pathname)) {
        return auth?.user?.role === ROLE.ADMIN;
      }

      // For authenticated routes, just check if user is logged in
      if (AUTHENTICATED_ROUTES.includes(nextUrl.pathname)) {
        return !!auth;
      }

      return !!auth;
    },
  },
});
