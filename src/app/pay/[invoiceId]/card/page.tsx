"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { getInvoices, setInvoices } from "@/lib/storage";

export default function CardPayPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<"idle" | "processing" | "success">("idle");

  const invoiceId = params?.invoiceId as string;
  const amount = searchParams.get("amount") ?? "0";

  const displayAmount = Number.isNaN(Number(amount))
    ? "0.00"
    : Number(amount).toFixed(2);

  const handlePay = () => {
    if (state !== "idle") return;
    setState("processing");
    setTimeout(() => {
      if (invoiceId) {
        if (typeof window !== "undefined") {
          try {
            window.localStorage.setItem(`invoice_${invoiceId}`, "paid");
          } catch {
            // ignore
          }
        }
        const stored = getInvoices() as any[];
        const updated = stored.map((invoice) =>
          invoice.id === invoiceId ? { ...invoice, status: "paid" } : invoice,
        );
        setInvoices(updated);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("velora_invoice_updated"));
        }
      }
      setState("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    if (!invoiceId) {
      router.replace("/");
    }
  }, [invoiceId, router]);

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
          <div className="mb-6 space-y-1 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
              Card payment
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Secure checkout
            </h1>
            <p className="text-xs text-zinc-500">
              Invoice ID:{" "}
              <span className="font-mono">
                {invoiceId ?? "—"}
              </span>
            </p>
          </div>

          {state === "idle" && (
            <div className="space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-medium text-zinc-400">
                  Amount due
                </p>
                <p className="text-3xl font-semibold tracking-tight text-white">
                  ${displayAmount}{" "}
                  <span className="text-sm font-normal text-zinc-400">
                    USDC
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Card number
                  </label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      CVV
                    </label>
                    <input
                      type="password"
                      placeholder="123"
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={state !== "idle"}
                  className={cn(
                    "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                    "bg-emerald-600 text-white shadow-md hover:shadow-lg",
                    "transition-all duration-200 ease-out",
                    "hover:-translate-y-0.5 hover:bg-emerald-500",
                    "focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-black",
                    "active:scale-95",
                    "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                  )}
                >
                  Pay
                </button>

                <p className="text-[0.7rem] text-zinc-500 text-center">
                  <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-600 text-[0.6rem]">
                    🔒
                  </span>
                  256-bit encrypted. Card details are never stored.
                </p>
              </div>
            </div>
          )}

          {state === "processing" && (
            <div className="space-y-4 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-emerald-400 border-t-transparent" />
              <h2 className="text-sm font-medium text-white">
                Processing payment securely…
              </h2>
              <p className="text-xs text-zinc-400">
                Please wait while we confirm your card details with the network.
              </p>
            </div>
          )}

          {state === "success" && (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                ✓
              </div>
              <h2 className="text-lg font-semibold text-white">
                Payment Successful
              </h2>
              <p className="text-xs text-zinc-400">
                Funds will settle into your merchant wallet shortly.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

