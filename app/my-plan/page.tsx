"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "../components/app-provider";
import { Footer, Navbar } from "../components/site-chrome";
import { WorkoutList } from "../components/workout-list";

const toNumber = (value: unknown) =>
  Number(String(value ?? 0).replace(/[^0-9.]/g, "")) || 0;

export default function MyPlan() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={<main className="container page-loading">Loading plan…</main>}
      >
        <PlanContent />
      </Suspense>
      <Footer />
    </>
  );
}

function PlanContent() {
  const { plan, saved } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") === "saved" ? "saved" : "plan";
  const minutes = useMemo(
    () =>
      plan.reduce((total, workout) => total + toNumber(workout.duration), 0),
    [plan],
  );
  const calories = useMemo(
    () =>
      plan.reduce((total, workout) => total + toNumber(workout.calories), 0),
    [plan],
  );
  const entries = tab === "plan" ? plan : saved;
  return (
      <main className="container myplan">
        <p className="eyebrow">TODAY&apos;S TRAINING</p>
        <h1>MY PLAN</h1>
        <p className="lead">
          Cap of five lifts for today. Finish them, then load more.
        </p>
        <div className="metrics">
          <div>
            <span>EXERCISES</span>
            <b>
              {plan.length}
              <small>/5</small>
            </b>
          </div>
          <div>
            <span>MINUTES</span>
            <b>{minutes}</b>
          </div>
          <div>
            <span>CALORIES</span>
            <b>{calories}</b>
          </div>
        </div>
        <div className="tabs">
          <button
            className={tab === "plan" ? "selected" : ""}
            onClick={() => router.push("/my-plan?tab=plan")}
          >
            Today&apos;s Plan <b>{plan.length}</b>
          </button>
          <button
            className={tab === "saved" ? "selected" : ""}
            onClick={() => router.push("/my-plan?tab=saved")}
          >
            Saved <b>{saved.length}</b>
          </button>
        </div>
        <section className="plan-list">
          {entries.length ? (
            <WorkoutList items={entries} saved={tab === "saved"} />
          ) : (
            <div className="empty">
              <div>◇</div>
              <h3>NOTHING HERE YET</h3>
              <p>Browse the library and add a lift to get today moving.</p>
              <Link href="/" className="primary-btn">
                Go to workouts →
              </Link>
            </div>
          )}
        </section>
      </main>
  );
}
