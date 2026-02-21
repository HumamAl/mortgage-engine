"use client";

import { useState, useMemo } from "react";
import {
  ClipboardList,
  ArrowRight,
  Clock,
  Link2,
} from "lucide-react";
import { auditEntries, applications } from "@/data/mock-data";
import { formatDate } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const actorTypeOptions = [
  { value: "all", label: "All Actors" },
  { value: "system", label: "System" },
  { value: "underwriter", label: "Underwriter" },
  { value: "ai_engine", label: "AI Engine" },
  { value: "borrower", label: "Borrower" },
];

function getActorTypeBadgeClass(
  actorType: "system" | "underwriter" | "ai_engine" | "borrower"
): string {
  switch (actorType) {
    case "system":
      return "bg-primary text-primary-foreground";
    case "underwriter":
      return "bg-chart-2 text-white";
    case "ai_engine":
      return "bg-chart-1 text-white";
    case "borrower":
      return "bg-muted text-muted-foreground";
  }
}

function formatActorTypeLabel(
  actorType: "system" | "underwriter" | "ai_engine" | "borrower"
): string {
  switch (actorType) {
    case "system":
      return "System";
    case "underwriter":
      return "Underwriter";
    case "ai_engine":
      return "AI Engine";
    case "borrower":
      return "Borrower";
  }
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function AuditLogPage() {
  const [appFilter, setAppFilter] = useState("all");
  const [actorTypeFilter, setActorTypeFilter] = useState("all");

  // Get unique application numbers for the dropdown
  const uniqueAppNumbers = useMemo(() => {
    const numbers = [...new Set(auditEntries.map((e) => e.applicationNumber))];
    return numbers.sort();
  }, []);

  const filtered = useMemo(() => {
    return auditEntries.filter((entry) => {
      const matchApp =
        appFilter === "all" || entry.applicationNumber === appFilter;
      const matchActorType =
        actorTypeFilter === "all" || entry.actorType === actorTypeFilter;
      return matchApp && matchActorType;
    });
  }, [appFilter, actorTypeFilter]);

  // Group entries by date for timeline display
  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach((entry) => {
      const dateKey = formatDate(entry.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(entry);
    });
    return Object.entries(groups).sort((a, b) => {
      // Sort groups by most recent first
      const dateA = new Date(a[1][0].timestamp);
      const dateB = new Date(b[1][0].timestamp);
      return dateB.getTime() - dateA.getTime();
    });
  }, [filtered]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
            <ClipboardList className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Decision Audit Log</h1>
            <p className="text-sm text-muted-foreground">
              Complete audit trail for all underwriting decisions
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Application
          </label>
          <Select value={appFilter} onValueChange={setAppFilter}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filter by application" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              {uniqueAppNumbers.map((num) => {
                const app = applications.find(
                  (a) => a.applicationNumber === num
                );
                return (
                  <SelectItem key={num} value={num}>
                    {num}
                    {app
                      ? ` - ${app.borrower.firstName} ${app.borrower.lastName}`
                      : ""}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Actor Type
          </label>
          <Select value={actorTypeFilter} onValueChange={setActorTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by actor type" />
            </SelectTrigger>
            <SelectContent>
              {actorTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {auditEntries.length} entries
      </p>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <Card className="shadow-sm rounded-xl">
          <CardContent className="py-12 text-center text-muted-foreground">
            No audit entries match your filters.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {groupedByDate.map(([dateLabel, entries]) => (
            <div key={dateLabel}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock className="size-4 text-primary" />
                  {dateLabel}
                </div>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">
                  {entries.length} event{entries.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Entries for this date */}
              <div className="relative ml-5 border-l-2 border-border/50 space-y-0">
                {entries
                  .sort(
                    (a, b) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((entry, index) => (
                    <div
                      key={entry.id}
                      className="relative pl-6 pb-6 last:pb-0 animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Timeline dot */}
                      <div className="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-primary bg-background" />

                      <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md hover:border-primary/30 transition-all duration-200">
                        <CardContent className="py-4 space-y-2.5">
                          {/* Header row */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sm">
                                {entry.action}
                              </span>
                              <Badge
                                variant="outline"
                                className={getActorTypeBadgeClass(
                                  entry.actorType
                                )}
                              >
                                {formatActorTypeLabel(entry.actorType)}
                              </Badge>
                              {entry.ruleId && (
                                <Badge
                                  variant="outline"
                                  className="font-mono text-xs gap-1"
                                >
                                  <Link2 className="size-3" />
                                  {entry.ruleId}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {formatTimestamp(entry.timestamp)}
                            </span>
                          </div>

                          {/* Actor name */}
                          <p className="text-xs text-muted-foreground">
                            By: {entry.actor}
                          </p>

                          {/* Details */}
                          <p className="text-sm text-foreground/80">
                            {entry.details}
                          </p>

                          {/* State change */}
                          {(entry.previousValue || entry.newValue) && (
                            <div className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2 border border-border/50">
                              {entry.previousValue && (
                                <span className="text-muted-foreground line-through">
                                  {entry.previousValue}
                                </span>
                              )}
                              {entry.previousValue && entry.newValue && (
                                <ArrowRight className="size-3.5 text-primary flex-shrink-0" />
                              )}
                              {entry.newValue && (
                                <span className="font-medium text-primary">
                                  {entry.newValue}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Application reference */}
                          <p className="text-xs text-muted-foreground font-mono">
                            {entry.applicationNumber}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
