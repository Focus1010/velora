"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";
import { getInvoices, setInvoices } from "@/lib/storage";

function truncateAddress(address: string, chars = 4) {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

export default function PayPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [isPaying, setIsPaying] = React.useState(false);
  const [isPaid, setIsPaid] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [linkCopied, setLinkCopied] = React.useState(false);
  const [invoiceUrl, setInvoiceUrl] = React.useState("");

  const invoiceId = params?.invoiceId as string;
  const amount = searchParams.get("amount") ?? "0";
  const wallet = searchParams.get("wallet") ?? "";

  React.useEffect(() => {
    if (!invoiceId) return;
    const url = `${window.location.origin}/pay/${invoiceId}?amount=${amount}&wallet=${wallet}`;
    setInvoiceUrl(url);
  }, [invoiceId, amount, wallet]);

  const handleMockPayWithWallet = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setIsPaid(true);
      if (invoiceId) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(`invoice_${invoiceId}`, "paid");
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
    }, 900);
  };

  const handleCopyAddress = async () => {
    if (!wallet) return;
    try {
      await navigator.clipboard.writeText(wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  const displayAmount = Number.isNaN(Number(amount))
    ? "0.00"
    : Number(amount).toFixed(2);

  return (
    <div className="min-h-screen bg-black">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="flex justify-center">
          <motion.div
            className={cn(
              "w-full max-w-md rounded-3xl border border-white/5 bg-zinc-900/80",
              "shadow-2xl shadow-black/50",
              "px-6 py-8 sm:px-8 sm:py-10",
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 text-center">
              <div className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                Velora • Invoice
              </div>
              <h1 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Pay invoice
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                Invoice ID:{" "}
                <span className="font-mono text-foreground/80">
                  {invoiceId}
                </span>
              </p>
            </div>

            <div className="mb-6 space-y-3 text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.18em]">
                Amount due
              </p>
              <p className="text-3xl sm:text-4xl font-semibold text-foreground">
                ${displayAmount}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  USDC
                </span>
              </p>
              {wallet && (
                <p className="text-xs text-muted-foreground">
                  Merchant wallet:{" "}
                  <span className="font-mono text-xs text-zinc-400 truncate">
                    {truncateAddress(wallet)}
                  </span>
                </p>
              )}
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={async () => {
                  if (!invoiceUrl) return;
                  try {
                    await navigator.clipboard.writeText(invoiceUrl);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 1200);
                  } catch {
                    // ignore
                  }
                }}
                disabled={!invoiceUrl}
                className={cn(
                  "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                  "bg-white/10 text-foreground border border-white/10",
                  "transition-all duration-200 ease-out",
                  "hover:bg-white/20",
                  "focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {linkCopied ? "Link copied" : "Copy Invoice Link"}
              </button>

              <p className="text-[0.7rem] text-center text-muted-foreground">
                Share this link with your customer to complete payment.
              </p>

              <div className="my-4 border-t border-white/5" />

              <button
                type="button"
                onClick={handleMockPayWithWallet}
                disabled={isPaying || isPaid}
                className={cn(
                  "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                  "bg-[#1F8A70] text-white shadow-md hover:shadow-lg",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:bg-[#1a735c]",
                  "focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/60 focus:ring-offset-2 focus:ring-offset-[#0E1116]",
                  "active:scale-95",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                )}
              >
                {isPaid ? "Payment completed" : isPaying ? "Confirm in wallet…" : "Pay with Wallet"}
              </button>

              <button
                type="button"
                onClick={handleCopyAddress}
                disabled={!wallet}
                className={cn(
                  "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                  "bg-transparent text-foreground border border-border/80",
                  "transition-all duration-200 ease-out",
                  "hover:bg-foreground/5",
                  "focus:outline-none focus:ring-2 focus:ring-border/80 focus:ring-offset-2 focus:ring-offset-[#0E1116]",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                )}
              >
                {copied ? "USDC address copied" : "Copy USDC Address"}
              </button>

              <Link
                href={`/pay/${invoiceId}/card?amount=${amount}&wallet=${wallet}`}
                className={cn(
                  "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                  "bg-white/5 text-foreground border border-white/10",
                  "transition-all duration-200 ease-out",
                  "hover:bg-white/10",
                )}
              >
                Pay with Card
              </Link>

              <Link
                href={`/pay/${invoiceId}/bank`}
                className={cn(
                  "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                  "bg-white/5 text-foreground border border-white/10",
                  "transition-all duration-200 ease-out",
                  "hover:bg-white/10",
                )}
              >
                Pay with Bank Transfer
              </Link>
            </div>

            <p className="mt-5 text-[0.7rem] text-center text-muted-foreground">
              For demo purposes, wallet payments are simulated and marked as
              paid after confirmation.
            </p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

