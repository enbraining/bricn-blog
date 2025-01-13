import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isEmailVerified = user.email === "me@bricn.net"
      return isEmailVerified
    },
  },
})
