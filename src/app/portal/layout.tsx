"use client";

import { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Building2, 
  Cpu, 
  Boxes, 
  Settings, 
  ChevronDown,
  User,
  LogOut,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type UserRole = "admin" | "client" | "provider";

interface PortalContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const PortalContext = createContext<PortalContextType>({
  role: "client",
  setRole: () => {}
});

export function usePortal() {
  return useContext(PortalContext);
}

const navigation = [
  { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { name: "Build", href: "/portal/build", icon: Building2, description: "Hosted experience" },
  { name: "Integrate", href: "/portal/integrate", icon: Cpu, description: "Headless API" },
  { name: "Modules", href: "/portal/modules", icon: Boxes },
  { name: "Admin", href: "/portal/admin", icon: Shield, adminOnly: true },
];

const roles: { id: UserRole; label: string; description: string }[] = [
  { id: "admin", label: "VSee Admin", description: "Full ecosystem control" },
  { id: "client", label: "Hospital Client", description: "Organization view" },
  { id: "provider", label: "AI Provider", description: "Module management" }
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState<UserRole>("client");
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <PortalContext.Provider value={{ role, setRole }}>
      <div className="min-h-screen bg-muted/30 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-background border-r flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <Link href="/portal" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-foreground flex items-center justify-center">
                <span className="text-background font-bold">V</span>
              </div>
              <div>
                <span className="font-semibold text-sm block">VSee Portal</span>
                <span className="text-xs text-muted-foreground">AI Marketplace</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              if (item.adminOnly && role !== "admin") return null;
              const isActive = pathname === item.href || 
                (item.href !== "/portal" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.description && (
                    <span className={cn(
                      "ml-auto text-xs",
                      isActive ? "text-accent-foreground/70" : "text-muted-foreground/70"
                    )}>
                      {item.description}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher (Demo) */}
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground mb-2 px-1">Demo Role</p>
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{roles.find(r => r.id === role)?.label}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform", showRoleMenu && "rotate-180")} />
              </button>
              
              {showRoleMenu && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-background border rounded-lg shadow-lg overflow-hidden z-50">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => { setRole(r.id); setShowRoleMenu(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors text-left",
                        role === r.id ? "bg-accent/10 text-accent" : "hover:bg-muted"
                      )}
                    >
                      <div className="flex-1">
                        <p className="font-medium">{r.label}</p>
                        <p className="text-xs text-muted-foreground">{r.description}</p>
                      </div>
                      {role === r.id && <div className="w-2 h-2 rounded-full bg-accent" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <User className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Demo User</p>
                <p className="text-xs text-muted-foreground truncate">demo@vsee.com</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="/">
                  <LogOut className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="font-semibold capitalize">
                  {pathname === "/portal" ? "Dashboard" : pathname.split("/").pop()}
                </h1>
                <Badge variant="secondary" className="text-xs">
                  {roles.find(r => r.id === role)?.label}
                </Badge>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/vam">View Marketplace</Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </PortalContext.Provider>
  );
}
