"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
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
  Lock,
  RefreshCw,
  Plug,
  Users,
  ShieldCheck,
  Timer,
  Undo2,
  Handshake,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { ExitIntentModal } from "@/components/landing/exit-intent-modal";
import { trackCTA, trackSectionView, dataAttributes } from "@/lib/analytics";

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
    description: "Deploy AI modules to your EMR in seconds. No IT tickets, no vendor calls, no waiting."
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security. All data stays encrypted and within your infrastructure."
  },
  {
    icon: Layers,
    title: "Universal Compatibility",
    description: "Works with Epic, Cerner, Meditech, and any FHIR-compliant system out of the box."
  },
  {
    icon: Workflow,
    title: "No-Code Data Mapping",
    description: "AI startups connect their models to hospital data visually — no engineering required."
  },
  {
    icon: Code2,
    title: "Developer SDK",
    description: "Two lines of code to embed healthcare AI into any application."
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track usage, latency, costs, and outcomes across all your AI modules."
  }
];

const modules = [
  {
    name: "Sepsis Predictor",
    vendor: "BioSense AI",
    category: "Critical Care",
    description: "Early sepsis detection with 94% accuracy. Alerts 6 hours before onset.",
    icon: AlertTriangle,
    color: "bg-red-500/10 text-red-500",
    metric: "94%",
    metricLabel: "Accuracy"
  },
  {
    name: "Length of Stay",
    vendor: "CareFlow Analytics",
    category: "Operations",
    description: "Predict patient discharge dates to optimize bed management.",
    icon: Clock,
    color: "bg-blue-500/10 text-blue-500",
    metric: "4.2",
    metricLabel: "Days Avg"
  },
  {
    name: "Readmission Risk",
    vendor: "Outcomes.AI",
    category: "Quality",
    description: "Identify high-risk patients before discharge for targeted interventions.",
    icon: TrendingUp,
    color: "bg-amber-500/10 text-amber-500",
    metric: "32%",
    metricLabel: "Reduction"
  },
  {
    name: "Clinical Documentation",
    vendor: "MedScribe",
    category: "Workflow",
    description: "AI-powered note generation from voice. Save 2 hours per day.",
    icon: FileText,
    color: "bg-green-500/10 text-green-500",
    metric: "2hr",
    metricLabel: "Saved/Day"
  },
  {
    name: "Cardiac Risk",
    vendor: "HeartAI",
    category: "Cardiology",
    description: "Real-time cardiac event prediction from continuous monitoring data.",
    icon: Heart,
    color: "bg-pink-500/10 text-pink-500",
    metric: "12min",
    metricLabel: "Early Alert"
  },
  {
    name: "Lab Insights",
    vendor: "LabGenius",
    category: "Diagnostics",
    description: "Intelligent lab result interpretation with clinical context.",
    icon: Activity,
    color: "bg-purple-500/10 text-purple-500",
    metric: "89%",
    metricLabel: "Time Saved"
  }
];

const personas = [
  {
    id: "hospitals",
    icon: Building2,
    title: "Healthcare Organizations",
    subtitle: "Hospitals & Health Systems",
    pain: "You're drowning in AI vendor pitches but can't get a single model deployed without a 12-month integration project.",
    solution: "Scrub gives you a curated marketplace of pre-validated AI modules that install in one click — directly into your existing EMR.",
    benefits: [
      "No more vendor management chaos",
      "Pre-negotiated BAAs included",
      "Unified analytics across all AI tools",
      "Rollback any module instantly"
    ],
    cta: "Explore for Hospitals",
    ctaHref: "/portal/auth"
  },
  {
    id: "startups",
    icon: Rocket,
    title: "AI Startups & Vendors",
    subtitle: "Bring Your AI to Healthcare",
    pain: "You've built amazing AI, but getting into hospitals means navigating compliance nightmares and waiting months for IT to approve a pilot.",
    solution: "List your AI on Scrub and get instant distribution to thousands of hospitals — we handle the HIPAA compliance, FHIR translation, and billing.",
    benefits: [
      "Zero compliance overhead",
      "Revenue from day one",
      "No-code data mapping tools",
      "Built-in analytics dashboard"
    ],
    cta: "List Your AI",
    ctaHref: "/portal/auth"
  },
  {
    id: "admins",
    icon: ShieldCheck,
    title: "Platform Administrators",
    subtitle: "IT & Security Teams",
    pain: "Every new AI tool means another security review, another integration headache, and another vendor to manage.",
    solution: "Scrub provides a single control plane for all AI modules — one security review, one integration, complete visibility.",
    benefits: [
      "Centralized access controls",
      "Audit logs for every action",
      "VPN & on-premise options",
      "Bulk deployment tools"
    ],
    cta: "See Admin Tools",
    ctaHref: "/portal/auth"
  }
];

