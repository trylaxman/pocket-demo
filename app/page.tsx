'use client';
import Link from 'next/link';
import { AppShell, EventSelector, PageHeader, StatCard, money, percent } from '@/components/ui';
import { usePocketStore } from '@/lib/store';

export default function DashboardPage() {
  const store = usePocketStore();
  const t = store.totals;
  return <AppShell>
    <PageHeader title="Pocket dashboard" description="A clean executive overview with live profitability stats and quick glances across the selected event." action={<div className="flex gap-2"><EventSelector {...store} /><button onClick={store.resetDemo} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Reset</button></div>} />
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Projected Revenue" value={money(t.revenue)} note="From package sales" />
      <StatCard label="Projected Profit" value={money(t.profit)} note={`${percent(t.margin)} estimated margin`} />
      <StatCard label="Inventory Occupancy" value={percent(t.occupancy)} note={`${t.sold}/${t.capacity} spaces sold`} />
      <StatCard label="Total Expenses" value={money(t.totalExpenses)} note={`${store.eventExpenses.length} expense items`} />
    </section>
    <section className="mt-6 grid gap-6 xl:grid-cols-3">
      <div className="card p-6 xl:col-span-2"><div className="flex items-center justify-between"><div><h2 className="text-xl font-semibold text-ink">Current event</h2><p className="mt-1 text-sm text-slate-500">{store.selectedEvent?.location} · {store.selectedEvent?.startDate} to {store.selectedEvent?.endDate}</p></div><Link href="/events" className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white">View Events</Link></div><div className="mt-5 grid gap-4 md:grid-cols-3"><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Target guests</p><p className="mt-1 text-2xl font-semibold text-ink">{store.selectedEvent?.targetGuests}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Packages</p><p className="mt-1 text-2xl font-semibold text-ink">{store.eventPackages.length}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Break-even guests</p><p className="mt-1 text-2xl font-semibold text-ink">{t.breakEvenGuests}</p></div></div></div>
      <div className="card p-6"><h2 className="text-xl font-semibold text-ink">Quick actions</h2><div className="mt-5 grid gap-3"><Link href="/events" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-ink">Create / view event</Link><Link href="/expenses" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-ink">Add expense</Link><Link href="/snapshots" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-ink">Save snapshot</Link><Link href="/reports" className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm font-semibold text-ink">Preview report</Link></div></div>
    </section>
    <section className="mt-6 grid gap-6 xl:grid-cols-2"><div className="card p-6"><h2 className="text-xl font-semibold text-ink">Recent packages</h2><div className="mt-5 space-y-3">{store.eventPackages.slice(0,3).map(p => <div key={p.id} className="flex justify-between rounded-2xl border border-slate-100 p-4"><div><p className="font-medium text-ink">{p.name}</p><p className="text-xs text-slate-500">{p.sold}/{p.capacity} sold</p></div><p className="font-semibold text-ink">{money(p.price * p.sold)}</p></div>)}</div></div><div className="card p-6"><h2 className="text-xl font-semibold text-ink">Recent expenses</h2><div className="mt-5 space-y-3">{store.eventExpenses.slice(0,3).map(e => <div key={e.id} className="flex justify-between rounded-2xl border border-slate-100 p-4"><div><p className="font-medium text-ink">{e.name}</p><p className="text-xs text-slate-500">{e.category}</p></div><p className="font-semibold text-ink">{money(e.amount)}</p></div>)}</div></div></section>
  </AppShell>;
}
