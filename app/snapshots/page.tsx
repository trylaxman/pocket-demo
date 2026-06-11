'use client';
import { AppShell, EventSelector, PageHeader, money, percent } from '@/components/ui';
import { usePocketStore } from '@/lib/store';

export default function SnapshotsPage() {
  const store = usePocketStore();
  return <AppShell><PageHeader title="Snapshot Analyzer" description="Save current planning states and compare profitability over time." action={<div className="flex gap-2"><EventSelector {...store} /><button onClick={store.saveSnapshot} className="rounded-2xl bg-pocket px-5 py-3 text-sm font-semibold text-white">Save Snapshot</button></div>} />
    <section className="card p-6"><div className="flex items-center justify-between gap-4"><div><h2 className="text-xl font-semibold text-ink">Snapshots for {store.selectedEvent?.name}</h2><p className="mt-1 text-sm text-slate-500">Revenue {money(store.totals.revenue)} · Expenses {money(store.totals.totalExpenses)} · Profit {money(store.totals.profit)}</p></div></div><div className="mt-5 grid gap-3 md:grid-cols-3">{store.eventSnapshots.length === 0 ? <p className="text-sm text-slate-500">No snapshots saved yet. Click “Save Snapshot”.</p> : store.eventSnapshots.map((s) => <div key={s.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4"><div className="flex items-center justify-between"><p className="font-medium text-ink">{s.name}</p><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-pocket">{percent(s.margin)}</span></div><p className="mt-3 text-sm text-slate-500">Revenue {money(s.revenue)} · Expenses {money(s.expenses)}</p><p className="mt-1 text-sm font-semibold text-ink">Profit {money(s.profit)}</p><p className="mt-2 text-xs text-slate-400">{s.createdAt}</p></div>)}</div></section>
  </AppShell>;
}
