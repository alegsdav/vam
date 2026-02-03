"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackExitIntent, dataAttributes } from "@/lib/analytics";

type ExitIntentModalProps = {
  /** Enable/disable the modal entirely */
  enabled?: boolean;
  /** Delay before exit intent detection starts (ms) */
  delay?: number;
};

/**
 * Exit Intent Modal
 * 
 * Shows a non-intrusive offer when users are about to leave.
 * Currently disabled by default - enable when ready for production.
 * 
 * Offer: "Get the platform overview PDF"
 * - Low pressure
 * - Professional
 * - Captures email
 * - Works well for enterprise buyers
 */
export function ExitIntentModal({ enabled = false, delay = 5000 }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const showModal = useCallback(() => {
    if (!hasShown && enabled) {
      setIsVisible(true);
      setHasShown(true);
      trackExitIntent("shown", "platform-overview-pdf");
      
      // Store in session to prevent showing again
      if (typeof window !== "undefined") {
        sessionStorage.setItem("scrub_exit_intent_shown", "true");
      }
    }
  }, [hasShown, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Check if already shown this session
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem("scrub_exit_intent_shown");
      if (alreadyShown) {
        setHasShown(true);
        return;
      }
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the viewport
      if (e.clientY <= 0) {
        showModal();
      }
    };

    // Delay before enabling exit intent detection
    timeoutId = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, delay, showModal]);

  const handleDismiss = () => {
    setIsVisible(false);
    trackExitIntent("dismissed", "platform-overview-pdf");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simulate API call - replace with real endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));

    trackExitIntent("converted", "platform-overview-pdf");
    setIsSuccess(true);
    setIsSubmitting(false);

    // Auto-close after success
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  // Don't render anything if not enabled
  if (!enabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={handleDismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background rounded-2xl shadow-2xl z-[101] overflow-hidden border"
            {...dataAttributes.form("exit-intent")}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {!isSuccess ? (
                <>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
                    <FileText className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">
                      Before you go...
                    </h2>
                    <p className="text-muted-foreground">
                      Get our free platform overview PDF and learn how hospitals are deploying AI safely.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your work email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                      {...dataAttributes.field("email")}
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 bg-accent hover:bg-accent/90 text-white"
                      disabled={isSubmitting}
                      {...dataAttributes.cta("signup", "exit-intent")}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Get the PDF
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Privacy note */}
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                /* Success state */
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 mx-auto">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Check your inbox!</h2>
                  <p className="text-muted-foreground">
                    We've sent the platform overview to {email}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
