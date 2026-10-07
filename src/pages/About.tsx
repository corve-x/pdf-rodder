import type { ReactNode } from "react";
import { PageContainer } from "@/components/layout/PageContainer";
import { ButtonAnchor } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { techStack } from "@/data/techStack";
import {
  DEVELOPER_NAME,
  GITHUB_HANDLE,
  GITHUB_URL,
  GITHUB_PROJECT_URL,
} from "@/data/links";
import { usePageTitle } from "@/hooks/usePageTitle";
import { cn } from "@/utils/cn";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 border-t border-border pt-10">
      <h2 className="text-xl font-semibold text-text">{title}</h2>
      {children}
    </section>
  );
}

const bodyText = "leading-relaxed text-text-secondary";

export default function About() {
  usePageTitle("Built by VoidEZ");

  return (
    <PageContainer size="narrow" className="space-y-12 sm:space-y-14">
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Build by Satya
        </h1>
        <p className={cn(bodyText, "mx-auto mt-3 max-w-md")}>
          PDF Rodder is built and maintained by {DEVELOPER_NAME}.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonAnchor
            href={GITHUB_URL}
            variant="secondary"
            leftIcon={<GithubIcon className="h-4 w-4" />}
          >
            GitHub
          </ButtonAnchor>
        </div>
      </header>

      <Section title="About the developer">
        <div>
          <p className="text-lg font-semibold text-text">
            {DEVELOPER_NAME} (Corve-x)
          </p>
          <p className="text-sm text-text-muted">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Bangalore, India
            </p>
          </p>
        </div>
        <p className={cn(bodyText, "border-l-2 border-border-strong pl-4")}>
          I&apos;m a Computer Science &amp; Engineering student working on
          turning "what if?" into "hey, it works". Yeah, I also ocassionaly like
          drinking coffee, but you'd find me with my bike more than coffees.
        </p>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-control text-text-secondary transition-colors duration-150 hover:text-text"
        >
          <GithubIcon className="h-5 w-5" />
          <span className="text-sm">
            <span className="block font-medium text-text">GitHub</span>
            {GITHUB_HANDLE}
          </span>
        </a>
      </Section>

      <Section title="Tech Stack">
        <p className={bodyText}>
          PDF Rodder is built using a modern web-dev stack, with its frontend
          deployed on Vercel and its backend powered by Render. The frontend
          handles the user experience and file interactions, while the backend
          processes file conversions, PDF generation, and document merging.
        </p>
        <dl className="divide-y divide-border">
          {techStack.map(({ title, icon: Icon, items }) => (
            <div
              key={title}
              className="grid gap-2 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <dt className="flex items-center gap-2 text-sm font-medium text-text">
                <Icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
                {title}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item.name}
                      className={cn(
                        "rounded-control border px-2.5 py-1 text-sm",
                        item.status === "current"
                          ? "border-border-strong bg-surface-raised text-text"
                          : "border-dashed border-border-strong text-text-secondary",
                      )}
                    >
                      {item.name}
                      {item.status === "planned" && (
                        <span className="ml-1.5 text-xs text-yellow">
                          Planned
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        {/* <p className="text-xs text-text-muted">
          Solid outline: in use today. Dashed outline: planned.
        </p> */}
      </Section>

      <Section title="Project Status">
        <div>
          <h3 className="text-sm font-semibold text-orange">
            Production Setup
          </h3>
          <p className={cn(bodyText, "mt-1")}>
            PDF Rodder is being developed as a full-stack web application, with
            the frontend deployed on Vercel and the backend deployed on Render.
            The backend handles document processing while the frontend provides
            the user interface and file management experience.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-text">
              Currently Implemented
            </h3>
            <ul
              className={cn(
                bodyText,
                "mt-2 list-disc space-y-1 pl-5 text-sm marker:text-text-muted",
              )}
            >
              <li>Convert into PDF and Merge into PDF pages</li>
              <li>File upload with validation</li>
              <li>File reordering and removal before merging</li>
              <li>Progress, error and download states</li>
              <li>
                Backend architecture for document conversion and PDF processing
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">
              Future Implementations
            </h3>
            <ul
              className={cn(
                bodyText,
                "mt-2 list-disc space-y-1 pl-5 text-sm marker:text-text-muted",
              )}
            >
              <li>Support for additional file formats</li>
              <li>
                Improved conversion performance and Larger file/batch processing
                support
              </li>
              <li>Additional PDF utilities</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Why PDF Rodder?">
        <p className={cn(bodyText, "border-l-2 border-border-strong pl-4")}>
          PDF Rodder is built to make everyday PDF tasks simple and hassle-free.
          Convert files, merge documents, and download your results through a
          clean, straightforward interface. No unnecessary complexity or account
          requirements — just fast, practical PDF utilities designed to get the
          job done.
        </p>
      </Section>

      <section className="border-t border-border pt-10 text-center">
        <h2 className="text-xl font-semibold text-text">
          Wanna see how it is BUILT?
        </h2>
        <p className={cn(bodyText, "mt-2")}>
          Check out the project and get the source code on GitHub.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonAnchor href={GITHUB_PROJECT_URL} size="lg">
            View on GitHub →
          </ButtonAnchor>
        </div>
      </section>
    </PageContainer>
  );
}
