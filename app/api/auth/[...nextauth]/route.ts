import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { defaultConfig } from 'next/dist/server/config-shared';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
    
  ],
  pages: {
    signIn: '/sign-in'
  }
});

export { handler as GET, handler as POST }
