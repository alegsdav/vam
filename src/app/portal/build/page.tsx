"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  FileText, 
  Activity, 
  Calendar, 
  MessageSquare, 
  Pill,
  AlertTriangle,
  TrendingUp,
  CheckCircle2,
  Clock,
  Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { AI_MODULES } from "@/lib/modules";

interface ModuleToggle {
  id: string;
  enabled: boolean;
}

// Mock dashboard panels that respond to module toggles
const dashboardPanels = [
  {
    id: "patient-overview",
    title: "Patient Overview",
    icon: User,
    modules: ["patient-risk-scoring", "readmission-prediction"],
    defaultContent: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">John Smith, 68</span>
          <Badge variant="secondary">Stable</Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Primary: CHF, T2DM, HTN</p>
          <p>Last visit: Jan 15, 2026</p>
        </div>
      </div>
    ),
    enhancedContent: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">John Smith, 68</span>
          <Badge variant="warning">High Risk</Badge>
        </div>
        <div className="p-2 bg-warning/10 rounded-lg text-xs space-y-1">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="w-3 h-3" />
            <span className="font-medium">Risk Score: 0.78</span>
          </div>
          <p className="text-muted-foreground">30-day readmission probability elevated</p>
        </div>
        <div className="text-xs text-muted-foreground">
          <p>Primary: CHF, T2DM, HTN</p>
          <p>Last visit: Jan 15, 2026</p>
        </div>
      </div>
    )
  },
  {
    id: "visit-notes",
    title: "Visit Notes",
    icon: FileText,
    modules: ["clinical-note-summarization", "visit-transcription"],
    defaultContent: (
      <div className="text-xs text-muted-foreground space-y-2">
        <p className="line-clamp-3">
          Patient presents with 3-day history of productive cough, fever up to 101.2F, and shortness of breath...
        </p>
        <p className="text-xs italic">Last updated: Today, 10:30 AM</p>
      </div>
    ),
    enhancedContent: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-accent">
          <Brain className="w-3 h-3" />
          <span className="text-xs font-medium">AI Summary</span>
        </div>
        <div className="p-2 bg-accent/5 rounded-lg text-xs">
          <p className="font-medium mb-1">Key Findings:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li>• COPD exacerbation, possible pneumonia</li>
            <li>• Hypoxia (92% RA), requires monitoring</li>
            <li>• Recommend: CXR, empiric antibiotics</li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground italic">Transcription: 15 min visit captured</p>
      </div>
    )
  },
  {
    id: "analytics",
    title: "Population Analytics",
    icon: TrendingUp,
    modules: ["population-health-insights"],
    defaultContent: (
      <div className="text-xs text-muted-foreground">
        <p>Population data available</p>
        <p className="text-xs mt-2">Enable module for insights</p>
      </div>
    ),
    enhancedContent: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="p-2 bg-muted rounded">
            <p className="text-lg font-semibold">2,847</p>
            <p className="text-xs text-muted-foreground">Active patients</p>
          </div>
          <div className="p-2 bg-muted rounded">
            <p className="text-lg font-semibold text-warning">18%</p>
            <p className="text-xs text-muted-foreground">High risk</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-success" />
            Care gaps reduced by 12% this quarter
          </p>
        </div>
      </div>
    )
  },
  {
    id: "medications",
    title: "Medications",
    icon: Pill,
    modules: ["medication-reconciliation"],
    defaultContent: (
      <div className="text-xs text-muted-foreground">
        <p>Active medications: 8</p>
        <p>Last reconciled: Unknown</p>
      </div>
    ),
    enhancedContent: (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span>Active medications: 8</span>
          <Badge variant="success" className="text-xs">Reconciled</Badge>
        </div>
        <div className="p-2 bg-warning/10 rounded-lg text-xs">
          <p className="font-medium text-warning mb-1">⚠️ 1 Discrepancy Found</p>
          <p className="text-muted-foreground">Metformin dose mismatch (EHR vs pharmacy)</p>
        </div>
      </div>
    )
  },
  {
    id: "care-gaps",
    title: "Care Gaps",
    icon: Calendar,
    modules: ["followup-recommendation"],
    defaultContent: (
      <div className="text-xs text-muted-foreground">
        <p>No recommendations available</p>
        <p>Enable module to identify care gaps</p>
      </div>
    ),
    enhancedContent: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2 bg-error/10 rounded text-xs">
          <AlertTriangle className="w-3 h-3 text-error" />
          <span>Diabetic eye exam overdue (14 months)</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-warning/10 rounded text-xs">
          <Clock className="w-3 h-3 text-warning" />
          <span>A1C due (&gt;3 months since last)</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs">
          <CheckCircle2 className="w-3 h-3 text-success" />
          <span>BP check completed this visit</span>
        </div>
      </div>
    )
  },
  {
    id: "patient-messages",
    title: "Patient Messages",
    icon: MessageSquare,
    modules: ["patient-sentiment-analysis"],
    defaultContent: (
      <div className="text-xs text-muted-foreground">
        <p>3 unread messages</p>
        <p>Last message: Today, 9:15 AM</p>
      </div>
    ),
    enhancedContent: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 p-2 bg-error/10 rounded text-xs">
          <AlertTriangle className="w-3 h-3 text-error" />
          <div>
            <p className="font-medium">Urgent: Negative sentiment</p>
            <p className="text-muted-foreground">Wait time complaint - escalate</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-muted rounded text-xs">
          <MessageSquare className="w-3 h-3" />
          <span>2 routine messages</span>
        </div>
      </div>
    )
  }
];

