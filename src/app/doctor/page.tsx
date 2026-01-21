"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  User, 
  FileText, 
  Pill, 
  Activity,
  AlertTriangle,
  Clock,
  Heart,
  Thermometer,
  Droplets,
  Wind,
  Brain,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  X,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock patient data
const patient = {
  name: "Robert Martinez",
  mrn: "MRN-2847391",
  dob: "03/15/1956",
  age: 69,
  gender: "Male",
  phone: "(555) 234-8901",
  address: "1842 Oak Street, San Francisco, CA 94102",
  insurance: "Medicare Part A & B",
  pcp: "Dr. Sarah Chen",
  allergies: ["Penicillin", "Sulfa drugs"],
  conditions: ["Type 2 Diabetes", "Hypertension", "COPD", "CHF (Stage II)"],
  medications: [
    { name: "Metformin", dose: "1000mg", freq: "BID" },
    { name: "Lisinopril", dose: "20mg", freq: "Daily" },
    { name: "Albuterol", dose: "90mcg", freq: "PRN" },
    { name: "Furosemide", dose: "40mg", freq: "Daily" },
  ],
  vitals: {
    bp: "142/88",
    hr: 78,
    temp: "98.6°F",
    resp: 18,
    spo2: 94,
    weight: "187 lbs"
  },
  recentVisit: "01/18/2026",
  chiefComplaint: "Shortness of breath, increased swelling in ankles"
};

// AI Predictions
const aiPredictions = [
  {
    id: "los",
    title: "Length of Stay",
    value: "4.2 days",
    confidence: 87,
    insight: "Based on diagnosis, vitals, and comorbidities",
    status: "warning"
  },
  {
    id: "readmission",
    title: "30-Day Readmission Risk",
    value: "34%",
    confidence: 91,
    insight: "Elevated due to CHF history and recent admission",
    status: "danger"
  },
  {
    id: "sepsis",
    title: "Sepsis Risk",
    value: "Low",
    confidence: 94,
    insight: "No indicators of infection detected",
    status: "success"
  }
];

