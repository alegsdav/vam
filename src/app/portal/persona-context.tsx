"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Persona = "clinical" | "business" | "technical";

type PersonaContextType = {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  labels: {
    volume: string;
    volumeUnit: string;
    speed: string;
    speedUnit: string;
    failures: string;
    failuresUnit: string;
    value: string;
    valueUnit: string;
  };
};

const personaLabels: Record<Persona, PersonaContextType["labels"]> = {
  clinical: {
    volume: "Patients Analyzed",
    volumeUnit: "patients",
    speed: "Time to Result",
    speedUnit: "seconds",
    failures: "Failed Screenings",
    failuresUnit: "screenings",
    value: "Hours Saved",
    valueUnit: "hours",
  },
  business: {
    volume: "Inference Count",
    volumeUnit: "inferences",
    speed: "Model Latency",
    speedUnit: "ms",
    failures: "Error Rate",
    failuresUnit: "%",
    value: "Revenue Generated",
    valueUnit: "USD",
  },
  technical: {
    volume: "Total Requests",
    volumeUnit: "requests",
    speed: "P99 Latency",
    speedUnit: "ms",
    failures: "4xx/5xx Responses",
    failuresUnit: "errors",
    value: "Compute Cost",
    valueUnit: "USD",
  },
};

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("clinical");

  const value = {
    persona,
    setPersona,
    labels: personaLabels[persona],
  };

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return context;
}
