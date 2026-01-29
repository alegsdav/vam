"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Check,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  ExternalLink,
  Book,
  Key,
  Webhook,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const codeExamples = {
  script: `<!-- Add to your HTML -->
<script src="https://cdn.scrub.ai/widget.js"></script>

<!-- Place the widget anywhere in your app -->
<health-ai-widget 
  app-id="sepsis-pro-123"
  patient-id="{{patient.id}}"
  theme="light"
></health-ai-widget>`,
  
  react: `import { HealthAIWidget } from '@scrub/react';

function PatientDashboard({ patientId }) {
  return (
    <div className="dashboard">
      <PatientHeader />
      
      {/* Add AI predictions with one component */}
      <HealthAIWidget 
        appId="sepsis-pro-123"
        patientId={patientId}
        onPrediction={(result) => console.log(result)}
      />
      
      <VitalsChart />
    </div>
  );
}`,
  
  api: `// Direct API call for server-side integration
const response = await fetch('https://api.scrub.ai/v1/predict', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    app_id: 'sepsis-pro-123',
    patient_fhir_id: 'Patient/12345',
    // Scrub handles FHIR data fetching automatically
  })
});

const prediction = await response.json();
// { risk_score: 0.73, confidence: 0.87, factors: [...] }`,

  webhook: `// Configure webhooks in your dashboard
// Scrub will POST to your endpoint when:
// - New predictions are ready
// - Risk scores change significantly
// - Alerts are triggered

// Example webhook payload:
{
  "event": "prediction.high_risk",
  "app_id": "sepsis-pro-123",
  "patient_id": "Patient/12345",
  "prediction": {
    "risk_score": 0.82,
    "confidence": 0.91,
    "alert_level": "critical"
  },
  "timestamp": "2026-01-20T14:32:00Z"
}`
};

const features = [
  {
    icon: Zap,
    title: "Drop-in Widget",
    description: "One script tag, instant AI. Works with any frontend framework or vanilla HTML."
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "All data stays encrypted. No PHI ever touches our CDN. SOC 2 Type II certified."
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "EMR, patient portal, mobile app, or custom software. If it has a browser, it works."
  }
];

const docSections = [
  { title: "Getting Started", badge: "5 min", active: true },
  { title: "Authentication", badge: null, active: false },
  { title: "Widget Configuration", badge: null, active: false },
  { title: "React Integration", badge: null, active: false },
  { title: "API Reference", badge: null, active: false },
  { title: "Webhooks", badge: null, active: false },
  { title: "FHIR Data Access", badge: null, active: false },
  { title: "Error Handling", badge: null, active: false },
];

const useCases = [
  { title: "Custom EMR", desc: "Build your own electronic medical records with AI built-in" },
  { title: "Patient Portals", desc: "Add AI insights to patient-facing dashboards" },
  { title: "Telehealth Apps", desc: "Real-time risk scores during video consultations" },
  { title: "Clinical Tools", desc: "Specialty-specific applications with AI predictions" },
];

