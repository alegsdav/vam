"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { EntryStep } from "./entry-step";
import { NameStep } from "./name-step";
import { EmailStep } from "./email-step";
import { VerifyStep } from "./verify-step";
import { UsernameStep } from "./username-step";
import { RoleStep } from "./role-step";

export type AuthStep = "entry" | "name" | "email" | "verify" | "username" | "roles" | "loading";

export type SignupData = {
  name: string;
  email: string;
  username: string;
  roles: {
    is_it: boolean;
    is_startup: boolean;
    is_developer: boolean;
  };
};

const STORAGE_KEY = "straits_signup_name";
const SIGNUP_MODE_KEY = "straits_signup_mode";

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>("loading");
  const [error, setError] = useState<string | null>(null);
  const [isSignupFlow, setIsSignupFlow] = useState(false);
  const [data, setData] = useState<SignupData>({
    name: "",
    email: "",
    username: "",
    roles: {
      is_it: false,
      is_startup: false,
      is_developer: false,
    },
  });

  const searchParams = useSearchParams();
  const supabase = createClient();

  // Check for errors in URL params
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      // Check if they were in signup flow
      const wasSignup = localStorage.getItem(SIGNUP_MODE_KEY) === "true";
      const storedName = localStorage.getItem(STORAGE_KEY);
      if (wasSignup && storedName) {
        setData(prev => ({ ...prev, name: storedName }));
        setIsSignupFlow(true);
        setStep("email");
      } else {
        setStep("entry");
      }
    }
  }, [searchParams]);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkUser = async () => {
      // Don't recheck if we already handled an error
      if (searchParams.get("error")) return;

      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // User is authenticated, check if profile is complete
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, username, is_it, is_startup, is_developer")
          .eq("id", user.id)
          .single();

        // Get stored name from before magic link (only for signup flow)
        const storedName = localStorage.getItem(STORAGE_KEY);
        const wasSignup = localStorage.getItem(SIGNUP_MODE_KEY) === "true";

        if (profile) {
          // Set existing data
          setData(prev => ({
            ...prev,
            name: profile.name || storedName || "",
            email: user.email || "",
            username: profile.username || "",
            roles: {
              is_it: profile.is_it || false,
              is_startup: profile.is_startup || false,
              is_developer: profile.is_developer || false,
            },
          }));

          // If we have a stored name from signup and profile doesn't have a name, update it
          if (wasSignup && storedName && !profile.name) {
            await supabase
              .from("profiles")
              .update({ name: storedName })
              .eq("id", user.id);
          }

          // Clear storage
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(SIGNUP_MODE_KEY);

          // Check what's missing and set appropriate step
          if (!profile.name && !storedName) {
            // Returning user without name (shouldn't happen normally)
            setStep("username");
          } else if (!profile.username) {
            setStep("username");
          } else if (!profile.is_it && !profile.is_startup && !profile.is_developer) {
            setStep("roles");
          } else {
            // Profile complete, redirect to portal
            window.location.href = "/portal";
            return;
          }
        } else {
          // No profile yet (new user from login flow)
          if (storedName) {
            setData(prev => ({ ...prev, name: storedName, email: user.email || "" }));
          } else {
            setData(prev => ({ ...prev, email: user.email || "" }));
          }
          setStep("username");
        }
      } else {
        // Not authenticated - show entry page
        setStep("entry");
      }
    };

    // Small delay to ensure we're on client
    const timer = setTimeout(checkUser, 100);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const updateData = (updates: Partial<SignupData>) => {
    setData(prev => ({ ...prev, ...updates }));
    
    // Store name in localStorage for persistence across magic link redirect
    if (updates.name) {
      localStorage.setItem(STORAGE_KEY, updates.name);
    }
  };

  const handleSignUp = () => {
    setIsSignupFlow(true);
    localStorage.setItem(SIGNUP_MODE_KEY, "true");
    setStep("name");
  };

  const handleMagicLinkSent = (email: string) => {
    setData(prev => ({ ...prev, email }));
    setError(null);
    setStep("verify");
  };

  const handleEmailNext = () => {
    setError(null);
    setStep("verify");
  };

  const stepComponents = {
    loading: (
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-foreground border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    ),
    entry: <EntryStep onSignUp={handleSignUp} onMagicLinkSent={handleMagicLinkSent} />,
    name: <NameStep data={data} updateData={updateData} onNext={() => setStep("email")} />,
    email: <EmailStep data={data} updateData={updateData} onNext={handleEmailNext} onBack={() => setStep("name")} />,
    verify: <VerifyStep data={data} />,
    username: <UsernameStep data={data} updateData={updateData} onNext={() => setStep("roles")} />,
    roles: <RoleStep data={data} updateData={updateData} />,
  };

  // Progress dots config - different for login vs signup
  const getProgressSteps = () => {
    if (step === "entry" || step === "loading") return [];
    if (isSignupFlow) {
      return ["name", "email", "verify", "username", "roles"];
    }
    // Login flow (fewer steps)
    return ["verify", "username", "roles"];
  };

  const progressSteps = getProgressSteps();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center">
            <span className="text-background font-bold text-lg">S</span>
          </div>
          <div>
            <span className="font-semibold text-xl tracking-tight block">Straits</span>
          </div>
        </Link>
        <Link 
          href="/" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="relative z-10 mx-auto max-w-md px-8">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 mb-4">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <div>
              <p className="font-medium">Authentication Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-12 relative z-10">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {stepComponents[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Progress dots */}
      {progressSteps.length > 0 && (
        <div className="relative z-10 pb-8 flex justify-center gap-2">
          {progressSteps.map((s, i) => {
            const currentIndex = progressSteps.indexOf(step as string);
            const isActive = i <= currentIndex;
            
            return (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-colors ${
                  isActive ? "bg-accent" : "bg-muted"
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
