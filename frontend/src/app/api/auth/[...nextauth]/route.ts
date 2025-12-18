import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        name: { label: "Name", type: "text" },
        accessToken: { label: "AccessToken", type: "text" },
      },
      authorize(credentials) {
        if (!!credentials) {
          return {
            id: "",
            username: credentials.username,
            email: credentials.email,
            name: credentials.name,
            accessToken: credentials.accessToken,
          };
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.username = token.username;
      session.email = token.email;
      session.name = token.name;
      session.accessToken = token.accessToken;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV == "production",
});

export { handler as GET, handler as POST };
