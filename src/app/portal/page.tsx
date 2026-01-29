"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  Activity,
  Clock,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Gauge,
  Boxes,
  Building2,
  Code2,
  FileJson,
  Rocket,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePersona } from "./persona-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data - same underlying numbers, different labels
const mockData = {
  volume: 5247,
  speed: 1.2, // seconds
  speedMs: 142, // milliseconds for technical
  failures: 23,
  failureRate: 0.4, // percentage
  value: 847, // hours saved / dollars
  scrubScore: 82,
};

// Pipeline status
const pipelineStatus = {
  source: { status: "healthy", label: "EHR Systems" },
  processing: { status: "healthy", label: "Scrub AI" },
  destination: { status: "healthy", label: "Applications" },
};

// Mock data for tabs
const myApps = [
  { name: "Sepsis AI Pro", status: "active", calls: "2.1K", revenue: "$4,230" },
  { name: "Cardiac Risk Model", status: "active", calls: "1.4K", revenue: "$2,180" },
  { name: "LOS Predictor", status: "pending", calls: "—", revenue: "—" },
];

const myIntegrations = [
  { name: "Epic - Cardiology Unit", status: "connected", patients: "1,247", lastSync: "2 min ago" },
  { name: "Epic - Emergency Dept", status: "connected", patients: "892", lastSync: "5 min ago" },
  { name: "Cerner - Main Campus", status: "syncing", patients: "3,108", lastSync: "syncing..." },
];

const recentLogs = [
  { timestamp: "2026-01-27T14:32:01Z", level: "info", message: "POST /v1/predict - 200 OK (142ms)", endpoint: "/v1/predict" },
  { timestamp: "2026-01-27T14:31:58Z", level: "info", message: "POST /v1/predict - 200 OK (138ms)", endpoint: "/v1/predict" },
  { timestamp: "2026-01-27T14:31:45Z", level: "warn", message: "POST /v1/predict - 429 Rate Limited", endpoint: "/v1/predict" },
  { timestamp: "2026-01-27T14:31:22Z", level: "info", message: "GET /v1/models - 200 OK (45ms)", endpoint: "/v1/models" },
  { timestamp: "2026-01-27T14:30:59Z", level: "error", message: "POST /v1/predict - 500 Internal Error", endpoint: "/v1/predict" },
];

