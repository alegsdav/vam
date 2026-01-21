"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Cpu, TrendingUp, Activity, Boxes, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AI_MODULES } from "@/lib/modules";

const stats = [
  { label: "Active Modules", value: "8", change: "+2 this month", icon: Boxes },
  { label: "API Calls (30d)", value: "124.5K", change: "+18%", icon: Activity },
  { label: "Avg. Latency", value: "1.2s", change: "-0.3s", icon: Clock },
  { label: "Success Rate", value: "99.7%", change: "Stable", icon: CheckCircle2 }
];

const recentActivity = [
  { action: "Module activated", module: "Patient Risk Scoring", time: "2 hours ago" },
  { action: "API integration", module: "Clinical Note Summarization", time: "Yesterday" },
  { action: "Module updated", module: "Visit Transcription", time: "3 days ago" },
  { action: "New module available", module: "Care Plan Suggestions", time: "1 week ago" }
];

const enabledModules = AI_MODULES.slice(0, 8);

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-normal tracking-tight mb-2" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
          Welcome back
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your AI capabilities today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
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
                  <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                </div>
                <p className="text-3xl font-semibold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Two Paths */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full border-2 hover:border-accent/50 transition-colors">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build with VSee</h3>
              <p className="text-muted-foreground mb-6">
                Toggle AI modules and preview your hosted VSee environment. No integration work required.
              </p>
              <Button asChild>
                <Link href="/portal/build">
                  Open Builder
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full border-2 hover:border-foreground/30 transition-colors">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-foreground/5 flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrate into Existing</h3>
              <p className="text-muted-foreground mb-6">
                Access REST APIs, SDKs, and integration guides. Embed AI into your existing systems.
              </p>
              <Button variant="outline" asChild>
                <Link href="/portal/integrate">
                  View Integration
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Enabled Modules & Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enabled Modules */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Enabled Modules</CardTitle>
                <CardDescription>AI capabilities active in your environment</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/portal/modules">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {enabledModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{module.name}</p>
                      <p className="text-xs text-muted-foreground">{module.categoryLabel}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">{module.latency}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                    <div>
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.module}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Stats Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-foreground text-background">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to expand?</h3>
                <p className="text-background/70">
                  {AI_MODULES.length - enabledModules.length} more AI modules available for activation.
                </p>
              </div>
              <Button variant="outline" className="text-foreground border-background/20 hover:bg-background/10" asChild>
                <Link href="/portal/modules">
                  Browse Modules
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
