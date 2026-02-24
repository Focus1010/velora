"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

export function DashboardPreview() {
  return (
    <section className="border-t border-border/60 bg-background">
      <div className="bg-[radial-gradient(circle_at_top,_rgba(31,138,112,0.16),_transparent_55%)]/80">
        <Container className="py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="space-y-4 max-w-xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Built for real merchants
              </p>
              <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
                Everything you need to accept crypto payments
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Generate payment links, monitor transactions in real time, and
                export your history — all from one clean dashboard.
              </p>
            </div>

            <motion.div
              className={cn(
                "relative w-full rounded-2xl border border-border/80 bg-card",
                "shadow-[0_24px_80px_rgba(0,0,0,0.75)]",
                "p-5 sm:p-6 lg:p-7",
                "overflow-hidden",
              )}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -4 }}
            >
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Velora • Overview
                  </p>
                  <h3 className="mt-1 text-sm font-semibold text-foreground">
                    Merchant dashboard
                  </h3>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-300">
                  Live session
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 mb-6">
                <div className="rounded-xl border border-border/70 bg-background/40 px-3 py-3.5">
                  <p className="text-xs text-muted-foreground">Total Volume</p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    $4,820.45
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/40 px-3 py-3.5">
                  <p className="text-xs text-muted-foreground">Payments</p>
                  <p className="mt-1 text-base font-semibold text-foreground">
                    128
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/40 px-3 py-3.5">
                  <p className="text-xs text-muted-foreground">This Week</p>
                  <p className="mt-1 text-base font-semibold text-emerald-300">
                    +$920
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span className="w-[38%]">Wallet</span>
                  <span className="w-[22%] text-right">Amount</span>
                  <span className="w-[22%] text-right">Status</span>
                  <span className="w-[18%] text-right">Time</span>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[480px] space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/40 px-3 py-2.5 text-sm">
                      <span className="w-[38%] font-mono text-foreground/90">
                        8fj3...k2p9
                      </span>
                      <span className="w-[22%] text-right text-foreground">
                        $120.00
                      </span>
                      <span className="w-[22%] text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          Completed
                        </span>
                      </span>
                      <span className="w-[18%] text-right text-muted-foreground">
                        2m ago
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/30 px-3 py-2.5 text-sm">
                      <span className="w-[38%] font-mono text-foreground/90">
                        3kd9...aa21
                      </span>
                      <span className="w-[22%] text-right text-foreground">
                        $45.50
                      </span>
                      <span className="w-[22%] text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                          Completed
                        </span>
                      </span>
                      <span className="w-[18%] text-right text-muted-foreground">
                        10m ago
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border/60 bg-background/20 px-3 py-2.5 text-sm">
                      <span className="w-[38%] font-mono text-foreground/90">
                        9as2...zz11
                      </span>
                      <span className="w-[22%] text-right text-foreground">
                        $300.00
                      </span>
                      <span className="w-[22%] text-right">
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[0.7rem] font-medium text-amber-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                          Pending
                        </span>
                      </span>
                      <span className="w-[18%] text-right text-muted-foreground">
                        1h ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </section>
  );
}

