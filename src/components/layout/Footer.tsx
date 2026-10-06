import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { GITHUB_NAME, GITHUB_URL } from "@/data/links";

const linkClass =
  "rounded-control text-text-secondary transition-colors duration-150 hover:text-text";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-alt">
      <PageContainer className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold tracking-wide text-text">
            PDF RODDER
          </p>
          <p className="mt-1 text-sm text-text-muted">
            A simple PDF tool for your daily tasks
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
        >
          <Link to="/" className={linkClass}>
            Home
          </Link>
          <Link to="/convert" className={linkClass}>
            Convert
          </Link>
          <Link to="/merge" className={linkClass}>
            Merge
          </Link>
          <Link to="/about" className={linkClass}>
            About
          </Link>
          <Link to="/privacy" className={linkClass}>
            Privacy
          </Link>
          <Link to="/donate" className={linkClass}>
            Help us
          </Link>
        </nav>
      </PageContainer>
      <PageContainer className="flex flex-col gap-1 pb-8 text-xs text-text-muted sm:flex-row sm:justify-between">
        <p>© 2026 PDF Rodder</p>
        <p>
          Built by{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary underline-offset-2 transition-colors duration-150 hover:text-text hover:underline"
          >
            {GITHUB_NAME}
          </a>
        </p>
      </PageContainer>
    </footer>
  );
}
