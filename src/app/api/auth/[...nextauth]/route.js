import { connectDB } from "@/lib/connectDB";
import User from "@/model/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

export const authOptions = {
  pages: {signIn: "/"},
  session: {strategy: "jwt"},
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {

        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({email: email});

          if (!user) {
            return null;
          }

          const passwordMatched = await bcrypt.compare(password, user.password);

          if (!passwordMatched) {
            return null;
          }

          return user;

        } catch (error) {
          console.log(error)
        }

      }
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account }) {

  //     if (account.provider === 'google') {

  //       const username = user.name
  //       const email = user.email
  //       const password = user.id

  //       try {

  //         const resCheckUser = await fetch("https://green-globe-go.vercel.app/api/Register/checkUser", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify({ email })
  //         })

  //         const { user } = await resCheckUser.json();

  //         if (user) return true

  //         const res = await fetch("https://green-globe-go.vercel.app/api/Register", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json"
  //           },
  //           body: JSON.stringify({
  //             username, email, password
  //           })
  //         })

  //         if (!res.ok) throw new Error("Somethings went wrong !")

  //       } catch (error) {
  //         console.log(error)
  //       }
        
  //     }

  //     return true
  //   },

  //   async session({ session, user, token }) {

  //     if (token) {
  //       session.user.id = token.id
  //       session.user.name = token.name
  //       session.user.email = token.email
  //       session.user.role = token.role
  //     }

  //     return session
  //   },

  //   async jwt({ token, user, account, profile, isNewUser }) {

  //     const userDB = await User.findOne({email: token.email});

  //     if (!userDB) {
  //       token.id = user.id;
  //       return token
  //     }

  //     return {
  //       id: userDB.id,
  //       name: userDB.username,
  //       email: userDB.email,
  //       role: userDB.role,
  //     }
  //   }
  // }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };