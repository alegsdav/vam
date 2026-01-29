"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home,
  Inbox,
  CreditCard,
  Boxes,
  Key,
  FlaskConical,
  Building2,
  Shield,
  FileText,
  Store,
  Settings,
  LogOut, 
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";
import type { LucideIcon } from "lucide-react";

// Sidebar item type
type SidebarItem = {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: number;
  external?: boolean;
};

type SidebarSection = {
  label?: string;
  items: SidebarItem[];
};

// Sidebar navigation structure
const sidebarSections: SidebarSection[] = [
  {
    items: [
      { id: "home", title: "Home", icon: Home, href: "/portal" },
      { id: "inbox", title: "Inbox", icon: Inbox, href: "/portal/inbox", badge: 3 },
      { id: "billing", title: "Billing & Credits", icon: CreditCard, href: "/portal/billing" },
    ]
  },
  {
    label: "Projects",
    items: [
      { id: "modules", title: "My AI Modules", icon: Boxes, href: "/portal/startup" },
      { id: "api-keys", title: "API Keys", icon: Key, href: "/portal/developer" },
      { id: "sandbox", title: "Sandbox", icon: FlaskConical, href: "/portal/sandbox" },
    ]
  },
  {
    label: "Integrations",
    items: [
      { id: "units", title: "Connected Units", icon: Building2, href: "/portal/it" },
      { id: "security", title: "Security / VPN", icon: Shield, href: "/portal/security" },
      { id: "logs", title: "Access Logs", icon: FileText, href: "/portal/logs" },
    ]
  },
  {
    items: [
      { id: "marketplace", title: "Marketplace", icon: Store, href: "/portal/marketplace" },
      { id: "settings", title: "Settings", icon: Settings, href: "/portal/settings" },
      { id: "admin", title: "Admin Panel", icon: Shield, href: "/admin", external: true },
    ]
  }
];

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
          {sidebarSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {/* Section Label */}
              {section.label && (
                <div className="px-3 py-2 mt-4 first:mt-0">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.label}
                  </span>
                </div>
              )}
              
              {/* Divider before non-labeled sections (except first) */}
              {!section.label && sectionIndex > 0 && (
                <div className="my-4 border-t" />
              )}
              
              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/portal" && pathname?.startsWith(item.href));
                  
                  const linkContent = (
                    <>
                      <item.icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:text-foreground'}`} />
                      <span className="font-medium flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs px-1.5">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  );
                  
                  if (item.external) {
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
                        {linkContent}
                      </Link>
                    );
                  }
                  
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
                      {linkContent}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

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
        {/* Minimal Top bar */}
        <header className="h-16 bg-background border-b flex items-center justify-end px-8 sticky top-0 z-10">
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
    <PortalLayoutInner profile={profile} handleSignOut={handleSignOut}>
      {children}
    </PortalLayoutInner>
  );
}
