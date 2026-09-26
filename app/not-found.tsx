import Link from "next/link";
import { Footer, Navbar } from "./components/site-chrome";
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="empty container notfound">
        <div>404</div>
        <h1>PAGE NOT FOUND</h1>
        <p>That route isn&apos;t part of the workout plan.</p>
        <Link href="/" className="primary-btn">
          Back to workouts →
        </Link>
      </main>
      <Footer />
    </>
  );
}
