"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function BankPayPage() {
  const params = useParams();
  const router = useRouter();

  const [state, setState] = useState<"idle" | "verifying" | "success">("idle");
  const [acctCopied, setAcctCopied] = useState(false);
  const [refCopied, setRefCopied] = useState(false);

  const invoiceId = params?.invoiceId as string;
  const reference = invoiceId ? `INV-${invoiceId.slice(0, 6)}` : "INV-XXXXX";

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText("1234567890");
      setAcctCopied(true);
      setTimeout(() => setAcctCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(reference);
      setRefCopied(true);
      setTimeout(() => setRefCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const handleCompletedTransfer = () => {
    if (state !== "idle") return;
    setState("verifying");
    setTimeout(() => {
      if (invoiceId) {
        try {
          window.localStorage.setItem(`invoice_${invoiceId}`, "paid");
        } catch {
          // ignore
        }
      }
      setState("success");
      setTimeout(() => router.push("/dashboard"), 1500);
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
              Bank transfer
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Settlement account
            </h1>
            <p className="text-xs text-zinc-500">
              Reference:{" "}
              <span className="font-mono">{reference}</span>
            </p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="space-y-1.5">
              <p className="text-zinc-400">Bank</p>
              <p className="text-white font-medium">Zenith Bank</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-zinc-400">Account name</p>
              <p className="text-white font-medium">Velora Demo Settlement</p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <p className="text-zinc-400 text-sm">Account number</p>
                <p className="text-white font-medium tracking-[0.16em]">
                  1234567890
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[0.7rem] font-medium text-zinc-100 transition-colors hover:bg-white/10"
              >
                {acctCopied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <p className="text-zinc-400 text-sm">Payment reference</p>
                <p className="text-white font-medium font-mono">
                  {reference}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyReference}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[0.7rem] font-medium text-zinc-100 transition-colors hover:bg-white/10"
              >
                {refCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="my-5 border-t border-white/5" />

          {state === "idle" && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCompletedTransfer}
                className={cn(
                  "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                  "bg-emerald-600 text-white shadow-md hover:shadow-lg",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:bg-emerald-500",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-black",
                  "active:scale-95",
                )}
              >
                I&apos;ve Completed Transfer
              </button>
              <p className="text-[0.7rem] text-zinc-400 text-center">
                Bank confirmation typically takes 30–60 seconds.
              </p>
            </div>
          )}

          {state === "verifying" && (
            <div className="mt-4 space-y-3 text-center">
              <div className="mx-auto h-8 w-8 rounded-full border-2 border-emerald-400/60 border-t-transparent animate-spin" />
              <p className="text-sm font-medium text-white">
                Confirming transfer…
              </p>
              <p className="text-xs text-zinc-400">
                Waiting for bank confirmation and webhook callback.
              </p>
            </div>
          )}

          {state === "success" && (
            <div className="mt-4 space-y-3 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                ✓
              </div>
              <p className="text-sm font-medium text-white">
                Transfer confirmed
              </p>
              <p className="text-xs text-zinc-400">
                Your invoice has been marked as paid in Velora.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

