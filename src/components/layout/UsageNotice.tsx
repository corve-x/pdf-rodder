//AI GENERATED

import { useEffect, useRef } from "react";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/Button";

// sessionStorage = the notice shows once per visit (it returns when the tab is
// closed and the site is opened again). Change both uses below to
// `localStorage` if you want it to show only once per browser, ever.
const STORAGE_KEY = "pdf-rodder-usage-notice-ack";

function wasAcknowledged() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function UsageNotice() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open || wasAcknowledged()) return;
    dialog.showModal(); // native modal: focus trap + dimmed backdrop for free
  }, []);

  function handleAccept() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore: the notice may simply show again next visit */
    }
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      // Esc is blocked so the notice is closed only by the button.
      onCancel={(event) => event.preventDefault()}
      aria-labelledby="usage-notice-title"
      aria-describedby="usage-notice-body"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-card border border-border bg-surface p-6 text-text backdrop:bg-black/70 motion-safe:animate-fade-in"
    >
      <div className="flex flex-col items-center text-center">
        <HeartHandshake className="h-10 w-10 text-orange" aria-hidden="true" />
        <h2 id="usage-notice-title" className="mt-4 text-xl font-semibold">
          Free &amp; open-source
        </h2>

        <div
          id="usage-notice-body"
          className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary"
        >
          <p>
            PDF Rodder is free to use and open-source. To keep it that way, it
            runs on free hosting and free services that have strict limits.
          </p>
          <p>
            Please use it fairly: keep files to a sensible size, avoid bulk or
            automated use, and don't misuse the tools. Heavy or abusive use can
            slow the site down or take it offline for everyone.
          </p>
          <p>Thank you for respecting it and helping keep it free.</p>
        </div>

        <Button size="lg" fullWidth className="mt-6" onClick={handleAccept}>
          Yes, I understand
        </Button>
      </div>
    </dialog>
  );
}
