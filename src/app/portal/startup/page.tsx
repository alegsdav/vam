"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Rocket, 
  Send,
  CheckCircle2,
  Loader2,
  DollarSign,
  Link2,
  FileText,
  Package,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

type SubmissionState = "form" | "submitting" | "success";

type SubmissionStep = "validating" | "uploading" | "processing" | "complete";

export default function StartupPortal() {
  const [state, setState] = useState<SubmissionState>("form");
  const [step, setStep] = useState<SubmissionStep>("validating");
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimated_cost_year: "",
    link: ""
  });

  const router = useRouter();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.name.trim() || !formData.description.trim() || !formData.estimated_cost_year || !formData.link.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Start submission animation
    setState("submitting");
    setStep("validating");

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError("You must be logged in to submit a module");
      setState("form");
      return;
    }

    // Simulate steps
    await new Promise(r => setTimeout(r, 1200));
    setStep("uploading");
    
    await new Promise(r => setTimeout(r, 1500));
    setStep("processing");

    // Actually insert into database
    const { error: insertError } = await supabase
      .from("modules")
      .insert({
        user_id: user.id,
        name: formData.name.trim(),
        description: formData.description.trim(),
        estimated_cost_year: parseFloat(formData.estimated_cost_year),
        link: formData.link.trim(),
        status: "pending"
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      setError(insertError.message);
      setState("form");
      return;
    }

    await new Promise(r => setTimeout(r, 1000));
    setStep("complete");
    
    await new Promise(r => setTimeout(r, 800));
    setState("success");
  };

  const isFormValid = formData.name && formData.description && formData.estimated_cost_year && formData.link;

  return (
    <div className="min-h-screen bg-foreground text-background">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/portal" className="flex items-center gap-2 text-background/50 hover:text-background transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Portal</span>
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">AI Startup Portal</h1>
                  <p className="text-xs text-background/50">Submit your modules</p>
                </div>
              </div>
            </div>
            <Badge className="bg-white/10 text-background/70 border-0">
              Straits Marketplace
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Form State */}
          {state === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold mb-2">Submit Your AI Module</h2>
                <p className="text-background/60">
                  Fill in the details below to submit your module for review
                </p>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Package className="w-4 h-4 inline mr-2" />
                        Module Name
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Sepsis Prediction AI"
                        className="bg-white/10 border-white/20 text-background placeholder:text-background/40 h-12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Description
                      </label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe what your AI module does, its key features, and use cases..."
                        className="bg-white/10 border-white/20 text-background placeholder:text-background/40 min-h-[120px]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <DollarSign className="w-4 h-4 inline mr-2" />
                        Estimated Cost per Year (USD)
                      </label>
                      <Input
                        name="estimated_cost_year"
                        type="number"
                        value={formData.estimated_cost_year}
                        onChange={handleChange}
                        placeholder="e.g., 25000"
                        className="bg-white/10 border-white/20 text-background placeholder:text-background/40 h-12"
                      />
                      <p className="text-xs text-background/40 mt-1">
                        Enter the estimated annual subscription cost for healthcare organizations
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Link2 className="w-4 h-4 inline mr-2" />
                        API or Documentation Link
                      </label>
                      <Input
                        name="link"
                        type="url"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="https://docs.yourcompany.com/api"
                        className="bg-white/10 border-white/20 text-background placeholder:text-background/40 h-12"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium text-accent">Review Process</p>
                          <p className="text-sm text-background/60 mt-1">
                            After submission, our team will review your module. You'll receive 
                            an email once it's approved and live in the marketplace.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full h-12 bg-accent hover:bg-accent/90 text-white"
                      disabled={!isFormValid}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Submit for Review
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Submitting State */}
          {state === "submitting" && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-16"
            >
              <div className="relative w-24 h-24 mx-auto mb-8">
                <Loader2 className="w-24 h-24 text-accent animate-spin" />
              </div>

              <h3 className="text-2xl font-semibold mb-2">
                {step === "validating" && "Validating your submission..."}
                {step === "uploading" && "Uploading module details..."}
                {step === "processing" && "Processing submission..."}
                {step === "complete" && "Almost done..."}
              </h3>
              
              <p className="text-background/60">
                {step === "validating" && "Checking all required fields"}
                {step === "uploading" && "Securely transmitting data"}
                {step === "processing" && "Creating your module entry"}
                {step === "complete" && "Finalizing submission"}
              </p>

              <div className="flex items-center justify-center gap-2 mt-8">
                {["validating", "uploading", "processing", "complete"].map((s, i) => {
                  const steps: SubmissionStep[] = ["validating", "uploading", "processing", "complete"];
                  const currentIndex = steps.indexOf(step);
                  const stepIndex = i;
                  const isDone = stepIndex <= currentIndex;
                  
                  return (
                    <div 
                      key={s}
                      className={`w-2 h-2 rounded-full transition-all ${
                        isDone ? 'bg-accent' : 'bg-white/20'
                      }`}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Success State */}
          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-4xl font-semibold mb-4">Submission Complete! 🎉</h2>
              <p className="text-xl text-background/60 mb-8">
                Your module has been submitted for review.
              </p>

              <Card className="bg-white/5 border-white/10 max-w-lg mx-auto">
                <CardContent className="p-8">
                  <div className="text-left space-y-4">
                    <div>
                      <p className="text-sm text-background/50">Module Name</p>
                      <p className="font-semibold">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-background/50">Status</p>
                      <Badge className="bg-amber-500/20 text-amber-400 border-0">
                        Pending Review
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-background/60 mb-4">What happens next:</p>
                    <div className="text-left space-y-3">
                      {[
                        "Our team will review your submission within 2-3 business days",
                        "You'll receive an email notification once reviewed",
                        "If approved, your module will appear in the marketplace"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-center gap-4 mt-8">
                <Button 
                  variant="outline"
                  className="border-white/20 text-background hover:bg-white/10 bg-transparent"
                  onClick={() => {
                    setFormData({ name: "", description: "", estimated_cost_year: "", link: "" });
                    setState("form");
                  }}
                >
                  Submit Another
                </Button>
                <Button 
                  className="bg-white text-foreground hover:bg-white/90"
                  asChild
                >
                  <Link href="/portal">
                    Back to Portal
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
