"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Code2, 
  Copy, 
  Check,
  Terminal,
  Globe,
  Zap,
  Shield,
  ChevronRight,
  ExternalLink,
  Book
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  { title: "Getting Started", href: "#", badge: "5 min" },
  { title: "Authentication", href: "#" },
  { title: "Widget Configuration", href: "#" },
  { title: "React Integration", href: "#" },
  { title: "API Reference", href: "#" },
  { title: "Webhooks", href: "#" },
  { title: "FHIR Data Access", href: "#" },
  { title: "Error Handling", href: "#" },
];

export default function DeveloperView() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-foreground text-background">
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-40 bg-foreground/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/portal" className="flex items-center gap-2 text-background/50 hover:text-background transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Portal</span>
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Developer Docs</h1>
                  <p className="text-xs text-background/50">Scrub SDK</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-white/10 text-background/70 border-0">
                v2.4.1
              </Badge>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
                Get API Key
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 min-h-[calc(100vh-73px)] p-4 hidden lg:block">
          <nav className="space-y-1">
            {docSections.map((section, i) => (
              <a
                key={i}
                href={section.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  i === 0 
                    ? 'bg-accent/10 text-accent' 
                    : 'text-background/60 hover:text-background hover:bg-white/5'
                }`}
              >
                <span>{section.title}</span>
                {section.badge && (
                  <Badge variant="secondary" className="text-xs bg-white/10 text-background/60 border-0">
                    {section.badge}
                  </Badge>
                )}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl p-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Badge className="bg-accent/10 text-accent border-0 mb-4">
              Quick Start
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Add Healthcare AI to Any App
            </h1>
            <p className="text-xl text-background/60 mb-6">
              One script tag. Instant AI predictions. Works with any medical software.
            </p>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Card className="bg-white/5 border-white/10 h-full">
                    <CardContent className="p-4">
                      <feature.icon className="w-8 h-8 text-accent mb-3" />
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-background/50">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Start Code */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-4">Quickest Integration (2 lines)</h2>
            <p className="text-background/60 mb-4">
              Copy this into your HTML and you're done. The widget handles authentication, 
              data fetching, and rendering automatically.
            </p>

            <Card className="bg-black/40 border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-sm text-background/50">index.html</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-background/50 hover:text-background hover:bg-white/10"
                  onClick={() => copyCode(codeExamples.script, "script")}
                >
                  {copiedCode === "script" ? (
                    <Check className="w-4 h-4 text-accent" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono">
                  <span className="text-background/50">{'<!-- Add to your HTML -->'}</span>
                  {'\n'}
                  <span className="text-background/70">{'<script'}</span>
                  <span className="text-accent">{' src'}</span>
                  <span className="text-background">{'='}</span>
                  <span className="text-accent">{'"https://cdn.scrub.ai/widget.js"'}</span>
                  <span className="text-background/70">{'></script>'}</span>
                  {'\n\n'}
                  <span className="text-background/50">{'<!-- Place the widget anywhere in your app -->'}</span>
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
                  <span className="text-accent">{'  theme'}</span>
                  <span className="text-background">{'='}</span>
                  <span className="text-accent">{'"light"'}</span>
                  {'\n'}
                  <span className="text-background/70">{'></health-ai-widget>'}</span>
                </code>
              </pre>
            </Card>

            <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium text-accent">That's it!</p>
                  <p className="text-sm text-background/60 mt-1">
                    The widget automatically connects to your FHIR server, fetches patient data, 
                    runs the AI prediction, and displays results. No backend code required.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* More Integration Options */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-4">More Integration Options</h2>
            
            <Tabs defaultValue="react" className="w-full">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="react" className="data-[state=active]:bg-white/10 data-[state=active]:text-background">React</TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-white/10 data-[state=active]:text-background">REST API</TabsTrigger>
                <TabsTrigger value="webhook" className="data-[state=active]:bg-white/10 data-[state=active]:text-background">Webhooks</TabsTrigger>
              </TabsList>

              <TabsContent value="react" className="mt-4">
                <Card className="bg-black/40 border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-sm text-background/50">PatientDashboard.jsx</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background/50 hover:text-background hover:bg-white/10"
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
                </Card>
              </TabsContent>

              <TabsContent value="api" className="mt-4">
                <Card className="bg-black/40 border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-sm text-background/50">server.js</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background/50 hover:text-background hover:bg-white/10"
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
                </Card>
              </TabsContent>

              <TabsContent value="webhook" className="mt-4">
                <Card className="bg-black/40 border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                    <span className="text-sm text-background/50">webhook-payload.json</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background/50 hover:text-background hover:bg-white/10"
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
                </Card>
              </TabsContent>
            </Tabs>
          </motion.section>

          {/* Use Cases */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">What You Can Build</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: "Custom EMR", desc: "Build your own electronic medical records with AI built-in" },
                { title: "Patient Portals", desc: "Add AI insights to patient-facing dashboards" },
                { title: "Telehealth Apps", desc: "Real-time risk scores during video consultations" },
                { title: "Clinical Tools", desc: "Specialty-specific applications with AI predictions" },
              ].map((item, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-background/50">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
          >
            <h3 className="text-2xl font-semibold mb-2">Ready to get started?</h3>
            <p className="text-background/60 mb-6">
              Get your API key and start building in under 5 minutes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Get API Key
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/20 text-background hover:bg-white/10 bg-transparent" asChild>
                <Link href="/portal">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Portal
                </Link>
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
