import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UsageNotice } from "@/components/layout/UsageNotice";

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-control focus:bg-surface-raised focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Header />
      {/* Keyed by path so the small fade replays on each page change */}
      <main
        id="main"
        key={pathname}
        className="flex-1 py-10 sm:py-14 motion-safe:animate-fade-in"
      >
        <Outlet />
      </main>
      <Footer />
      <UsageNotice />
    </div>
  );
}
