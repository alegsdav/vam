"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Send,
  CheckCircle2,
  Loader2,
  DollarSign,
  Link2,
  FileText,
  Package,
  Clock,
  TrendingUp,
  Eye,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

type SubmissionState = "form" | "submitting" | "success";
type SubmissionStep = "validating" | "uploading" | "processing" | "complete";

// Mock data for existing submissions
const mockSubmissions = [
  { name: "Cardiac Risk AI", status: "approved", views: 1240, date: "Jan 15, 2026" },
  { name: "Diabetes Predictor", status: "pending", views: 0, date: "Jan 20, 2026" },
];

export default function StartupPage() {
  const [state, setState] = useState<SubmissionState>("form");
  const [step, setStep] = useState<SubmissionStep>("validating");
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimated_cost_year: "",
    link: ""
  });

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

    if (!formData.name.trim() || !formData.description.trim() || !formData.estimated_cost_year || !formData.link.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setState("submitting");
    setStep("validating");

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setError("You must be logged in to submit a module");
      setState("form");
      return;
    }

    await new Promise(r => setTimeout(r, 1200));
    setStep("uploading");
    
    await new Promise(r => setTimeout(r, 1500));
    setStep("processing");

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
    <div>
      {/* Page Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-1">AI Startup Portal</h1>
        <p className="text-muted-foreground">Submit your AI modules to the Scrub marketplace</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="col-span-2">
          <AnimatePresence mode="wait">
            {/* Form State */}
            {state === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Submit New Module</CardTitle>
                    <CardDescription>Fill in the details below to submit your AI module for review</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                          className="h-11"
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
                          className="min-h-[100px]"
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
                          className="h-11"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
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
                          className="h-11"
                        />
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                          {error}
                        </div>
                      )}

                      <Button 
                        type="submit"
                        className="w-full h-11 bg-foreground hover:bg-foreground/90"
                        disabled={!isFormValid}
                      >
                        <Send className="w-4 h-4 mr-2" />
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
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                      <Loader2 className="w-20 h-20 text-accent animate-spin" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                      {step === "validating" && "Validating your submission..."}
                      {step === "uploading" && "Uploading module details..."}
                      {step === "processing" && "Processing submission..."}
                      {step === "complete" && "Almost done..."}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {step === "validating" && "Checking all required fields"}
                      {step === "uploading" && "Securely transmitting data"}
                      {step === "processing" && "Creating your module entry"}
                      {step === "complete" && "Finalizing submission"}
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-8">
                      {["validating", "uploading", "processing", "complete"].map((s, i) => {
                        const steps: SubmissionStep[] = ["validating", "uploading", "processing", "complete"];
                        const currentIndex = steps.indexOf(step);
                        const isDone = i <= currentIndex;
                        
                        return (
                          <div 
                            key={s}
                            className={`w-2 h-2 rounded-full transition-all ${
                              isDone ? 'bg-accent' : 'bg-muted'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Success State */}
            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-2xl font-semibold mb-2">Submission Complete!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your module has been submitted for review.
                    </p>

                    <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left max-w-sm mx-auto">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Module Name</p>
                          <p className="font-medium">{formData.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          <Badge className="bg-amber-100 text-amber-700 border-0">
                            Pending Review
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setFormData({ name: "", description: "", estimated_cost_year: "", link: "" });
                          setState("form");
                        }}
                      >
                        Submit Another
                      </Button>
                      <Button asChild>
                        <Link href="/portal">
                          Back to Dashboard
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Review Process Info */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Review Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team reviews submissions within 2-3 business days. You'll receive an email once approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Your Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSubmissions.map((submission, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{submission.name}</p>
                    <p className="text-xs text-muted-foreground">{submission.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        submission.status === 'approved' 
                          ? 'bg-accent/10 text-accent' 
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {submission.status}
                    </Badge>
                    {submission.status === 'approved' && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end gap-1">
                        <Eye className="w-3 h-3" />
                        {submission.views} views
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Tips for Approval</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Provide detailed documentation",
                  "Include accuracy metrics",
                  "List supported data formats",
                  "Describe HIPAA compliance"
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
