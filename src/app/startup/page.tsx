"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  Rocket, 
  Link2, 
  Check, 
  Database,
  Code2,
  Zap,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Play,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Data mapping fields
const aiInputFields = [
  { id: "patient_age", label: "patient_age", type: "integer", description: "Patient's age in years" },
  { id: "patient_gender", label: "patient_gender", type: "string", description: "M/F/Other" },
  { id: "heart_rate", label: "heart_rate", type: "integer", description: "BPM" },
  { id: "blood_pressure_sys", label: "blood_pressure_sys", type: "integer", description: "mmHg systolic" },
  { id: "blood_pressure_dia", label: "blood_pressure_dia", type: "integer", description: "mmHg diastolic" },
  { id: "temperature", label: "temperature", type: "float", description: "Fahrenheit" },
  { id: "lab_wbc", label: "lab_wbc", type: "float", description: "White blood cell count" },
  { id: "diagnosis_codes", label: "diagnosis_codes", type: "array", description: "ICD-10 codes" },
];

const fhirFields = [
  { id: "birthDate", label: "Patient.birthDate", type: "date", description: "FHIR date format" },
  { id: "gender", label: "Patient.gender", type: "code", description: "male/female/other" },
  { id: "heartRate", label: "Observation.heartRate", type: "quantity", description: "FHIR vital sign" },
  { id: "bpSystolic", label: "Observation.bp.systolic", type: "quantity", description: "FHIR vital sign" },
  { id: "bpDiastolic", label: "Observation.bp.diastolic", type: "quantity", description: "FHIR vital sign" },
  { id: "temperature", label: "Observation.temperature", type: "quantity", description: "FHIR vital sign" },
  { id: "wbc", label: "Observation.wbc", type: "quantity", description: "Lab result" },
  { id: "conditions", label: "Condition.code", type: "CodeableConcept", description: "FHIR conditions" },
];

const autoMappings: Record<string, string> = {
  "patient_age": "birthDate",
  "patient_gender": "gender",
  "heart_rate": "heartRate",
  "blood_pressure_sys": "bpSystolic",
  "blood_pressure_dia": "bpDiastolic",
  "temperature": "temperature",
  "lab_wbc": "wbc",
  "diagnosis_codes": "conditions",
};

type OnboardingStep = "api" | "mapping" | "test" | "complete";

