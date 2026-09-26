'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Workout } from '../types';
type Store = { plan: Workout[]; saved: Workout[]; addPlan: (w: Workout) => void; addSaved: (w: Workout) => void; removePlan: (id: Workout['id']) => void; removeSaved: (id: Workout['id']) => void; done: (id: Workout['id']) => void; toast: (msg: string) => void };
const Ctx = createContext<Store | null>(null);
const getStored = (key: string) => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } };
export function AppProvider({ children }: { children: React.ReactNode }) {
 const [plan, setPlan] = useState<Workout[]>([]), [saved, setSaved] = useState<Workout[]>([]), [notice, setNotice] = useState('');
 useEffect(() => { setPlan(getStored('fitlog-plan')); setSaved(getStored('fitlog-saved')); }, []);
 useEffect(() => { localStorage.setItem('fitlog-plan', JSON.stringify(plan)); }, [plan]); useEffect(() => { localStorage.setItem('fitlog-saved', JSON.stringify(saved)); }, [saved]);
 const toast = (msg: string) => { setNotice(msg); window.setTimeout(() => setNotice(''), 2600); };
 const value = useMemo(() => ({ plan, saved, toast, addPlan: (w: Workout) => { if (plan.some(x => String(x.id) === String(w.id))) return toast('Already in today’s plan'); if (plan.length >= 5) return toast('Today’s plan is capped at five lifts'); setPlan(p => [...p, w]); toast('Added to today’s plan'); }, addSaved: (w: Workout) => { if (saved.some(x => String(x.id) === String(w.id))) return toast('Already saved'); setSaved(p => [...p, w]); toast('Saved for later'); }, removePlan: (id: Workout['id']) => { setPlan(p => p.filter(x => String(x.id) !== String(id))); toast('Removed from today’s plan'); }, removeSaved: (id: Workout['id']) => { setSaved(p => p.filter(x => String(x.id) !== String(id))); toast('Removed from saved'); }, done: (id: Workout['id']) => { setPlan(p => p.filter(x => String(x.id) !== String(id))); toast('Workout marked as done. Great work!'); } }), [plan, saved]);
 return <Ctx.Provider value={value}>{children}{notice && <div className="toast">✓ {notice}</div>}</Ctx.Provider>;
}
export const useApp = () => { const ctx = useContext(Ctx); if (!ctx) throw new Error('App context missing'); return ctx; };
