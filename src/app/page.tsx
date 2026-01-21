"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Shield, Zap, Layers, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-sm">V</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">VSee Cloud</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/vam" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Marketplace
          </Link>
          <Link href="/portal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Portal
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/vam/connect">Request Demo</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative z-10 pt-24 pb-32 px-8 max-w-7xl mx-auto"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>Now in Private Preview</span>
        </motion.div>
        
        <motion.h1 
          variants={fadeInUp}
          className="text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight max-w-4xl leading-[1.05]"
          style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
        >
          AI infrastructure for healthcare,{" "}
          <span className="text-accent">simplified.</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-xl text-muted-foreground max-w-2xl mt-8 leading-relaxed"
        >
          VSee Cloud transforms how healthcare organizations consume AI. 
          Modular capabilities. Enterprise control. One integration target.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="flex items-center gap-4 mt-12">
          <Button size="xl" variant="accent" asChild>
            <Link href="/vam">
              Explore Marketplace
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
          <Button size="xl" variant="outline" asChild>
            <Link href="/vam/connect">Connect with Us</Link>
          </Button>
        </motion.div>
      </motion.section>

      {/* Value Props */}
      <motion.section 
        className="relative z-10 py-24 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: "Modular by Design",
                description: "AI capabilities exposed as building blocks. Enable what you need, disable what you don't."
              },
              {
                icon: Shield,
                title: "Enterprise Control",
                description: "Full governance, permissioning, and audit trails. Healthcare-grade compliance built in."
              },
              {
                icon: Zap,
                title: "Zero Integration Friction",
                description: "One API, one contract, one partner. VSee becomes your single AI integration target."
              }
            ].map((prop, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card glass className="h-full">
                  <CardContent className="p-8">
                    <prop.icon className="w-10 h-10 text-accent mb-6" strokeWidth={1.5} />
                    <h3 className="text-xl font-semibold mb-3">{prop.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{prop.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Two Paths Section */}
      <motion.section 
        className="relative z-10 py-24 px-8 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
              Two ways to work with AI
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you want VSee to host your AI-powered experience or integrate AI into your existing systems, we have you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-accent/50 transition-colors">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                    <Building2 className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Build with VSee</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Let VSee host your AI-enabled healthcare environment. Toggle modules on and off, preview instantly. 
                    No infrastructure, no integration work. Just value.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {["Fully hosted solution", "Visual module activation", "Instant preview", "Zero ops overhead"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-accent/50 transition-colors">
                <CardContent className="p-10">
                  <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6">
                    <Cpu className="w-7 h-7 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Integrate into Existing</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Keep your systems, add our AI. Every module is headless, accessible via REST APIs and SDKs. 
                    VSee becomes your single AI integration target.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {["REST APIs & SDKs", "Works with any system", "Vendor-agnostic modules", "Enterprise SLAs"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Module Preview */}
      <motion.section 
        className="relative z-10 py-24 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                AI as building blocks
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                15+ modular AI capabilities, ready to activate. Clinical, administrative, analytics — all standardized, all controlled.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/vam">
                View All Modules
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              "Clinical Note Summarization",
              "Patient Risk Scoring",
              "Visit Transcription",
              "Coding & Billing",
              "Prior Auth",
              "Symptom Extraction",
              "Follow-up Recommendations",
              "Medication Reconciliation",
              "Readmission Prediction",
              "Population Health"
            ].map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card glass className="group hover:bg-white transition-colors cursor-pointer">
                  <CardContent className="p-5">
                    <div className="w-2 h-2 rounded-full bg-accent mb-4 group-hover:scale-125 transition-transform" />
                    <p className="text-sm font-medium leading-snug">{module}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="relative z-10 py-32 px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            Ready to make AI inevitable?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join the healthcare organizations already using VSee Cloud to simplify AI adoption.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="xl" variant="accent" asChild>
              <Link href="/vam/connect">
                Request Access
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/vam">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-12 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xs">V</span>
            </div>
            <span className="text-sm text-muted-foreground">© 2026 VSee. Enterprise healthcare infrastructure.</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/vam" className="hover:text-foreground transition-colors">Marketplace</Link>
            <Link href="/vam/connect" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
