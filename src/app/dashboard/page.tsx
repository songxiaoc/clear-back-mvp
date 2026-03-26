export const runtime = 'edge';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap, ArrowUpRight } from "lucide-react";
import { getRequestContext } from '@cloudflare/next-on-pages';
import { getDb, users, transactions } from '@/db';
import { eq, desc } from 'drizzle-orm';

interface CloudflareEnv {
  DB: D1Database;
}

interface HistoryItem {
  id: string;
  label: string;
  amount: string;
  date: string;
  type: 'earn' | 'spend';
}

type ExtendedUser = {
  id?: string;
  credits?: number;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  let userCredits = 5;
  let history: HistoryItem[] = [];

  try {
    const { env } = getRequestContext() as { env: CloudflareEnv };
    const db = getDb(env);

    const [user] = await db
      .select({ credits: users.credits })
      .from(users)
      .where(eq(users.email, session.user.email))
      .limit(1);

    if (user) {
      userCredits = user.credits;
    }

    const extUser = session.user as ExtendedUser;
    if (extUser.id) {
      const txs = await db
        .select()
        .from(transactions)
        .where(eq(transactions.userId, extUser.id))
        .orderBy(desc(transactions.createdAt))
        .limit(10);

      history = txs.map(tx => ({
        id: tx.id,
        label: tx.description ?? tx.type,
        amount: tx.amount > 0 ? `+${tx.amount}` : `${tx.amount}`,
        date: new Date(tx.createdAt ?? Date.now()).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        type: tx.amount > 0 ? 'earn' : 'spend',
      }));
    }
  } catch (e) {
    console.error('Dashboard DB error:', e);
  }

  const user = session.user as ExtendedUser;

  return (
    <div className="flex-1 bg-[#fafaf8] min-h-screen">
      <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#111"/>
            <path d="M8 14C8 10.686 10.686 8 14 8C17.314 8 20 10.686 20 14" stroke="#f5f5f0" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 14C8 17.314 10.686 20 14 20" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900">FocusCut Pro</span>
        </div>
        <Link href="/" className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
          <ArrowLeft size={14} />
          Back to app
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-6">
        <div className="flex items-center gap-4">
          <img src={user?.image || ""} alt="Avatar" className="w-14 h-14 rounded-full border border-neutral-200" />
          <div>
            <h1 className="text-xl font-semibold text-neutral-900">{user?.name}</h1>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>
        </div>

        <div className="bg-neutral-900 rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-neutral-500 mb-2">Available Credits</p>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-bold text-white">{userCredits}</span>
              <span className="text-neutral-500 pb-2 text-sm">credits</span>
            </div>
            <p className="text-neutral-500 text-sm mt-2">Each credit = 1 high-res background removal</p>
          </div>
          <Link href="/#pricing" className="flex items-center gap-2 bg-white text-neutral-900 text-sm font-semibold px-6 py-3 rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap self-start md:self-center">
            <Zap size={15} />
            Get more credits
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">Credit History</h2>
            <span className="text-xs text-neutral-400">{history.length} transactions</span>
          </div>

          <div className="divide-y divide-neutral-100">
            {history.length === 0 ? (
              <div className="px-6 py-8 text-center text-sm text-neutral-400">No transactions yet</div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-6 py-4 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      item.type === "earn" ? "bg-green-50 text-green-700" : "bg-neutral-100 text-neutral-600"
                    }`}>
                      {item.type === "earn" ? "↑" : "↓"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">{item.label}</p>
                      <p className="text-xs text-neutral-400">{item.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold tabular-nums ${
                    item.type === "earn" ? "text-green-600" : "text-neutral-700"
                  }`}>
                    {item.amount}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
            <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
              Start removing backgrounds
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
