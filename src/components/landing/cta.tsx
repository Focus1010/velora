"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <motion.div
          className="mx-auto max-w-2xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.div
            className={cn(
              "rounded-2xl border border-white/6 bg-[#151A21] p-12 sm:p-16",
              "shadow-lg backdrop-blur-sm",
              "text-center"
            )}
            variants={fadeInUp}
          >
            <motion.div
              className="space-y-6"
              variants={fadeInUp}
            >
              <h2
                id="cta-heading"
                className={cn(
                  "font-semibold tracking-tight text-balance",
                  "text-3xl sm:text-4xl lg:text-5xl",
                  "text-white"
                )}
              >
                Start accepting crypto payments in minutes
              </h2>
              
              <p className={cn(
                "text-balance text-sm sm:text-base",
                "text-gray-400",
                "max-w-lg mx-auto"
              )}>
                Generate Solana Pay QR codes, track payments, and get paid globally. All from one simple dashboard.
              </p>

              <div className="pt-4">
                <motion.button
                  className={cn(
                    "inline-flex items-center justify-center rounded-xl px-8 py-3.5",
                    "bg-[#1F8A70] text-white font-medium text-sm",
                    "shadow-md hover:shadow-lg",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-0.5 hover:bg-[#1a735c]",
                    "focus:outline-none focus:ring-2 focus:ring-[#1F8A70]/50 focus:ring-offset-2 focus:ring-offset-[#151A21]",
                    "active:scale-95"
                  )}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                </motion.button>
                
                <p className="mt-4 text-xs text-gray-500">
                  No signup required to try the demo
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default CTA;
