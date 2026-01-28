"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Building2, 
  Rocket, 
  Code2, 
  Home,
  LogOut, 
  Settings,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  Zap,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Crown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

const navigation = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    href: "/portal",
    active: true
  },
  {
    id: "it",
    title: "IT Admin",
    subtitle: "Manage AI Modules",
    icon: Building2,
    href: "/portal/it",
    roleKey: "is_it",
  },
  {
    id: "startup",
    title: "AI Startup",
    subtitle: "Submit Modules",
    icon: Rocket,
    href: "/portal/startup",
    roleKey: "is_startup",
  },
  {
    id: "developer",
    title: "Developer",
    subtitle: "SDK & Docs",
    icon: Code2,
    href: "/portal/developer",
    roleKey: "is_developer",
  }
];

// Mock data for dashboard
const stats = [
  { label: "API Calls", value: "2,847", change: "+12%", positive: true, icon: Zap },
  { label: "Active Modules", value: "6", change: "+2", positive: true, icon: CheckCircle2 },
  { label: "Avg Response", value: "142ms", change: "-18ms", positive: true, icon: Clock },
];

const recentActivity = [
  { 
    user: "System", 
    action: "New module available", 
    target: "Sepsis AI Pro v2.1", 
    time: "2 hours ago",
    type: "update"
  },
  { 
    user: "Dr. Chen", 
    action: "Installed module", 
    target: "ReadmitRisk", 
    time: "5 hours ago",
    type: "install"
  },
  { 
    user: "IT Admin", 
    action: "Updated settings", 
    target: "API Configuration", 
    time: "1 day ago",
    type: "settings"
  },
  { 
    user: "System", 
    action: "Monthly report ready", 
    target: "January 2026", 
    time: "2 days ago",
    type: "report"
  },
];

const quickActions = [
  { title: "Browse Marketplace", description: "Find new AI modules", href: "/portal/it", icon: Building2 },
  { title: "Submit Module", description: "List your AI on Scrub", href: "/portal/startup", icon: Rocket },
  { title: "View Documentation", description: "SDK & API guides", href: "/portal/developer", icon: Code2 },
];

export default function PortalPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/portal/auth");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data as Profile);
      }
      setLoading(false);
    };

    getProfile();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col min-h-screen sticky top-0">
        {/* Logo */}
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">Scrub</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = item.href === pathname;
              const hasAccess = !item.roleKey || (profile && profile[item.roleKey as keyof Profile]);
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group ${
                    isActive 
                      ? "bg-foreground text-background" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:text-foreground'}`} />
                  <div className="flex-1">
                    <span className="font-medium">{item.title}</span>
                    {item.subtitle && (
                      <p className={`text-xs ${isActive ? 'text-background/70' : 'text-muted-foreground'}`}>
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  {!hasAccess && item.roleKey && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      Pro
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Settings link */}
          <div className="mt-6 pt-6 border-t">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Admin Panel</span>
            </Link>
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="p-4">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-accent" />
              <span className="font-semibold text-sm">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Get access to all features and unlock premium modules.
            </p>
            <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-white">
              Upgrade
            </Button>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="p-4 border-t space-y-1">
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </button>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                Hello, {profile?.name || profile?.username || "there"}
              </h1>
              <p className="text-muted-foreground">
                Track your AI usage and manage your healthcare integrations.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background rounded-lg px-3 py-2 border">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat, i) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${
                        stat.positive ? 'text-accent' : 'text-red-500'
                      }`}>
                        {stat.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action, i) => (
              <Link key={action.title} href={action.href}>
                <Card className="border hover:border-foreground/20 hover:shadow-md transition-all cursor-pointer group h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                        <action.icon className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Performance Chart Placeholder & Activity */}
        <div className="grid grid-cols-2 gap-6">
          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold">Performance</h3>
                  <Badge variant="secondary" className="text-xs">This Week</Badge>
                </div>
                
                {/* Simple chart visualization */}
                <div className="h-48 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-accent/20 rounded-t-lg relative overflow-hidden transition-all hover:bg-accent/30"
                        style={{ height: `${height}%` }}
                      >
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-accent rounded-t-lg"
                          style={{ height: `${height * 0.7}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
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
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Recent Activity</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    View all
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'update' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'install' ? 'bg-green-100 text-green-600' :
                        activity.type === 'settings' ? 'bg-amber-100 text-amber-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'update' && <Zap className="w-4 h-4" />}
                        {activity.type === 'install' && <CheckCircle2 className="w-4 h-4" />}
                        {activity.type === 'settings' && <Settings className="w-4 h-4" />}
                        {activity.type === 'report' && <FileText className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="text-accent font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Right Sidebar - User Profile */}
      <aside className="w-80 bg-background border-l p-6 min-h-screen sticky top-0">
        {/* User Profile Card */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-4 border-accent/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-accent">
              {(profile?.name || profile?.username || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="font-semibold text-lg">{profile?.name || profile?.username}</h3>
          <p className="text-sm text-muted-foreground">@{profile?.username}</p>
          
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="outline" size="sm" className="rounded-full">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Your Roles */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3">Your Roles</h4>
          <div className="space-y-2">
            {[
              { key: 'is_it', label: 'IT Admin', icon: Building2, color: 'bg-blue-100 text-blue-600' },
              { key: 'is_startup', label: 'AI Startup', icon: Rocket, color: 'bg-purple-100 text-purple-600' },
              { key: 'is_developer', label: 'Developer', icon: Code2, color: 'bg-green-100 text-green-600' },
            ].map((role) => {
              const hasRole = profile && profile[role.key as keyof Profile];
              return (
                <div 
                  key={role.key}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    hasRole ? 'bg-muted' : 'opacity-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${role.color} flex items-center justify-center`}>
                    <role.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium flex-1">{role.label}</span>
                  {hasRole ? (
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                  ) : (
                    <Badge variant="secondary" className="text-[10px]">Locked</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h4 className="text-sm font-semibold mb-3">This Month</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Modules Used</span>
              <span className="font-semibold">6</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">API Calls</span>
              <span className="font-semibold">2,847</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="font-semibold text-accent">99.9%</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
