export interface AIModule {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "clinical" | "administrative" | "analytics" | "workflow" | "communication";
  categoryLabel: string;
  useCases: string[];
  exampleInput: string;
  exampleOutput: string;
  latency: string;
  enabled?: boolean;
}

export const AI_MODULES: AIModule[] = [
  {
    id: "clinical-note-summarization",
    name: "Clinical Note Summarization",
    shortDescription: "Condense lengthy clinical notes into concise summaries",
    description: "Automatically extract key findings, diagnoses, and recommendations from clinical documentation. Uses advanced NLP to identify critical information while maintaining clinical accuracy.",
    category: "clinical",
    categoryLabel: "Clinical Intelligence",
    useCases: [
      "Reduce physician documentation review time",
      "Create patient handoff summaries",
      "Generate care transition documents"
    ],
    exampleInput: "Patient presents with 3-day history of productive cough, fever up to 101.2F, and shortness of breath on exertion. PMH significant for COPD, HTN, T2DM. Physical exam reveals decreased breath sounds in RLL with rhonchi. SpO2 92% on room air...",
    exampleOutput: "Summary: 67yo with COPD presenting with community-acquired pneumonia (RLL). Key findings: Fever, productive cough, hypoxia (92% RA). Recommend: CXR, CBC, BMP, start empiric antibiotics.",
    latency: "< 2s"
  },
  {
    id: "patient-risk-scoring",
    name: "Patient Risk Scoring",
    shortDescription: "Predictive risk stratification for patient populations",
    description: "ML-powered risk scoring that analyzes clinical, demographic, and social determinants data to identify high-risk patients. Supports multiple risk models including readmission, deterioration, and disease-specific scores.",
    category: "analytics",
    categoryLabel: "Predictive Analytics",
    useCases: [
      "Identify patients at risk of 30-day readmission",
      "Prioritize care management outreach",
      "Allocate resources for high-acuity patients"
    ],
    exampleInput: "{ age: 72, diagnoses: ['CHF', 'CKD Stage 3', 'T2DM'], admissions_12m: 3, medications: 12, lives_alone: true }",
    exampleOutput: "{ risk_score: 0.78, risk_tier: 'HIGH', contributing_factors: ['Recent hospitalizations', 'Multiple comorbidities', 'Social isolation'], recommended_interventions: ['Care manager assignment', 'Weekly telehealth check-in'] }",
    latency: "< 500ms"
  },
  {
    id: "visit-transcription",
    name: "Visit Transcription",
    shortDescription: "Real-time clinical encounter transcription",
    description: "HIPAA-compliant speech-to-text specifically trained on medical terminology, drug names, and clinical workflows. Supports speaker diarization to distinguish between clinician and patient.",
    category: "clinical",
    categoryLabel: "Clinical Intelligence",
    useCases: [
      "Ambient documentation during patient visits",
      "Telemedicine session capture",
      "Quality assurance and training"
    ],
    exampleInput: "[Audio stream from clinical encounter - 15 minutes]",
    exampleOutput: "Dr. Smith: Good morning, how are you feeling today?\nPatient: The chest pain is still there, especially when I walk up stairs.\nDr. Smith: On a scale of 1 to 10, how would you rate it?...",
    latency: "Real-time streaming"
  },
  {
    id: "coding-billing-assist",
    name: "Coding & Billing Assist",
    shortDescription: "Automated ICD-10 and CPT code suggestions",
    description: "Analyzes clinical documentation to suggest appropriate diagnosis and procedure codes. Includes confidence scoring and documentation improvement suggestions to support accurate reimbursement.",
    category: "administrative",
    categoryLabel: "Revenue Cycle",
    useCases: [
      "Reduce coding backlog and turnaround time",
      "Improve coding accuracy and completeness",
      "Identify documentation gaps before claim submission"
    ],
    exampleInput: "Patient admitted for acute exacerbation of COPD with respiratory failure requiring BiPAP. Also treated for urinary tract infection.",
    exampleOutput: "Suggested codes: J44.1 (COPD with acute exacerbation), J96.00 (Acute respiratory failure), N39.0 (UTI). Documentation opportunity: Specify organism for UTI to support J96.01 if hypoxic.",
    latency: "< 3s"
  },
  {
    id: "prior-auth-automation",
    name: "Prior Authorization Automation",
    shortDescription: "Streamline prior authorization submissions",
    description: "Automates the collection of clinical evidence, form population, and submission tracking for prior authorizations. Integrates with major payer portals and tracks approval status.",
    category: "administrative",
    categoryLabel: "Revenue Cycle",
    useCases: [
      "Reduce prior auth processing time by 80%",
      "Decrease claim denials from incomplete submissions",
      "Free staff from manual payer portal entry"
    ],
    exampleInput: "Request: MRI lumbar spine for patient with 6-week history of radiculopathy, failed conservative treatment",
    exampleOutput: "Prior auth package generated: Clinical summary extracted, supporting documentation attached, form pre-populated. Ready for review and submission to UnitedHealthcare.",
    latency: "< 5s"
  },
  {
    id: "symptom-extraction",
    name: "Symptom Extraction",
    shortDescription: "Structured symptom data from unstructured notes",
    description: "NLP engine that identifies and normalizes symptoms from clinical text into structured data. Maps to standard terminologies (SNOMED-CT) for downstream analytics and clinical decision support.",
    category: "clinical",
    categoryLabel: "Clinical Intelligence",
    useCases: [
      "Power symptom-based clinical decision support",
      "Enable syndromic surveillance",
      "Support clinical research data extraction"
    ],
    exampleInput: "Chief complaint: Patient reports severe headache x3 days, worse in the morning, with nausea but no vomiting. Denies fever, neck stiffness, or visual changes.",
    exampleOutput: "Extracted: [{ symptom: 'Headache', severity: 'severe', duration: '3 days', timing: 'worse AM', snomed: '25064002' }, { symptom: 'Nausea', negated: false, snomed: '422587007' }, { symptom: 'Fever', negated: true }...]",
    latency: "< 1s"
  },
  {
    id: "followup-recommendation",
    name: "Follow-up Recommendation",
    shortDescription: "Intelligent care gap and follow-up identification",
    description: "Analyzes patient records against evidence-based guidelines to identify recommended follow-ups, screenings, and care gaps. Prioritizes based on clinical urgency and time sensitivity.",
    category: "workflow",
    categoryLabel: "Care Coordination",
    useCases: [
      "Proactive patient outreach for overdue care",
      "Pre-visit planning and agenda setting",
      "Population health management"
    ],
    exampleInput: "{ patient_id: 'P-12345', last_a1c: '2024-03-15', last_eye_exam: '2022-08-01', diagnoses: ['T2DM', 'HTN'] }",
    exampleOutput: "Recommendations: 1) A1C due (>3 months since last), 2) Diabetic eye exam overdue (>1 year), 3) Consider nephropathy screening (no urine microalbumin on record). Priority: Eye exam (CRITICAL).",
    latency: "< 1s"
  },
  {
    id: "medication-reconciliation",
    name: "Medication Reconciliation",
    shortDescription: "Automated medication list comparison and conflict detection",
    description: "Compares medication lists from multiple sources (EHR, pharmacy, patient-reported) to identify discrepancies, duplications, and potential interactions. Supports transitions of care.",
    category: "clinical",
    categoryLabel: "Clinical Intelligence",
    useCases: [
      "Hospital admission and discharge reconciliation",
      "Identify polypharmacy risks",
      "Detect potential drug interactions"
    ],
    exampleInput: "EHR list: [Metformin 1000mg BID, Lisinopril 10mg daily]. Pharmacy claims: [Metformin 500mg BID, Lisinopril 10mg, Atorvastatin 20mg]",
    exampleOutput: "Discrepancies found: 1) Metformin dose mismatch (EHR: 1000mg vs Claims: 500mg), 2) Atorvastatin on claims not in EHR. Recommend: Verify current metformin dose, add statin to EHR if confirmed.",
    latency: "< 2s"
  },
  {
    id: "readmission-prediction",
    name: "Readmission Prediction",
    shortDescription: "30-day hospital readmission risk prediction",
    description: "Validated ML model predicting likelihood of unplanned readmission within 30 days. Incorporates clinical, social, and utilization data. Includes explainability for contributing factors.",
    category: "analytics",
    categoryLabel: "Predictive Analytics",
    useCases: [
      "Target discharge planning resources",
      "Prioritize post-discharge follow-up",
      "Reduce CMS readmission penalties"
    ],
    exampleInput: "{ admission_diagnosis: 'CHF exacerbation', los: 5, age: 68, prior_admits_6m: 2, discharge_disposition: 'home', has_pcp: true }",
    exampleOutput: "{ readmission_risk: 0.34, percentile: 82, key_factors: ['Prior admissions', 'CHF diagnosis', 'Length of stay > 4 days'], suggested_interventions: ['Schedule 7-day follow-up', 'Home health referral', 'Medication teach-back'] }",
    latency: "< 500ms"
  },
  {
    id: "population-health-insights",
    name: "Population Health Insights",
    shortDescription: "Aggregate analytics and cohort intelligence",
    description: "Provides population-level analytics including risk stratification summaries, care gap analyses, and trend identification. Supports custom cohort definitions and comparison benchmarking.",
    category: "analytics",
    categoryLabel: "Predictive Analytics",
    useCases: [
      "ACO quality measure tracking",
      "Identify emerging health trends",
      "Resource planning and allocation"
    ],
    exampleInput: "Query: Diabetic patients in ZIP 90210 with A1C > 9 and no PCP visit in 6 months",
    exampleOutput: "Cohort identified: 127 patients. Demographics: 62% female, mean age 58. Risk distribution: 34% high-risk. Trending: +12% vs last quarter. Geographic clustering in 3 census tracts.",
    latency: "< 5s"
  },
  {
    id: "patient-sentiment-analysis",
    name: "Patient Sentiment Analysis",
    shortDescription: "Analyze patient feedback and communication tone",
    description: "NLP analysis of patient communications, surveys, and portal messages to detect sentiment, urgency, and potential dissatisfaction. Enables proactive patient experience management.",
    category: "communication",
    categoryLabel: "Patient Engagement",
    useCases: [
      "Prioritize patient messages by urgency",
      "Identify at-risk patient relationships",
      "Aggregate patient experience insights"
    ],
    exampleInput: "Patient message: 'I've been waiting 3 days for my test results and nobody has called me back. This is unacceptable. I need to know what's going on with my health.'",
    exampleOutput: "{ sentiment: 'negative', urgency: 'high', themes: ['wait_time', 'communication_gap', 'anxiety'], recommended_action: 'Immediate callback', escalation: true }",
    latency: "< 1s"
  },
  {
    id: "care-plan-suggestions",
    name: "Care Plan Suggestions",
    shortDescription: "Evidence-based care plan recommendations",
    description: "Generates personalized care plan recommendations based on patient diagnoses, risk factors, and evidence-based guidelines. Supports chronic disease management and preventive care.",
    category: "clinical",
    categoryLabel: "Clinical Intelligence",
    useCases: [
      "Standardize chronic disease management",
      "Support care team planning",
      "Enable patient self-management"
    ],
    exampleInput: "{ diagnoses: ['T2DM', 'Obesity', 'HTN'], current_a1c: 8.2, bmi: 34, medications: ['Metformin'] }",
    exampleOutput: "Care plan recommendations: 1) Consider GLP-1 agonist addition (A1C > 7, obesity), 2) Refer to diabetes educator, 3) Set weight loss goal of 5-7%, 4) Increase home BP monitoring. Guideline: ADA Standards of Care 2024.",
    latency: "< 2s"
  },
  {
    id: "compliance-validation",
    name: "Compliance Validation",
    shortDescription: "Documentation and regulatory compliance checking",
    description: "Automated validation of clinical documentation against regulatory requirements, payer rules, and organizational policies. Identifies gaps before they become compliance issues.",
    category: "administrative",
    categoryLabel: "Revenue Cycle",
    useCases: [
      "Pre-billing documentation review",
      "Audit preparation and readiness",
      "Training and feedback for clinicians"
    ],
    exampleInput: "Note type: E/M Level 4 (99214). Documentation provided for review.",
    exampleOutput: "Compliance check: FAILED for Level 4. Issues: 1) Review of systems documents only 2 systems (need 2-9 for Level 4), 2) Physical exam missing 1 required element. Recommendation: Downcode to 99213 or enhance documentation.",
    latency: "< 3s"
  },
  {
    id: "appointment-optimization",
    name: "Appointment Optimization",
    shortDescription: "Smart scheduling and capacity management",
    description: "ML-powered scheduling optimization that predicts no-shows, suggests overbooking strategies, and optimizes appointment templates based on historical patterns and patient characteristics.",
    category: "workflow",
    categoryLabel: "Care Coordination",
    useCases: [
      "Reduce no-show rates",
      "Maximize provider utilization",
      "Improve patient access"
    ],
    exampleInput: "{ provider_id: 'DR001', date: '2024-12-15', current_slots: 20, historical_noshow_rate: 0.18 }",
    exampleOutput: "Optimization recommendations: 1) Add 3 overbook slots (optimal based on no-show prediction), 2) Patient P-789 has 40% no-show probability - suggest confirmation call, 3) Move complex visit from 4pm to 2pm slot.",
    latency: "< 2s"
  },
  {
    id: "triage-prioritization",
    name: "Triage Prioritization",
    shortDescription: "AI-assisted clinical triage and acuity scoring",
    description: "Analyzes patient-reported symptoms and vital signs to suggest triage priority and acuity level. Supports emergency department, urgent care, and nurse triage lines.",
    category: "workflow",
    categoryLabel: "Care Coordination",
    useCases: [
      "Standardize triage decisions",
      "Support nurse triage lines",
      "ED patient flow optimization"
    ],
    exampleInput: "{ chief_complaint: 'chest pain', age: 55, onset: '2 hours ago', character: 'pressure', associated: ['shortness of breath', 'diaphoresis'], vitals: { hr: 102, bp: '158/95' } }",
    exampleOutput: "{ acuity: 'ESI-2', priority: 'IMMEDIATE', rationale: 'Chest pain with concerning features in cardiac risk age group', recommended_pathway: 'STEMI alert consideration', confidence: 0.94 }",
    latency: "< 500ms"
  }
];

export const MODULE_CATEGORIES = [
  { id: "clinical", label: "Clinical Intelligence", count: 6 },
  { id: "administrative", label: "Revenue Cycle", count: 3 },
  { id: "analytics", label: "Predictive Analytics", count: 3 },
  { id: "workflow", label: "Care Coordination", count: 3 },
  { id: "communication", label: "Patient Engagement", count: 1 }
] as const;

export function getModulesByCategory(category: string): AIModule[] {
  return AI_MODULES.filter(m => m.category === category);
}

export function getModuleById(id: string): AIModule | undefined {
  return AI_MODULES.find(m => m.id === id);
}
