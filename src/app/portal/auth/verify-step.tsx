"use client";

import { Mail, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SignupData } from "./page";

type Props = {
  data: SignupData;
};

export function VerifyStep({ data }: Props) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6">
        <Mail className="w-8 h-8 text-accent" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Check your email</h1>
      <p className="text-muted-foreground mb-8">
        We sent a magic link to <strong>{data.email}</strong>
      </p>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-accent/10 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-sm">Click the link in your email to continue</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Didn't receive it? Check your spam folder or wait a moment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
