"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Filter, Brain, FileText, BarChart3, Workflow, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AI_MODULES, MODULE_CATEGORIES } from "@/lib/modules";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const categoryIcons: Record<string, React.ElementType> = {
  clinical: Brain,
  administrative: FileText,
  analytics: BarChart3,
  workflow: Workflow,
  communication: MessageSquare
};

export default function VAMHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">V</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">VAM</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/vam" className="text-foreground font-medium">Home</Link>
              <Link href="/vam/catalog" className="text-muted-foreground hover:text-foreground transition-colors">Catalog</Link>
              <Link href="/vam/connect" className="text-muted-foreground hover:text-foreground transition-colors">Connect</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/portal">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/vam/connect">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="py-24 px-8 max-w-7xl mx-auto"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeIn} className="max-w-3xl">
          <Badge variant="accent" className="mb-6">VSee AI Marketplace</Badge>
          <h1 className="text-5xl md:text-6xl font-normal tracking-tight leading-[1.1] mb-6" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            The AI distribution standard for healthcare
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Discover AI capabilities as modular building blocks. VSee Marketplace is where healthcare meets standardized, governed, enterprise-ready AI.
          </p>
          <div className="flex items-center gap-4">
            <Button size="lg" asChild>
              <Link href="/vam/catalog">
                Browse Modules
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/vam/connect">Become a Provider</Link>
            </Button>
          </div>
        </motion.div>
      </motion.section>

      {/* What is VAM */}
      <section className="py-20 px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-6" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                What is the VSee AI Marketplace?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                VAM is VSee's controlled ecosystem for AI in healthcare. It serves as the distribution layer, integration layer, and control plane — all in one.
              </p>
              <ul className="space-y-4">
                {[
                  "AI exposed as standardized, vendor-agnostic modules",
                  "Single integration point for all AI capabilities",
                  "Enterprise governance and compliance built-in",
                  "Healthcare organizations consume AI, VSee manages complexity"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {MODULE_CATEGORIES.slice(0, 4).map((cat, i) => {
                const Icon = categoryIcons[cat.id];
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card glass className="h-full">
                      <CardContent className="p-6">
                        <Icon className="w-8 h-8 text-accent mb-4" strokeWidth={1.5} />
                        <h3 className="font-semibold mb-1">{cat.label}</h3>
                        <p className="text-sm text-muted-foreground">{cat.count} modules</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
              Why VAM?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Different stakeholders, aligned benefits.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardContent className="p-10">
                <Badge className="mb-6">For Healthcare Organizations</Badge>
                <h3 className="text-2xl font-semibold mb-4">Consume AI with confidence</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Access pre-vetted, healthcare-ready AI modules",
                    "One integration, many capabilities",
                    "Enterprise control and governance",
                    "Reduce vendor complexity and risk"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-10">
                <Badge variant="secondary" className="mb-6">For AI Providers</Badge>
                <h3 className="text-2xl font-semibold mb-4">Reach healthcare at scale</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    "Distribution to VSee's healthcare network",
                    "Standardized integration reduces friction",
                    "Focus on AI, not healthcare compliance",
                    "Enterprise contracts through VSee"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-foreground flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Modules Preview */}
      <section className="py-20 px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                Explore AI Modules
              </h2>
              <p className="text-lg text-muted-foreground">
                Standardized AI capabilities, ready for activation.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/vam/catalog">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_MODULES.slice(0, 6).map((module, i) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/vam/catalog?module=${module.id}`}>
                  <Card className="h-full hover:border-accent/50 transition-all group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="text-xs">{module.categoryLabel}</Badge>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-semibold mb-2">{module.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{module.shortDescription}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            Ready to explore?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're a healthcare organization looking to adopt AI or a provider looking to distribute, VAM is your starting point.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/vam/connect">
                Connect with Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/vam/catalog">Browse Catalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xs">V</span>
            </div>
            <span className="text-sm text-muted-foreground">VSee AI Marketplace</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/vam/catalog" className="hover:text-foreground transition-colors">Catalog</Link>
            <Link href="/vam/connect" className="hover:text-foreground transition-colors">Connect</Link>
            <Link href="/portal" className="hover:text-foreground transition-colors">Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
