"use client";

import * as React from "react";

import { Container } from "@/components/Container";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-[#0E1116] py-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">
              Velora
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Non-custodial crypto payments for modern African merchants.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
              Product
            </h4>
            <nav className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Features
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Security
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Documentation
              </a>
              <a 
                href="#" 
                className="block text-sm text-gray-400 hover:text-white transition-colors duration-200"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Column 3: Location & Tech */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
              About
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                Built for merchants in Nigeria.
              </p>
              <p>
                Powered by non-custodial crypto rails.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-white/4">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Velora. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
