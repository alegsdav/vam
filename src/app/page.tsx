"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Shield, 
  Zap, 
  Layers,
  Code2,
  Building2,
  Stethoscope,
  Rocket,
  Check,
  Brain,
  Activity,
  FileText,
  Heart,
  Clock,
  BarChart3,
  Lock,
  Globe,
  Workflow,
  ChevronRight,
  PlayCircle,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const pricing = [
  {
    title: "Hospitals & Health Systems",
    icon: Building2,
    price: "Custom",
    period: "enterprise pricing",
    description: "Full platform access with dedicated support and SLA guarantees.",
    features: [
      "Unlimited AI module installs",
      "Admin dashboard & analytics",
      "HIPAA BAA included",
      "24/7 priority support",
      "Custom integrations",
      "On-premise deployment option"
    ],
    cta: "Contact Sales",
    popular: true
  },
  {
    title: "AI Startups",
    icon: Rocket,
    price: "$0",
    period: "to list",
    description: "Get your AI in front of thousands of hospitals. Pay only when you succeed.",
    features: [
      "Free marketplace listing",
      "No-code data mapper",
      "FHIR translation layer",
      "Revenue share model",
      "Analytics dashboard",
      "Developer documentation"
    ],
    cta: "List Your AI",
    popular: false
  },
  {
    title: "Software Developers",
    icon: Code2,
    price: "$99",
    period: "per month",
    description: "Embed healthcare AI into your applications with our SDK.",
    features: [
      "Widget SDK access",
      "REST API access",
      "10,000 API calls/mo",
      "Webhook integrations",
      "Community support",
      "Sandbox environment"
    ],
    cta: "Start Building",
    popular: false
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-xl tracking-tight">Scrub</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#modules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Modules</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex" asChild>
                <Link href="/portal">Portal</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-white">
                <Link href="/demo" className="flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  See Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#a3e635_0%,transparent_50%)] opacity-10" />
        
        <motion.div 
          className="max-w-7xl mx-auto"
          style={{ y, opacity }}
        >
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-16"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>The AI Layer for Healthcare</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              One platform.
              <br />
              <span className="relative">
                <span className="text-muted-foreground/30 line-through decoration-2">Zero busywork.</span>
                <span className="absolute left-0 top-0 text-accent"> Infinite AI.</span>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Scrub connects hospitals to AI instantly. Install clinical AI modules 
              in one click, right inside your existing EMR.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white px-8 h-12 text-base">
                <Link href="/demo">
                  See Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 h-12 text-base">
                Contact Sales
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Product Mockup - Doctor's View */}
          <motion.div 
            className="relative max-w-5xl mx-auto"
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

        {/* Trusted By */}
        <motion.div 
          className="max-w-4xl mx-auto mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading health systems</p>
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-50">
            {trustedBy.map((name, i) => (
              <span key={i} className="text-lg font-semibold text-muted-foreground">{name}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
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

      {/* AI Modules Section */}
      <section id="modules" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
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
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
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
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">
                View All Modules
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Whether you're a hospital, AI startup, or developer — there's a plan for you.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className={`h-full relative ${plan.popular ? 'border-accent shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-accent text-white border-0">Most Popular</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <plan.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90 text-white' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
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
              See how Scrub can transform your clinical workflows with AI that installs in minutes, not months.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white px-8">
                <Link href="/demo">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  See Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-background/20 text-background hover:bg-background/10 bg-transparent px-8">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-lg">S</span>
              </div>
              <span className="font-semibold text-lg">Scrub</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Scrub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
