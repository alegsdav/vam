"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { SignupData } from "./page";

type Props = {
  data: SignupData;
  updateData: (updates: Partial<SignupData>) => void;
  onNext: () => void;
};

export function NameStep({ data, updateData, onNext }: Props) {
  const [name, setName] = useState(data.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateData({ name: name.trim() });
      onNext();
    }
  };

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
        <Sparkles className="w-8 h-8 text-accent" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Let's get you started</h1>
      <p className="text-muted-foreground mb-8">
        First, what should we call you?
      </p>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-center text-lg"
              autoFocus
            />
            <Button 
              type="submit" 
              className="w-full h-12 bg-foreground hover:bg-foreground/90"
              disabled={!name.trim()}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
