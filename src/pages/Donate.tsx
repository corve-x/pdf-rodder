import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, CheckCircle2, Heart, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Alert } from "@/components/ui/Alert";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { usePageTitle } from "@/hooks/usePageTitle";
import { createDonationQr, MAX_DONATION, MIN_DONATION } from "@/lib/api/donate";
import type { DonationQr } from "@/lib/api/donate";
import { cn } from "@/utils/cn";

const PRESETS = [
  { amount: 20, description: "Filter coffee" },
  { amount: 50, description: "Filter coffee + Cookie" },
  { amount: 100, description: "Cold Coffee" },
  { amount: 300, description: "Java Chip Frappuccino" },
];

type Step = "amount" | "pay" | "thanks";

const formatINR = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export default function Donate() {
  usePageTitle("Donate");

  const [step, setStep] = useState<Step>("amount");
  const [amount, setAmount] = useState("");
  const [qr, setQr] = useState<DonationQr | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const numericAmount = Number(amount);
  const isValid =
    amount !== "" &&
    Number.isFinite(numericAmount) &&
    numericAmount >= MIN_DONATION &&
    numericAmount <= MAX_DONATION;

  function handleAmountChange(value: string) {
    // Digits with at most 2 decimal places.
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      setError(null);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValid) {
      setError(
        `Please enter an amount between ${formatINR(MIN_DONATION)} and ${formatINR(MAX_DONATION)}.`,
      );
      return;
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      setQr(await createDonationQr(numericAmount, controller.signal));
      setStep("pay");
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep("amount");
    setQr(null);
    setAmount("");
    setError(null);
  }

  return (
    <PageContainer size="narrow" className="space-y-6">
      <div className="space-y-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-control text-sm text-text-secondary transition-colors duration-150 hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Home
        </Link>
        <PageHeader
          title="Buy me a Coffee"
          description="PDF Rodder is a free-to-use tool. If it saved you time, you can chip in any amount to help keep it running by getting me a coffee."
        />
      </div>

      <Card className="mx-auto w-full max-w-md p-6">
        {step === "amount" && (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label htmlFor="amount" className="text-sm font-medium text-text">
                Amount
              </label>
              <div className="mt-2 flex items-center rounded-control border border-border-strong bg-surface-raised focus-within:ring-2 focus-within:ring-orange">
                <span
                  className="pl-3 text-lg text-text-secondary"
                  aria-hidden="true"
                >
                  ₹
                </span>
                <input
                  id="amount"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="h-12 w-full bg-transparent px-2 text-lg text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-3"
              role="group"
              aria-label="Quick amounts"
            >
              {PRESETS.map((preset) => (
                <button
                  key={preset.amount}
                  type="button"
                  onClick={() => handleAmountChange(String(preset.amount))}
                  className={cn(
                    "rounded-control border p-3 text-left transition-colors duration-150",
                    numericAmount === preset.amount
                      ? "border-orange bg-surface-hover"
                      : "border-border-strong hover:bg-surface-hover",
                  )}
                >
                  <span className="block text-base font-semibold text-text">
                    {formatINR(preset.amount)}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-text-secondary">
                    {preset.description}
                  </span>
                </button>
              ))}
            </div>

            {error && <Alert>{error}</Alert>}

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={loading}
              disabled={!isValid}
              leftIcon={<Heart className="h-5 w-5" aria-hidden="true" />}
            >
              {loading ? "Creating QR…" : "Generate QR"}
            </Button>
          </form>
        )}

        {step === "pay" && qr && (
          <div className="flex flex-col items-center text-center motion-safe:animate-fade-in">
            <p className="text-sm text-text-secondary">You're donating</p>
            <p className="mt-1 text-3xl font-semibold text-text">
              {formatINR(qr.amount)}
            </p>

            {/* White backing keeps the QR scannable on the dark theme. */}
            <img
              src={qr.qrImage}
              alt={`UPI QR code to pay ${formatINR(qr.amount)}`}
              className="mt-5 h-60 w-60 rounded-card bg-white p-3"
            />
            <p className="mt-3 text-sm text-text-secondary">
              Scan with any UPI app (GPay, PhonePe, Paytm…)
            </p>
            <p className="mt-1 break-all text-xs text-text-muted">{qr.upiId}</p>

            <div className="mt-6 flex w-full flex-col gap-3">
              <ButtonAnchor
                href={qr.upiUrl}
                variant="secondary"
                size="lg"
                fullWidth
                leftIcon={<Smartphone className="h-5 w-5" aria-hidden="true" />}
              >
                Open in UPI app (on phone)
              </ButtonAnchor>
              <Button size="lg" fullWidth onClick={() => setStep("thanks")}>
                I've paid
              </Button>
              <Button variant="ghost" fullWidth onClick={reset}>
                Change amount
              </Button>
            </div>
            <p className="mt-4 text-xs text-text-muted">
              Payments go straight to the developer's UPI account. We can't see
              the result, so tap "I've paid" once you're done.
            </p>
          </div>
        )}

        {step === "thanks" && (
          <div className="flex flex-col items-center py-2 text-center motion-safe:animate-fade-in">
            <CheckCircle2
              className="h-10 w-10 text-success"
              aria-hidden="true"
            />
            <h2 className="mt-4 text-xl font-semibold text-text">Thank you!</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Your support helps keep PDF Rodder free for everyone.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="mt-6"
              onClick={reset}
            >
              Donate again
            </Button>
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
