import NextAuth from "next-auth";
import type {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "../../../lib/prisma";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";
 


export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        
        const existsQuery = `
          SELECT * FROM "user" WHERE email = $1
        `;
        const existsParams = [email];
        const existsResult = await sql.query(existsQuery, existsParams);
        const exists = existsResult.rows[0];
        
        if (!exists || !(await compare(password, exists.password))) {
          throw new Error("Invalid username or password");
        }
        
        return exists;
      }
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



