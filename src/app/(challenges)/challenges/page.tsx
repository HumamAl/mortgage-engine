import { challenges, executiveSummary } from "@/data/challenges";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronRight,
  Upload,
  Brain,
  ScanText,
  ShieldCheck,
  Database,
  FileCheck,
} from "lucide-react";

/* ─── Visualization: Decision Flow (Challenge 1) ─── */
function DecisionFlowViz() {
  const steps: {
    label: string;
    sublabel: string;
    type: "box" | "diamond" | "result";
  }[] = [
    { label: "Application", sublabel: "Received", type: "box" },
    { label: "Credit Score", sublabel: "\u2265 660?", type: "diamond" },
    { label: "DTI Ratio", sublabel: "\u2264 43%?", type: "diamond" },
    { label: "LTV Ratio", sublabel: "\u2264 90%?", type: "diamond" },
    { label: "Reserves", sublabel: "\u2265 2 months?", type: "diamond" },
    { label: "DRS Scoring", sublabel: "Composite", type: "box" },
    { label: "Decision", sublabel: "Approve / Deny", type: "result" },
  ];

  return (
    <div className="space-y-3">
      {/* Desktop flow */}
      <div className="hidden md:flex items-center justify-between gap-1 overflow-x-auto py-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1 shrink-0">
            {step.type === "diamond" ? (
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-2 rotate-45 rounded-sm bg-primary/10 border border-primary/30" />
                <div className="relative z-10 text-center">
                  <p className="text-[10px] font-semibold leading-tight">
                    {step.label}
                  </p>
                  <p className="text-[9px] text-muted-foreground leading-tight">
                    {step.sublabel}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={
                  step.type === "result"
                    ? "rounded-lg border-2 border-primary bg-primary/10 px-3 py-2 text-center min-w-[72px]"
                    : "rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-center min-w-[72px]"
                }
              >
                <p className="text-[10px] font-semibold leading-tight">
                  {step.label}
                </p>
                <p className="text-[9px] text-muted-foreground leading-tight">
                  {step.sublabel}
                </p>
              </div>
            )}
            {i < steps.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 text-primary/50 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile flow (vertical) */}
      <div className="md:hidden flex flex-col items-center gap-1 py-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center gap-1">
            {step.type === "diamond" ? (
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-2 rotate-45 rounded-sm bg-primary/10 border border-primary/30" />
                <div className="relative z-10 text-center">
                  <p className="text-[10px] font-semibold leading-tight">
                    {step.label}
                  </p>
                  <p className="text-[9px] text-muted-foreground leading-tight">
                    {step.sublabel}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={
                  step.type === "result"
                    ? "rounded-lg border-2 border-primary bg-primary/10 px-4 py-2 text-center"
                    : "rounded-lg border border-primary/30 bg-primary/5 px-4 py-2 text-center"
                }
              >
                <p className="text-[10px] font-semibold">{step.label}</p>
                <p className="text-[9px] text-muted-foreground">
                  {step.sublabel}
                </p>
              </div>
            )}
            {i < steps.length - 1 && (
              <div className="w-px h-4 bg-primary/30" />
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rotate-45 rounded-[2px] bg-primary/10 border border-primary/30" />
          Decision gate
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-[2px] bg-primary/5 border border-primary/30" />
          Process step
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-[2px] bg-primary/10 border-2 border-primary" />
          Output
        </span>
      </div>
    </div>
  );
}

/* ─── Visualization: Architecture Diagram (Challenge 2) ─── */
function ArchitectureViz() {
  return (
    <div className="space-y-3">
      {/* Top Layer: User-Facing */}
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-center">
          <p className="text-[10px] font-semibold">Borrower Portal</p>
          <p className="text-[9px] text-muted-foreground">
            Application intake
          </p>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <div className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-center">
          <p className="text-[10px] font-semibold">Document Upload</p>
          <p className="text-[9px] text-muted-foreground">
            OCR + Classification
          </p>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center">
        <div className="w-px h-5 bg-border" />
      </div>

      {/* Middle Layer: Processing Core */}
      <div className="flex items-stretch justify-center gap-4">
        {/* Rules Engine */}
        <div className="flex-1 max-w-[200px] rounded-lg border-2 border-primary bg-primary/10 px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-bold text-primary">Rules Engine</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Deterministic</p>
          <p className="text-[10px] font-medium mt-1">Source of Truth</p>
        </div>

        {/* Bidirectional connector */}
        <div className="flex flex-col items-center justify-center gap-0.5">
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="text-[8px] text-muted-foreground">advises</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground rotate-180" />
        </div>

        {/* AI Layer */}
        <div className="flex-1 max-w-[200px] rounded-lg border-2 border-dashed border-chart-1 bg-chart-1/10 px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Brain className="w-3.5 h-3.5 text-chart-1" />
            <p className="text-xs font-bold text-chart-1">AI Layer</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Advisory Only</p>
          <p className="text-[10px] font-medium mt-1">Never Decides</p>
        </div>
      </div>

      {/* Connector */}
      <div className="flex justify-center">
        <div className="w-px h-5 bg-border" />
      </div>

      {/* Bottom Layer: Outputs */}
      <div className="flex items-center justify-center gap-3">
        <div className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-center">
          <p className="text-[10px] font-semibold">Audit Log</p>
          <p className="text-[9px] text-muted-foreground">
            Every action traced
          </p>
        </div>
        <div className="rounded-lg border-2 border-primary bg-primary/10 px-4 py-2 text-center">
          <p className="text-[10px] font-semibold text-primary">
            Decision Output
          </p>
          <p className="text-[9px] text-muted-foreground">
            Explainable result
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground pt-1">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-[2px] bg-primary/10 border-2 border-primary" />
          Authoritative
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-[2px] bg-chart-1/10 border-2 border-dashed border-chart-1" />
          Advisory (AI)
        </span>
      </div>
    </div>
  );
}

/* ─── Visualization: DRS Metric Bars (Challenge 3) ─── */
function DRSMetricBarsViz() {
  const factors = [
    { label: "Credit Score", weight: 25, score: 82 },
    { label: "DTI Ratio", weight: 20, score: 78 },
    { label: "LTV Ratio", weight: 20, score: 75 },
    { label: "Employment Stability", weight: 15, score: 85 },
    { label: "Cash Reserves", weight: 10, score: 88 },
    { label: "Property Condition", weight: 10, score: 92 },
  ];

  const compositeScore = factors.reduce(
    (sum, f) => sum + (f.score * f.weight) / 100,
    0
  );

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {factors.map((factor) => {
          const colorClass =
            factor.score >= 80
              ? "bg-[color:var(--success)]"
              : factor.score >= 60
                ? "bg-[color:var(--warning)]"
                : "bg-[color:var(--destructive)]";

          const textClass =
            factor.score >= 80
              ? "text-[color:var(--success)]"
              : factor.score >= 60
                ? "text-[color:var(--warning)]"
                : "text-[color:var(--destructive)]";

          return (
            <div key={factor.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  {factor.label}
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({factor.weight}% weight)
                  </span>
                </span>
                <span className={`font-semibold tabular-nums ${textClass}`}>
                  {factor.score}/100
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Composite Score Summary */}
      <div className="flex items-center justify-between rounded-lg bg-primary/5 border border-primary/20 px-4 py-3">
        <div>
          <p className="text-xs font-semibold">Composite DRS Score</p>
          <p className="text-[10px] text-muted-foreground">
            Weighted average across all factors
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent tabular-nums">
            {compositeScore.toFixed(1)}
          </p>
          <p className="text-[10px] text-muted-foreground">Tier A (80+)</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Visualization: Document Processing Flow (Challenge 4) ─── */
function DocumentFlowViz() {
  const steps = [
    {
      icon: Upload,
      label: "Upload",
      sublabel: "Ingest documents",
      highlight: false,
    },
    {
      icon: Brain,
      label: "Classification",
      sublabel: "AI categorizes",
      highlight: true,
    },
    {
      icon: ScanText,
      label: "Data Extraction",
      sublabel: "OCR processing",
      highlight: false,
    },
    {
      icon: ShieldCheck,
      label: "Cross-Validation",
      sublabel: "Verify vs stated",
      highlight: false,
    },
    {
      icon: Database,
      label: "Verified Data",
      sublabel: "Structured output",
      highlight: false,
    },
  ];

  return (
    <div className="space-y-3">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between gap-1 py-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1.5 shrink-0">
            <div
              className={
                step.highlight
                  ? "flex flex-col items-center gap-1.5 rounded-lg border-2 border-primary bg-primary/10 px-4 py-3 text-center min-w-[100px]"
                  : "flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-3 text-center min-w-[100px]"
              }
            >
              <step.icon
                className={
                  step.highlight
                    ? "w-4 h-4 text-primary"
                    : "w-4 h-4 text-muted-foreground"
                }
              />
              <div>
                <p className="text-[10px] font-semibold leading-tight">
                  {step.label}
                </p>
                <p className="text-[9px] text-muted-foreground leading-tight">
                  {step.sublabel}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex flex-col items-center gap-1 py-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center gap-1">
            <div
              className={
                step.highlight
                  ? "flex items-center gap-2 rounded-lg border-2 border-primary bg-primary/10 px-4 py-2 min-w-[180px]"
                  : "flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 min-w-[180px]"
              }
            >
              <step.icon
                className={
                  step.highlight
                    ? "w-4 h-4 text-primary shrink-0"
                    : "w-4 h-4 text-muted-foreground shrink-0"
                }
              />
              <div>
                <p className="text-[10px] font-semibold">{step.label}</p>
                <p className="text-[9px] text-muted-foreground">
                  {step.sublabel}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="w-px h-3 bg-border" />
            )}
          </div>
        ))}
      </div>

      {/* Performance badge */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <FileCheck className="w-3 h-3" />
        <span>
          Highlighted step uses AI classification with 97%+ accuracy for W-2s,
          pay stubs, bank statements, and tax returns
        </span>
      </div>
    </div>
  );
}

/* ─── Visualization: Before/After (Challenge 5) ─── */
function AuditBeforeAfterViz() {
  const beforeItems = [
    "Manual audit compilation",
    "Scattered decision logs",
    "Days to prepare for review",
    "No decision lineage tracking",
  ];

  const afterItems = [
    "Automated audit generation",
    "Unified decision timeline",
    "Instant compliance reports",
    "Full actor + rule traceability",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Before */}
      <div className="rounded-lg border border-[color:var(--destructive)]/20 bg-[color:var(--destructive)]/5 p-4 space-y-2.5">
        <p className="text-xs font-semibold text-[color:var(--destructive)] uppercase tracking-wider">
          Before
        </p>
        <ul className="space-y-2">
          {beforeItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <XCircle className="w-4 h-4 text-[color:var(--destructive)] shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div className="rounded-lg border border-[color:var(--success)]/20 bg-[color:var(--success)]/5 p-4 space-y-2.5">
        <p className="text-xs font-semibold text-[color:var(--success)] uppercase tracking-wider">
          After
        </p>
        <ul className="space-y-2">
          {afterItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-[color:var(--success)] shrink-0 mt-0.5" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Visualization Renderer ─── */
function ChallengeVisualization({
  type,
}: {
  type: string;
}) {
  switch (type) {
    case "decision-flow":
      return <DecisionFlowViz />;
    case "architecture":
      return <ArchitectureViz />;
    case "metrics":
      return <DRSMetricBarsViz />;
    case "flow":
      return <DocumentFlowViz />;
    case "before-after":
      return <AuditBeforeAfterViz />;
    default:
      return null;
  }
}

/* ─── Page ─── */
export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold">My Approach</h1>
          <p className="text-sm text-muted-foreground mt-1">
            How I would tackle the key technical challenges in this project
          </p>
        </div>

        {/* Executive Summary */}
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {executiveSummary}
          </p>
        </div>

        {/* Challenge Cards */}
        <div className="space-y-6">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="rounded-xl bg-gradient-to-br from-accent/5 to-background shadow-lg border border-primary/10 p-6 space-y-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card header */}
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{challenge.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {challenge.description}
                  </p>
                </div>
              </div>

              {/* Visualization */}
              <div className="rounded-lg bg-card/50 border border-border/50 p-4">
                <ChallengeVisualization type={challenge.visualizationType} />
              </div>

              {/* Outcome statement */}
              {challenge.outcome && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm font-medium text-[color:var(--success)]">
                    {challenge.outcome}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Closer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-lg font-semibold">
            Ready to discuss the approach?
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Let&apos;s walk through how these solutions apply to your
            underwriting workflow.
          </p>
        </div>
      </div>
    </div>
  );
}
