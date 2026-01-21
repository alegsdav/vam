"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Building2, 
  Boxes, 
  Users, 
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Eye,
  ToggleLeft,
  ToggleRight,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AI_MODULES, MODULE_CATEGORIES } from "@/lib/modules";

// Mock organizations
const mockOrganizations = [
  { id: "org-1", name: "Memorial Health System", type: "Hospital Network", modules: 12, status: "active" },
  { id: "org-2", name: "Pacific Medical Group", type: "Physician Group", modules: 8, status: "active" },
  { id: "org-3", name: "Sunrise Health Partners", type: "ACO", modules: 15, status: "active" },
  { id: "org-4", name: "Valley Community Hospital", type: "Hospital", modules: 6, status: "pending" },
  { id: "org-5", name: "Northwest Telehealth", type: "Telehealth Provider", modules: 4, status: "active" }
];

// Mock usage data
const mockUsageStats = {
  totalApiCalls: 1847293,
  activeOrganizations: 42,
  enabledModules: 15,
  avgLatency: "1.2s",
  successRate: 99.7,
  topModules: [
    { name: "Clinical Note Summarization", calls: 423847, growth: 18 },
    { name: "Patient Risk Scoring", calls: 312456, growth: 24 },
    { name: "Visit Transcription", calls: 289123, growth: 12 },
    { name: "Coding & Billing Assist", calls: 198234, growth: 8 },
    { name: "Medication Reconciliation", calls: 156789, growth: 15 }
  ]
};

export default function AdminPage() {
  const [globalModules, setGlobalModules] = useState<Record<string, boolean>>(
    Object.fromEntries(AI_MODULES.map(m => [m.id, true]))
  );

  const toggleGlobalModule = (id: string) => {
    setGlobalModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const enabledCount = Object.values(globalModules).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-accent" />
          <h2 className="text-3xl font-normal tracking-tight" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            Admin Console
          </h2>
        </div>
        <p className="text-muted-foreground">
          Ecosystem-level control, governance, and usage insights.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total API Calls (30d)", value: (mockUsageStats.totalApiCalls / 1000000).toFixed(2) + "M", icon: Activity, change: "+18%" },
          { label: "Active Organizations", value: mockUsageStats.activeOrganizations, icon: Building2, change: "+5" },
          { label: "Modules Enabled", value: `${enabledCount}/${AI_MODULES.length}`, icon: Boxes, change: "" },
          { label: "Success Rate", value: mockUsageStats.successRate + "%", icon: CheckCircle2, change: "Stable" }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-5 h-5 text-muted-foreground" />
                  {stat.change && (
                    <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                  )}
                </div>
                <p className="text-3xl font-semibold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="modules" className="space-y-6">
        <TabsList>
          <TabsTrigger value="modules">
            <Boxes className="w-4 h-4 mr-2" />
            Global Modules
          </TabsTrigger>
          <TabsTrigger value="organizations">
            <Building2 className="w-4 h-4 mr-2" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="usage">
            <TrendingUp className="w-4 h-4 mr-2" />
            Usage Analytics
          </TabsTrigger>
        </TabsList>

        {/* Global Modules Tab */}
        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Global Module Control</CardTitle>
                  <CardDescription>
                    Enable or disable modules across the entire ecosystem
                  </CardDescription>
                </div>
                <Badge variant="accent">
                  {enabledCount} enabled
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {MODULE_CATEGORIES.map(category => (
                  <div key={category.id} className="mb-6">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">{category.label}</h4>
                    <div className="space-y-2">
                      {AI_MODULES.filter(m => m.category === category.id).map(module => (
                        <div
                          key={module.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-2 rounded-full ${globalModules[module.id] ? 'bg-accent' : 'bg-muted-foreground/30'}`} />
                            <div>
                              <p className="font-medium text-sm">{module.name}</p>
                              <p className="text-xs text-muted-foreground">{module.shortDescription}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="text-xs">{module.latency}</Badge>
                            <Switch
                              checked={globalModules[module.id]}
                              onCheckedChange={() => toggleGlobalModule(module.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organizations Tab */}
        <TabsContent value="organizations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Client Organizations</CardTitle>
                  <CardDescription>
                    Manage organization access and module assignments
                  </CardDescription>
                </div>
                <Button size="sm">
                  Add Organization
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockOrganizations.map(org => (
                  <div
                    key={org.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-sm text-muted-foreground">{org.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium">{org.modules} modules</p>
                        <p className="text-xs text-muted-foreground">enabled</p>
                      </div>
                      <Badge 
                        variant={org.status === 'active' ? 'success' : 'warning'}
                        className="capitalize"
                      >
                        {org.status}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usage Analytics Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Modules by Usage</CardTitle>
                <CardDescription>API calls in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsageStats.topModules.map((module, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{module.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">
                            {(module.calls / 1000).toFixed(0)}K calls
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            +{module.growth}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(module.calls / mockUsageStats.topModules[0].calls) * 100}%` }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="h-full bg-accent rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Real-time performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <div>
                        <p className="font-medium">All Systems Operational</p>
                        <p className="text-sm text-muted-foreground">99.7% success rate</p>
                      </div>
                    </div>
                    <Badge variant="success">Healthy</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Avg Latency</p>
                      <p className="text-2xl font-semibold">{mockUsageStats.avgLatency}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Uptime (30d)</p>
                      <p className="text-2xl font-semibold">99.99%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Recent Alerts</p>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <div className="flex-1">
                        <p className="text-sm">Elevated latency on Visit Transcription</p>
                        <p className="text-xs text-muted-foreground">2 hours ago • Resolved</p>
                      </div>
                      <Badge variant="secondary">Resolved</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Governance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Governance & Compliance</CardTitle>
                  <CardDescription>Audit trails and compliance status</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Audit Log
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-medium">HIPAA Compliant</span>
                  </div>
                  <p className="text-sm text-muted-foreground">All modules certified</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-medium">SOC 2 Type II</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Audit passed Dec 2025</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="font-medium">BAA Coverage</span>
                  </div>
                  <p className="text-sm text-muted-foreground">All clients covered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
