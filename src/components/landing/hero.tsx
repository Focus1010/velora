 "use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <Container className="py-20 sm:py-24 lg:py-28">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Non-custodial payments for Africa</span>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1
                id="hero-heading"
                className={cn(
                  "text-balance font-semibold tracking-tight",
                  "text-3xl sm:text-4xl lg:text-5xl",
                  "text-foreground",
                )}
              >
                Accept crypto payments in seconds.
                <br />
                Built for Nigerian merchants.
              </h1>
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                Velora lets freelancers and businesses accept USDC or SOL
                instantly using secure, non-custodial Solana Pay infrastructure.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.18 }}
            >
              <motion.button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "bg-accent text-accent-foreground shadow-[0_18px_45px_rgba(0,0,0,0.55)]",
                  "transition-transform transition-shadow duration-200",
                  "hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(0,0,0,0.65)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Start accepting payments
              </motion.button>
              <motion.button
                type="button"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
                  "border border-border/80 bg-transparent text-foreground/90",
                  "transition-colors duration-200",
                  "hover:bg-foreground/5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.15 }}
              >
                View demo
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className={cn(
              "lg:justify-self-end",
              "w-full max-w-md rounded-2xl border border-border/80 bg-card/80",
              "shadow-[0_24px_80px_rgba(0,0,0,0.7)]",
              "p-5 sm:p-6",
            )}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Velora • Payment
                </p>
                <h2 className="mt-1 text-sm font-semibold text-foreground">
                  Payment received
                </h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                Live
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-foreground">
                  $120.00 USDC
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">From</span>
                <span className="font-mono text-foreground/90">
                  9xA…kP2
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Network</span>
                <span className="text-foreground/90">Solana</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Completed
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

