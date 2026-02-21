"use client";

import { useState } from "react";
import {
  CreditCard,
  Percent,
  Home,
  Briefcase,
  Landmark,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { applications } from "@/data/mock-data";
import { formatPercent } from "@/lib/formatters";
import type { DRSBreakdown, RiskTier } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function getTierBadgeClass(tier: RiskTier): string {
  switch (tier) {
    case "A":
      return "bg-success text-success-foreground";
    case "B":
      return "bg-primary text-primary-foreground";
    case "C":
      return "bg-warning text-warning-foreground";
    case "D":
      return "bg-destructive/80 text-destructive-foreground";
    case "F":
      return "bg-destructive text-destructive-foreground";
  }
}

function getScoreColorClass(score: number): string {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
}

function getProgressColorClass(score: number): string {
  if (score >= 80) return "[&>[data-slot=progress-indicator]]:bg-success";
  if (score >= 60) return "[&>[data-slot=progress-indicator]]:bg-warning";
  return "[&>[data-slot=progress-indicator]]:bg-destructive";
}

const tierExplanations: { tier: RiskTier; range: string; label: string; description: string }[] = [
  {
    tier: "A",
    range: "80 - 100",
    label: "Excellent",
    description: "Auto-approve eligible. Lowest risk, best rate pricing.",
  },
  {
    tier: "B",
    range: "65 - 79",
    label: "Good",
    description: "Standard underwriting path. May require minimal conditions.",
  },
  {
    tier: "C",
    range: "50 - 64",
    label: "Fair",
    description: "Enhanced review required. Additional documentation likely needed.",
  },
  {
    tier: "D",
    range: "35 - 49",
    label: "Below Average",
    description: "Manual review mandatory. High risk, compensating factors needed.",
  },
  {
    tier: "F",
    range: "0 - 34",
    label: "Poor",
    description: "Auto-deny eligible. Fails multiple eligibility criteria.",
  },
];

interface FactorCardProps {
  label: string;
  icon: React.ReactNode;
  rawValue: string;
  weight: string;
  score: number;
  index: number;
}

function FactorCard({ label, icon, rawValue, weight, score, index }: FactorCardProps) {
  return (
    <Card
      className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <CardContent className="pt-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-md bg-primary/10">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground">Weight: {weight}</p>
            </div>
          </div>
          <span className={`text-2xl font-bold ${getScoreColorClass(score)}`}>
            {score}
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Value: {rawValue}</span>
            <span>{score}/100</span>
          </div>
          <Progress
            value={score}
            className={`h-2 ${getProgressColorClass(score)}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default function RiskScoringPage() {
  const [selectedAppId, setSelectedAppId] = useState(applications[0].id);

  const selectedApp = applications.find((app) => app.id === selectedAppId)!;
  const drs: DRSBreakdown = selectedApp.drs;

  const factors: Omit<FactorCardProps, "index">[] = [
    {
      label: "Credit Score",
      icon: <CreditCard className="size-4 text-primary" />,
      rawValue: `${drs.creditScore.value}`,
      weight: "25%",
      score: drs.creditScore.score,
    },
    {
      label: "DTI Ratio",
      icon: <Percent className="size-4 text-primary" />,
      rawValue: formatPercent(drs.dti.value),
      weight: "20%",
      score: drs.dti.score,
    },
    {
      label: "LTV Ratio",
      icon: <Home className="size-4 text-primary" />,
      rawValue: formatPercent(drs.ltv.value),
      weight: "20%",
      score: drs.ltv.score,
    },
    {
      label: "Employment Stability",
      icon: <Briefcase className="size-4 text-primary" />,
      rawValue: `${drs.employmentStability.value} years`,
      weight: "15%",
      score: drs.employmentStability.score,
    },
    {
      label: "Reserves",
      icon: <Landmark className="size-4 text-primary" />,
      rawValue: `${drs.reserves.value} months`,
      weight: "10%",
      score: drs.reserves.score,
    },
    {
      label: "Property Condition",
      icon: <Building2 className="size-4 text-primary" />,
      rawValue: `${drs.propertyCondition.value}%`,
      weight: "10%",
      score: drs.propertyCondition.score,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <ShieldCheck className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Risk Scoring &mdash; DRS</h1>
            <p className="text-sm text-muted-foreground">
              Doorly Risk Score composite analysis
            </p>
          </div>
        </div>
      </div>

      {/* Application selector */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">
          Select Application:
        </label>
        <Select value={selectedAppId} onValueChange={setSelectedAppId}>
          <SelectTrigger className="w-full sm:w-[380px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {applications.map((app) => (
              <SelectItem key={app.id} value={app.id}>
                {app.applicationNumber} &mdash; {app.borrower.firstName}{" "}
                {app.borrower.lastName} (DRS: {app.drs.compositeScore})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hero DRS Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl">
        <CardContent className="py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Composite DRS Score
              </p>
              <p className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {drs.compositeScore}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {selectedApp.borrower.firstName} {selectedApp.borrower.lastName}{" "}
                &middot; {selectedApp.applicationNumber}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Badge
                variant="outline"
                className={`text-lg px-4 py-1.5 font-bold ${getTierBadgeClass(drs.tier)}`}
              >
                Tier {drs.tier}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {tierExplanations.find((t) => t.tier === drs.tier)?.label}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Breakdown Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Factor Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {factors.map((factor, index) => (
            <FactorCard key={factor.label} {...factor} index={index} />
          ))}
        </div>
      </div>

      <Separator />

      {/* Tier Explanation Table */}
      <div>
        <h2 className="text-lg font-semibold mb-4">DRS Tier Reference</h2>
        <Card className="shadow-sm rounded-xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 font-medium">Tier</th>
                    <th className="text-left px-4 py-3 font-medium">Range</th>
                    <th className="text-left px-4 py-3 font-medium">Rating</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tierExplanations.map((tier) => (
                    <tr
                      key={tier.tier}
                      className={`border-b last:border-b-0 transition-colors ${
                        drs.tier === tier.tier
                          ? "bg-primary/5 font-medium"
                          : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`font-bold ${getTierBadgeClass(tier.tier)}`}
                        >
                          {tier.tier}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono">{tier.range}</td>
                      <td className="px-4 py-3">{tier.label}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {tier.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