export default function StartupView() {
  const [step, setStep] = useState<OnboardingStep>("api");
  const [apiUrl, setApiUrl] = useState("https://api.myaicompany.com/v1/predict");
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [isAutoMapping, setIsAutoMapping] = useState(false);
  const [testResult, setTestResult] = useState<"idle" | "testing" | "success">("idle");
  
  const leftRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{from: string, to: string, x1: number, y1: number, x2: number, y2: number}[]>([]);

  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines: typeof lines = [];

      Object.entries(mappings).forEach(([aiField, fhirField]) => {
        const leftEl = leftRefs.current[aiField];
        const rightEl = rightRefs.current[fhirField];
        
        if (leftEl && rightEl) {
          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();
          
          newLines.push({
            from: aiField,
            to: fhirField,
            x1: leftRect.right - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top,
          });
        }
      });

      setLines(newLines);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, [mappings]);

  const handleAutoMap = async () => {
    setIsAutoMapping(true);
    
    for (const [aiField, fhirField] of Object.entries(autoMappings)) {
      await new Promise(r => setTimeout(r, 300));
      setMappings(prev => ({ ...prev, [aiField]: fhirField }));
    }
    
    setIsAutoMapping(false);
  };

  const handleFieldClick = (fieldId: string, side: "left" | "right") => {
    if (side === "left") {
      setSelectedField(fieldId);
    } else if (selectedField) {
      setMappings(prev => ({ ...prev, [selectedField]: fieldId }));
      setSelectedField(null);
    }
  };

  const handleTest = async () => {
    setTestResult("testing");
    await new Promise(r => setTimeout(r, 2500));
    setTestResult("success");
  };

  const steps: { id: OnboardingStep; label: string; icon: React.ElementType }[] = [
    { id: "api", label: "Connect API", icon: Link2 },
    { id: "mapping", label: "Map Data", icon: Database },
    { id: "test", label: "Test", icon: Play },
    { id: "complete", label: "Go Live", icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-foreground text-background">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-background/50 hover:text-background transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Exit Demo</span>
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Developer Console</h1>
                  <p className="text-xs text-background/50">AI Provider Portal</p>
                </div>
              </div>
            </div>
            <Badge className="bg-white/10 text-background/70 border-0">
              Demo Mode
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => {
              const stepIndex = steps.findIndex(x => x.id === step);
              const isComplete = i < stepIndex;
              const isCurrent = s.id === step;
              
              return (
                <div key={s.id} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isComplete ? 'bg-accent text-white' :
                      isCurrent ? 'bg-white text-foreground' :
                      'bg-white/10 text-background/50'
                    }`}>
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <s.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-sm font-medium ${isCurrent ? 'text-background' : 'text-background/50'}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${isComplete ? 'bg-accent' : 'bg-white/20'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Connect API */}
          {step === "api" && (
            <motion.div
              key="api"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold mb-2">Connect Your AI Model</h2>
                <p className="text-background/60">Paste your API endpoint and we'll handle the rest</p>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">API Endpoint URL</label>
                      <Input
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        className="bg-white/10 border-white/20 text-background placeholder:text-background/40 h-12"
                        placeholder="https://api.yourcompany.com/predict"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">API Key (optional)</label>
                      <Input
                        type="password"
                        className="bg-white/10 border-white/20 text-background placeholder:text-background/40 h-12"
                        placeholder="sk-..."
                        defaultValue="sk-demo-key-12345"
                      />
                    </div>

                    <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                        <div>
                          <p className="font-medium text-accent">Auto-detected: Sepsis Prediction Model</p>
                          <p className="text-sm text-background/60 mt-1">
                            We detected your model accepts vital signs and returns risk scores. 
                            We'll auto-map compatible fields in the next step.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full h-12 bg-white text-foreground hover:bg-white/90"
                      onClick={() => setStep("mapping")}
                    >
                      Continue to Data Mapping
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Data Mapping */}
          {step === "mapping" && (
            <motion.div
              key="mapping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-1">Map Your Data Fields</h2>
                  <p className="text-background/60">Connect your AI input fields to FHIR hospital data</p>
                </div>
                <Button 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent/10 bg-transparent"
                  onClick={handleAutoMap}
                  disabled={isAutoMapping || Object.keys(mappings).length > 0}
                >
                  {isAutoMapping ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Auto-mapping...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Auto-Map Fields
                    </>
                  )}
                </Button>
              </div>

              <Card className="bg-white/5 border-white/10 overflow-hidden">
                <CardContent className="p-0">
                  <div 
                    ref={containerRef}
                    className="relative grid grid-cols-2 gap-8 p-8"
                  >
                    {/* SVG Lines */}
                    <svg className="absolute inset-0 pointer-events-none z-10">
                      {lines.map((line) => (
                        <motion.path
                          key={`${line.from}-${line.to}`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          d={`M ${line.x1} ${line.y1} C ${line.x1 + 80} ${line.y1}, ${line.x2 - 80} ${line.y2}, ${line.x2} ${line.y2}`}
                          stroke="#84cc16"
                          strokeWidth="2"
                          fill="none"
                          className="drop-shadow-[0_0_4px_rgba(132,204,22,0.5)]"
                        />
                      ))}
                    </svg>

                    {/* Left Column - AI Input */}
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                        <Code2 className="w-5 h-5 text-background/70" />
                        <h3 className="font-semibold">My AI Input (JSON)</h3>
                      </div>
                      <div className="space-y-2">
                        {aiInputFields.map((field) => {
                          const isMapped = field.id in mappings;
                          const isSelected = selectedField === field.id;
                          
                          return (
                            <div
                              key={field.id}
                              ref={el => { leftRefs.current[field.id] = el; }}
                              onClick={() => handleFieldClick(field.id, "left")}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                isMapped 
                                  ? 'bg-accent/10 border-accent/50' 
                                  : isSelected
                                    ? 'bg-white/10 border-white'
                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <code className="text-sm font-mono text-background">{field.label}</code>
                                  <p className="text-xs text-background/40 mt-0.5">{field.type} • {field.description}</p>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${
                                  isMapped ? 'bg-accent' : isSelected ? 'bg-white' : 'bg-white/20'
                                }`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column - FHIR */}
                    <div>
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                        <Database className="w-5 h-5 text-background/70" />
                        <h3 className="font-semibold">Hospital Data (FHIR)</h3>
                      </div>
                      <div className="space-y-2">
                        {fhirFields.map((field) => {
                          const mappedFrom = Object.entries(mappings).find(([_, v]) => v === field.id)?.[0];
                          const isMapped = !!mappedFrom;
                          
                          return (
                            <div
                              key={field.id}
                              ref={el => { rightRefs.current[field.id] = el; }}
                              onClick={() => handleFieldClick(field.id, "right")}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                isMapped 
                                  ? 'bg-accent/10 border-accent/50' 
                                  : selectedField
                                    ? 'bg-white/5 border-white/30 hover:bg-white/10'
                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className={`w-3 h-3 rounded-full ${isMapped ? 'bg-accent' : 'bg-white/20'}`} />
                                <div className="text-right flex-1 ml-3">
                                  <code className="text-sm font-mono text-background">{field.label}</code>
                                  <p className="text-xs text-background/40 mt-0.5">{field.type} • {field.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="px-8 py-4 bg-white/5 border-t border-white/10">
                    <p className="text-sm text-background/60">
                      {selectedField ? (
                        <span className="text-white">Now click a FHIR field on the right to create a mapping</span>
                      ) : Object.keys(mappings).length === 0 ? (
                        "Click a field on the left to start mapping, or use Auto-Map"
                      ) : (
                        <span className="text-accent">{Object.keys(mappings).length} of {aiInputFields.length} fields mapped</span>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-6">
                <Button 
                  className="h-12 px-8 bg-white text-foreground hover:bg-white/90"
                  onClick={() => setStep("test")}
                  disabled={Object.keys(mappings).length < 3}
                >
                  Continue to Test
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Test */}
          {step === "test" && (
            <motion.div
              key="test"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold mb-2">Test Your Integration</h2>
                <p className="text-background/60">We'll send a test request with sample FHIR data</p>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  {testResult === "idle" && (
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                        <Play className="w-10 h-10 text-background/70" />
                      </div>
                      <p className="text-background/60 mb-6">
                        Click below to test your AI model with sample patient data from a FHIR server.
                      </p>
                      <Button 
                        className="h-12 px-8 bg-white text-foreground hover:bg-white/90"
                        onClick={handleTest}
                      >
                        <Zap className="w-5 h-5 mr-2" />
                        Run Test
                      </Button>
                    </div>
                  )}

                  {testResult === "testing" && (
                    <div className="text-center">
                      <Loader2 className="w-16 h-16 text-background/70 animate-spin mx-auto mb-6" />
                      <h3 className="text-xl font-semibold mb-2">Testing Integration...</h3>
                      <p className="text-background/60">Sending request to your API</p>
                    </div>
                  )}

                  {testResult === "success" && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4"
                        >
                          <Check className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-semibold text-accent">Test Passed!</h3>
                      </div>

                      <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                        <p className="text-background/50 mb-2">// Response from your API</p>
                        <pre className="text-accent">
{`{
  "prediction": "high_risk",
  "confidence": 0.87,
  "risk_score": 0.73,
  "factors": ["elevated_hr", "low_bp", "fever"]
}`}
                        </pre>
                      </div>

                      <Button 
                        className="w-full h-12 bg-accent hover:bg-accent/90 text-white"
                        onClick={() => setStep("complete")}
                      >
                        Continue to Go Live
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-4xl font-semibold mb-4">You're Live! 🎉</h2>
              <p className="text-xl text-background/60 mb-8">
                Your AI model is now available to hospitals in the HealthBridge marketplace.
              </p>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-3xl font-bold text-accent">0</p>
                      <p className="text-sm text-background/50">Hospitals Connected</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-background">0</p>
                      <p className="text-sm text-background/50">API Calls Today</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-background">—</p>
                      <p className="text-sm text-background/50">Avg Response Time</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-sm text-background/60 mb-4">What happens next:</p>
                    <div className="text-left space-y-3">
                      {[
                        "Your app will appear in the HealthBridge Marketplace",
                        "Hospital admins can install with one click",
                        "Your AI will receive real FHIR data through our secure bridge"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                className="mt-6 bg-transparent border border-white/20 text-background hover:bg-white/10"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Demo Home
                </Link>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
