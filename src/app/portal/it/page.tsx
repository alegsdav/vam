"use client";

import { useState, useEffect } from "react";
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
  TrendingDown,
  ExternalLink,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";

// Type for modules from Supabase
type Module = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  estimated_cost_year: number;
  link: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string | null;
    username: string | null;
  };
};

// Mock metrics (these would also come from analytics in production)
const metrics = {
  totalApiCalls: "1.24M",
  apiCallsChange: "+18%",
  activeModules: 0, // Will be updated from real data
  avgLatency: "142ms",
  latencyChange: "-12ms",
  monthlySpend: "$0",
  spendChange: "$0"
};

type Section = "dashboard" | "marketplace" | "settings";
type InstallState = "idle" | "connecting" | "authenticating" | "installing" | "complete";

export default function ITAdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<Module | null>(null);
  const [installState, setInstallState] = useState<InstallState>("idle");
  const [installedAppIds, setInstalledAppIds] = useState<string[]>([]);
  const [marketplaceApps, setMarketplaceApps] = useState<Module[]>([]);
  const [installedModules, setInstalledModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  // Fetch approved modules from Supabase
  useEffect(() => {
    const fetchModules = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("modules")
        .select(`
          *,
          profiles:user_id (
            name,
            username
          )
        `)
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching modules:", error);
      } else {
        setMarketplaceApps(data || []);
      }
      
      setLoading(false);
    };

    fetchModules();
  }, [supabase]);

  const filteredApps = marketplaceApps.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.description.toLowerCase().includes(search.toLowerCase())
  );

  // Get vendor name from profile
  const getVendorName = (app: Module) => {
    if (app.profiles?.name) return app.profiles.name;
    if (app.profiles?.username) return `@${app.profiles.username}`;
    return "Unknown Vendor";
  };

  // Format price display
  const formatPrice = (costPerYear: number) => {
    if (costPerYear === 0) return "Free";
    if (costPerYear < 1000) return `$${costPerYear}/year`;
    return `$${(costPerYear / 1000).toFixed(1)}K/year`;
  };

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
    setInstalledModules(prev => [...prev, selectedApp]);
    
    await new Promise(r => setTimeout(r, 1200));
    setSelectedApp(null);
    setInstallState("idle");
  };

  // Calculate real metrics
  const activeModuleCount = installedModules.length;
  const totalMonthlySpend = installedModules.reduce((sum, m) => sum + (m.estimated_cost_year / 12), 0);

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
            {item.id === "marketplace" && marketplaceApps.length > 0 && (
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
              { label: "Active Modules", value: activeModuleCount, change: null, icon: Boxes },
              { label: "Avg Latency", value: metrics.avgLatency, change: metrics.latencyChange, icon: Clock, positive: true },
              { label: "Monthly Spend", value: `$${totalMonthlySpend.toFixed(0)}`, change: null, icon: DollarSign, positive: false },
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
              {installedModules.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="font-medium mb-1">No modules installed</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Browse the marketplace to install AI modules for your organization.
                  </p>
                  <Button onClick={() => setActiveSection("marketplace")} size="sm">
                    <Store className="w-4 h-4 mr-2" />
                    Browse Marketplace
                  </Button>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left text-sm text-muted-foreground">
                        <th className="px-4 py-3 font-medium">Module</th>
                        <th className="px-4 py-3 font-medium">Vendor</th>
                        <th className="px-4 py-3 font-medium text-right">Est. Cost/Year</th>
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
                          <td className="px-4 py-3 text-muted-foreground">{getVendorName(module)}</td>
                          <td className="px-4 py-3 text-right font-mono text-sm">
                            {formatPrice(module.estimated_cost_year)}
                          </td>
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
              )}
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
                  <h3 className="font-semibold">Available in Marketplace</h3>
                  <Badge variant="secondary" className="text-xs">{marketplaceApps.length} modules</Badge>
                </div>
                <div className="space-y-3">
                  {marketplaceApps.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium truncate flex-1">{app.name}</span>
                      <span className="font-mono text-sm text-accent ml-2">{formatPrice(app.estimated_cost_year)}</span>
                    </div>
                  ))}
                  {marketplaceApps.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">No approved modules yet</p>
                  )}
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

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredApps.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-medium mb-1">No modules available</h3>
              <p className="text-sm text-muted-foreground">
                {search ? "No modules match your search." : "Check back later for approved AI modules."}
              </p>
            </div>
          )}

          {/* App Grid */}
          {!loading && filteredApps.length > 0 && (
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
                            <Badge variant="secondary">{formatPrice(app.estimated_cost_year)}</Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold mb-1">{app.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{getVendorName(app)}</p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{app.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                            <span>Approved</span>
                          </div>
                          {app.link && (
                            <a 
                              href={app.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-foreground ml-auto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
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
                        <p className="text-muted-foreground">{getVendorName(selectedApp)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                            <span>Approved</span>
                          </div>
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
                      <span className="font-semibold">{formatPrice(selectedApp.estimated_cost_year)}</span>
                    </div>

                    {selectedApp.link && (
                      <a 
                        href={selectedApp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View documentation
                      </a>
                    )}

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