export default function DeveloperPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div>
      {/* Page Header */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Developer Documentation</h1>
            <p className="text-muted-foreground">SDK, API reference, and integration guides</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">v2.4.1</Badge>
            <Button size="sm" className="bg-foreground hover:bg-foreground/90">
              <Key className="w-4 h-4 mr-2" />
              Get API Key
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar - Doc Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-0 shadow-sm sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Book className="w-4 h-4" />
                Documentation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <nav className="space-y-1">
                {docSections.map((section, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      section.active 
                        ? 'bg-foreground text-background' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span>{section.title}</span>
                    {section.badge && (
                      <Badge variant="secondary" className={`text-xs ${section.active ? 'bg-background/20 text-background' : ''}`}>
                        {section.badge}
                      </Badge>
                    )}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div className="col-span-3 space-y-6">
          {/* Feature Cards */}
          <motion.div 
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {features.map((feature, i) => (
              <Card key={i} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Quick Start Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Quick Start (2 lines of code)</CardTitle>
                <CardDescription>
                  Copy this into your HTML and you're done. The widget handles authentication, 
                  data fetching, and rendering automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-foreground text-background rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-sm text-background/50">index.html</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background/50 hover:text-background hover:bg-white/10 h-8"
                      onClick={() => copyCode(codeExamples.script, "script")}
                    >
                      {copiedCode === "script" ? (
                        <Check className="w-4 h-4 text-accent" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="font-mono">
                      <span className="text-background/50">{'<!-- Add to your HTML -->'}</span>
                      {'\n'}
                      <span className="text-background/70">{'<script'}</span>
                      <span className="text-accent">{' src'}</span>
                      <span className="text-background">{'='}</span>
                      <span className="text-accent">{'"https://cdn.scrub.ai/widget.js"'}</span>
                      <span className="text-background/70">{'></script>'}</span>
                      {'\n\n'}
                      <span className="text-background/50">{'<!-- Place the widget anywhere -->'}</span>
                      {'\n'}
                      <span className="text-background/70">{'<health-ai-widget'}</span>
                      {'\n'}
                      <span className="text-accent">{'  app-id'}</span>
                      <span className="text-background">{'='}</span>
                      <span className="text-accent">{'"sepsis-pro-123"'}</span>
                      {'\n'}
                      <span className="text-accent">{'  patient-id'}</span>
                      <span className="text-background">{'='}</span>
                      <span className="text-accent">{'"{{patient.id}}"'}</span>
                      {'\n'}
                      <span className="text-background/70">{'></health-ai-widget>'}</span>
                    </code>
                  </pre>
                </div>

                <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-accent">That's it!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        The widget automatically connects to your FHIR server, fetches patient data, 
                        runs the AI prediction, and displays results. No backend code required.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* More Integration Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>More Integration Options</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="react" className="w-full">
                  <TabsList className="bg-muted/50">
                    <TabsTrigger value="react">React</TabsTrigger>
                    <TabsTrigger value="api">REST API</TabsTrigger>
                    <TabsTrigger value="webhook">Webhooks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="react" className="mt-4">
                    <div className="bg-foreground text-background rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                        <span className="text-sm text-background/50">PatientDashboard.jsx</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-background/50 hover:text-background hover:bg-white/10 h-8"
                          onClick={() => copyCode(codeExamples.react, "react")}
                        >
                          {copiedCode === "react" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm font-mono text-background/80">
                        {codeExamples.react}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="api" className="mt-4">
                    <div className="bg-foreground text-background rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                        <span className="text-sm text-background/50">server.js</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-background/50 hover:text-background hover:bg-white/10 h-8"
                          onClick={() => copyCode(codeExamples.api, "api")}
                        >
                          {copiedCode === "api" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm font-mono text-background/80">
                        {codeExamples.api}
                      </pre>
                    </div>
                  </TabsContent>

                  <TabsContent value="webhook" className="mt-4">
                    <div className="bg-foreground text-background rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                        <span className="text-sm text-background/50">webhook-payload.json</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-background/50 hover:text-background hover:bg-white/10 h-8"
                          onClick={() => copyCode(codeExamples.webhook, "webhook")}
                        >
                          {copiedCode === "webhook" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <pre className="p-4 overflow-x-auto text-sm font-mono text-background/80">
                        {codeExamples.webhook}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>What You Can Build</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {useCases.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                      <ChevronRight className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-0 shadow-sm bg-foreground text-background">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold mb-2">Ready to get started?</h3>
                <p className="text-background/60 mb-6">
                  Get your API key and start building in under 5 minutes.
                </p>
                <div className="flex items-center justify-center gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-white">
                    <Key className="w-4 h-4 mr-2" />
                    Get API Key
                  </Button>
                  <Button variant="outline" className="border-white/20 text-background hover:bg-white/10 bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Full Docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
