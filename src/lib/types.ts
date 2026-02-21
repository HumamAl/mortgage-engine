import type { LucideIcon } from "lucide-react";

// Sidebar navigation
export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Challenge visualization types
export type VisualizationType =
  | "flow"
  | "before-after"
  | "metrics"
  | "architecture"
  | "risk-matrix"
  | "timeline"
  | "dual-kpi"
  | "tech-stack"
  | "decision-flow";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  visualizationType: VisualizationType;
  outcome?: string;
}

// Proposal types
export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  approach: { title: string; description: string }[];
  skillCategories: { name: string; skills: string[] }[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  relevance?: string;
}

// ─── Mortgage Underwriting Domain ───

export type ApplicationStatus =
  | "intake"
  | "document_review"
  | "underwriting"
  | "conditional_approval"
  | "approved"
  | "denied"
  | "manual_review"
  | "suspended";

export type RiskTier = "A" | "B" | "C" | "D" | "F";

export type PropertyType =
  | "single_family"
  | "condo"
  | "townhouse"
  | "multi_family_2_4";

export type LoanPurpose = "purchase" | "refinance" | "cash_out_refinance";

export type DocumentType =
  | "pay_stub"
  | "w2"
  | "tax_return"
  | "bank_statement"
  | "id_verification"
  | "property_appraisal"
  | "title_report"
  | "insurance_binder";

export type DocumentStatus =
  | "pending"
  | "uploaded"
  | "processing"
  | "verified"
  | "rejected"
  | "expired";

export interface Borrower {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ssn_last4: string;
  employmentType: "W2" | "self_employed" | "1099" | "retired";
  annualIncome: number;
  monthlyDebt: number;
  creditScore: number;
  yearsEmployed: number;
}

export interface Property {
  address: string;
  city: string;
  state: string;
  zip: string;
  type: PropertyType;
  appraisedValue: number;
  purchasePrice: number;
  yearBuilt: number;
}

export interface DRSBreakdown {
  creditScore: { value: number; weight: number; score: number };
  dti: { value: number; weight: number; score: number };
  ltv: { value: number; weight: number; score: number };
  employmentStability: { value: number; weight: number; score: number };
  reserves: { value: number; weight: number; score: number };
  propertyCondition: { value: number; weight: number; score: number };
  compositeScore: number;
  tier: RiskTier;
}

export interface Condition {
  id: string;
  description: string;
  category: "prior_to_docs" | "prior_to_funding" | "prior_to_closing";
  status: "outstanding" | "cleared" | "waived";
}

export interface Application {
  id: string;
  applicationNumber: string;
  borrower: Borrower;
  coBorrower?: Borrower;
  property: Property;
  loanPurpose: LoanPurpose;
  loanAmount: number;
  downPayment: number;
  interestRate: number;
  termMonths: number;
  status: ApplicationStatus;
  drs: DRSBreakdown;
  conditions: Condition[];
  submittedAt: string;
  updatedAt: string;
  assignedUnderwriter: string;
  notes: string;
}

export interface EligibilityRule {
  id: string;
  name: string;
  category: "ltv" | "dti" | "credit" | "reserves" | "property" | "income";
  description: string;
  condition: string;
  threshold: string;
  action: "approve" | "deny" | "manual_review" | "condition";
  isActive: boolean;
  lastModified: string;
  version: number;
}

export interface AuditEntry {
  id: string;
  applicationId: string;
  applicationNumber: string;
  timestamp: string;
  action: string;
  actor: string;
  actorType: "system" | "underwriter" | "ai_engine" | "borrower";
  details: string;
  previousValue?: string;
  newValue?: string;
  ruleId?: string;
}

export interface DashboardStats {
  totalApplications: number;
  approvalRate: number;
  averageDRS: number;
  pipelineValue: number;
  pendingReview: number;
  avgProcessingDays: number;
}

export interface MonthlyVolume {
  month: string;
  applications: number;
  approved: number;
  denied: number;
}

export interface RiskDistribution {
  tier: RiskTier;
  count: number;
  percentage: number;
}
