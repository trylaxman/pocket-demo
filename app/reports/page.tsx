'use client';
import { AppShell, EventSelector, PageHeader, money, percent } from '@/components/ui';
import { usePocketStore } from '@/lib/store';

export default function ReportsPage() {
  const store = usePocketStore();
  const t = store.totals;
  return <AppShell><PageHeader title="Reports" description="Preview a clean event profitability report generated from events, packages, expenses, and saved assumptions." action={<EventSelector {...store} />} />
    <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]"><div className="card p-6"><h2 className="text-xl font-semibold text-ink">Profitability report</h2><div className="mt-5 rounded-3xl bg-ink p-8 text-white"><p className="text-sm text-white/60">{store.selectedEvent?.name}</p><h3 className="mt-2 text-3xl font-semibold">Executive Summary</h3><p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">Current plan shows {money(t.profit)} projected profit at {percent(t.margin)} margin. Break-even estimate is {t.breakEvenGuests} guests, with current occupancy at {percent(t.occupancy)}.</p><div className="mt-6 grid gap-3 md:grid-cols-4"><div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">Revenue</p><p className="mt-1 text-xl font-semibold">{money(t.revenue)}</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">Expenses</p><p className="mt-1 text-xl font-semibold">{money(t.totalExpenses)}</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">Profit</p><p className="mt-1 text-xl font-semibold">{money(t.profit)}</p></div><div className="rounded-2xl bg-white/10 p-4"><p className="text-xs text-white/50">Risk</p><p className="mt-1 text-xl font-semibold">{t.margin > 35 ? 'Low' : 'Medium'}</p></div></div><button className="mt-6 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink">Export PDF Preview</button></div></div>
    <div className="card p-6"><h2 className="text-xl font-semibold text-ink">Report sections</h2><div className="mt-5 space-y-3">{['Event overview', 'Package revenue', 'Expense breakdown', 'Break-even analysis', 'Scenario comparison', 'Snapshot history'].map((item) => <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-ink">{item}</div>)}</div></div></section>
  </AppShell>;
}