export default function BuildPage() {
  const [moduleToggles, setModuleToggles] = useState<ModuleToggle[]>(
    AI_MODULES.map(m => ({ id: m.id, enabled: false }))
  );

  const toggleModule = (id: string) => {
    setModuleToggles(prev => 
      prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
    );
  };

  const isModuleEnabled = (id: string) => 
    moduleToggles.find(m => m.id === id)?.enabled || false;

  const isPanelEnhanced = (modules: string[]) =>
    modules.some(m => isModuleEnabled(m));

  const enabledCount = moduleToggles.filter(m => m.enabled).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-normal tracking-tight mb-2" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
          Build with VSee
        </h2>
        <p className="text-muted-foreground">
          Toggle AI modules to preview how your hosted VSee environment would look. Changes are instant and visual.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Module Toggle Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-base">AI Modules</CardTitle>
              <CardDescription>
                {enabledCount} of {AI_MODULES.length} enabled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[60vh] overflow-y-auto">
              {AI_MODULES.map((module) => (
                <motion.div
                  key={module.id}
                  layout
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Switch
                    checked={isModuleEnabled(module.id)}
                    onCheckedChange={() => toggleModule(module.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{module.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {module.shortDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Preview */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="bg-foreground text-background p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded bg-background flex items-center justify-center">
                  <span className="text-foreground font-bold text-xs">V</span>
                </div>
                <span className="font-medium text-sm">VSee Hosted Dashboard Preview</span>
              </div>
              <Badge 
                className={enabledCount > 0 ? "bg-accent text-accent-foreground" : "bg-background/20 text-background"}
              >
                {enabledCount} modules active
              </Badge>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {dashboardPanels.map((panel) => {
                  const enhanced = isPanelEnhanced(panel.modules);
                  return (
                    <motion.div
                      key={panel.id}
                      layout
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        enhanced ? "border-accent/50 bg-accent/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <panel.icon className={`w-4 h-4 ${enhanced ? "text-accent" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium">{panel.title}</span>
                        {enhanced && (
                          <Badge variant="accent" className="ml-auto text-xs">AI Enhanced</Badge>
                        )}
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={enhanced ? "enhanced" : "default"}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {enhanced ? panel.enhancedContent : panel.defaultContent}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border-2 border-border" />
                  <span>Standard panel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded border-2 border-accent bg-accent/10" />
                  <span>AI-enhanced panel</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">How Build Works</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  When you enable a module, the preview above updates to show how that AI capability 
                  would enhance your hosted VSee dashboard. No integration work required — just toggle 
                  and preview.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Toggle modules to see instant visual changes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Panels light up when AI capabilities are enabled
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    This is what your hosted environment would look like
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
