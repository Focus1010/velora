"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import PaymentGenerator, {
  type Invoice,
} from "@/components/dashboard/payment-generator";
import { useAuthGuard } from "@/hooks/use-auth";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { isReady } = useAuthGuard();
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    setInvoices((prev) =>
      prev.map((invoice) => {
        if (typeof window === "undefined") return invoice;
        const stored = window.localStorage.getItem(
          `invoice_${invoice.id}`,
        );
        if (stored === "paid") {
          return { ...invoice, status: "paid" };
        }
        return invoice;
      }),
    );
  }, []);

  const totalVolume = invoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0,
  );
  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "paid",
  ).length;

  const handleCreateInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-2 max-w-md">
              Generate USDC invoices, share payment links, and keep an eye on
              what&apos;s getting paid — all from one calm, focused surface.
            </p>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-xl px-6 py-3",
              "bg-[#1F8A70] text-white font-medium text-sm",
              "shadow-md hover:shadow-lg",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-0.5 hover:bg-[#1a735c]",
              "focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/50 focus:ring-offset-2 focus:ring-offset-[#0E1116]",
              "active:scale-95",
            )}
          >
            New Invoice
          </button>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-3 mb-10"
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.div
            className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/10 to-white/[0.02] px-4 py-5 sm:px-5 sm:py-6 shadow-xl shadow-black/40 rounded-2xl"
            variants={fadeInUp}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-gray-400 uppercase">
              Total Volume
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              ${totalVolume.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/5 bg-zinc-900/70 backdrop-blur px-4 py-5 sm:px-5 sm:py-6 shadow-xl shadow-black/40"
            variants={fadeInUp}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-gray-400 uppercase">
              Total Invoices
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {totalInvoices}
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 px-4 py-5 sm:px-5 sm:py-6 shadow-xl shadow-black/40"
            variants={fadeInUp}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-emerald-200 uppercase">
              Paid Invoices
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-100">
              {paidInvoices}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            delay: 0.12,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <PaymentGenerator onCreateInvoice={handleCreateInvoice} />
          </motion.div>

          <motion.div
            className={cn(
              "rounded-2xl border border-white/5 bg-zinc-900/70 p-8",
              "shadow-xl shadow-black/40 backdrop-blur",
            )}
            variants={fadeInUp}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Invoices
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Track invoices as they are created and monitor what&apos;s
                waiting to be paid.
              </p>

              <div className="mt-4 space-y-2">
                {invoices.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No invoices yet. Create your first invoice to see it here.
                  </p>
                ) : (
                  invoices.slice(0, 5).map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5 text-sm"
                    >
                      <div>
                        <p className="text-gray-200">
                          ${invoice.amount.toFixed(2)} USDC
                        </p>
                        <p className="text-xs text-gray-500">
                          {invoice.id.slice(0, 4)}…{invoice.id.slice(-4)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
                          invoice.status === "paid"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-yellow-500/15 text-yellow-400",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            invoice.status === "paid"
                              ? "bg-emerald-400"
                              : "bg-yellow-400",
                          )}
                        />
                        {invoice.status === "paid" ? "Paid" : "Pending"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
