"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { trackCTA, dataAttributes } from "@/lib/analytics";

export function LandingHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 64);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCTAClick = (type: "signup" | "login" | "demo", location: "header") => {
    trackCTA(type, location);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-200 ${scrolled ? 'border-b ' : ''}`}>
      <div className="w-full px-6 md:px-12 lg:px-16 py-4">
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xl">S</span>
            </div>
            <span className="font-semibold text-3xl tracking-tight">Scrub</span>
          </Link>

          {/* Center Navigation - Absolutely centered on page */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a
              href={pathname === "/" ? "#features" : "/#features"}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href={pathname === "/" ? "#modules" : "/#modules"}
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
            >
              AI Modules
            </a>
            <Link
              href="/pricing"
              className={`text-lg transition-colors ${pathname === "/pricing"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              Pricing
            </Link>

            {/* See Demo - Text link style */}
            <Link
              href="/demo"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => handleCTAClick("demo", "header")}
              {...dataAttributes.cta("demo", "header")}
            >
              See Demo
            </Link>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white"
              onClick={() => handleCTAClick("signup", "header")}
              {...dataAttributes.cta("signup", "header")}
            >
              <Link href="/portal/auth">
                Get Scrub Free
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="default"
              className="hidden sm:flex text-base"
              asChild
              onClick={() => handleCTAClick("login", "header")}
              {...dataAttributes.cta("login", "header")}
            >
              <Link href="/portal/auth">Log In</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
