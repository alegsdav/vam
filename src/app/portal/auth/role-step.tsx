"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Building2, Rocket, Code2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { SignupData } from "./page";

type Props = {
  data: SignupData;
  updateData: (updates: Partial<SignupData>) => void;
};

const roleOptions = [
  {
    id: "is_it",
    label: "IT / Hospital Admin",
    description: "Manage AI modules for your organization",
    icon: Building2,
  },
  {
    id: "is_startup",
    label: "AI Startup",
    description: "Submit and manage your AI modules",
    icon: Rocket,
  },
  {
    id: "is_developer",
    label: "Developer",
    description: "Access SDK and documentation",
    icon: Code2,
  },
];

export function RoleStep({ data, updateData }: Props) {
  const [roles, setRoles] = useState(data.roles);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const supabase = createClient();

  const toggleRole = (roleId: string) => {
    setRoles(prev => ({
      ...prev,
      [roleId]: !prev[roleId as keyof typeof prev],
    }));
  };

  const hasSelection = roles.is_it || roles.is_startup || roles.is_developer;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSelection) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Please sign in first");
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          is_it: roles.is_it,
          is_startup: roles.is_startup,
          is_developer: roles.is_developer,
        })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      updateData({ roles });
      
      // Redirect to portal
      router.push("/portal");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
        <Users className="w-8 h-8 text-accent" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">What describes you?</h1>
      <p className="text-muted-foreground mb-8">
        Select all that apply. This helps us personalize your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {roleOptions.map((role) => {
            const isSelected = roles[role.id as keyof typeof roles];
            
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? "border-accent bg-accent/5 shadow-md"
                    : "hover:border-muted-foreground/30"
                }`}
                onClick={() => toggleRole(role.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-accent text-white" : "bg-muted"
                  }`}>
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{role.label}</p>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? "border-accent bg-accent"
                      : "border-muted-foreground/30"
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button 
          type="submit" 
          className="w-full h-12 bg-accent hover:bg-accent/90 text-white"
          disabled={!hasSelection || isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Complete Setup"
          )}
        </Button>
      </form>
    </div>
  );
}
