"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  CheckCircle,
  ShieldCheck,
  DollarSign,
  Clock,
  Timer,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  dashboardStats,
  monthlyVolume,
  riskDistribution,
  applications,
} from "@/data/mock-data";
import {
  formatCurrency,
  formatPercent,
  formatNumber,
  formatDate,
  formatCompactNumber,
} from "@/lib/formatters";
import type { ApplicationStatus } from "@/lib/types";

// ─── Stat Card Config ───

const statCards = [
  {
    label: "Total Applications",
    value: formatNumber(dashboardStats.totalApplications),
    icon: FileText,
    description: "This quarter",
  },
  {
    label: "Approval Rate",
    value: formatPercent(dashboardStats.approvalRate),
    icon: CheckCircle,
    description: "+2.1% from last quarter",
  },
  {
    label: "Average DRS",
    value: dashboardStats.averageDRS.toFixed(1),
    icon: ShieldCheck,
    description: "Composite risk score",
  },
  {
    label: "Pipeline Value",
    value: `$${formatCompactNumber(dashboardStats.pipelineValue)}`,
    icon: DollarSign,
    description: "Active loan volume",
  },
  {
    label: "Pending Review",
    value: formatNumber(dashboardStats.pendingReview),
    icon: Clock,
    description: "Awaiting underwriter action",
  },
  {
    label: "Avg Processing",
    value: `${dashboardStats.avgProcessingDays} days`,
    icon: Timer,
    description: "Intake to decision",
  },
];

// ─── Status Badge Mapping ───

const statusConfig: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  approved: {
    label: "Approved",
    className: "bg-[color:oklch(from_var(--success)_l_c_h_/_0.1)] text-[color:var(--success)] border-transparent",
  },
  denied: {
    label: "Denied",
    className: "bg-destructive/10 text-destructive border-transparent",
  },
  conditional_approval: {
    label: "Conditional",
    className: "bg-[color:oklch(from_var(--warning)_l_c_h_/_0.1)] text-[color:var(--warning)] border-transparent",
  },
  underwriting: {
    label: "Underwriting",
    className: "bg-primary/10 text-primary border-transparent",
  },
  document_review: {
    label: "Doc Review",
    className: "bg-primary/10 text-primary border-transparent",
  },
  manual_review: {
    label: "Manual Review",
    className: "bg-[color:oklch(from_var(--warning)_l_c_h_/_0.1)] text-[color:var(--warning)] border-transparent",
  },
  intake: {
    label: "Intake",
    className: "bg-muted text-muted-foreground border-transparent",
  },
  suspended: {
    label: "Suspended",
    className: "bg-destructive/10 text-destructive border-transparent",
  },
};

// ─── Risk Distribution Colors ───

const riskTierColors: Record<string, string> = {
  A: "var(--success)",
  B: "var(--chart-1)",
  C: "var(--chart-4)",
  D: "var(--warning)",
  F: "var(--destructive)",
};

// ─── Custom Tooltip ───

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="rounded-lg border bg-background p-3 shadow-md">
      <p className="text-sm font-medium">Tier {data.name}</p>
      <p className="text-sm text-muted-foreground">
        {data.value} applications ({data.payload.percentage}%)
      </p>
    </div>
  );
};

