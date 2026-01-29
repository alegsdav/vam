"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard,
  Store,
  Settings,
  Activity,
  Clock,
  DollarSign,
  Boxes,
  Search,
  Star,
  Download,
  CheckCircle2,
  Shield,
  Loader2,
  Check,
  X,
  Zap,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Mock metrics
const metrics = {
  totalApiCalls: "1.24M",
  apiCallsChange: "+18%",
  activeModules: 6,
  avgLatency: "142ms",
  latencyChange: "-12ms",
  monthlySpend: "$2,847",
  spendChange: "+$340"
};

// Installed modules
const installedModules = [
  { id: "sepsis-ai", name: "Sepsis AI Pro", vendor: "CriticalCare AI", calls: "423K", latency: "89ms", status: "active" },
  { id: "note-genius", name: "NoteGenius", vendor: "DocAI Labs", calls: "312K", latency: "156ms", status: "active" },
  { id: "readmit-risk", name: "ReadmitRisk", vendor: "Predictive Health", calls: "198K", latency: "124ms", status: "active" },
  { id: "billing", name: "Billing Optimizer", vendor: "RevCycle AI", calls: "156K", latency: "201ms", status: "active" },
  { id: "auth-flow", name: "AuthFlow", vendor: "ClearPath Health", calls: "89K", latency: "178ms", status: "active" },
  { id: "rad-insight", name: "RadInsight", vendor: "Imaging Intelligence", calls: "67K", latency: "312ms", status: "active" },
];

// AI Apps for marketplace
const marketplaceApps = [
  {
    id: "sepsis-ai",
    name: "Sepsis AI Pro",
    vendor: "CriticalCare AI",
    category: "Clinical Decision Support",
    description: "Real-time sepsis prediction using vital signs, labs, and clinical notes.",
    rating: 4.8,
    reviews: 127,
    installs: "2,400+",
    price: "$0.02/prediction",
    certified: true,
    installed: true
  },
  {
    id: "los-predictor",
    name: "LOS Predictor",
    vendor: "StayWise Health",
    category: "Operations",
    description: "Accurate length of stay predictions to optimize bed management.",
    rating: 4.6,
    reviews: 89,
    installs: "1,200+",
    price: "$0.01/prediction",
    certified: true,
    installed: false
  },
  {
    id: "fall-risk",
    name: "FallGuard AI",
    vendor: "SafetyFirst Med",
    category: "Patient Safety",
    description: "Continuous fall risk assessment using mobility and cognitive data.",
    rating: 4.7,
    reviews: 156,
    installs: "1,800+",
    price: "$0.015/patient/day",
    certified: true,
    installed: false
  },
  {
    id: "med-reconcile",
    name: "MedReconcile",
    vendor: "PharmaSafe AI",
    category: "Medication Safety",
    description: "Automated medication reconciliation with interaction checking.",
    rating: 4.9,
    reviews: 234,
    installs: "3,100+",
    price: "$0.03/reconciliation",
    certified: true,
    installed: false
  },
  {
    id: "discharge-planner",
    name: "DischargePro",
    vendor: "TransitionCare AI",
    category: "Care Coordination",
    description: "AI-powered discharge planning with resource matching.",
    rating: 4.5,
    reviews: 67,
    installs: "890+",
    price: "$0.05/discharge",
    certified: true,
    installed: false
  },
  {
    id: "triage-assist",
    name: "TriageAssist",
    vendor: "EmergencyAI",
    category: "Emergency",
    description: "ED triage prioritization using presenting symptoms and vitals.",
    rating: 4.8,
    reviews: 198,
    installs: "2,100+",
    price: "$0.02/triage",
    certified: true,
    installed: false
  }
];

type Section = "dashboard" | "marketplace" | "settings";
type InstallState = "idle" | "connecting" | "authenticating" | "installing" | "complete";

