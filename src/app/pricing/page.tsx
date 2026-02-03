"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { 
  Check, 
  Building2, 
  Rocket, 
  Code2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Zap,
  Shield,
  Users,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";
import { trackCTA, dataAttributes } from "@/lib/analytics";

// ============================================================================
// DATA
// ============================================================================

const plans = [
  {
    id: "startups",
    title: "AI Startups",
    subtitle: "List your AI",
    icon: Rocket,
    price: "$0",
    period: "to list",
    description: "Get your AI in front of thousands of hospitals. Pay only when you succeed.",
    features: [
      { text: "Free marketplace listing", included: true },
      { text: "No-code data mapper", included: true },
      { text: "FHIR translation layer", included: true },
      { text: "Revenue share model (15%)", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Developer documentation", included: true },
      { text: "Priority support", included: false },
      { text: "Custom branding", included: false },
    ],
    cta: "List Your AI",
    ctaHref: "/portal/auth",
    popular: false,
    highlight: "No upfront costs"
  },
  {
    id: "hospitals",
    title: "Hospitals & Health Systems",
    subtitle: "Deploy AI at scale",
    icon: Building2,
    price: "Custom",
    period: "enterprise pricing",
    description: "Full platform access with dedicated support and SLA guarantees.",
    features: [
      { text: "Unlimited AI module installs", included: true },
      { text: "Admin dashboard & analytics", included: true },
      { text: "HIPAA BAA included", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Custom integrations", included: true },
      { text: "On-premise deployment option", included: true },
      { text: "Dedicated success manager", included: true },
      { text: "Custom SLA guarantees", included: true },
    ],
    cta: "Contact Sales",
    ctaHref: "/portal/auth",
    popular: true,
    highlight: "Most popular"
  },
  {
    id: "developers",
    title: "Software Developers",
    subtitle: "Build with our SDK",
    icon: Code2,
    price: "$99",
    period: "per month",
    description: "Embed healthcare AI into your applications with our SDK.",
    features: [
      { text: "Widget SDK access", included: true },
      { text: "REST API access", included: true },
      { text: "10,000 API calls/mo", included: true },
      { text: "Webhook integrations", included: true },
      { text: "Community support", included: true },
      { text: "Sandbox environment", included: true },
      { text: "White-label options", included: false },
      { text: "Dedicated support", included: false },
    ],
    cta: "Start Building",
    ctaHref: "/portal/auth",
    popular: false,
    highlight: "14-day free trial"
  }
];

const faqs = [
  {
    question: "How does pricing work for hospitals?",
    answer: "Hospital pricing is customized based on your organization's size, number of facilities, and specific needs. We offer flexible models including per-module pricing, unlimited access tiers, and volume discounts. Contact our sales team for a personalized quote."
  },
  {
    question: "What's included in the HIPAA BAA?",
    answer: "Our Business Associate Agreement covers all AI modules deployed through Scrub. This includes data encryption, access controls, audit logging, and incident response procedures. The BAA is included at no additional cost for all hospital customers."
  },
  {
    question: "How does the revenue share model work for AI startups?",
    answer: "When hospitals install your AI module through Scrub, you receive 85% of the revenue. We handle all billing, compliance, and support. There are no upfront costs — you only pay when you earn."
  },
  {
    question: "Can I try Scrub before committing?",
    answer: "Yes! Developers get a 14-day free trial with full SDK access. Hospitals can request a personalized demo and pilot program. AI startups can list their first module at no cost to test the marketplace."
  },
  {
    question: "What EMR systems do you support?",
    answer: "Scrub is certified for Epic, Cerner, Meditech, Allscripts, and any FHIR R4-compliant system. Our integration layer handles the translation so AI modules work seamlessly across different EMRs."
  },
  {
    question: "Is there a contract or can I cancel anytime?",
    answer: "Developer plans are month-to-month with no long-term commitment. Hospital contracts are typically annual but we offer flexible terms. AI startups can remove their listings at any time with no penalties."
  },
  {
    question: "What support is included?",
    answer: "All plans include access to our documentation and community forums. Hospital customers get 24/7 priority support with dedicated success managers. Developers can upgrade to priority support for an additional fee."
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes, we offer significant discounts for qualifying non-profit healthcare organizations and academic medical centers. Contact our sales team to learn more about our non-profit program."
  }
];

const trustIndicators = [
  { icon: Shield, text: "HIPAA Compliant" },
  { icon: Globe, text: "SOC 2 Type II" },
  { icon: Users, text: "50+ Health Systems" },
  { icon: Zap, text: "99.9% Uptime SLA" },
];

// ============================================================================
// COMPONENTS
// ============================================================================

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-accent transition-colors"
      >
        <span className="font-medium pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-muted-foreground pr-12">{answer}</p>
      </motion.div>
    </div>
  );
}

