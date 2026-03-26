import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { getRequestContext } from '@cloudflare/next-on-pages'
import { getDb, users, transactions } from './db'
import { eq } from 'drizzle-orm'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'google' || !user.email) return true;

      try {
        const { env } = getRequestContext();
        const db = getDb(env);

        // 查询用户是否已存在
        const existing = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1);

        if (existing.length === 0) {
          // 新用户 - 写入数据库并赠送 5 个额度
          const userId = crypto.randomUUID();
          await db.insert(users).values({
            id: userId,
            name: user.name,
            email: user.email,
            image: user.image,
            credits: 5,
            createdAt: Date.now(),
          });
          await db.insert(transactions).values({
            id: crypto.randomUUID(),
            userId,
            type: 'grant',
            amount: 5,
            description: 'Welcome gift',
            createdAt: Date.now(),
          });
        }
      } catch (e) {
        console.error('DB signIn error:', e);
        // 即使 DB 出错也允许登录
      }
      return true;
    },

    async session({ session }) {
      if (!session.user?.email) return session;

      try {
        const { env } = getRequestContext();
        const db = getDb(env);

        const [user] = await db
          .select({ credits: users.credits, id: users.id })
          .from(users)
          .where(eq(users.email, session.user.email))
          .limit(1);

        if (user) {
          (session.user as any).credits = user.credits;
          (session.user as any).id = user.id;
        }
      } catch (e) {
        console.error('DB session error:', e);
      }

      return session;
    },
  },
})
