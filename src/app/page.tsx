"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Code2,
  Building2,
  Rocket,
  Check,
  Brain,
  Activity,
  FileText,
  Heart,
  Clock,
  BarChart3,
  Workflow,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
  Quote,
  ShieldCheck,
  Timer,
  Plug,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ExitIntentModal } from "@/components/landing/exit-intent-modal";
import { trackCTA, dataAttributes } from "@/lib/analytics";

// ============================================================================
// DATA
// ============================================================================

const trustedBy = [
  "Epic Systems",
  "Cerner",
  "Meditech",
  "athenahealth",
  "Allscripts"
];

const features = [
  {
    icon: Zap,
    title: "One-Click Install",
    description: "Deploy AI modules in seconds"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security"
  },
  {
    icon: Layers,
    title: "Universal Compatibility",
    description: "Works with any EMR"
  },
  {
    icon: Workflow,
    title: "No-Code Data Mapping",
    description: "Visual data connections"
  },
  {
    icon: Code2,
    title: "Developer SDK",
    description: "Two lines of code to embed"
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track usage and outcomes"
  }
];

const modules = [
  {
    name: "Sepsis Predictor",
    vendor: "BioSense AI",
    category: "Critical Care",
    description: "Early sepsis detection with 94% accuracy",
    icon: AlertTriangle,
    color: "bg-red-500/10 text-red-500",
    metric: "94%",
    metricLabel: "Accuracy"
  },
  {
    name: "Length of Stay",
    vendor: "CareFlow Analytics",
    category: "Operations",
    description: "Predict patient discharge dates",
    icon: Clock,
    color: "bg-blue-500/10 text-blue-500",
    metric: "4.2",
    metricLabel: "Days Avg"
  },
  {
    name: "Clinical Documentation",
    vendor: "MedScribe",
    category: "Workflow",
    description: "AI-powered note generation",
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
    metric: "2hr",
    metricLabel: "Saved/Day"
  }
];

const valueMetrics = [
  {
    stat: "10x",
    label: "Faster deployment than traditional integrations"
  },
  {
    stat: "$340",
    label: "Average monthly cost per module"
  },
  {
    stat: "$4,080",
    label: "Saved per clinician per year"
  }
];

