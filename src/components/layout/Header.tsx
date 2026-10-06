import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/utils/cn";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/convert", label: "Convert into PDF" },
  { to: "/merge", label: "Merge into PDF" },
  { to: "/about", label: "About" },
  { to: "/donate", label: "Help us" },
];

function isActive(to: string, pathname: string) {
  return to === "/" ? pathname === "/" : pathname.startsWith(to);
}

function NavItem({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-control px-3 py-2 text-sm font-medium transition-colors duration-150",
        active ? "text-text" : "text-text-secondary hover:text-text",
      )}
    >
      {children}
      <span
        className={cn(
          "mt-0.5 block h-0.5 rounded-full",
          active ? "bg-orange" : "bg-transparent",
        )}
        aria-hidden="true"
      />
    </Link>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // to close the mobile menu on navigation or Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b border-border bg-background-alt">
      <PageContainer className="flex h-16 items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              active={isActive(item.to, pathname)}
            >
              {item.label}
            </NavItem>
          ))}
        </nav>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-control text-text-secondary transition-colors duration-150 hover:bg-surface-hover hover:text-text md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </PageContainer>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-border md:hidden"
        >
          <PageContainer className="flex flex-col py-2">
            {navItems.map((item) => {
              const active = isActive(item.to, pathname);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-control px-3 py-3 text-base font-medium transition-colors duration-150",
                    active
                      ? "bg-surface-hover text-text"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </PageContainer>
        </nav>
      )}
    </header>
  );
}
