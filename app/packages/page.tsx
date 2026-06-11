'use client';
import { useState } from 'react';
import { AppShell, EventSelector, PageHeader, money } from '@/components/ui';
import { usePocketStore } from '@/lib/store';

export default function PackagesPage() {
  const store = usePocketStore();
  const [form, setForm] = useState({ name: '', capacity: 10, sold: 0, price: 1500 });
  function submit(e: React.FormEvent) { e.preventDefault(); if (!form.name.trim()) return; store.addPackage({ name: form.name, capacity: Number(form.capacity), sold: Number(form.sold), price: Number(form.price) }); setForm({ name: '', capacity: 10, sold: 0, price: 1500 }); }
  return <AppShell><PageHeader title="Package Builder" description="Create packages, track inventory sold, and calculate package-level revenue for the selected event." action={<EventSelector {...store} />} />
    <section className="card p-6"><h2 className="text-xl font-semibold text-ink">Add package for {store.selectedEvent?.name}</h2><form onSubmit={submit} className="mt-5 grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-5"><input className="rounded-xl border border-slate-200 px-3 py-2 text-sm md:col-span-2" placeholder="Package name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input type="number" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} /><input type="number" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Sold" value={form.sold} onChange={(e) => setForm({ ...form, sold: Number(e.target.value) })} /><input type="number" className="rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /><button className="rounded-xl bg-pocket px-3 py-2 text-sm font-semibold text-white md:col-span-5">Add Package</button></form>
    <div className="mt-5 overflow-hidden rounded-2xl border border-slate-100"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="p-4">Package</th><th>Capacity</th><th>Sold</th><th>Price</th><th>Revenue</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{store.eventPackages.map((p) => <tr key={p.id} className="text-slate-700"><td className="p-4 font-medium text-ink">{p.name}</td><td>{p.capacity}</td><td>{p.sold}</td><td>{money(p.price)}</td><td className="font-semibold text-ink">{money(p.price * p.sold)}</td></tr>)}</tbody></table></div></section>
  </AppShell>;
}