export default function DoctorView() {
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Main EHR Content */}
      <div className="flex-1 flex flex-col">
        {/* EHR Header - Clean monochrome style */}
        <header className="bg-foreground text-background">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-background/70 hover:text-background transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Exit Demo</span>
              </Link>
              <div className="w-px h-6 bg-white/20" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-sm text-foreground">E</div>
                <span className="font-semibold">Epic EHR</span>
                <Badge className="bg-white/10 text-white/70 border-0 text-xs">Demo</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>Dr. Sarah Chen, MD</span>
              <span className="text-background/50">|</span>
              <span className="text-background/70">Internal Medicine</span>
            </div>
          </div>
          
          {/* Patient Banner */}
          <div className="px-4 py-3 flex items-center gap-6 bg-white/5">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">{patient.name}</h1>
                <Badge className="bg-accent/20 text-accent border-accent/30">Inpatient</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-background/70 mt-1">
                <span>{patient.mrn}</span>
                <span>DOB: {patient.dob}</span>
                <span>{patient.age}y {patient.gender}</span>
                <span className="text-red-300">Allergies: {patient.allergies.join(", ")}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className={`${showAIPanel ? 'bg-accent hover:bg-accent/90' : 'bg-white/10 hover:bg-white/20'} border-0`}
                onClick={() => setShowAIPanel(!showAIPanel)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-4 flex gap-1 text-sm">
            {["Chart Review", "Notes", "Orders", "Results", "Medications", "Flowsheets"].map((tab, i) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-t transition-colors ${
                  i === 0 ? "bg-background text-foreground" : "text-background/70 hover:text-background hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* EHR Content */}
        <div className="flex-1 p-4 overflow-auto bg-muted/30">
          <div className="grid grid-cols-3 gap-4">
            {/* Left Column - Patient Info */}
            <div className="space-y-4">
              {/* Chief Complaint */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-2">Chief Complaint</h3>
                <p className="text-foreground">{patient.chiefComplaint}</p>
                <p className="text-sm text-muted-foreground mt-2">Visit: {patient.recentVisit}</p>
              </div>

              {/* Vitals */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Vitals</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">BP: <strong>{patient.vitals.bp}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">HR: <strong>{patient.vitals.hr}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Temp: <strong>{patient.vitals.temp}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Resp: <strong>{patient.vitals.resp}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">SpO2: <strong>{patient.vitals.spo2}%</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Wt: <strong>{patient.vitals.weight}</strong></span>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Active Problems</h3>
                <ul className="space-y-2">
                  {patient.conditions.map((condition, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-foreground" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Middle Column - Medications & Notes */}
            <div className="space-y-4">
              {/* Medications */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Current Medications</h3>
                <div className="space-y-2">
                  {patient.medications.map((med, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <p className="font-medium text-sm">{med.name}</p>
                        <p className="text-xs text-muted-foreground">{med.dose} • {med.freq}</p>
                      </div>
                      <Pill className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Notes */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Recent Notes</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">Progress Note</span>
                      <span className="text-xs text-muted-foreground">01/18/2026 14:32</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Patient admitted with acute on chronic CHF exacerbation. Reports worsening dyspnea on exertion and peripheral edema over past 3 days. Dietary indiscretion reported (high sodium intake). Started on IV diuresis...
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium">Nursing Assessment</span>
                      <span className="text-xs text-muted-foreground">01/18/2026 08:00</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      Patient alert and oriented x3. Breath sounds diminished at bases bilaterally. 2+ pitting edema noted bilateral lower extremities. Patient using 2L NC with SpO2 94%...
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Orders & Results */}
            <div className="space-y-4">
              {/* Pending Orders */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Pending Orders</h3>
                <div className="space-y-2">
                  {[
                    { order: "BMP", status: "Scheduled", time: "06:00" },
                    { order: "Chest X-Ray", status: "Ordered", time: "Pending" },
                    { order: "Echocardiogram", status: "Scheduled", time: "Tomorrow" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm font-medium">{item.order}</span>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{item.status}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Results */}
              <div className="bg-background rounded-lg border p-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-3">Recent Results</h3>
                <div className="space-y-2">
                  {[
                    { test: "BNP", value: "892", unit: "pg/mL", flag: "H" },
                    { test: "Creatinine", value: "1.4", unit: "mg/dL", flag: "H" },
                    { test: "Potassium", value: "4.2", unit: "mEq/L", flag: null },
                    { test: "Sodium", value: "138", unit: "mEq/L", flag: null },
                  ].map((result, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <span className="text-sm">{result.test}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${result.flag ? 'text-red-600' : ''}`}>
                          {result.value} {result.unit}
                        </span>
                        {result.flag && (
                          <span className="text-xs bg-red-100 text-red-600 px-1 rounded">{result.flag}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Sidebar - The Straits Widget */}
      <AnimatePresence>
        {showAIPanel && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background border-l flex flex-col overflow-hidden"
          >
            {/* AI Panel Header */}
            <div className="p-4 bg-foreground text-background">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Straits AI</h2>
                    <p className="text-xs text-background/70">Real-time Clinical Intelligence</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAIPanel(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-xs text-background/70">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Analyzing patient data in real-time</span>
              </div>
            </div>

            {/* AI Predictions */}
            <div className="flex-1 overflow-auto p-4 space-y-4">
              <h3 className="text-sm font-semibold">AI Predictions</h3>
              
              {aiPredictions.map((prediction) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedPrediction === prediction.id 
                      ? 'border-accent bg-accent/5' 
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                  onClick={() => setSelectedPrediction(
                    selectedPrediction === prediction.id ? null : prediction.id
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">{prediction.title}</p>
                      <p className={`text-2xl font-bold ${
                        prediction.status === 'danger' ? 'text-red-600' :
                        prediction.status === 'warning' ? 'text-amber-600' :
                        'text-accent'
                      }`}>
                        {prediction.value}
                      </p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prediction.status === 'danger' ? 'bg-red-100 text-red-700' :
                      prediction.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                      'bg-accent/10 text-accent'
                    }`}>
                      {prediction.confidence}% confidence
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{prediction.insight}</p>
                  
                  <AnimatePresence>
                    {selectedPrediction === prediction.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 pt-3 border-t"
                      >
                        <p className="text-xs text-muted-foreground mb-2">Contributing factors:</p>
                        <div className="space-y-1">
                          {["CHF diagnosis", "Elevated BNP", "Previous admission", "Comorbidities"].map((factor, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <ChevronRight className="w-3 h-3 text-accent" />
                              <span>{factor}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Recommended Actions */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold mb-3">Recommended Actions</h3>
                <div className="space-y-2">
                  {[
                    "Schedule cardiology consult",
                    "Order BNP trend monitoring",
                    "Review discharge planning",
                    "Consider home health referral"
                  ].map((action, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-foreground/30 flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-foreground/30" />
                      </div>
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Panel Footer */}
            <div className="p-4 border-t bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                Powered by Straits • Last updated 2 min ago
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
