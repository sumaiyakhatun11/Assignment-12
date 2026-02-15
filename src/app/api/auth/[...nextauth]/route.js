import { dbConnect } from "@/lib/dbConnect"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "Enter email" },
      password: { label: "Password", type: "password", placeholder: "Enter password" },
    },
    async authorize(credentials) {
      if (!credentials) return null

      const { email, password } = credentials

      const user = await dbConnect("users").findOne({ email })
      if (!user) return null

      const isPasswordOK = await bcrypt.compare(password, user.password)

      if (!isPasswordOK) return null

      const { password: _password, ...safeUser } = user
      return safeUser
    },
  }),
]

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers,
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, token, user }) {
    if (token) {
    
      session.role = token.role
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if (user) {
      token.email = user.email
      token.role = user.role
    }
    return token
  }
}
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