// ─── Main Component ───

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Sort applications by submittedAt descending, take 5 most recent
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    )
    .slice(0, 5);

  // Compute approval chart data (for the "Approvals" tab)
  const approvalRateData = monthlyVolume.map((m) => ({
    month: m.month,
    rate:
      m.applications > 0
        ? Math.round((m.approved / m.applications) * 1000) / 10
        : 0,
    approved: m.approved,
    total: m.applications,
  }));

  // Compute risk-weighted data for "Risk" tab
  const riskByMonth = monthlyVolume.map((m) => ({
    month: m.month,
    lowRisk: Math.round(m.approved * 0.6),
    mediumRisk: Math.round(m.approved * 0.3),
    highRisk: m.denied,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold">Underwriting Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Pipeline overview and risk analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-lg rounded-xl hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 fill-mode-both"
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: "400ms",
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Application Volume Chart */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base">
                  Application Volume
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Monthly approved vs. denied applications
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyVolume}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="approved"
                        name="Approved"
                        stackId="a"
                        fill="var(--chart-1)"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar
                        dataKey="denied"
                        name="Denied"
                        stackId="a"
                        fill="var(--chart-3)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Distribution Chart */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base">
                  Risk Distribution
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Applications by DRS risk tier
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="count"
                        nameKey="tier"
                        strokeWidth={2}
                        stroke="var(--background)"
                      >
                        {riskDistribution.map((entry) => (
                          <Cell
                            key={`cell-${entry.tier}`}
                            fill={riskTierColors[entry.tier]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                      <Legend
                        formatter={(value: string) => (
                          <span className="text-sm text-muted-foreground">
                            Tier {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Approvals Tab */}
        <TabsContent value="approvals" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Approval Rate Trend */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base">
                  Approval Rate Trend
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Monthly approval rate percentage
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={approvalRateData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                      />
                      <Tooltip
                        content={({ active, payload, label }: any) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <p className="text-sm font-medium">{label}</p>
                              <p className="text-sm text-muted-foreground">
                                Rate: {d.rate}%
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {d.approved} of {d.total} applications
                              </p>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="rate"
                        name="Approval Rate"
                        fill="var(--chart-1)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Approval Breakdown Summary */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base">
                  Decision Breakdown
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Total approvals vs. denials over 6 months
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyVolume}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="approved"
                        name="Approved"
                        fill="var(--success)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="denied"
                        name="Denied"
                        fill="var(--destructive)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Risk Tab */}
        <TabsContent value="risk" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Risk Tier Distribution (Horizontal Bar) */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base">
                  Risk Tier Breakdown
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Application count by DRS tier
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={riskDistribution}
                      layout="vertical"
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis
                        type="number"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        dataKey="tier"
                        type="category"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => `Tier ${v}`}
                        width={60}
                      />
                      <Tooltip
                        content={({ active, payload, label }: any) => {
                          if (!active || !payload?.length) return null;
                          const d = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-md">
                              <p className="text-sm font-medium">
                                Tier {label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {d.count} applications ({d.percentage}%)
                              </p>
                            </div>
                          );
                        }}
                      />
                      <Bar dataKey="count" name="Applications" radius={[0, 4, 4, 0]}>
                        {riskDistribution.map((entry) => (
                          <Cell
                            key={`bar-${entry.tier}`}
                            fill={riskTierColors[entry.tier]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk Classification Over Time */}
            <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-base">
                  Risk Classification Trend
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Monthly applications by risk level
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={riskByMonth}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        className="text-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="lowRisk"
                        name="Low Risk"
                        stackId="risk"
                        fill="var(--success)"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar
                        dataKey="mediumRisk"
                        name="Medium Risk"
                        stackId="risk"
                        fill="var(--warning)"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar
                        dataKey="highRisk"
                        name="High Risk"
                        stackId="risk"
                        fill="var(--destructive)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Applications Table */}
      <Card className="shadow-sm rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle className="text-base">Recent Applications</CardTitle>
          <p className="text-sm text-muted-foreground">
            5 most recently submitted applications
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application #</TableHead>
                <TableHead>Borrower</TableHead>
                <TableHead className="text-right">Loan Amount</TableHead>
                <TableHead className="text-center">DRS Score</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplications.map((app) => {
                const status = statusConfig[app.status];
                return (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium font-mono text-sm">
                      {app.applicationNumber}
                    </TableCell>
                    <TableCell>
                      {app.borrower.firstName} {app.borrower.lastName}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(app.loanAmount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="font-mono font-semibold">
                        {app.drs.compositeScore}
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({app.drs.tier})
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {formatDate(app.submittedAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
