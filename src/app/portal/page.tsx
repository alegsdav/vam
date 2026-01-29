"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Info,
  CreditCard,
  Boxes,
  Building2,
  Zap,
  Store,
  Plus,
  Wrench,
  CircleDot
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

// Type for modules from Supabase
type Module = {
  id: string;
  name: string;
  status: "pending" | "approved" | "rejected";
};

// Mock notifications (would come from a real notifications table)
type Notification = {
  id: string;
  type: "critical" | "success" | "info" | "billing";
  role: "it" | "startup" | "system" | "billing";
  title: string;
  description: string;
  timestamp: string;
  actionLabel?: string;
  actionHref?: string;
};

// Platform status
const platformStatus = [
  { name: "Scrub Core Systems", status: "operational" as const },
  { name: "Redox/Metriport Gateway", status: "operational" as const },
  { name: "Epic API Status", status: "degraded" as const },
];

export default function PortalHomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Get user profile
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (profileData) {
          setProfile(profileData as Profile);
        }

        // Fetch user's modules
        const { data: modulesData } = await supabase
          .from("modules")
          .select("id, name, status")
          .eq("user_id", user.id);
        
        if (modulesData) {
          setModules(modulesData);
        }
      }

      // Mock notifications (in production, fetch from notifications table)
      setNotifications([
        {
          id: "1",
          type: "critical",
          role: "it",
          title: "Mercy Hospital VPN connection lost",
          description: "Heartbeat lost 5 minutes ago. Integration may be affected.",
          timestamp: "5 min ago",
          actionLabel: "Fix Connection",
          actionHref: "/portal/it"
        },
        {
          id: "2",
          type: "success",
          role: "startup",
          title: "Module installed at Cleveland Clinic",
          description: "Your 'Sepsis-Pro' module was just installed by Cleveland Clinic.",
          timestamp: "2 hours ago"
        },
        {
          id: "3",
          type: "info",
          role: "system",
          title: "Scrub Platform Update v2.1",
          description: "Maintenance scheduled for Saturday 2am-4am EST.",
          timestamp: "1 day ago"
        },
        {
          id: "4",
          type: "billing",
          role: "billing",
          title: "API credits running low",
          description: "Your API usage credits are at 80%. Consider upgrading.",
          timestamp: "2 days ago",
          actionLabel: "View Usage",
          actionHref: "/portal/billing"
        },
      ]);
      
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get notification icon and color
  const getNotificationStyle = (type: Notification["type"]) => {
    switch (type) {
      case "critical":
        return { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50", border: "border-red-100" };
      case "success":
        return { icon: CheckCircle2, color: "text-accent", bg: "bg-accent/5", border: "border-accent/10" };
      case "info":
        return { icon: Info, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" };
      case "billing":
        return { icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100" };
    }
  };

  // Calculate stats
  const activeModules = modules.filter(m => m.status === "approved").length;
  const criticalAlerts = notifications.filter(n => n.type === "critical").length;
  const totalUpdates = notifications.length;

  // Determine dynamic action button
  const getDynamicAction = () => {
    const critical = notifications.find(n => n.type === "critical");
    if (critical && critical.actionHref) {
      return { label: critical.actionLabel || "Fix Issue", href: critical.actionHref, icon: Wrench };
    }
    if (modules.length === 0) {
      return { label: "Create New Project", href: "/portal/startup", icon: Plus };
    }
    return { label: "Browse Marketplace", href: "/portal/marketplace", icon: Store };
  };

  const dynamicAction = getDynamicAction();

  // Platform status indicator
  const getStatusIndicator = (status: "operational" | "degraded" | "down") => {
    switch (status) {
      case "operational":
        return { color: "bg-accent", label: "Operational" };
      case "degraded":
        return { color: "bg-amber-500", label: "Degraded" };
      case "down":
        return { color: "bg-red-500", label: "Down" };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Section A: Concierge Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {getGreeting()}, {profile?.name || profile?.username || "there"}.
          </h1>
          <p className="text-muted-foreground">
            You have{" "}
            {criticalAlerts > 0 ? (
              <span className="text-red-500 font-medium">{criticalAlerts} critical alert{criticalAlerts !== 1 ? "s" : ""}</span>
            ) : (
              <span className="text-accent font-medium">no critical alerts</span>
            )}
            {" "}and{" "}
            <span className="font-medium">{totalUpdates} update{totalUpdates !== 1 ? "s" : ""}</span> today.
          </p>
        </div>
        
        {/* Dynamic Action Button */}
        <Link href={dynamicAction.href}>
          <Button className="bg-foreground hover:bg-foreground/90 text-background">
            <dynamicAction.icon className="w-4 h-4 mr-2" />
            {dynamicAction.label}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </motion.div>

      {/* Section C: Ecosystem Snapshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {/* My AI Modules */}
        <Link href="/portal/startup">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Boxes className="w-5 h-5 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">My AI Modules</p>
              <p className="text-2xl font-bold">
                {activeModules} <span className="text-base font-normal text-muted-foreground">Active</span>
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Active Integrations */}
        <Link href="/portal/it">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Active Integrations</p>
              <p className="text-2xl font-bold">
                12 <span className="text-base font-normal text-muted-foreground">Hospitals</span>
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Monthly Usage */}
        <Link href="/portal/billing">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                  <Zap className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Monthly Scrubs</p>
              <p className="text-2xl font-bold">
                14.2k <span className="text-base font-normal text-muted-foreground">/ 20k</span>
              </p>
              {/* Usage bar */}
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "71%" }} />
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Section B: Unified Notification Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Recent Activity</h2>
          <Link href="/portal/inbox" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all
          </Link>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification, i) => {
            const style = getNotificationStyle(notification.type);
            return (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Card className={`border ${style.border} ${style.bg} shadow-none`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center flex-shrink-0`}>
                        <style.icon className={`w-4 h-4 ${style.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-background/50">
                            {notification.role === "it" && "IT"}
                            {notification.role === "startup" && "Startup"}
                            {notification.role === "system" && "System"}
                            {notification.role === "billing" && "Billing"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                          {notification.actionHref && (
                            <Link href={notification.actionHref}>
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                {notification.actionLabel}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Section D: Platform Health Pulse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-sm bg-muted/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Platform Status</span>
              <div className="flex items-center gap-6">
                {platformStatus.map((system) => {
                  const indicator = getStatusIndicator(system.status);
                  return (
                    <div key={system.name} className="flex items-center gap-2">
                      <CircleDot className={`w-3 h-3 ${
                        system.status === "operational" ? "text-accent" :
                        system.status === "degraded" ? "text-amber-500" :
                        "text-red-500"
                      }`} />
                      <span className="text-sm">{system.name}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-[10px] px-1.5 py-0 ${
                          system.status === "operational" ? "bg-accent/10 text-accent" :
                          system.status === "degraded" ? "bg-amber-100 text-amber-600" :
                          "bg-red-100 text-red-600"
                        }`}
                      >
                        {indicator.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
