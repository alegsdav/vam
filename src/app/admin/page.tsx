"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Star, 
  Download, 
  CheckCircle2, 
  Shield, 
  Clock,
  Building2,
  Filter,
  Grid3X3,
  List,
  Loader2,
  Check,
  X,
  ExternalLink,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// AI Apps for the marketplace
const aiApps = [
  {
    id: "sepsis-ai",
    name: "Sepsis AI Pro",
    vendor: "CriticalCare AI",
    category: "Clinical Decision Support",
    description: "Real-time sepsis prediction using vital signs, labs, and clinical notes. 6-hour early warning system.",
    rating: 4.8,
    reviews: 127,
    installs: "2,400+",
    price: "Enterprise",
    features: ["Real-time monitoring", "FHIR R4 compatible", "HL7 alerts"],
    certified: true,
    image: "🔬"
  },
  {
    id: "billing-optimizer",
    name: "Billing Optimizer",
    vendor: "RevCycle AI",
    category: "Revenue Cycle",
    description: "Automated ICD-10/CPT coding suggestions with documentation improvement recommendations.",
    rating: 4.6,
    reviews: 89,
    installs: "1,800+",
    price: "Per-claim",
    features: ["Auto-coding", "Denial prevention", "Audit support"],
    certified: true,
    image: "💰"
  },
  {
    id: "readmission-predictor",
    name: "ReadmitRisk",
    vendor: "Predictive Health",
    category: "Population Health",
    description: "30-day readmission risk scoring with intervention recommendations for care managers.",
    rating: 4.7,
    reviews: 156,
    installs: "3,100+",
    price: "Per-patient",
    features: ["Risk stratification", "Care plans", "Alerts"],
    certified: true,
    image: "📊"
  },
  {
    id: "clinical-notes",
    name: "NoteGenius",
    vendor: "DocAI Labs",
    category: "Documentation",
    description: "AI-powered clinical note summarization and generation from patient encounters.",
    rating: 4.9,
    reviews: 234,
    installs: "4,200+",
    price: "Per-provider",
    features: ["Voice-to-text", "Template generation", "EHR integration"],
    certified: true,
    image: "📝"
  },
  {
    id: "prior-auth",
    name: "AuthFlow",
    vendor: "ClearPath Health",
    category: "Revenue Cycle",
    description: "Automated prior authorization with payer rule matching and submission tracking.",
    rating: 4.5,
    reviews: 67,
    installs: "980+",
    price: "Per-submission",
    features: ["Auto-submission", "Status tracking", "Appeal support"],
    certified: true,
    image: "✅"
  },
  {
    id: "imaging-ai",
    name: "RadInsight",
    vendor: "Imaging Intelligence",
    category: "Diagnostics",
    description: "AI-assisted radiology with automated findings detection for chest X-rays and CT scans.",
    rating: 4.7,
    reviews: 112,
    installs: "1,500+",
    price: "Per-study",
    features: ["FDA cleared", "PACS integration", "Priority flagging"],
    certified: true,
    image: "🩻"
  }
];

const categories = ["All", "Clinical Decision Support", "Revenue Cycle", "Population Health", "Documentation", "Diagnostics"];

type InstallState = "idle" | "connecting" | "authenticating" | "installing" | "complete";

