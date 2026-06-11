'use client';
import { useState } from 'react';
import { AppShell, EventSelector, PageHeader, money } from '@/components/ui';
import { ExpenseItem, usePocketStore } from '@/lib/store';

export default function ExpensesPage() {
  const store = usePocketStore();
  const [form, setForm] = useState({ name: '', category: 'Fixed' as ExpenseItem['category'], amount: 1000 });
  function submit(e: React.FormEvent) { e.preventDefault(); if (!form.name.trim()) return; store.addExpense({ name: form.name, category: form.category, amount: Number(form.amount) }); setForm({ name: '', category: 'Fixed', amount: 1000 }); }
  return <AppShell><PageHeader title="Expense Manager" description="Add and view fixed, variable, marketing, and operating expenses for each event." action={<EventSelector {...store} />} />
    <section className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]"><div className="card p-6"><h2 className="text-xl font-semibold text-ink">Add Expense</h2><form onSubmit={submit} className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4"><input className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Expense name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><div className="grid grid-cols-2 gap-3"><select className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ExpenseItem['category'] })}>{['Fixed', 'Variable', 'Marketing', 'Operations'].map((c) => <option key={c}>{c}</option>)}</select><input type="number" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} /></div><button className="rounded-xl bg-ink px-3 py-2 text-sm font-semibold text-white">Add Expense</button></form></div>
    <div className="card p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold text-ink">View Expenses</h2><p className="font-semibold text-ink">{money(store.totals.totalExpenses)}</p></div><div className="mt-5 space-y-3">{store.eventExpenses.map((e) => <div key={e.id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4"><div><p className="font-medium text-ink">{e.name}</p><p className="text-xs text-slate-500">{e.category} expense</p></div><p className="font-semibold text-ink">{money(e.amount)}</p></div>)}</div></div></section>
  </AppShell>;
}
