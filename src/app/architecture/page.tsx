import { cn } from "@/lib/utils";

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="mb-10 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Velora
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
            Architecture overview
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl">
            High-level view of how Velora will orchestrate invoices, payments,
            and settlement across fiat and crypto rails.
          </p>
        </div>

        <div className="space-y-3 text-sm text-zinc-100">
          <ArchitectureBlock label="Frontend (Next.js)" />
          <ArchitectureArrow />
          <ArchitectureBlock label="Invoice API" />
          <ArchitectureArrow />
          <ArchitectureBlock label="Payment Orchestrator" />
          <ArchitectureArrow />
          <ArchitectureBlock label="Paystack / Flutterwave / Solana" />
          <ArchitectureArrow />
          <ArchitectureBlock label="Webhook Listener" />
          <ArchitectureArrow />
          <ArchitectureBlock label="Merchant Wallet" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 text-xs text-zinc-400">
          <p className="rounded-2xl border border-white/5 bg-zinc-900/80 px-4 py-3">
            <span className="font-semibold text-zinc-100">
              Webhook verification
            </span>
            <br />
            All Paystack / Flutterwave callbacks are verified with signatures
            and idempotency keys.
          </p>
          <p className="rounded-2xl border border-white/5 bg-zinc-900/80 px-4 py-3">
            <span className="font-semibold text-zinc-100">
              Non-custodial settlement
            </span>
            <br />
            Funds are pushed directly to merchant wallets; Velora does not hold
            long-term balances.
          </p>
          <p className="rounded-2xl border border-white/5 bg-zinc-900/80 px-4 py-3">
            <span className="font-semibold text-zinc-100">
              Unified invoice ledger
            </span>
            <br />
            A Postgres-backed invoice store tracks status across card, bank,
            and crypto rails.
          </p>
        </div>
      </div>
    </div>
  );
}

function ArchitectureBlock({ label }: { label: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-zinc-900/80",
        "px-4 py-3 shadow-xl shadow-black/40",
      )}
    >
      <p className="font-medium text-zinc-50">{label}</p>
    </div>
  );
}

function ArchitectureArrow() {
  return (
    <div className="flex justify-center text-zinc-500">
      <span className="text-lg">↓</span>
    </div>
  );
}