export default function ITAdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof marketplaceApps[0] | null>(null);
  const [installState, setInstallState] = useState<InstallState>("idle");
  const [installedAppIds, setInstalledAppIds] = useState<string[]>(["sepsis-ai"]);

  const filteredApps = marketplaceApps.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.vendor.toLowerCase().includes(search.toLowerCase()) ||
    app.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleInstall = async () => {
    if (!selectedApp) return;
    
    setInstallState("connecting");
    await new Promise(r => setTimeout(r, 1200));
    
    setInstallState("authenticating");
    await new Promise(r => setTimeout(r, 1500));
    
    setInstallState("installing");
    await new Promise(r => setTimeout(r, 1500));
    
    setInstallState("complete");
    setInstalledAppIds(prev => [...prev, selectedApp.id]);
    
    await new Promise(r => setTimeout(r, 1200));
    setSelectedApp(null);
    setInstallState("idle");
  };

  return (
    <div>
      {/* Page Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-1">IT Admin</h1>
        <p className="text-muted-foreground">Manage AI modules and monitor usage for your organization</p>
      </motion.div>

      {/* Sub-navigation tabs */}
      <motion.div 
        className="flex gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {[
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "marketplace", label: "Marketplace", icon: Store },
          { id: "settings", label: "Settings", icon: Settings },
        ].map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSection(item.id as Section)}
            className={activeSection === item.id ? "bg-foreground text-background" : ""}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.label}
            {item.id === "marketplace" && (
              <Badge className="ml-2 bg-accent/20 text-accent border-0 text-xs">
                {marketplaceApps.filter(a => !installedAppIds.includes(a.id)).length}
              </Badge>
            )}
          </Button>
        ))}
      </motion.div>

      {/* Dashboard View */}
      {activeSection === "dashboard" && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "API Calls (30d)", value: metrics.totalApiCalls, change: metrics.apiCallsChange, icon: Activity, positive: true },
              { label: "Active Modules", value: metrics.activeModules, change: null, icon: Boxes },
              { label: "Avg Latency", value: metrics.avgLatency, change: metrics.latencyChange, icon: Clock, positive: true },
              { label: "Monthly Spend", value: metrics.monthlySpend, change: metrics.spendChange, icon: DollarSign, positive: false },
            ].map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <metric.icon className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">{metric.value}</span>
                          {metric.change && (
                            <span className={`text-xs font-medium flex items-center gap-0.5 ${metric.positive ? 'text-accent' : 'text-red-500'}`}>
                              {metric.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {metric.change}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Installed Modules Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Installed Modules</CardTitle>
                  <CardDescription>AI modules active in your environment</CardDescription>
                </div>
                <Button onClick={() => setActiveSection("marketplace")} size="sm">
                  <Store className="w-4 h-4 mr-2" />
                  Browse Marketplace
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="px-4 py-3 font-medium">Module</th>
                      <th className="px-4 py-3 font-medium">Vendor</th>
                      <th className="px-4 py-3 font-medium text-right">API Calls (30d)</th>
                      <th className="px-4 py-3 font-medium text-right">Avg Latency</th>
                      <th className="px-4 py-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {installedModules.map((module) => (
                      <tr key={module.id} className="border-t">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                              <Boxes className="w-4 h-4 text-foreground" />
                            </div>
                            <span className="font-medium">{module.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{module.vendor}</td>
                        <td className="px-4 py-3 text-right font-mono text-sm">{module.calls}</td>
                        <td className="px-4 py-3 text-right font-mono text-sm">{module.latency}</td>
                        <td className="px-4 py-3 text-right">
                          <Badge variant="secondary" className="bg-accent/10 text-accent border-0">
                            Active
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Usage Trend</h3>
                  <Badge variant="secondary" className="text-xs">Last 7 days</Badge>
                </div>
                <div className="flex items-end gap-1 h-32">
                  {[40, 55, 45, 60, 75, 65, 80].map((height, i) => (
                    <div key={i} className="flex-1 bg-accent/20 rounded-t relative" style={{ height: `${height}%` }}>
                      <div className="absolute bottom-0 left-0 right-0 bg-accent rounded-t" style={{ height: `${height * 0.7}%` }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Top Performing</h3>
                  <Badge variant="secondary" className="text-xs">By accuracy</Badge>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Sepsis AI Pro", accuracy: "94.2%" },
                    { name: "ReadmitRisk", accuracy: "91.8%" },
                    { name: "NoteGenius", accuracy: "89.5%" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="font-mono text-sm text-accent">{item.accuracy}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Marketplace View */}
      {activeSection === "marketplace" && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search modules..."
              className="pl-10 max-w-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* App Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApps.map((app, i) => {
              const isInstalled = installedAppIds.includes(app.id);
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md border-0 shadow-sm ${
                      isInstalled ? 'ring-2 ring-accent/50 bg-accent/5' : 'hover:ring-1 hover:ring-foreground/10'
                    }`}
                    onClick={() => !isInstalled && setSelectedApp(app)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                          <Boxes className="w-5 h-5 text-foreground" />
                        </div>
                        {isInstalled ? (
                          <Badge className="bg-accent text-white border-0">
                            <Check className="w-3 h-3 mr-1" />
                            Installed
                          </Badge>
                        ) : (
                          <Badge variant="secondary">{app.price}</Badge>
                        )}
                      </div>
                      
                      <h3 className="font-semibold mb-1">{app.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{app.vendor}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{app.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{app.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{app.installs}</span>
                        </div>
                        {app.certified && (
                          <div className="flex items-center gap-1 ml-auto">
                            <Shield className="w-4 h-4 text-accent" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Settings View */}
      {activeSection === "settings" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </CardContent>
        </Card>
      )}

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
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background rounded-2xl shadow-2xl z-50 overflow-hidden border"
            >
              {installState === "idle" ? (
                <>
                  <div className="p-6 border-b">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Boxes className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold">{selectedApp.name}</h2>
                        <p className="text-muted-foreground">{selectedApp.vendor}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span>{selectedApp.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{selectedApp.installs} installs</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedApp(null)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-muted-foreground mb-6">{selectedApp.description}</p>
                    
                    <div className="bg-muted/50 rounded-xl p-4 mb-6">
                      <h4 className="font-medium text-sm mb-3">This module will access:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
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

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl mb-6">
                      <span className="text-sm">Estimated cost</span>
                      <span className="font-semibold">{selectedApp.price}</span>
                    </div>

                    <Button 
                      className="w-full h-12 bg-foreground hover:bg-foreground/90"
                      onClick={handleInstall}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Install to Epic
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    {installState !== "complete" ? (
                      <Loader2 className="w-20 h-20 text-foreground animate-spin" />
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
                    {installState === "authenticating" && "Authenticating via Scrub..."}
                    {installState === "installing" && "Installing module..."}
                    {installState === "complete" && "Installation Complete!"}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {installState === "connecting" && "Establishing secure connection"}
                    {installState === "authenticating" && "Verifying permissions"}
                    {installState === "installing" && "Configuring for your organization"}
                    {installState === "complete" && `${selectedApp.name} is now active`}
                  </p>

                  <div className="flex items-center justify-center gap-2 mt-8">
                    {["connecting", "authenticating", "installing", "complete"].map((step, i) => {
                      const steps: InstallState[] = ["connecting", "authenticating", "installing", "complete"];
                      const currentIndex = steps.indexOf(installState);
                      const isDone = i <= currentIndex;
                      
                      return (
                        <div 
                          key={step}
                          className={`w-2 h-2 rounded-full transition-all ${
                            isDone ? 'bg-accent' : 'bg-muted'
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
