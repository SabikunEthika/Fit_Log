import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from './components/app-provider';
export const metadata: Metadata = { title: 'FitLog | Workout Library', description: 'Train with intent. Log every set.' };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><AppProvider>{children}</AppProvider></body></html>; }
