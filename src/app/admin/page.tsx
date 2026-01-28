"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Shield,
  Package,
  Check,
  X,
  Clock,
  ExternalLink,
  Users,
  TrendingUp,
  Loader2,
  RefreshCw,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { Module } from "@/lib/supabase/types";

type ModuleWithProfile = Module & {
  profiles?: {
    name: string | null;
    username: string | null;
    email: string;
  };
};

export default function StraitsAdminDashboard() {
  const [modules, setModules] = useState<ModuleWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const supabase = createClient();

  const fetchModules = async () => {
    setLoading(true);
    
    let query = supabase
      .from("modules")
      .select(`
        *,
        profiles:user_id (
          name,
          username,
          email
        )
      `)
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching modules:", error);
    } else {
      setModules(data as ModuleWithProfile[]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchModules();
  }, [filter]);

  const handleStatusChange = async (moduleId: string, newStatus: "approved" | "rejected") => {
    setActionLoading(moduleId);

    const { error } = await supabase
      .from("modules")
      .update({ status: newStatus })
      .eq("id", moduleId);

    if (error) {
      console.error("Error updating module:", error);
    } else {
      await fetchModules();
    }

    setActionLoading(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-400 border-0"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "approved":
        return <Badge className="bg-accent/20 text-accent border-0"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400 border-0"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pendingCount = modules.filter(m => m.status === "pending").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Header */}
      <header className="relative z-10 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/portal" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Portal</span>
              </Link>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
                  <Shield className="w-5 h-5 text-background" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Straits Admin</h1>
                  <p className="text-xs text-muted-foreground">Module Approval Dashboard</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
              Internal Use Only
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Pending Review", value: pendingCount, icon: Clock, color: "text-amber-500" },
            { label: "Total Approved", value: modules.filter(m => m.status === "approved").length, icon: CheckCircle2, color: "text-accent" },
            { label: "Total Rejected", value: modules.filter(m => m.status === "rejected").length, icon: XCircle, color: "text-red-500" },
            { label: "Total Submissions", value: modules.length, icon: Package, color: "text-foreground" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {[
              { id: "pending", label: "Pending" },
              { id: "approved", label: "Approved" },
              { id: "rejected", label: "Rejected" },
              { id: "all", label: "All" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={filter === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tab.id as typeof filter)}
                className={filter === tab.id ? "bg-foreground text-background" : ""}
              >
                {tab.label}
                {tab.id === "pending" && pendingCount > 0 && (
                  <Badge className="ml-2 bg-amber-500 text-white border-0 text-xs">
                    {pendingCount}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={fetchModules} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Modules List */}
        <Card>
          <CardHeader>
            <CardTitle>Module Submissions</CardTitle>
            <CardDescription>Review and approve AI modules for the marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : modules.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No modules found</p>
                <p className="text-sm mt-1">
                  {filter === "pending" ? "No pending submissions to review" : "No modules in this category"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {modules.map((module, i) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border rounded-xl p-5 hover:border-foreground/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{module.name}</h3>
                          {getStatusBadge(module.status)}
                        </div>
                        <p className="text-muted-foreground mb-4 max-w-2xl">{module.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span>{module.profiles?.name || module.profiles?.username || "Unknown"}</span>
                            <span className="text-muted-foreground">({module.profiles?.email})</span>
                          </div>
                          <div className="text-muted-foreground">•</div>
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-muted-foreground" />
                            <span>{formatCurrency(module.estimated_cost_year)}/year</span>
                          </div>
                          <div className="text-muted-foreground">•</div>
                          <a 
                            href={module.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-accent hover:underline"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Documentation
                          </a>
                          <div className="text-muted-foreground">•</div>
                          <span className="text-muted-foreground text-xs">
                            {formatDate(module.created_at)}
                          </span>
                        </div>
                      </div>

                      {module.status === "pending" && (
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleStatusChange(module.id, "rejected")}
                            disabled={actionLoading === module.id}
                          >
                            {actionLoading === module.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-accent hover:bg-accent/90 text-white"
                            onClick={() => handleStatusChange(module.id, "approved")}
                            disabled={actionLoading === module.id}
                          >
                            {actionLoading === module.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
