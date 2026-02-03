"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trackCTA, dataAttributes } from "@/lib/analytics";

export function LandingHeader() {
  const pathname = usePathname();
  
  const handleCTAClick = (type: "signup" | "login" | "demo", location: "header") => {
    trackCTA(type, location);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg">
      <div className="max-w-[1400px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">Scrub</span>
          </Link>
          
          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href={pathname === "/" ? "#features" : "/#features"} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a 
              href={pathname === "/" ? "#modules" : "/#modules"} 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              AI Modules
            </a>
            <Link 
              href="/pricing" 
              className={`text-sm transition-colors ${
                pathname === "/pricing" 
                  ? "text-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pricing
            </Link>
            
            {/* See Demo - Text link style */}
            <Link 
              href="/demo" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
              size="sm" 
              className="hidden sm:flex" 
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
