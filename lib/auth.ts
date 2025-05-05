
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import LinkedIn from "next-auth/providers/linkedin"


 
const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "616600228365-0vnrfjdshs5acm1nine64ciejaohbvif.apps.googleusercontent.com",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "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",
    }),
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_ID || "77spnfwdjtjtcr",
      clientSecret: process.env.AUTH_LINKEDIN_SECRET || "WPL_AP1.LMT3xVmQC51PeXUx.7Spa5w",
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)