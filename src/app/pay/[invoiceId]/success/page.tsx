"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function PaySuccessPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const invoiceId = params?.invoiceId as string;
  const amount = searchParams.get("amount") ?? "0";

  const displayAmount = Number.isNaN(Number(amount))
    ? "0.00"
    : Number(amount).toFixed(2);
  const txId = `TX-${(invoiceId ?? "XXXX").slice(0, 6).toUpperCase()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <motion.div
          className={cn(
            "w-full max-w-md rounded-3xl border border-white/5 bg-zinc-900/80",
            "shadow-2xl shadow-black/50 px-6 py-8 sm:px-8 sm:py-10",
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
              Success
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Payment successful
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Invoice <span className="font-mono">{invoiceId}</span> has been
                marked as paid.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-[0.18em]">
                Amount
              </p>
              <p className="text-3xl font-semibold tracking-tight text-white">
                ${displayAmount}{" "}
                <span className="text-sm font-normal text-zinc-400">
                  USDC
                </span>
              </p>
            </div>

            <div className="mt-4 space-y-1 text-xs text-zinc-400">
              <p>
                Transaction ID:{" "}
                <span className="font-mono text-zinc-200">{txId}</span>
              </p>
              <p>Settlement ETA: typically under 1 minute on Solana.</p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className={cn(
                "mt-6 inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold",
                "bg-emerald-600 text-white shadow-md hover:shadow-lg",
                "transition-all duration-200 ease-out",
                "hover:-translate-y-0.5 hover:bg-emerald-500",
                "focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-black",
                "active:scale-95",
              )}
            >
              Return to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

