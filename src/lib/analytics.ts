/**
 * Lightweight analytics tracking utility
 * 
 * This provides a vendor-agnostic interface for tracking events.
 * When you're ready to add a real analytics provider, implement the
 * handlers in this file without changing any component code.
 * 
 * Supported providers (future):
 * - PostHog
 * - Plausible
 * - Google Analytics
 * - Mixpanel
 * - Amplitude
 */

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | undefined>;
};

export type CTALocation = 
  | "header"
  | "hero"
  | "features"
  | "pricing"
  | "testimonials"
  | "objections"
  | "personas"
  | "modules"
  | "bottom-cta"
  | "footer"
  | "exit-intent";

export type CTAType = 
  | "signup"
  | "login"
  | "demo"
  | "pricing"
  | "contact-sales";

/**
 * Track a generic event
 */
export function track(eventName: string, properties?: Record<string, string | number | boolean | undefined>) {
  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${eventName}`, properties);
  }

  // Future: send to analytics provider
  // Example PostHog:
  // if (typeof window !== 'undefined' && window.posthog) {
  //   window.posthog.capture(eventName, properties);
  // }
}

/**
 * Track CTA clicks with consistent naming
 */
export function trackCTA(type: CTAType, location: CTALocation, additionalProps?: Record<string, string>) {
  track("cta_clicked", {
    cta_type: type,
    location,
    ...additionalProps,
  });
}

/**
 * Track page section views (for scroll depth)
 */
export function trackSectionView(sectionId: string) {
  track("section_viewed", {
    section: sectionId,
    timestamp: Date.now(),
  });
}

/**
 * Track form interactions
 */
export function trackFormEvent(
  formName: string, 
  action: "started" | "field_focused" | "field_completed" | "submitted" | "error",
  fieldName?: string,
  errorMessage?: string
) {
  track("form_interaction", {
    form: formName,
    action,
    field: fieldName,
    error: errorMessage,
  });
}

/**
 * Track exit intent modal
 */
export function trackExitIntent(action: "shown" | "dismissed" | "converted", offer?: string) {
  track("exit_intent", {
    action,
    offer,
  });
}

/**
 * Data attributes helper for semantic tracking
 * Use these on elements for future heatmap/session recording tools
 */
export const dataAttributes = {
  cta: (type: CTAType, location: CTALocation) => ({
    "data-cta": type,
    "data-cta-location": location,
  }),
  section: (id: string) => ({
    "data-section": id,
  }),
  form: (name: string) => ({
    "data-form": name,
  }),
  field: (name: string) => ({
    "data-field": name,
  }),
};