export default function PortalHomePage() {
  const { persona, labels } = usePersona();
  const [activeTab, setActiveTab] = useState("apps");

  // Format values based on persona
  const getVolumeDisplay = () => {
    return mockData.volume.toLocaleString();
  };

  const getSpeedDisplay = () => {
    if (persona === "clinical") return `${mockData.speed}s`;
    return `${mockData.speedMs}ms`;
  };

  const getFailuresDisplay = () => {
    if (persona === "business") return `${mockData.failureRate}%`;
    return mockData.failures.toString();
  };

  const getValueDisplay = () => {
    if (persona === "clinical") return `${mockData.value}`;
    return `$${mockData.value.toLocaleString()}`;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-1">Scrub Dashboard</h1>
          <p className="text-muted-foreground">
            Unified view of your healthcare AI pipeline
          </p>
        </motion.div>

        {/* Top Row: Pipeline Health - The Heartbeat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Pipeline Health</CardTitle>
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  All Systems Operational
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between py-4">
                {/* Source */}
                <div className="flex-1 text-center">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center ${
                    pipelineStatus.source.status === "healthy" ? "bg-accent/10" : "bg-red-100"
                  }`}>
                    <Building2 className={`w-8 h-8 ${
                      pipelineStatus.source.status === "healthy" ? "text-accent" : "text-red-500"
                    }`} />
                  </div>
                  <p className="font-medium text-sm">Source</p>
                  <p className="text-xs text-muted-foreground">{pipelineStatus.source.label}</p>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-1 flex-1 bg-accent/20 rounded-full relative overflow-hidden max-w-[100px]">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-accent rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      style={{ width: "30%" }}
                    />
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent mx-2" />
                </div>

                {/* Processing */}
                <div className="flex-1 text-center">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center ${
                    pipelineStatus.processing.status === "healthy" ? "bg-accent/10" : "bg-red-100"
                  }`}>
                    <Activity className={`w-8 h-8 ${
                      pipelineStatus.processing.status === "healthy" ? "text-accent" : "text-red-500"
                    }`} />
                  </div>
                  <p className="font-medium text-sm">Processing</p>
                  <p className="text-xs text-muted-foreground">{pipelineStatus.processing.label}</p>
                </div>

                {/* Arrow */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-1 flex-1 bg-accent/20 rounded-full relative overflow-hidden max-w-[100px]">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-accent rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                      style={{ width: "30%" }}
                    />
                  </div>
                  <ArrowRight className="w-5 h-5 text-accent mx-2" />
                </div>

                {/* Destination */}
                <div className="flex-1 text-center">
                  <div className={`w-16 h-16 rounded-2xl mx-auto mb-2 flex items-center justify-center ${
                    pipelineStatus.destination.status === "healthy" ? "bg-accent/10" : "bg-red-100"
                  }`}>
                    <Boxes className={`w-8 h-8 ${
                      pipelineStatus.destination.status === "healthy" ? "text-accent" : "text-red-500"
                    }`} />
                  </div>
                  <p className="font-medium text-sm">Destination</p>
                  <p className="text-xs text-muted-foreground">{pipelineStatus.destination.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Middle Row: Impact Cards - Universal Metrics */}
        <motion.div 
          className="grid grid-cols-5 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Scrub Score - The Credit Score */}
          <Card className="border-0 shadow-sm col-span-1">
            <CardContent className="p-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Scrub Score</span>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-muted/30"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(mockData.scrubScore / 100) * 226} 226`}
                            className="text-accent"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">{mockData.scrubScore}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-2">Data Quality</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs">
                    {persona === "clinical" && "Your data completeness score. Missing patient weights in Cardiology."}
                    {persona === "business" && "Data quality affects model accuracy and revenue. Score > 80 is good."}
                    {persona === "technical" && "FHIR compliance score. Consider normalizing units (lbs→kg)."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Volume / Throughput */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Throughput</span>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-bold">{getVolumeDisplay()}</p>
                    <p className="text-sm text-muted-foreground">{labels.volume}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent">+12% from last week</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs font-medium mb-1">Also known as:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Clinical: Patients Analyzed</li>
                    <li>• Business: Inference Count</li>
                    <li>• Technical: Total Requests</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Speed / Responsiveness */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Speed</span>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-bold">{getSpeedDisplay()}</p>
                    <p className="text-sm text-muted-foreground">{labels.speed}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent">-18ms improvement</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs font-medium mb-1">Also known as:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Clinical: Time to Result</li>
                    <li>• Business: Model Latency</li>
                    <li>• Technical: P99 Latency</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Failures / Friction */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Friction</span>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-bold">{getFailuresDisplay()}</p>
                    <p className="text-sm text-muted-foreground">{labels.failures}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-xs text-amber-500">+3 from yesterday</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs font-medium mb-1">Also known as:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Clinical: Failed Screenings</li>
                    <li>• Business: Error Rate %</li>
                    <li>• Technical: 4xx/5xx Responses</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>

          {/* Value / Impact */}
          <Card className="border-0 shadow-sm">
            <CardContent className="p-5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Impact</span>
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                    <p className="text-3xl font-bold">{getValueDisplay()}</p>
                    <p className="text-sm text-muted-foreground">{labels.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-xs text-accent">+8% this month</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[200px]">
                  <p className="text-xs font-medium mb-1">Also known as:</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    <li>• Clinical: Hours Saved</li>
                    <li>• Business: Revenue Generated</li>
                    <li>• Technical: Compute Cost</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bottom Row: Context Tabs - Role-specific Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <Tabs defaultValue="apps" className="w-full">
                <TabsList className="bg-muted/50 mb-4">
                  <TabsTrigger value="apps" className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    My Apps
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    My Integrations
                  </TabsTrigger>
                  <TabsTrigger value="logs" className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Logs
                  </TabsTrigger>
                </TabsList>

                {/* My Apps Tab (Startup View) */}
                <TabsContent value="apps">
                  <div className="space-y-3">
                    {myApps.map((app, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                            <Boxes className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{app.name}</p>
                            <p className="text-xs text-muted-foreground">{app.calls} calls this week</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium text-accent">{app.revenue}</p>
                            <p className="text-xs text-muted-foreground">revenue</p>
                          </div>
                          <Badge variant={app.status === "active" ? "default" : "secondary"} 
                            className={app.status === "active" ? "bg-accent/10 text-accent border-0" : ""}>
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* My Integrations Tab (Hospital View) */}
                <TabsContent value="integrations">
                  <div className="space-y-3">
                    {myIntegrations.map((integration, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.patients} patients</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{integration.lastSync}</p>
                          </div>
                          <Badge variant={integration.status === "connected" ? "default" : "secondary"}
                            className={integration.status === "connected" ? "bg-accent/10 text-accent border-0" : "bg-blue-100 text-blue-600 border-0"}>
                            {integration.status === "syncing" && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-1.5" />
                            )}
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Logs Tab (Dev View) */}
                <TabsContent value="logs">
                  <div className="bg-foreground text-background rounded-xl overflow-hidden">
                    <div className="p-3 border-b border-white/10 flex items-center justify-between">
                      <span className="text-xs text-background/50 font-mono">Recent API Logs</span>
                      <Badge variant="secondary" className="bg-white/10 text-background/70 border-0 text-xs">
                        Live
                      </Badge>
                    </div>
                    <div className="p-4 font-mono text-xs space-y-2 max-h-[300px] overflow-y-auto">
                      {recentLogs.map((log, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-background/40 w-[180px] flex-shrink-0">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                          <span className={`w-12 flex-shrink-0 ${
                            log.level === "error" ? "text-red-400" :
                            log.level === "warn" ? "text-amber-400" :
                            "text-accent"
                          }`}>
                            [{log.level.toUpperCase()}]
                          </span>
                          <span className="text-background/80">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TooltipProvider>
  );
}
