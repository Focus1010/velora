"use client";

import * as React from "react";
import Link from "next/link";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="border-b border-white/6 bg-[#0E1116]/80 backdrop-blur-sm">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-white">
            Velora
          </div>
          
          <Link
            href="/dashboard"
            className={cn(
              "inline-flex items-center justify-center rounded-lg px-4 py-2",
              "text-sm font-medium text-gray-300",
              "border border-white/10 bg-white/5",
              "transition-all duration-200 ease-out",
              "hover:bg-white/10 hover:text-white hover:border-white/20",
              "focus:outline-none focus:ring-2 focus:ring-white/20",
              "active:scale-95"
            )}
          >
            Dashboard
          </Link>
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;
