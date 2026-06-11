'use client';

import { useEffect, useMemo, useState } from 'react';

export type EventItem = {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  targetGuests: number;
  status: 'Planning' | 'Open Sales' | 'Final Review';
};

export type PackageItem = { id: string; eventId: string; name: string; capacity: number; sold: number; price: number };
export type ExpenseItem = { id: string; eventId: string; name: string; category: 'Fixed' | 'Variable' | 'Marketing' | 'Operations'; amount: number };
export type SnapshotItem = { id: string; eventId: string; name: string; revenue: number; expenses: number; profit: number; margin: number; createdAt: string };
export type ScenarioItem = { id: string; eventId: string; name: string; guestLift: number; priceLift: number; extraCost: number };

const STORAGE_KEY = 'pocket-sidemenu-demo-v1';

export const seedEvents: EventItem[] = [
  { id: 'event-bali', name: 'Bali Wellness Retreat', location: 'Ubud, Bali', startDate: '2026-09-12', endDate: '2026-09-18', targetGuests: 28, status: 'Open Sales' },
  { id: 'event-tulum', name: 'Tulum Creator Escape', location: 'Tulum, Mexico', startDate: '2026-11-05', endDate: '2026-11-10', targetGuests: 20, status: 'Planning' },
];

export const seedPackages: PackageItem[] = [
  { id: 'pkg-1', eventId: 'event-bali', name: 'Shared Garden Room', capacity: 14, sold: 11, price: 1890 },
  { id: 'pkg-2', eventId: 'event-bali', name: 'Private Ocean Room', capacity: 8, sold: 6, price: 2490 },
  { id: 'pkg-3', eventId: 'event-bali', name: 'Premium Suite', capacity: 4, sold: 3, price: 3290 },
  { id: 'pkg-4', eventId: 'event-tulum', name: 'Creator Villa Shared', capacity: 12, sold: 4, price: 1590 },
  { id: 'pkg-5', eventId: 'event-tulum', name: 'Private Villa Room', capacity: 8, sold: 2, price: 2190 },
];

export const seedExpenses: ExpenseItem[] = [
  { id: 'exp-1', eventId: 'event-bali', name: 'Venue & accommodation deposit', category: 'Fixed', amount: 9200 },
  { id: 'exp-2', eventId: 'event-bali', name: 'Meals and catering', category: 'Variable', amount: 7800 },
  { id: 'exp-3', eventId: 'event-bali', name: 'Facilitator team', category: 'Operations', amount: 5200 },
  { id: 'exp-4', eventId: 'event-bali', name: 'Ground transport', category: 'Variable', amount: 3100 },
  { id: 'exp-5', eventId: 'event-bali', name: 'Marketing allocation', category: 'Marketing', amount: 2600 },
  { id: 'exp-6', eventId: 'event-tulum', name: 'Villa deposit', category: 'Fixed', amount: 6500 },
  { id: 'exp-7', eventId: 'event-tulum', name: 'Content crew', category: 'Operations', amount: 2800 },
];

export const seedScenarios: ScenarioItem[] = [
  { id: 'scenario-1', eventId: 'event-bali', name: 'Optimistic Push', guestLift: 3, priceLift: 8, extraCost: 1200 },
  { id: 'scenario-2', eventId: 'event-bali', name: 'Conservative Sales', guestLift: -2, priceLift: 0, extraCost: 0 },
];

