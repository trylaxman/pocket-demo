'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { money, percent } from '@/lib/store';

export function StatCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="card p-5"><p className="text-sm text-slate-500">{label}</p><h3 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{value}</h3><p className="mt-2 text-xs text-slate-500">{note}</p></div>;
}

export function Sidebar() {
  const pathname = usePathname();
  const items = [
    ['Dashboard', '/'], ['Events', '/events'], ['Packages', '/packages'], ['Expenses', '/expenses'], ['Scenarios', '/scenarios'], ['Snapshots', '/snapshots'], ['Reports', '/reports'],
  ];
  return <aside className="hidden w-64 shrink-0 rounded-[2rem] bg-ink p-5 text-white lg:block">
    <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-pocket text-lg font-bold">P</div><div><p className="text-lg font-semibold">Pocket</p><p className="text-xs text-white/50">Planning OS</p></div></div>
    <nav className="mt-10 space-y-2 text-sm">{items.map(([label, href]) => {
      const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
      return <Link key={href} href={href} className={`block rounded-2xl px-4 py-3 ${active ? 'bg-white text-ink' : 'text-white/70 hover:bg-white/10'}`}>{label}</Link>;
    })}</nav>
    <div className="mt-10 rounded-3xl bg-white/10 p-4"><p className="text-sm font-medium">Functional demo</p><p className="mt-2 text-xs leading-5 text-white/60">Data is saved locally in browser storage. Final MVP can connect the same flows to Supabase/PostgreSQL.</p></div>
  </aside>;
}

export function AppShell({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ebe8ff,transparent_35%),#f6f7fb]"><section className="mx-auto flex max-w-7xl gap-6 px-6 py-6"><Sidebar /><div className="flex-1">{children}</div></section></main>;
}

export function PageHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <header className="mb-6 flex flex-col justify-between gap-4 rounded-[2rem] bg-white/75 p-5 shadow-sm backdrop-blur md:flex-row md:items-center"><div><div className="mb-2 flex flex-wrap gap-2"><span className="pill">Next.js</span><span className="pill">Local persistence</span><span className="pill">Live profitability engine</span></div><h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{description}</p></div>{action}</header>;
}

export function EventSelector({ events, selectedEventId, setSelectedEventId }: any) {
  return <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>{events.map((event: any) => <option key={event.id} value={event.id}>{event.name}</option>)}</select>;
}

export { money, percent };
