 "use client";

import * as React from "react";
import { motion } from "framer-motion";

import { BarChart3, Link as LinkIcon, Wallet } from "lucide-react";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Create a payment link",
    description: "Generate a clean USDC payment link for any amount.",
    Icon: LinkIcon,
  },
  {
    step: "02",
    title: "Customer pays instantly",
    description:
      "Your client pays with any Solana wallet. Funds go directly to you.",
    Icon: Wallet,
  },
  {
    step: "03",
    title: "Track and export",
    description:
      "Monitor transactions in real time and export your history anytime.",
    Icon: BarChart3,
  },
] as const;

export function HowItWorks() {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="border-t border-border"
    >
      <Container className="py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center space-y-4"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Simple by design
          </p>
          <h2
            id="how-it-works-heading"
            className={cn(
              "text-balance text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground",
            )}
          >
            Start accepting crypto payments in minutes
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
            Velora lets Nigerian freelancers and merchants accept USDC or SOL
            payments globally without custody, friction, or complex setup.
          </p>
        </motion.div>

        <div className="mt-12 lg:mt-16">
          <div className="relative">
            <div className="hidden lg:block absolute inset-x-16 top-16 h-px bg-border/60" />

            <motion.div
              className="relative grid gap-6 sm:gap-8 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {STEPS.map(({ step, title, description, Icon }, index) => (
                <motion.div
                  key={step}
                  className={cn(
                    "rounded-2xl border border-border/80 bg-card p-6 sm:p-7",
                    "shadow-[0_18px_55px_rgba(0,0,0,0.7)]",
                    "transition-transform transition-shadow duration-200",
                    "hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(0,0,0,0.75)]",
                    "flex flex-col gap-4",
                    index === 1 ? "lg:-translate-y-3" : "lg:translate-y-0",
                  )}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.45, delay: 0.08 * index }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/5 px-3 py-1 text-xs font-medium text-emerald-300">
                      <span className="text-[0.75rem] tracking-[0.24em] uppercase">
                        {step}
                      </span>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-background/40 p-2">
                      <Icon
                        className="h-4 w-4 text-emerald-300"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