export function uid(prefix: string) { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`; }
export function money(value: number) { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0); }
export function percent(value: number) { return Number.isFinite(value) ? `${Math.round(value)}%` : '0%'; }

export function calculateTotals(packages: PackageItem[], expenses: ExpenseItem[]) {
  const revenue = packages.reduce((sum, item) => sum + item.price * item.sold, 0);
  const capacity = packages.reduce((sum, item) => sum + item.capacity, 0);
  const sold = packages.reduce((sum, item) => sum + item.sold, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const profit = revenue - totalExpenses;
  const margin = revenue ? (profit / revenue) * 100 : 0;
  const occupancy = capacity ? (sold / capacity) * 100 : 0;
  const breakEvenGuests = packages.length ? Math.ceil(totalExpenses / (revenue / Math.max(sold, 1))) : 0;
  return { revenue, capacity, sold, totalExpenses, profit, margin, occupancy, breakEvenGuests };
}

export function usePocketStore() {
  const [events, setEvents] = useState<EventItem[]>(seedEvents);
  const [packages, setPackages] = useState<PackageItem[]>(seedPackages);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(seedExpenses);
  const [snapshots, setSnapshots] = useState<SnapshotItem[]>([]);
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(seedScenarios);
  const [selectedEventId, setSelectedEventId] = useState('event-bali');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEvents(parsed.events?.length ? parsed.events : seedEvents);
        setPackages(parsed.packages?.length ? parsed.packages : seedPackages);
        setExpenses(parsed.expenses?.length ? parsed.expenses : seedExpenses);
        setSnapshots(parsed.snapshots || []);
        setScenarios(parsed.scenarios?.length ? parsed.scenarios : seedScenarios);
        setSelectedEventId(parsed.selectedEventId || parsed.events?.[0]?.id || 'event-bali');
      } catch {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ events, packages, expenses, snapshots, scenarios, selectedEventId }));
  }, [events, packages, expenses, snapshots, scenarios, selectedEventId, loaded]);

  const selectedEvent = events.find((event) => event.id === selectedEventId) || events[0];
  const eventPackages = packages.filter((item) => item.eventId === selectedEvent?.id);
  const eventExpenses = expenses.filter((item) => item.eventId === selectedEvent?.id);
  const eventSnapshots = snapshots.filter((item) => item.eventId === selectedEvent?.id);
  const eventScenarios = scenarios.filter((item) => item.eventId === selectedEvent?.id);
  const totals = useMemo(() => calculateTotals(eventPackages, eventExpenses), [eventPackages, eventExpenses]);

  function createEvent(data: Omit<EventItem, 'id' | 'status'>) {
    const newEvent: EventItem = { id: uid('event'), status: 'Planning', ...data };
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedEventId(newEvent.id);
    return newEvent;
  }

  function addPackage(data: Omit<PackageItem, 'id' | 'eventId'>) {
    if (!selectedEvent) return;
    setPackages((prev) => [...prev, { id: uid('pkg'), eventId: selectedEvent.id, ...data }]);
  }

  function addExpense(data: Omit<ExpenseItem, 'id' | 'eventId'>) {
    if (!selectedEvent) return;
    setExpenses((prev) => [...prev, { id: uid('exp'), eventId: selectedEvent.id, ...data }]);
  }

  function addScenario(data: Omit<ScenarioItem, 'id' | 'eventId'>) {
    if (!selectedEvent) return;
    setScenarios((prev) => [...prev, { id: uid('scenario'), eventId: selectedEvent.id, ...data }]);
  }

  function saveSnapshot() {
    if (!selectedEvent) return;
    setSnapshots((prev) => [{
      id: uid('snap'), eventId: selectedEvent.id, name: `${selectedEvent.name} Snapshot ${prev.filter((s) => s.eventId === selectedEvent.id).length + 1}`,
      revenue: totals.revenue, expenses: totals.totalExpenses, profit: totals.profit, margin: totals.margin, createdAt: new Date().toLocaleString(),
    }, ...prev]);
  }

  function resetDemo() {
    localStorage.removeItem(STORAGE_KEY);
    setEvents(seedEvents); setPackages(seedPackages); setExpenses(seedExpenses); setSnapshots([]); setScenarios(seedScenarios); setSelectedEventId('event-bali');
  }

  return { events, packages, expenses, snapshots, scenarios, selectedEventId, setSelectedEventId, selectedEvent, eventPackages, eventExpenses, eventSnapshots, eventScenarios, totals, createEvent, addPackage, addExpense, addScenario, saveSnapshot, resetDemo };
}
