import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"

const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID ,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)