// ============================================================================
// PAGE
// ============================================================================

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <LandingHeader />

      {/* Hero */}
      <section className="pt-28 pb-16 px-8" {...dataAttributes.section("pricing-hero")}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-6">Pricing</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a hospital deploying AI, a startup building it, or a developer embedding it — there's a plan for you.
            </p>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="flex items-center justify-center gap-6 md:gap-10 mt-10 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {trustIndicators.map((indicator, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <indicator.icon className="w-4 h-4 text-accent" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-8" {...dataAttributes.section("pricing-cards")}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-accent text-white border-0 shadow-lg">
                      {plan.highlight}
                    </Badge>
                  </div>
                )}
                <Card className={`h-full relative overflow-hidden ${
                  plan.popular 
                    ? 'border-accent border-2 shadow-xl' 
                    : 'border shadow-sm'
                }`}>
                  {!plan.popular && plan.highlight && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-xs">
                        {plan.highlight}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 md:p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                        <plan.icon className="w-6 h-6 text-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{plan.subtitle}</p>
                      <h3 className="text-2xl font-bold">{plan.title}</h3>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">{plan.description}</p>

                    {/* CTA */}
                    <Button 
                      className={`w-full mb-6 ${
                        plan.popular 
                          ? 'bg-accent hover:bg-accent/90 text-white' 
                          : ''
                      }`}
                      variant={plan.popular ? 'default' : 'outline'}
                      asChild
                      onClick={() => trackCTA("signup", "pricing")}
                      {...dataAttributes.cta("signup", "pricing")}
                    >
                      <Link href={plan.ctaHref}>
                        {plan.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>

                    {/* Features */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">What's included:</p>
                      {plan.features.map((feature, j) => (
                        <div 
                          key={j} 
                          className={`flex items-center gap-2 text-sm ${
                            feature.included ? '' : 'text-muted-foreground/50'
                          }`}
                        >
                          <Check className={`w-4 h-4 flex-shrink-0 ${
                            feature.included ? 'text-accent' : 'text-muted-foreground/30'
                          }`} />
                          <span className={feature.included ? '' : 'line-through'}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Enterprise callout */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-muted-foreground">
              Need a custom solution?{" "}
              <Link href="/portal/auth" className="text-accent hover:underline font-medium">
                Talk to our sales team
              </Link>
              {" "}about enterprise pricing and custom deployments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table (simplified) */}
      <section className="py-16 px-8 bg-muted/30" {...dataAttributes.section("pricing-comparison")}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Compare plans at a glance</h2>
            <p className="text-muted-foreground">Find the right fit for your organization</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-medium">Feature</th>
                      <th className="text-center p-4 font-medium">Startups</th>
                      <th className="text-center p-4 font-medium bg-accent/5">Hospitals</th>
                      <th className="text-center p-4 font-medium">Developers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "HIPAA BAA", startups: true, hospitals: true, developers: true },
                      { feature: "API Access", startups: true, hospitals: true, developers: true },
                      { feature: "Analytics Dashboard", startups: true, hospitals: true, developers: true },
                      { feature: "Priority Support", startups: false, hospitals: true, developers: false },
                      { feature: "Custom Integrations", startups: false, hospitals: true, developers: false },
                      { feature: "On-Premise Option", startups: false, hospitals: true, developers: false },
                      { feature: "White-Label", startups: false, hospitals: true, developers: "Add-on" },
                      { feature: "SLA Guarantee", startups: false, hospitals: true, developers: false },
                    ].map((row, i) => (
                      <tr key={i} className="border-b last:border-b-0">
                        <td className="p-4 text-sm">{row.feature}</td>
                        <td className="p-4 text-center">
                          {typeof row.startups === 'boolean' ? (
                            row.startups ? (
                              <Check className="w-5 h-5 text-accent mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{row.startups}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-accent/5">
                          {typeof row.hospitals === 'boolean' ? (
                            row.hospitals ? (
                              <Check className="w-5 h-5 text-accent mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{row.hospitals}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {typeof row.developers === 'boolean' ? (
                            row.developers ? (
                              <Check className="w-5 h-5 text-accent mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )
                          ) : (
                            <span className="text-sm text-muted-foreground">{row.developers}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-8" {...dataAttributes.section("pricing-faq")}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
            <p className="text-muted-foreground">
              Can't find what you're looking for?{" "}
              <Link href="/portal/auth" className="text-accent hover:underline">
                Contact our team
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 md:p-8">
                {faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-8 bg-muted/30" {...dataAttributes.section("pricing-cta")}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-foreground text-background rounded-3xl p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-background/70 mb-8 max-w-2xl mx-auto">
              Join healthcare organizations deploying AI in days, not months. Free to start.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-accent hover:bg-accent/90 text-white px-8"
                onClick={() => trackCTA("signup", "pricing")}
                {...dataAttributes.cta("signup", "pricing")}
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
                onClick={() => trackCTA("contact-sales", "pricing")}
                {...dataAttributes.cta("contact-sales", "pricing")}
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