export default function AdminView() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedApp, setSelectedApp] = useState<typeof aiApps[0] | null>(null);
  const [installState, setInstallState] = useState<InstallState>("idle");
  const [installedApps, setInstalledApps] = useState<string[]>(["clinical-notes"]);

  const filteredApps = aiApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.vendor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = async () => {
    if (!selectedApp) return;
    
    setInstallState("connecting");
    await new Promise(r => setTimeout(r, 1500));
    
    setInstallState("authenticating");
    await new Promise(r => setTimeout(r, 2000));
    
    setInstallState("installing");
    await new Promise(r => setTimeout(r, 2000));
    
    setInstallState("complete");
    setInstalledApps(prev => [...prev, selectedApp.id]);
    
    await new Promise(r => setTimeout(r, 1500));
    setSelectedApp(null);
    setInstallState("idle");
  };

  const isInstalled = (appId: string) => installedApps.includes(appId);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Exit Demo</span>
              </Link>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">AI Marketplace</h1>
                  <p className="text-xs text-slate-500">Memorial Health System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {installedApps.length} Apps Installed
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-accent to-emerald-500 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold mb-2">Healthcare AI Apps</h2>
          <p className="text-white/80 text-lg max-w-2xl">
            Browse verified AI solutions. Install directly to your EMR with one click — no IT ticket required.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search AI apps..."
              className="pl-10 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? "bg-accent hover:bg-accent/90" : ""}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* App Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Card 
                className={`h-full cursor-pointer transition-all hover:shadow-lg ${
                  isInstalled(app.id) ? 'ring-2 ring-accent/50' : 'hover:border-slate-300'
                }`}
                onClick={() => !isInstalled(app.id) && setSelectedApp(app)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{app.image}</div>
                    {isInstalled(app.id) ? (
                      <Badge variant="accent" className="gap-1">
                        <Check className="w-3 h-3" />
                        Installed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">{app.price}</Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{app.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">{app.vendor}</p>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{app.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>{app.rating}</span>
                      <span className="text-slate-400">({app.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>{app.installs}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {app.features.map((feature, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {app.certified && (
                    <div className="mt-4 pt-4 border-t flex items-center gap-2 text-xs text-slate-500">
                      <Shield className="w-4 h-4 text-accent" />
                      <span>HealthBridge Certified</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Install Modal */}
      <AnimatePresence>
        {selectedApp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => installState === "idle" && setSelectedApp(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {installState === "idle" ? (
                <>
                  <div className="p-6 border-b">
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{selectedApp.image}</div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{selectedApp.name}</h2>
                        <p className="text-slate-500">{selectedApp.vendor}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                            <span>{selectedApp.rating}</span>
                          </div>
                          <span className="text-slate-300">•</span>
                          <span className="text-sm text-slate-500">{selectedApp.installs} installs</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedApp(null)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-slate-600 mb-6">{selectedApp.description}</p>
                    
                    <div className="bg-slate-50 rounded-xl p-4 mb-6">
                      <h4 className="font-medium text-sm mb-3">What this app can access:</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          Patient demographics (read-only)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          Clinical observations and vitals
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          Lab results and orders
                        </li>
                      </ul>
                    </div>

                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 h-12 text-lg"
                      onClick={handleInstall}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Install to Epic
                    </Button>
                    
                    <p className="text-xs text-center text-slate-400 mt-4">
                      By installing, you agree to the app's terms and privacy policy
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {installState !== "complete" ? (
                      <Loader2 className="w-20 h-20 text-accent animate-spin" />
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 rounded-full bg-accent flex items-center justify-center"
                      >
                        <Check className="w-10 h-10 text-white" />
                      </motion.div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">
                    {installState === "connecting" && "Connecting to Epic..."}
                    {installState === "authenticating" && "Authenticating via HealthBridge..."}
                    {installState === "installing" && "Installing to your EMR..."}
                    {installState === "complete" && "Installation Complete!"}
                  </h3>
                  
                  <p className="text-slate-500">
                    {installState === "connecting" && "Establishing secure connection"}
                    {installState === "authenticating" && "Verifying permissions and access"}
                    {installState === "installing" && "Configuring app for your organization"}
                    {installState === "complete" && `${selectedApp.name} is now available in Epic`}
                  </p>

                  {/* Progress Steps */}
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {["connecting", "authenticating", "installing", "complete"].map((step, i) => {
                      const steps: InstallState[] = ["connecting", "authenticating", "installing", "complete"];
                      const currentIndex = steps.indexOf(installState);
                      const stepIndex = steps.indexOf(step as InstallState);
                      const isComplete = stepIndex < currentIndex;
                      const isCurrent = step === installState;
                      
                      return (
                        <div 
                          key={step}
                          className={`w-3 h-3 rounded-full transition-all ${
                            isComplete || isCurrent ? 'bg-accent' : 'bg-slate-200'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
