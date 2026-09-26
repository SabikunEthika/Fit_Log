import Link from "next/link";
import type { Workout } from "../types";
export const value = (v: unknown, suffix = "") =>
  String(v ?? "—").includes(suffix) || !suffix
    ? String(v ?? "—")
    : `${v}${suffix}`;
const tags = (w: Workout) =>
  Array.isArray(w.category)
    ? w.category
    : (w.category || "Strength").split(",");
export function WorkoutCard({ w }: { w: Workout }) {
  return (
    <Link href={`/workouts/${w.id}`} className="workout-card">
      <div className="thumb">
        {w.image ? <img src={w.image} alt={w.name} /> : <span>🏋️</span>}
      </div>
      <div className="card-body">
        <div className="tags">
          {tags(w)
            .slice(0, 2)
            .map((t) => (
              <span key={t}>{t.trim()}</span>
            ))}
        </div>
        <h3>{w.name}</h3>
        <p className="equipment">⌁ {w.equipment || "Gym equipment"}</p>
        <div className="stats">
          <span>◷ {value(w.duration, " min")}</span>
          <span>◉ {value(w.calories, " kcal")}</span>
          <span>★ {w.rating || "4.8"}</span>
        </div>
      </div>
    </Link>
  );
}