const faqItems = [
  {
    icon: ShieldCheck,
    title: "Is this really HIPAA compliant?",
    answer: "Yes. Every AI module operates under our enterprise BAA. Data never leaves your infrastructure."
  },
  {
    icon: Timer,
    title: "How long until we see value?",
    answer: "Most hospitals have their first AI module running within 48 hours."
  },
  {
    icon: Plug,
    title: "Will this work with our EMR?",
    answer: "Scrub is certified for Epic, Cerner, Meditech, and any FHIR-compliant system."
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <ExitIntentModal enabled={false} />
      <LandingHeader />

      {/* ================================================================== */}
      {/* HERO SECTION - Clean & Minimal */}
      {/* ================================================================== */}
      <section
        className="pt-40 pb-24 px-6 md:px-12 lg:px-16"
        {...dataAttributes.section("hero")}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp} className="mb-12">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8">
              One workspace.{" "}
              <br className="hidden sm:block" />
              <span className="text-muted-foreground">Zero integration pain.</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Scrub is where hospitals discover, deploy, and manage clinical AI —
              all from a single platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button
                size="lg"
                asChild
                className="bg-accent hover:bg-accent/90 text-white px-8 h-16 text-lg"
              >
                <Link href="/portal/auth" onClick={() => trackCTA("signup", "hero")}>
                  Get Scrub free
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="bg-accent-muted hover:bg-accent-muted/40 text-accent border-0 px-8 h-16 text-lg"
              >
                <Link href="/demo" onClick={() => trackCTA("demo", "hero")}>
                  See demo
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* EMR MOCK - Epic-style interface with AI panel */}
      {/* ================================================================== */}
      <section className="pb-32 px-6 md:px-12 lg:px-16">
        <div className="w-[80vw] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl border shadow-2xl overflow-hidden bg-white"
          >
            {/* EMR Header Bar */}
            <div className="bg-slate-800 text-white px-4 py-2 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Epic Hyperspace</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-300">Chart Review</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span>Dr. Sarah Chen</span>
                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-xs">SC</div>
              </div>
            </div>

            {/* EMR Content Area */}
            <div className="flex min-h-[700px]">
              {/* Left Sidebar - Patient List */}
              <div className="w-48 bg-slate-100 border-r p-3 hidden md:block">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-3">My Patients</p>
                <div className="space-y-2">
                  {[
                    { name: "Martinez, J", room: "412B", status: "critical" },
                    { name: "Thompson, R", room: "301A", status: "stable" },
                    { name: "Williams, M", room: "415C", status: "stable" },
                    { name: "Chen, A", room: "208B", status: "pending" },
                  ].map((patient, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded text-xs ${i === 0 ? 'bg-white shadow-sm border-l-2 border-red-500' : 'hover:bg-slate-200 cursor-pointer'}`}
                    >
                      <p className="font-medium text-slate-800">{patient.name}</p>
                      <p className="text-slate-500">Room {patient.room}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Chart Area */}
              <div className="flex-1 p-6 bg-white">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">Martinez, Juan</h3>
                    <p className="text-slate-500 text-sm">67y Male · MRN: 847291 · DOB: 03/15/1957</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">Sepsis Alert</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">Fall Risk</span>
                  </div>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "BP", value: "142/88", unit: "mmHg", status: "warning" },
                    { label: "HR", value: "98", unit: "bpm", status: "normal" },
                    { label: "Temp", value: "101.2", unit: "°F", status: "critical" },
                    { label: "SpO2", value: "94", unit: "%", status: "warning" },
                  ].map((vital, i) => (
                    <div key={i} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs text-slate-500 mb-1">{vital.label}</p>
                      <p className={`text-lg font-semibold ${vital.status === 'critical' ? 'text-red-600' :
                        vital.status === 'warning' ? 'text-yellow-600' : 'text-slate-800'
                        }`}>
                        {vital.value} <span className="text-xs font-normal text-slate-400">{vital.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* Recent Labs */}
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Recent Labs</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">WBC</span>
                      <span className="text-red-600 font-medium">18.2 H</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Lactate</span>
                      <span className="text-red-600 font-medium">4.1 H</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Creatinine</span>
                      <span className="text-yellow-600 font-medium">1.8 H</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights Panel - Slides in from right */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="w-80 bg-gradient-to-b from-accent/5 to-accent/10 border-l p-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-800">Scrub AI</p>
                    <p className="text-xs text-slate-500">Real-time insights</p>
                  </div>
                </div>

                {/* High Priority Alert */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-red-700 font-medium text-sm mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Sepsis Risk: 84%</span>
                  </div>
                  <p className="text-xs text-red-600 mb-2">
                    Elevated WBC, lactate, and fever pattern suggest early sepsis. Consider blood cultures and empiric antibiotics.
                  </p>
                  <div className="flex gap-2">
                    <button className="text-xs bg-red-600 text-white px-2 py-1 rounded">Order Protocol</button>
                    <button className="text-xs border border-red-300 text-red-700 px-2 py-1 rounded">Dismiss</button>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-600 uppercase">Recommendations</p>
                  {[
                    { icon: Check, text: "Blood cultures x2 before antibiotics", done: true },
                    { icon: Clock, text: "Repeat lactate in 2-4 hours", done: false },
                    { icon: Activity, text: "Fluid resuscitation 30mL/kg", done: false },
                  ].map((rec, i) => (
                    <div key={i} className={`flex items-start gap-2 text-xs ${rec.done ? 'opacity-50' : ''}`}>
                      <rec.icon className={`w-4 h-4 mt-0.5 ${rec.done ? 'text-accent' : 'text-slate-400'}`} />
                      <span className={rec.done ? 'line-through text-slate-500' : 'text-slate-700'}>{rec.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PRODUCT SHOWCASE - Visual Card */}
      {/* ================================================================== */}
      <section
        className="py-16 px-6 md:px-12 lg:px-16"
        {...dataAttributes.section("showcase")}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border shadow-lg">
              <div className="grid md:grid-cols-2">
                {/* Left: Description */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Memorial Health</p>
                      <p className="text-sm text-muted-foreground">Using Scrub</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    "We deployed three AI modules in a week — something that would
                    have taken us 18 months on our own."
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Sepsis Predictor</Badge>
                    <Badge variant="secondary">Length of Stay</Badge>
                    <Badge variant="secondary">Documentation AI</Badge>
                  </div>
                </div>

                {/* Right: Product Visual */}
                <div className="bg-slate-50 p-6 md:p-8 min-h-[300px] flex items-center justify-center">
                  <div className="w-full max-w-sm bg-white rounded-xl border shadow-sm p-4">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">JD</div>
                      <div>
                        <p className="text-sm font-medium">John Doe, 67M</p>
                        <p className="text-xs text-slate-500">Room 412B</p>
                      </div>
                      <Badge className="ml-auto bg-red-100 text-red-700 border-0 text-xs">High Risk</Badge>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-3">
                      <div className="flex items-center gap-2 text-red-700 text-sm font-medium mb-1">
                        <AlertTriangle className="w-4 h-4" />
                        Sepsis Risk: 78%
                      </div>
                      <p className="text-xs text-red-600">Based on vitals, labs, and clinical notes</p>
                    </div>
                    <div className="space-y-2">
                      {["Order lactate stat", "Consider antibiotics", "Increase monitoring"].map((action, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                          <Check className="w-3 h-3 text-accent" />
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* INTRODUCING SCRUB - Feature Cards */}
      {/* ================================================================== */}
      <section
        className="py-20 px-6 md:px-12 lg:px-16 bg-muted/30"
        {...dataAttributes.section("features")}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">Introducing Scrub</Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              The healthcare AI platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Everything you need to discover, deploy, and manage clinical AI in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Module Preview Cards */}
          <motion.div
            className="mt-12 grid md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {modules.map((module, i) => (
              <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg ${module.color} flex items-center justify-center`}>
                      <module.icon className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{module.metric}</p>
                      <p className="text-xs text-muted-foreground">{module.metricLabel}</p>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{module.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                  <p className="text-xs text-muted-foreground">by {module.vendor}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" asChild>
              <Link href="/portal/auth" onClick={() => trackCTA("signup", "features")}>
                Browse all modules
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* VALUE METRICS - More productivity. Fewer tools. */}
      {/* ================================================================== */}
      <section
        className="py-20 px-6 md:px-12 lg:px-16"
        {...dataAttributes.section("value")}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              More productivity.{" "}
              <span className="text-muted-foreground">Fewer tools.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Replace your spreadsheets of vendors, IT tickets, and BAA negotiations with one platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {valueMetrics.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-5xl md:text-6xl font-bold text-accent mb-3">{item.stat}</p>
                <p className="text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TESTIMONIAL - Trusted by teams that ship */}
      {/* ================================================================== */}
      <section
        className="py-20 px-6 md:px-12 lg:px-16 bg-muted/30"
        {...dataAttributes.section("testimonial")}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Trusted by teams that ship.
            </h2>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <Quote className="w-8 h-8 text-accent/30 mb-4" />
                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-6">
                  "Scrub got us our first 10 hospital deployments in 60 days.
                  The compliance layer alone saved us $500K in legal and security costs."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-semibold">MJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Marcus Johnson</p>
                    <p className="text-sm text-muted-foreground">CEO, CareFlow Analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company logos */}
            <div className="mt-8 flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-50">
              {["Memorial Health", "Northwest Medical", "CareFlow Analytics"].map((name, i) => (
                <span key={i} className="text-sm font-medium text-muted-foreground">{name}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WHO IT'S FOR - Three Personas */}
      {/* ================================================================== */}
      <section
        className="py-20 px-6 md:px-12 lg:px-16"
        {...dataAttributes.section("personas")}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Built for everyone in healthcare AI
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: "Hospitals",
                description: "Deploy pre-validated AI modules directly into your EMR without IT headaches.",
                cta: "For hospitals"
              },
              {
                icon: Rocket,
                title: "AI Startups",
                description: "Get instant distribution to thousands of hospitals. We handle compliance.",
                cta: "For startups"
              },
              {
                icon: Users,
                title: "IT Admins",
                description: "One security review, one integration. Complete visibility and control.",
                cta: "For IT teams"
              }
            ].map((persona, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <persona.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{persona.title}</h3>
                    <p className="text-muted-foreground mb-4">{persona.description}</p>
                    <Link
                      href="/portal/auth"
                      className="text-accent text-sm font-medium flex items-center hover:underline"
                      onClick={() => trackCTA("signup", "personas")}
                    >
                      {persona.cta}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FAQ - Common Questions */}
      {/* ================================================================== */}
      <section
        className="py-20 px-6 md:px-12 lg:px-16 bg-muted/30"
        {...dataAttributes.section("faq")}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Common questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* BOTTOM CTA - Try for free */}
      {/* ================================================================== */}
      <section
        className="py-20 px-6 md:px-12 lg:px-16"
        {...dataAttributes.section("bottom-cta")}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Try for free.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join healthcare organizations deploying clinical AI in days, not months.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Button
                size="lg"
                asChild
                className="bg-foreground hover:bg-foreground/90 text-background px-6"
              >
                <Link href="/portal/auth" onClick={() => trackCTA("signup", "bottom-cta")}>
                  Get Scrub free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="px-6"
              >
                <Link href="/demo" onClick={() => trackCTA("demo", "bottom-cta")}>
                  Request a demo
                </Link>
              </Button>
            </div>

            {/* Feature cards like Notion */}
            <div className="grid md:grid-cols-3 gap-4 text-left">
              {[
                {
                  icon: Brain,
                  title: "Scrub AI",
                  description: "Real-time clinical intelligence embedded in your EMR"
                },
                {
                  icon: Shield,
                  title: "Scrub Security",
                  description: "HIPAA compliant with enterprise BAAs included"
                },
                {
                  icon: BarChart3,
                  title: "Scrub Analytics",
                  description: "Track usage, outcomes, and ROI in one dashboard"
                }
              ].map((item, i) => (
                <Card key={i} className="border shadow-sm">
                  <CardContent className="p-5">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section >

      <LandingFooter />
    </div >
  );
}
