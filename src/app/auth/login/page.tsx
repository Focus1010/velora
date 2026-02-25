"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogle = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      const user = {
        name: "Demo Merchant",
        email: "merchant@gmail.com",
        role: "Owner",
        wallet: "",
      };
      try {
        window.localStorage.setItem("velora_user", JSON.stringify(user));
      } catch {
        // ignore storage errors in demo
      }
      setIsGoogleLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <motion.div
          className={cn(
            "w-full max-w-md rounded-3xl border border-white/5 bg-zinc-900/80",
            "shadow-2xl shadow-black/50 px-6 py-8 sm:px-8 sm:py-10",
          )}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 text-center space-y-2">
            <div className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              Velora
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Welcome to Velora
            </h1>
            <p className="text-sm text-zinc-400">
              Sign in to access your merchant dashboard.
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={isGoogleLoading}
              className={cn(
                "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                "bg-white text-black shadow-md hover:shadow-lg",
                "transition-all duration-200 ease-out",
                "hover:-translate-y-0.5",
                "focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black",
                "active:scale-95",
                "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0",
              )}
            >
              {isGoogleLoading ? "Connecting to Google…" : "Continue with Google"}
            </button>

            <button
              type="button"
              className={cn(
                "w-full inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold",
                "bg-zinc-900 text-zinc-300 border border-white/10",
                "transition-all duration-200 ease-out",
                "hover:bg-zinc-800 hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black",
                "active:scale-95",
              )}
            >
              Sign in with Email (Coming Soon)
            </button>
          </div>

          <p className="mt-5 text-[0.7rem] text-center text-zinc-500">
            Demo Mode — payments and sign-in are simulated for preview purposes.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

