import type { Challenge } from "@/lib/types";

export const executiveSummary = "The core challenge is building a mortgage underwriting engine that balances automation speed with regulatory explainability — every decision must be traceable to a specific rule, every AI suggestion must be human-reviewable, and the system must scale to 500 applications/month while remaining defensible to capital partners.";

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Deterministic Rules Engine",
    description: "Building a versioned eligibility engine that evaluates LTV, DTI, credit score, reserves, and property rules in a defined sequence — producing an auditable decision trail for every application.",
    visualizationType: "decision-flow",
    outcome: "Every approval or denial traces back to a specific rule version — no black-box decisions, fully defensible to capital partners.",
  },
  {
    id: "challenge-2",
    title: "Explainable AI Layer",
    description: "Integrating AI for document classification, risk narrative generation, and condition suggestions while keeping the deterministic rules engine as the source of truth — AI assists, never decides.",
    visualizationType: "architecture",
    outcome: "AI reduces underwriter workload by 60% while maintaining 100% explainability for every decision.",
  },
  {
    id: "challenge-3",
    title: "Composite Risk Scoring (DRS)",
    description: "Implementing a weighted scoring model across 6 dimensions — credit, DTI, LTV, employment stability, reserves, and property condition — with tier-based pricing that auto-adjusts rates.",
    visualizationType: "metrics",
    outcome: "Standardizes risk assessment from subjective underwriter judgment to a repeatable, auditable 0-100 score with clear tier boundaries.",
  },
  {
    id: "challenge-4",
    title: "Document Processing Pipeline",
    description: "Building an OCR-to-extraction pipeline that classifies uploaded documents, extracts structured data (income, assets, employment), and cross-validates against stated application data.",
    visualizationType: "flow",
    outcome: "Reduces document review time from 2-3 hours per application to under 15 minutes with 97%+ extraction accuracy.",
  },
  {
    id: "challenge-5",
    title: "Audit Trail & Compliance",
    description: "Every system action, rule evaluation, AI suggestion, and underwriter decision must be logged with timestamps, actor identification, and before/after state — supporting fair lending reviews and regulatory audits.",
    visualizationType: "before-after",
    outcome: "Audit preparation time drops from days of manual log compilation to instant report generation with full decision lineage.",
  },
];
