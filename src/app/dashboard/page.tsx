"use client";

import * as React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import PaymentGenerator, {
  type Invoice,
} from "@/components/dashboard/payment-generator";
import { useAuthGuard } from "@/hooks/use-auth";
import { getInvoices, setInvoices } from "@/lib/storage";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { isReady } = useAuthGuard();
  const [invoices, setInvoicesState] = React.useState<Invoice[]>([]);
  const [metrics, setMetrics] = React.useState({
    revenue: 0,
    invoiceCount: 0,
    conversion: 0,
  });
  const [chartPoints, setChartPoints] = React.useState<
    { id: string; x: number; y: number; amount: number }
  >([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const stored = getInvoices() as Invoice[];
    const updated = stored.map((invoice) => {
      if (typeof window === "undefined") return invoice;
      const status = window.localStorage.getItem(`invoice_${invoice.id}`);
      if (status === "paid") {
        return { ...invoice, status: "paid" };
      }
      return invoice;
    });
    setInvoicesState(updated);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const refresh = () => {
      const updated = (getInvoices() as Invoice[]).map((invoice) => {
        const status = window.localStorage.getItem(`invoice_${invoice.id}`);
        if (status === "paid") {
          return { ...invoice, status: "paid" };
        }
        return invoice;
      });
      setInvoicesState(updated);
    };

    window.addEventListener("velora_invoice_updated", refresh);
    return () => {
      window.removeEventListener("velora_invoice_updated", refresh);
    };
  }, []);

  React.useEffect(() => {
    if (!invoices.length) {
      setMetrics({ revenue: 0, invoiceCount: 0, conversion: 0 });
      setChartPoints([]);
      setActiveIndex(null);
      return;
    }
    const paid = invoices.filter((invoice) => invoice.status === "paid");
    const revenue = paid.reduce((sum, invoice) => sum + invoice.amount, 0);
    const invoiceCount = invoices.length;
    const conversion =
      invoiceCount === 0 ? 0 : (paid.length / invoiceCount) * 100;

    setMetrics({
      revenue,
      invoiceCount,
      conversion,
    });

    const recent = invoices.slice(-6);
    const maxAmount =
      recent.reduce((max, invoice) => Math.max(max, invoice.amount), 0) || 1;
    const stepX = recent.length > 1 ? 100 / (recent.length - 1) : 0;

    const points = recent.map((invoice, index) => ({
      id: invoice.id,
      amount: invoice.amount,
      x: stepX * index,
      y: 95 - (invoice.amount / maxAmount) * 70, // keep line in viewBox
    }));

    setChartPoints(points);
    setActiveIndex(points.length ? points.length - 1 : null);
  }, [invoices]);

  const handleCreateInvoice = (invoice: Invoice) => {
    setInvoicesState((prev) => {
      const next = [invoice, ...prev];
      setInvoices(next);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("velora_invoice_updated"));
      }
      return next;
    });
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

          <Link
            href="/profile"
            className={cn(
              "inline-flex items-center justify-center rounded-full p-2.5",
              "border border-white/10 bg-zinc-900/80 text-zinc-200",
              "shadow-md hover:shadow-lg",
              "transition-all duration-200 ease-out",
              "hover:-translate-y-0.5 hover:bg-zinc-800",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-black",
              "active:scale-95",
            )}
            aria-label="Open profile"
          >
            <User className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-3 mb-10"
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.div
            className="rounded-3xl border border-white/5 bg-zinc-900/80 px-4 py-5 sm:px-5 sm:py-6 shadow-2xl shadow-black/50"
            variants={fadeInUp}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-gray-400 uppercase">
              💰 Total Revenue
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              ₦{metrics.revenue.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/5 bg-zinc-900/80 px-4 py-5 sm:px-5 sm:py-6 shadow-2xl shadow-black/50"
            variants={fadeInUp}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-gray-400 uppercase">
              📄 Total Invoices
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
              {metrics.invoiceCount}
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-white/5 bg-zinc-900/80 px-4 py-5 sm:px-5 sm:py-6 shadow-2xl shadow-black/50"
            variants={fadeInUp}
          >
            <p className="text-xs font-medium tracking-[0.18em] text-gray-400 uppercase">
              📊 Conversion Rate
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-emerald-100">
              {metrics.conversion.toFixed(0)}%
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="mb-10 mt-2 rounded-3xl border border-white/5 bg-zinc-900/80 px-4 py-4 shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="mb-2 text-xs font-medium text-gray-400 uppercase tracking-[0.18em]">
            Revenue (last 6 invoices)
          </p>
          <div className="h-24">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {chartPoints.length > 1 && (
                <motion.polyline
                  fill="none"
                  stroke="rgba(16,185,129,0.8)"
                  strokeWidth="1.5"
                  points={chartPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
              {chartPoints.map((point, index) => (
                <g key={`point-${point.id}-${index}`}>
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={activeIndex === index ? 1.8 : 1.2}
                    fill={
                      activeIndex === index
                        ? "rgba(16,185,129,1)"
                        : "rgba(16,185,129,0.7)"
                    }
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 * index }}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                </g>
              ))}
            </svg>
          </div>
          {activeIndex !== null && chartPoints[activeIndex] && (
            <p className="mt-2 text-xs text-gray-400">
              Invoice {chartPoints.length - activeIndex} ·{" "}
              <span className="text-emerald-300">
                ${chartPoints[activeIndex].amount.toFixed(2)} USDC
              </span>
            </p>
          )}
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
                  invoices.slice(0, 5).map((invoice, index) => (
                    <div
                      key={`invoice-${invoice.id}-${index}`}
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
