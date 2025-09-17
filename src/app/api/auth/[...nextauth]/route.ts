import NextAuth, { NextAuthOptions, Session, User, AdapterUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { Account, Profile } from "next-auth";

// Interface personnalisée pour session.user basée sur Utilisateur
interface SessionUser extends User {
  id: string;
  role: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  prenom?: string | null;
  nom?: string | null;
}

const prisma = new PrismaClient();
prisma.$connect()
  .then(() => console.log("Connexion Prisma réussie"))
  .catch((err) => {
    console.error("Erreur de connexion Prisma:", err);
    process.exit(1); // Arrête si la connexion échoue
  });

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 30000, // 30 secondes pour éviter socket hang up
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: Session;
      user: User & { prenom?: string; nom?: string; role?: string };
      token: JWT;
    }) {
      console.log("Session callback:", { session, user, token }); // Débogage
      if (user) {
        session.user = {
          id: user.id,
          role: user.role || "EMPLOYE",
          name: user.name || `${user.prenom || ""} ${user.nom || ""}`.trim(),
          email: user.email,
          image: user.image,
          prenom: user.prenom,
          nom: user.nom,
        } as SessionUser;
      }
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
    }) {
      console.log("JWT callback:", { token, user, account }); // Débogage JWT
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "EMPLOYE"; // Cast temporaire
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async signIn({
      user,
      account,
      profile,
      isNewUser,
    }: {
      user: User & { prenom?: string; nom?: string; role?: string };
      account: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }) {
      console.log("Sign-in successful, redirecting to:", { user, account, profile, isNewUser });
    },
    async error({ message }: { message: string }) {
      console.error("Auth error:", message);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
