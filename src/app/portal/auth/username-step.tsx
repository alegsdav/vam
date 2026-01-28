"use client";

import { useState } from "react";
import { User, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { SignupData } from "./page";

type Props = {
  data: SignupData;
  updateData: (updates: Partial<SignupData>) => void;
  onNext: () => void;
};

export function UsernameStep({ data, updateData, onNext }: Props) {
  const [username, setUsername] = useState(data.username);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if username is taken
      const { data: existing } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username.trim().toLowerCase())
        .single();

      if (existing) {
        setError("This username is already taken");
        setIsLoading(false);
        return;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("Please sign in first");
        setIsLoading(false);
        return;
      }

      // Update profile with username
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: username.trim().toLowerCase() })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setIsLoading(false);
        return;
      }

      updateData({ username: username.trim().toLowerCase() });
      onNext();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
        <User className="w-8 h-8 text-accent" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Choose a username</h1>
      <p className="text-muted-foreground mb-8">
        This will be your unique identifier on Scrub.
      </p>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
              <Input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                className="h-12 text-center text-lg pl-8"
                autoFocus
                disabled={isLoading}
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-foreground hover:bg-foreground/90"
              disabled={!username.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
