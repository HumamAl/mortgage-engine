import type { Profile, PortfolioProject } from "@/lib/types";

export const profile: Profile = {
  name: "Humam",
  tagline: "Full-stack engineer specializing in rules-driven platforms and AI integration",
  bio: "Built production systems that blend deterministic business logic with AI — from automated RFQ processing with confidence-scored extraction to lead scoring engines with configurable rule sets. My approach to this underwriting engine: rules first, AI second, every decision explainable.",
  approach: [
    {
      title: "Understand the Underwriting Logic",
      description: "Map every eligibility rule, DRS weight, and pricing tier into a versioned rule schema before writing a line of code",
    },
    {
      title: "Build the Decision Engine First",
      description: "Deterministic rules engine with full audit trail — production-ready before adding any AI layer",
    },
    {
      title: "Layer AI with Human Oversight",
      description: "Document classification, condition suggestions, and risk narratives — all reviewable, all overridable by underwriters",
    },
    {
      title: "Ship Incrementally",
      description: "Phase 1 delivers core underwriting with 100-500 app/month capacity. Phase 2 adds AI features with the same explainability guarantee",
    },
  ],
  skillCategories: [
    {
      name: "Frontend",
      skills: [
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "Recharts",
      ],
    },
    {
      name: "Backend & Data",
      skills: [
        "Node.js",
        "PostgreSQL",
        "REST API Design",
        "Background Jobs",
        "Audit Logging",
      ],
    },
    {
      name: "AI & Document Processing",
      skills: [
        "Claude API",
        "Document AI (OCR)",
        "Structured Extraction",
        "Confidence Scoring",
        "Prompt Engineering",
      ],
    },
    {
      name: "Fintech & Compliance",
      skills: [
        "Rules Engines",
        "Risk Scoring Models",
        "PII Handling",
        "Role-Based Access",
        "Decision Audit Trails",
      ],
    },
  ],
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wmf-agent",
    title: "AI Agent — Automated RFQ Processing",
    description: "AI-powered system that classifies incoming emails, extracts structured RFQ data with confidence scoring, and generates quotes through a human-in-the-loop approval workflow.",
    tech: ["Next.js", "Claude API", "n8n", "Microsoft Graph"],
    relevance: "Reduced quote turnaround from 4 hours to 20 minutes — same pattern of rules + AI + human oversight this underwriting engine needs",
  },
  {
    id: "lead-crm",
    title: "Lead Scoring CRM with Automation Rules",
    description: "Lead intake system with configurable scoring rules, pipeline management, and automation triggers that team members can enable/disable without code changes.",
    tech: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    relevance: "Handles 200+ leads/day with rule-based scoring — directly analogous to DRS composite scoring logic",
  },
  {
    id: "fleet-saas",
    title: "Fleet Management SaaS (6-Module Platform)",
    description: "Multi-module SaaS with asset tracking, work orders, preventive maintenance scheduling, inspections, parts inventory, and analytics dashboard.",
    tech: ["Next.js", "Recharts", "TypeScript", "shadcn/ui"],
    relevance: "6-module SaaS managing 500+ assets — demonstrates ability to architect complex, data-heavy platforms like underwriting dashboards",
  },
  {
    id: "ai-store",
    title: "AI-Powered Store Builder",
    description: "Wizard-based platform that generates conversion-optimized Shopify stores using AI — structured data extraction from user inputs into store templates.",
    tech: ["Next.js", "TypeScript", "AI Pipeline", "Tailwind"],
    relevance: "AI pipeline with structured output + template generation — same extraction-to-structured-data pattern needed for document processing",
  },
];
