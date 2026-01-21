"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Cpu, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type OrgType = "consumer" | "provider" | null;

export default function ConnectPage() {
  const [orgType, setOrgType] = useState<OrgType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md text-center"
        >
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-semibold mb-4">Request Received</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your interest in VSee AI Marketplace. Our team will review your request and reach out within 2 business days.
          </p>
          <Button asChild>
            <Link href="/vam">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Marketplace
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/vam" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">V</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">VAM</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/vam" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/vam/catalog" className="text-muted-foreground hover:text-foreground transition-colors">Catalog</Link>
              <Link href="/vam/connect" className="text-foreground font-medium">Connect</Link>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/portal">Sign In</Link>
          </Button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="accent" className="mb-4">Enterprise Onboarding</Badge>
          <h1 className="text-4xl font-normal tracking-tight mb-4" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            Connect with VSee
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Whether you're looking to adopt AI capabilities or distribute your AI solutions to healthcare, we'd love to hear from you.
          </p>

          {/* Organization Type Selection */}
          {!orgType ? (
            <div className="space-y-4">
              <p className="font-medium mb-4">I am interested in...</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:border-accent transition-colors group"
                  onClick={() => setOrgType("consumer")}
                >
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <Building2 className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Consuming AI</h3>
                    <p className="text-sm text-muted-foreground">
                      I represent a healthcare organization looking to adopt AI capabilities through VSee.
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:border-foreground/50 transition-colors group"
                  onClick={() => setOrgType("provider")}
                >
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors">
                      <Cpu className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Providing AI</h3>
                    <p className="text-sm text-muted-foreground">
                      I represent an AI company looking to distribute solutions through VSee Marketplace.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  {orgType === "consumer" ? (
                    <Building2 className="w-5 h-5 text-accent" />
                  ) : (
                    <Cpu className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {orgType === "consumer" ? "Healthcare Organization" : "AI Provider"}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setOrgType(null)}>
                  Change
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Organization Name *</label>
                    <Input
                      required
                      placeholder={orgType === "consumer" ? "Memorial Health System" : "AI Solutions Inc."}
                      value={formData.organizationName}
                      onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact Name *</label>
                    <Input
                      required
                      placeholder="Jane Smith"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input
                      required
                      type="email"
                      placeholder="jane@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {orgType === "consumer" 
                      ? "What AI capabilities are you interested in?" 
                      : "Describe your AI solution"
                    }
                  </label>
                  <Textarea
                    rows={4}
                    placeholder={
                      orgType === "consumer"
                        ? "Tell us about your organization and what you're looking to achieve with AI..."
                        : "Tell us about your AI solution and how it could benefit healthcare organizations..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg">
                    Submit Request
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    By submitting, you agree to be contacted by VSee regarding your inquiry. 
                    We typically respond within 2 business days.
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t py-12 px-8 mt-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-xs">V</span>
            </div>
            <span className="text-sm text-muted-foreground">VSee AI Marketplace</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/vam" className="hover:text-foreground transition-colors">Home</Link>
            <Link href="/vam/catalog" className="hover:text-foreground transition-colors">Catalog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
