"use client";

import { useState } from "react";
import { Shield, ToggleLeft, ToggleRight } from "lucide-react";
import { eligibilityRules } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const categories = [
  { value: "all", label: "All" },
  { value: "ltv", label: "LTV" },
  { value: "dti", label: "DTI" },
  { value: "credit", label: "Credit" },
  { value: "reserves", label: "Reserves" },
  { value: "property", label: "Property" },
  { value: "income", label: "Income" },
];

function getActionBadgeClass(
  action: "approve" | "deny" | "manual_review" | "condition"
): string {
  switch (action) {
    case "approve":
      return "bg-success text-success-foreground";
    case "deny":
      return "bg-destructive text-destructive-foreground";
    case "manual_review":
      return "bg-warning text-warning-foreground";
    case "condition":
      return "bg-primary text-primary-foreground";
  }
}

function formatActionLabel(
  action: "approve" | "deny" | "manual_review" | "condition"
): string {
  switch (action) {
    case "approve":
      return "Approve";
    case "deny":
      return "Deny";
    case "manual_review":
      return "Manual Review";
    case "condition":
      return "Add Condition";
  }
}

export default function RulesEnginePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [toggledRules, setToggledRules] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      eligibilityRules.forEach((rule) => {
        initial[rule.id] = rule.isActive;
      });
      return initial;
    }
  );

  const filteredRules = eligibilityRules.filter(
    (rule) => activeCategory === "all" || rule.category === activeCategory
  );

  const handleToggle = (ruleId: string) => {
    setToggledRules((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <Shield className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Eligibility Rules Engine</h1>
            <p className="text-sm text-muted-foreground">
              Deterministic rules for loan qualification
            </p>
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="flex-wrap h-auto gap-1">
          {categories.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} className="text-sm">
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredRules.length} of {eligibilityRules.length} rules
      </p>

      {/* Rules grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRules.map((rule, index) => {
          const isActive = toggledRules[rule.id] ?? rule.isActive;

          return (
            <Card
              key={rule.id}
              className={`shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${
                !isActive ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        variant="outline"
                        className="text-xs uppercase font-mono"
                      >
                        {rule.category}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={getActionBadgeClass(rule.action)}
                      >
                        {formatActionLabel(rule.action)}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">{rule.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {rule.description}
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => handleToggle(rule.id)}
                    className="flex-shrink-0 mt-1 transition-colors"
                    aria-label={isActive ? "Deactivate rule" : "Activate rule"}
                  >
                    {isActive ? (
                      <ToggleRight className="size-8 text-primary" />
                    ) : (
                      <ToggleLeft className="size-8 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Condition & Threshold in code box */}
                <div className="rounded-lg bg-muted/50 border border-border/50 p-3 font-mono text-sm space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">
                      Condition:
                    </span>
                    <span className="text-foreground">{rule.condition}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">
                      Threshold:
                    </span>
                    <span className="text-primary font-semibold">
                      {rule.threshold}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Footer metadata */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    v{rule.version} &middot; Modified{" "}
                    {formatDate(rule.lastModified)}
                  </span>
                  <span
                    className={
                      isActive ? "text-success font-medium" : "text-muted-foreground"
                    }
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
