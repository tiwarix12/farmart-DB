import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.OAUTH_CLIENT_KEY,
      clientSecret: process.env.OAUTH_CLIENT_SECRET
    })
    
  ],
  pages: {
    signIn: '/sign-in'
  }
});