"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Stethoscope, ArrowRight, ArrowLeft, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-lg">S</span>
          </div>
          <div>
            <span className="font-semibold text-xl tracking-tight block">Straits</span>
          </div>
        </Link>
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </header>

      {/* Hero */}
      <motion.section 
        className="relative z-10 pt-16 pb-12 px-8 text-center"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background text-sm font-medium mb-6">
          <PlayCircle className="w-4 h-4 text-accent" />
          <span>Interactive Demo</span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6"
        >
          See Straits in{" "}
          <span className="text-accent">Action</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Experience how AI seamlessly integrates into the clinical workflow. 
          See it from the doctor's perspective.
        </motion.p>
      </motion.section>

      {/* Doctor Demo Card */}
      <motion.section 
        className="relative z-10 px-8 pb-16 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link href="/demo/doctor">
          <Card className="group border-2 hover:border-accent hover:shadow-xl transition-all cursor-pointer overflow-hidden">
            <CardContent className="p-0">
              {/* Card Header with Icon */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-background" />
                  </div>
                  <Badge className="bg-accent/10 text-accent border-0">
                    Live Demo
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold mb-2">Doctor View</h2>
                <p className="text-lg text-accent font-medium mb-4">The EHR Experience</p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  See how AI predictions appear directly inside Epic EHR. 
                  No new software to learn — just actionable insights where you already work.
                </p>
              </div>

              {/* Preview section */}
              <div className="bg-muted/50 border-t px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">What you'll see:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Epic-style patient dashboard</li>
                      <li>• Real-time AI predictions sidebar</li>
                      <li>• Sepsis risk, length of stay, readmission alerts</li>
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Launch Demo</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.section>

      {/* Additional Info */}
      <motion.section 
        className="relative z-10 px-8 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            Want to see the admin dashboard, startup portal, or developer SDK?
          </p>
          <Button variant="outline" asChild>
            <Link href="/portal" className="flex items-center gap-2">
              Go to Portal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
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
