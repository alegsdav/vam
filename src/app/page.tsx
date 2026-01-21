"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope, Building2, Rocket, Code2, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const roles = [
  {
    id: "doctor",
    title: "Doctor",
    subtitle: "The EHR View",
    description: "See how AI appears inside your existing clinical workflow — no learning curve required.",
    icon: Stethoscope,
    href: "/doctor",
    preview: "Epic-style dashboard with AI widget"
  },
  {
    id: "admin",
    title: "Admin",
    subtitle: "The Control Center",
    description: "Monitor AI usage, manage costs, and install new capabilities from the marketplace.",
    icon: Building2,
    href: "/admin",
    preview: "Dashboard + Marketplace access"
  },
  {
    id: "startup",
    title: "AI Startup",
    subtitle: "The Provider Portal",
    description: "Upload your AI model and connect to hospital data in minutes — no integration work.",
    icon: Rocket,
    href: "/startup",
    preview: "No-code data mapping interface"
  },
  {
    id: "developer",
    title: "Developer",
    subtitle: "The SDK View",
    description: "Embed healthcare AI into any software with a simple script tag.",
    icon: Code2,
    href: "/developer",
    preview: "Copy-paste integration code"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-center px-8 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-lg">H</span>
          </div>
          <div>
            <span className="font-semibold text-xl tracking-tight block">Straits</span>
            <span className="text-xs text-muted-foreground">AI Infrastructure for Healthcare</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section 
        className="relative z-10 pt-12 pb-16 px-8 text-center"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4 text-accent" />
          <span>Interactive Demo</span>
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          One platform.{" "}
          <span className="text-accent">Four perspectives.</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          See how Straits connects hospitals, doctors, AI startups, and developers 
          through a single integration layer.
        </motion.p>
      </motion.section>

      {/* Role Selection Cards */}
      <motion.section 
        className="relative z-10 px-8 pb-24 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-center text-sm text-muted-foreground mb-8">Choose your perspective to explore the demo</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <Link href={role.href}>
                <Card className="group h-full border hover:border-foreground/20 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center">
                          <role.icon className="w-7 h-7 text-background" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="space-y-2 mb-4">
                        <h2 className="text-2xl font-semibold">{role.title}</h2>
                        <p className="text-sm text-accent font-medium">{role.subtitle}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                    <div className="px-8 py-4 bg-muted/50 border-t">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">Preview:</span> {role.preview}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Pitch Flow Hint */}
      <motion.section 
        className="relative z-10 px-8 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="bg-foreground text-background border-0">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold mb-4">Recommended Demo Flow</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">1</div>
                  <div>
                    <p className="font-medium mb-1">Start with Admin</p>
                    <p className="text-background/70">"I browse the marketplace, find Sepsis AI, click Install — no IT ticket."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">2</div>
                  <div>
                    <p className="font-medium mb-1">Show Doctor View</p>
                    <p className="text-background/70">"Now the AI widget appears inside Epic, reading real-time data."</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">3</div>
                  <div>
                    <p className="font-medium mb-1">Explain Startup Side</p>
                    <p className="text-background/70">"The startup logged in, pasted their API, mapped data in 5 min."</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Straits Demo • AI Infrastructure for Healthcare</span>
        </div>
      </footer>
    </div>
  );
}
