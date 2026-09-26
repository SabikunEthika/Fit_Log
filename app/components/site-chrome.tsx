"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./app-provider";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();
  return (
    <header>
      <nav className="nav container">
        <Link href="/" className="brand">
          <img src="/assets/logo.png" alt="FitLog logo" />
          FITLOG
        </Link>
        <div className="navlinks">
          <Link className={pathname === "/" ? "active" : ""} href="/">
            Workout
          </Link>
          <Link
            className={pathname === "/my-plan" ? "active" : ""}
            href="/my-plan"
          >
            My Plan
          </Link>
        </div>
        <div className="badges">
          <Link href="/my-plan?tab=plan" className="plan-badge">
            Plan <b>{plan.length}</b>
          </Link>
          <Link href="/my-plan?tab=saved" className="saved-badge">
            Saved <b>{saved.length}</b>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container footer">
        <div className="brand">
          <img src="/assets/logo.png" alt="" />
          FITLOG
        </div>
        <small>© 2026 FitLog — Workout Library. Train hard, log honest.</small>
      </div>
    </footer>
  );
}