const objections = [
  {
    icon: ShieldCheck,
    title: "Is this really HIPAA compliant?",
    answer: "Yes. Every AI module on Scrub operates under our enterprise BAA. Data never leaves your infrastructure — Scrub acts as a secure bridge, not a data warehouse. We've passed security audits at 50+ health systems."
  },
  {
    icon: Timer,
    title: "How long until we see value?",
    answer: "Most hospitals have their first AI module running within 48 hours. No lengthy integration projects. No waiting for IT tickets. Install, configure, go."
  },
  {
    icon: Plug,
    title: "Will this work with our EMR?",
    answer: "Scrub is certified for Epic, Cerner, Meditech, and any FHIR-compliant system. Our integration layer handles the translation so each AI module just works."
  },
  {
    icon: Handshake,
    title: "Can we trust these AI vendors?",
    answer: "Every vendor on Scrub goes through our vetting process: clinical validation review, security audit, and compliance check. We only approve AI that meets our quality bar."
  },
  {
    icon: Undo2,
    title: "What if something goes wrong?",
    answer: "Every decision is reversible. Disable any module with one click. Roll back to previous versions instantly. Your data stays yours — remove Scrub completely with no lock-in."
  }
];

const testimonials = [
  {
    quote: "We deployed three AI modules in a week — something that would have taken us 18 months to do on our own. Scrub changed how we think about clinical AI.",
    name: "Dr. Sarah Chen",
    role: "Chief Medical Information Officer",
    company: "Memorial Regional Health",
    image: null // Will use initials
  },
  {
    quote: "As a startup, getting into hospitals felt impossible. Scrub got us our first 10 deployments in 60 days. The compliance layer alone saved us $500K.",
    name: "Marcus Johnson",
    role: "CEO & Co-founder",
    company: "CareFlow Analytics",
    image: null
  },
  {
    quote: "Finally, one dashboard for all our AI tools. The security team actually likes this — they did one review and now we can add modules without re-auditing.",
    name: "Jennifer Walsh",
    role: "VP of IT Security",
    company: "Northwest Medical Center",
    image: null
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Exit Intent Modal (disabled by default) */}
      <ExitIntentModal enabled={false} />
      
      {/* Header */}
      <LandingHeader />

      {/* ================================================================== */}
      {/* HERO SECTION */}
      {/* ================================================================== */}
      <section 
        ref={heroRef} 
        className="relative pt-28 pb-16 px-8 overflow-hidden"
        {...dataAttributes.section("hero")}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#a3e635_0%,transparent_50%)] opacity-[0.07]" />
        
        <motion.div 
          className="max-w-[1400px] mx-auto"
          style={{ y, opacity }}
        >
          <motion.div 
            className="text-center max-w-5xl mx-auto mb-14"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background/80 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>The AI Layer for Healthcare</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08] mb-8"
            >
              Deploy clinical AI in minutes,{" "}
              <br className="hidden md:block" />
              <span className="text-accent">not months</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Scrub connects hospitals to AI instantly. Browse the marketplace, 
              click install, and see AI insights appear right inside your EMR.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button 
                size="lg" 
                asChild 
                className="bg-accent hover:bg-accent/90 text-white px-8 h-12 text-base"
                onClick={() => trackCTA("signup", "hero")}
                {...dataAttributes.cta("signup", "hero")}
              >
                <Link href="/portal/auth">
                  Get Scrub Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                className="px-8 h-12 text-base text-muted-foreground hover:text-foreground"
                onClick={() => trackCTA("contact-sales", "hero")}
                {...dataAttributes.cta("contact-sales", "hero")}
              >
                Talk to Sales
              </Button>
            </motion.div>

            {/* Trust microcopy */}
            <motion.p 
              variants={fadeInUp}
              className="text-sm text-muted-foreground"
            >
              Free to start · No credit card required · HIPAA compliant
            </motion.p>
          </motion.div>

          {/* Hero Product Mockup - Doctor's View */}
          <motion.div 
            className="relative max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-background text-xs text-muted-foreground">
                    epic.hospital.org/patient/12345
                  </div>
                </div>
              </div>
              
              {/* EMR Content */}
              <div className="flex">
                {/* Main EMR Area */}
                <div className="flex-1 p-6 bg-slate-50 min-h-[400px]">
                  {/* EMR Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">JD</div>
                      <div>
                        <h3 className="font-semibold text-slate-900">John Doe, 67M</h3>
                        <p className="text-sm text-slate-500">MRN: 1234567 • Room 412B • Dr. Sarah Chen</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-0">Active</Badge>
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "BP", value: "142/88", unit: "mmHg", status: "warning" },
                      { label: "HR", value: "92", unit: "bpm", status: "normal" },
                      { label: "Temp", value: "101.2", unit: "°F", status: "warning" },
                      { label: "SpO2", value: "94", unit: "%", status: "normal" }
                    ].map((vital, i) => (
                      <div key={i} className={`p-3 rounded-lg border ${vital.status === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
                        <p className="text-xs text-slate-500 mb-1">{vital.label}</p>
                        <p className={`text-xl font-semibold ${vital.status === 'warning' ? 'text-amber-600' : 'text-slate-900'}`}>{vital.value}</p>
                        <p className="text-xs text-slate-400">{vital.unit}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <h4 className="font-medium text-slate-900 mb-3">Recent Orders</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">CBC with Differential</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-0 text-xs">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100">
                        <span className="text-slate-600">Blood Culture</span>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0 text-xs">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-slate-600">Lactate Level</span>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-0 text-xs">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Sidebar - Scrub Widget */}
                <div className="w-80 border-l bg-foreground text-background p-5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Scrub AI</h3>
                      <p className="text-xs text-background/60">Real-time Clinical Intelligence</p>
                    </div>
                  </div>

                  {/* Alert Card */}
                  <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-300 text-sm">High Sepsis Risk</p>
                        <p className="text-xs text-background/70 mt-1">78% probability based on current vitals, labs, and clinical notes.</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-background/20 rounded-full overflow-hidden">
                        <div className="h-full w-[78%] bg-red-400 rounded-full" />
                      </div>
                      <span className="text-xs font-semibold text-red-300">78%</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-background/60 uppercase tracking-wide">Recommended Actions</p>
                    {[
                      "Order lactate level stat",
                      "Consider broad-spectrum antibiotics",
                      "Increase monitoring frequency"
                    ].map((action, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-background/5 rounded-lg text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-background/40 mt-6 text-center">
                    Powered by BioSense AI via Scrub
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Labels */}
            <motion.div 
              className="absolute -left-4 top-1/3 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-foreground text-background px-4 py-2 rounded-lg text-sm shadow-lg">
                <p className="font-medium">Your existing EMR</p>
                <p className="text-xs text-background/60">No changes required</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -right-4 top-1/4 hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <div className="bg-accent text-white px-4 py-2 rounded-lg text-sm shadow-lg">
                <p className="font-medium">Scrub AI Widget</p>
                <p className="text-xs text-white/80">Installs in one click</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Social Proof Strip */}
        <motion.div 
          className="max-w-5xl mx-auto mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          {...dataAttributes.section("social-proof")}
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading health systems</p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap opacity-40">
            {trustedBy.map((name, i) => (
              <span key={i} className="text-lg font-semibold text-muted-foreground">{name}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* PROBLEM FRAMING SECTION */}
      {/* ================================================================== */}
      <section 
        className="py-24 px-8 bg-foreground text-background"
        {...dataAttributes.section("problem")}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-background/10 text-background border-0 mb-6">The Problem</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-tight">
              Healthcare AI is stuck in pilot purgatory
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-left mt-12">
              {[
                {
                  stat: "18 months",
                  label: "Average time to deploy a single AI model in a hospital"
                },
                {
                  stat: "73%",
                  label: "Of AI pilots never make it to production"
                },
                {
                  stat: "$2.4M",
                  label: "Average cost of a failed healthcare AI integration"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-5xl font-bold text-accent mb-2">{item.stat}</p>
                  <p className="text-background/70">{item.label}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-background/70 mt-12 max-w-2xl mx-auto"
            >
              You're managing spreadsheets of vendors, waiting on IT tickets, negotiating BAAs, 
              and still can't get AI to your clinicians. <span className="text-background font-medium">There's a better way.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SOLUTION OVERVIEW SECTION */}
      {/* ================================================================== */}
      <section 
        className="py-24 px-8"
        {...dataAttributes.section("solution")}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">The Solution</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Scrub is the app store for healthcare AI
            </h2>
            <p className="text-xl text-muted-foreground">
              One platform to discover, deploy, and manage clinical AI — without the integration nightmare.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: Users,
                title: "Browse the Marketplace",
                description: "Explore pre-validated AI modules from vetted vendors. Every module is HIPAA-compliant and EMR-compatible."
              },
              {
                step: "2",
                icon: Zap,
                title: "Install in One Click",
                description: "No IT tickets. No vendor calls. Click install and the AI appears inside your existing EMR workflow."
              },
              {
                step: "3",
                icon: BarChart3,
                title: "Monitor & Optimize",
                description: "Track usage, outcomes, and costs from a single dashboard. Disable or rollback any module instantly."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-0 shadow-sm bg-muted/30">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <item.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PERSONA-FOCUSED SECTIONS */}
      {/* ================================================================== */}
      <section 
        className="py-24 px-8 bg-muted/30"
        {...dataAttributes.section("personas")}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">Built For You</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Whether you build, buy, or manage AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Scrub works for everyone in the healthcare AI ecosystem.
            </p>
          </motion.div>

          <div className="space-y-8">
            {personas.map((persona, i) => (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="border-0 shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className={`grid md:grid-cols-2 ${i % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                      {/* Content Side */}
                      <div className={`p-8 md:p-12 ${i % 2 === 1 ? 'md:col-start-2' : ''}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                            <persona.icon className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">{persona.subtitle}</p>
                            <h3 className="text-xl font-semibold">{persona.title}</h3>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4 mb-6">
                          <p className="text-muted-foreground italic">"{persona.pain}"</p>
                        </div>
                        
                        <p className="text-foreground mb-6">{persona.solution}</p>
                        
                        <ul className="space-y-2 mb-6">
                          {persona.benefits.map((benefit, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-accent flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Button 
                          asChild
                          onClick={() => trackCTA("signup", "personas")}
                          {...dataAttributes.cta("signup", "personas")}
                        >
                          <Link href={persona.ctaHref}>
                            {persona.cta}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                      
                      {/* Visual Side */}
                      <div className={`bg-muted/50 p-8 md:p-12 flex items-center justify-center ${i % 2 === 1 ? 'md:col-start-1' : ''}`}>
                        <div className="w-full max-w-sm aspect-square bg-background rounded-2xl border shadow-sm flex items-center justify-center">
                          <persona.icon className="w-24 h-24 text-muted-foreground/20" />
                        </div>
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
      {/* FEATURES SECTION */}
      {/* ================================================================== */}
      <section 
        id="features" 
        className="py-24 px-8"
        {...dataAttributes.section("features")}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Everything you need to deploy AI in healthcare
            </h2>
            <p className="text-xl text-muted-foreground">
              From hospital admins to AI startups to developers — Scrub makes healthcare AI accessible to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
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
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* AI MODULES SECTION */}
      {/* ================================================================== */}
      <section 
        id="modules" 
        className="py-24 px-8 bg-muted/30"
        {...dataAttributes.section("modules")}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">AI Marketplace</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Browse our growing library of clinical AI
            </h2>
            <p className="text-xl text-muted-foreground">
              From sepsis prediction to documentation automation — find the right AI for your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${module.color} flex items-center justify-center`}>
                        <module.icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{module.metric}</p>
                        <p className="text-xs text-muted-foreground">{module.metricLabel}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mb-3 text-xs">{module.category}</Badge>
                    <h3 className="text-lg font-semibold mb-1">{module.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {module.vendor}</p>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                    <div className="mt-4 flex items-center text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              asChild
              onClick={() => trackCTA("signup", "modules")}
              {...dataAttributes.cta("signup", "modules")}
            >
              <Link href="/portal/auth">
                View All Modules
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OBJECTION HANDLING SECTION */}
      {/* ================================================================== */}
      <section 
        className="py-24 px-8"
        {...dataAttributes.section("objections")}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">Common Questions</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Let's address the elephant in the room
            </h2>
            <p className="text-xl text-muted-foreground">
              Healthcare AI adoption comes with real concerns. Here's how Scrub handles them.
            </p>
          </motion.div>

          <div className="space-y-6">
            {objections.map((objection, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <objection.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{objection.title}</h3>
                        <p className="text-muted-foreground">{objection.answer}</p>
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
      {/* TESTIMONIALS SECTION */}
      {/* ================================================================== */}
      <section 
        className="py-24 px-8 bg-muted/30"
        {...dataAttributes.section("testimonials")}
      >
        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Trusted by healthcare leaders
            </h2>
            <p className="text-xl text-muted-foreground">
              See what hospitals and AI companies are saying about Scrub.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-0 shadow-sm">
                  <CardContent className="p-6">
                    <Quote className="w-8 h-8 text-accent/20 mb-4" />
                    <p className="text-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <span className="text-accent font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
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
      {/* BOTTOM CTA SECTION */}
      {/* ================================================================== */}
      <section 
        className="py-24 px-8"
        {...dataAttributes.section("bottom-cta")}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="bg-foreground text-background rounded-3xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to bring AI to your hospital?
            </h2>
            <p className="text-lg text-background/70 mb-8 max-w-2xl mx-auto">
              Join healthcare organizations deploying clinical AI in days, not months. 
              Free to start, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-accent hover:bg-accent/90 text-white px-8"
                onClick={() => trackCTA("signup", "bottom-cta")}
                {...dataAttributes.cta("signup", "bottom-cta")}
              >
                <Link href="/portal/auth">
                  Get Scrub Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-background/20 text-background hover:bg-background/10 bg-transparent px-8"
                onClick={() => trackCTA("contact-sales", "bottom-cta")}
                {...dataAttributes.cta("contact-sales", "bottom-cta")}
              >
                Talk to Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
