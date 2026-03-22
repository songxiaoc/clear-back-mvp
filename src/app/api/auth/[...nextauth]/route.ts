import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const runtime = 'edge';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // 必须显式添加这一行，否则在 Edge Runtime 下 NextAuth 可能会找不到这个变量导致内部报错
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
