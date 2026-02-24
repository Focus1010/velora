 "use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Shield, Zap, Layers, Store } from "lucide-react";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Non-custodial",
    description: "You always control your funds.",
    Icon: Shield,
  },
  {
    title: "Instant settlement",
    description: "Payments arrive in seconds.",
    Icon: Zap,
  },
  {
    title: "Built on Solana",
    description: "Fast, low-cost global payments.",
    Icon: Layers,
  },
  {
    title: "Merchant ready",
    description: "Designed for freelancers and businesses.",
    Icon: Store,
  },
] as const;

export function TrustStrip() {
  return (
    <section aria-label="Trust and infrastructure" className="border-t border-border">
      <Container className="py-16">
        <motion.p
          className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45 }}
        >
          Trusted payment infrastructure
        </motion.p>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {FEATURES.map(({ title, description, Icon }, index) => (
            <motion.div
              key={title}
              className={cn(
                "rounded-xl border border-border/80 bg-card p-5 sm:p-6",
                "shadow-sm",
                "transition-transform transition-shadow duration-200",
                "hover:-translate-y-0.5 hover:shadow-md",
              )}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: 0.06 * index }}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg border border-border/70 bg-background/30 p-2">
                  <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 border-t border-border/60"
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.4 }}
        />
      </Container>
    </section>
  );
}

