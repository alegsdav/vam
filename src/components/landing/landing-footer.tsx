"use client";

import Link from "next/link";
import { dataAttributes } from "@/lib/analytics";

export function LandingFooter() {
  return (
    <footer className="border-t py-12 px-8" {...dataAttributes.section("footer")}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-lg">Scrub</span>
          </Link>
          
          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Security</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 Scrub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
