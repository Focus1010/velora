"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useAuthGuard } from "@/hooks/use-auth";
import { getUser, setUser } from "@/lib/storage";

interface UserProfile {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Accountant" | "Finance" | "Operations" | "Developer";
  wallet: string;
}

export default function ProfilePage() {
  const { isReady } = useAuthGuard();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isReady) return;
    const stored = getUser() as Partial<UserProfile> | null;
    if (!stored) {
      setProfile({
        name: "Demo Merchant",
        email: "merchant@gmail.com",
        role: "Owner",
        wallet: "",
      });
      return;
    }
    setProfile({
      name: stored.name ?? "Demo Merchant",
      email: stored.email ?? "merchant@gmail.com",
      role: (stored.role as UserProfile["role"]) ?? "Owner",
      wallet: stored.wallet ?? "",
    });
  }, [isReady]);

  const handleChange =
    (field: keyof UserProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!profile) return;
      setProfile({ ...profile, [field]: e.target.value } as UserProfile);
    };

  const handleSave = () => {
    if (!profile) return;
    setIsSaving(true);
    setSaved(false);
    setTimeout(() => {
      setUser(profile);
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    }, 600);
  };

  if (!isReady || !profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <motion.div
          className={cn(
            "w-full max-w-2xl rounded-3xl border border-white/5 bg-zinc-900/80",
            "shadow-2xl shadow-black/50 px-6 py-8 sm:px-8 sm:py-10",
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Profile
            </h1>
            <p className="text-sm text-zinc-400">
              Manage your Velora account information and settlement wallet.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-zinc-300">
                Account Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={handleChange("name")}
                    className={cn(
                      "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5",
                      "text-sm text-white placeholder-zinc-500",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className={cn(
                      "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5",
                      "text-sm text-zinc-400",
                      "cursor-not-allowed",
                    )}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Role
                  </label>
                  <select
                    value={profile.role}
                    onChange={handleChange("role")}
                    className={cn(
                      "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5",
                      "text-sm text-white",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
                    )}
                  >
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Developer">Developer</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 space-y-3">
              <h2 className="text-sm font-medium text-zinc-300">
                Wallet Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                    Solana Wallet Address
                  </label>
                  <input
                    type="text"
                    value={profile.wallet}
                    onChange={handleChange("wallet")}
                    placeholder="Your USDC-compatible Solana address"
                    className={cn(
                      "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5",
                      "text-sm text-white placeholder-zinc-500 font-mono",
                      "focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50",
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className={cn(
                  "inline-flex items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold",
                  "bg-emerald-600 text-white shadow-md hover:shadow-lg",
                  "transition-all duration-200 ease-out",
                  "hover:-translate-y-0.5 hover:bg-emerald-500",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500/60 focus:ring-offset-2 focus:ring-offset-black",
                  "active:scale-95",
                  "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
                )}
              >
                {isSaving ? "Saving…" : "Save changes"}
              </button>

              {saved && (
                <span className="text-xs text-emerald-300">
                  Profile updated
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

