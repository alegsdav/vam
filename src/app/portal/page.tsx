"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Building2, Rocket, Code2, ArrowRight, ArrowLeft, Lock, LogOut, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

const portals = [
  {
    id: "it",
    title: "IT Admin",
    subtitle: "Manage AI Modules",
    description: "Monitor AI usage, manage costs, and install new capabilities from the marketplace.",
    icon: Building2,
    href: "/portal/it",
    roleKey: "is_it",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    id: "startup",
    title: "AI Startup",
    subtitle: "Submit Modules",
    description: "Submit your AI models to the Straits marketplace and reach healthcare organizations.",
    icon: Rocket,
    href: "/portal/startup",
    roleKey: "is_startup",
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    id: "developer",
    title: "Developer",
    subtitle: "SDK & Documentation",
    description: "Access the SDK, API documentation, and tools to embed healthcare AI in your software.",
    icon: Code2,
    href: "/portal/developer",
    roleKey: "is_developer",
    color: "bg-green-500/10 text-green-600"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function PortalPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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

  // Filter portals based on user's roles
  const availablePortals = profile 
    ? portals.filter(p => profile[p.roleKey as keyof Profile])
    : portals;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-lg">S</span>
          </div>
          <div>
            <span className="font-semibold text-xl tracking-tight block">Straits</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {profile && (
            <div className="flex items-center gap-3 mr-4">
              <div className="text-right">
                <p className="text-sm font-medium">{profile.name || profile.username}</p>
                <p className="text-xs text-muted-foreground">@{profile.username}</p>
              </div>
            </div>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Admin View
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Hero */}
      <motion.section 
        className="relative z-10 pt-12 pb-16 px-8 text-center"
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-background text-sm font-medium mb-6">
          <Lock className="w-4 h-4 text-accent" />
          <span>Secure Portal</span>
        </motion.div>

        <motion.h1 
          variants={fadeInUp}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6"
        >
          Welcome back,{" "}
          <span className="text-accent">{profile?.name || profile?.username || "User"}</span>
        </motion.h1>
        
        <motion.p 
          variants={fadeInUp}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Select a portal to access your dashboard, manage modules, or integrate with our platform.
        </motion.p>
      </motion.section>

      {/* Portal Selection Cards */}
      <motion.section 
        className="relative z-10 px-8 pb-24 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className={`grid gap-6 ${availablePortals.length === 1 ? 'max-w-md mx-auto' : availablePortals.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-3'}`}>
          {availablePortals.map((portal, i) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <Link href={portal.href}>
                <Card className="group h-full border hover:border-foreground/20 hover:shadow-lg transition-all cursor-pointer overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${portal.color} flex items-center justify-center`}>
                        <portal.icon className="w-7 h-7" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="space-y-2 mb-4">
                      <h2 className="text-xl font-semibold">{portal.title}</h2>
                      <p className="text-sm text-accent font-medium">{portal.subtitle}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {portal.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {availablePortals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No portals available for your account.</p>
            <p className="text-sm text-muted-foreground mt-2">Contact support if you believe this is an error.</p>
          </div>
        )}
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 border-t py-8 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Straits Portal • Secure Access</span>
        </div>
      </footer>
    </div>
  );
}
