"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Building2, 
  Rocket, 
  Code2, 
  Home,
  LogOut, 
  Settings,
  HelpCircle,
  Crown,
  Stethoscope,
  DollarSign,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import { PersonaProvider, usePersona, Persona } from "./persona-context";

const navigation = [
  {
    id: "home",
    title: "Home",
    icon: Home,
    href: "/portal",
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

// Persona Toggle Component
function PersonaToggle() {
  const { persona, setPersona } = usePersona();
  
  const personas: { id: Persona; label: string; icon: typeof Stethoscope }[] = [
    { id: "clinical", label: "Clinical", icon: Stethoscope },
    { id: "business", label: "Business", icon: DollarSign },
    { id: "technical", label: "Technical", icon: Terminal },
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {personas.map((p) => (
        <button
          key={p.id}
          onClick={() => setPersona(p.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            persona === p.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <p.icon className="w-3.5 h-3.5" />
          {p.label}
        </button>
      ))}
    </div>
  );
}

function PortalLayoutInner({
  children,
  profile,
  handleSignOut,
}: {
  children: React.ReactNode;
  profile: Profile | null;
  handleSignOut: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-background border-r flex flex-col min-h-screen fixed left-0 top-0 bottom-0">
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
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/portal" && pathname?.startsWith(item.href));
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

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Top bar with persona toggle and user info */}
        <header className="h-16 bg-background border-b flex items-center justify-between px-8 sticky top-0 z-10">
          {/* Left: View Mode Label */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">View Mode:</span>
            <PersonaToggle />
          </div>
          
          {/* Right: User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{profile?.name || profile?.username}</p>
              <p className="text-xs text-muted-foreground">@{profile?.username}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/20 flex items-center justify-center">
              <span className="text-sm font-bold text-accent">
                {(profile?.name || profile?.username || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // Don't apply layout to auth pages
  if (pathname?.startsWith("/portal/auth")) {
    return <>{children}</>;
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PersonaProvider>
      <PortalLayoutInner profile={profile} handleSignOut={handleSignOut}>
        {children}
      </PortalLayoutInner>
    </PersonaProvider>
  );
}
