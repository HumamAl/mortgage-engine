"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { applications } from "@/data/mock-data";
import { formatCurrency, formatPercent, formatDate } from "@/lib/formatters";
import type { ApplicationStatus } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions: { value: string; label: string }[] = [
  { value: "all", label: "All Statuses" },
  { value: "intake", label: "Intake" },
  { value: "document_review", label: "Document Review" },
  { value: "underwriting", label: "Underwriting" },
  { value: "conditional_approval", label: "Conditional Approval" },
  { value: "approved", label: "Approved" },
  { value: "denied", label: "Denied" },
  { value: "manual_review", label: "Manual Review" },
];

function getStatusBadgeVariant(
  status: ApplicationStatus
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default";
    case "denied":
      return "destructive";
    case "conditional_approval":
    case "manual_review":
      return "secondary";
    case "underwriting":
    case "document_review":
      return "default";
    case "intake":
    case "suspended":
    default:
      return "outline";
  }
}

function getStatusBadgeClass(status: ApplicationStatus): string {
  switch (status) {
    case "approved":
      return "bg-success text-success-foreground hover:bg-success/90";
    case "denied":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    case "conditional_approval":
    case "manual_review":
      return "bg-warning text-warning-foreground hover:bg-warning/90";
    case "underwriting":
    case "document_review":
      return "bg-primary text-primary-foreground hover:bg-primary/90";
    case "intake":
    case "suspended":
    default:
      return "bg-muted text-muted-foreground hover:bg-muted/90";
  }
}

function formatStatusLabel(status: ApplicationStatus): string {
  return status
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type SortField = "drs" | "loanAmount" | null;
type SortDirection = "asc" | "desc";

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filtered = useMemo(() => {
    let result = applications.filter((app) => {
      const matchSearch =
        search === "" ||
        `${app.borrower.firstName} ${app.borrower.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        app.applicationNumber.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || app.status === statusFilter;
      return matchSearch && matchStatus;
    });

    if (sortField) {
      result = [...result].sort((a, b) => {
        let valA: number;
        let valB: number;
        if (sortField === "drs") {
          valA = a.drs.compositeScore;
          valB = b.drs.compositeScore;
        } else {
          valA = a.loanAmount;
          valB = b.loanAmount;
        }
        return sortDirection === "asc" ? valA - valB : valB - valA;
      });
    }

    return result;
  }, [search, statusFilter, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="ml-1 size-3.5 text-muted-foreground" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 size-3.5 text-primary" />
    ) : (
      <ArrowDown className="ml-1 size-3.5 text-primary" />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Loan Applications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          All mortgage applications in the pipeline
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by borrower name or app number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filtered.length} of {applications.length} applications
      </p>

      {/* Table */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Application Pipeline</CardTitle>
          <CardDescription>
            Click column headers to sort by DRS score or loan amount
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[140px]">App #</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Property
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none hover:text-primary transition-colors"
                    onClick={() => handleSort("loanAmount")}
                  >
                    <span className="flex items-center">
                      Loan Amount
                      <SortIcon field="loanAmount" />
                    </span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    LTV%
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    DTI%
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none hover:text-primary transition-colors text-center"
                    onClick={() => handleSort("drs")}
                  >
                    <span className="flex items-center justify-center">
                      DRS
                      <SortIcon field="drs" />
                    </span>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden xl:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No applications match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((app) => (
                    <TableRow
                      key={app.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-mono text-sm">
                        {app.applicationNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {app.borrower.firstName} {app.borrower.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Credit: {app.borrower.creditScore}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div>
                          <p className="text-sm">{app.property.city}, {app.property.state}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {app.property.type.replace(/_/g, " ")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(app.loanAmount)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {formatPercent(app.drs.ltv.value)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        <span
                          className={
                            app.drs.dti.value > 43
                              ? "text-destructive font-medium"
                              : app.drs.dti.value > 38
                                ? "text-warning font-medium"
                                : ""
                          }
                        >
                          {formatPercent(app.drs.dti.value)}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`font-bold ${
                            app.drs.compositeScore >= 80
                              ? "text-success"
                              : app.drs.compositeScore >= 60
                                ? "text-warning"
                                : "text-destructive"
                          }`}
                        >
                          {app.drs.compositeScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getStatusBadgeClass(app.status)}
                        >
                          {formatStatusLabel(app.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">
                        {formatDate(app.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
