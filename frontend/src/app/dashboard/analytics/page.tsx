"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatSalary } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Trophy,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  Star,
  Users,
  Brain,
  Zap,
  PieChart,
  Activity,
} from "@/components/ui/icons";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const FUNNEL_DATA = [
  { stage: "Discovered", count: 247, percentage: 100, color: "hsl(221, 83%, 53%)" },
  { stage: "Matched (>70%)", count: 89, percentage: 36, color: "hsl(262, 83%, 58%)" },
  { stage: "Shortlisted", count: 34, percentage: 14, color: "hsl(221, 83%, 53%)" },
  { stage: "Prepared", count: 18, percentage: 7, color: "hsl(239, 84%, 67%)" },
  { stage: "Submitted", count: 12, percentage: 5, color: "hsl(38, 92%, 50%)" },
  { stage: "Interviews", count: 7, percentage: 3, color: "hsl(24, 95%, 53%)" },
  { stage: "Offers", count: 2, percentage: 1, color: "hsl(142, 76%, 36%)" },
];

const WEEKLY_ACTIVITY = [
  { week: "Week 1", discovered: 45, matched: 12, applied: 3, interviews: 1 },
  { week: "Week 2", discovered: 52, matched: 18, applied: 4, interviews: 2 },
  { week: "Week 3", discovered: 38, matched: 15, applied: 3, interviews: 1 },
  { week: "Week 4", discovered: 61, matched: 22, applied: 5, interviews: 2 },
  { week: "Week 5", discovered: 51, matched: 22, applied: 4, interviews: 1 },
];

const SOURCE_EFFECTIVENESS = [
  { source: "Company Career", jobs: 67, matches: 28, applied: 8, interviews: 4, offers: 1 },
  { source: "Greenhouse", jobs: 54, matches: 19, applied: 5, interviews: 2, offers: 0 },
  { source: "Lever", jobs: 43, matches: 15, applied: 4, interviews: 1, offers: 1 },
  { source: "Adzuna", jobs: 38, matches: 12, applied: 3, interviews: 0, offers: 0 },
  { source: "SmartRecruiters", jobs: 28, matches: 9, applied: 2, interviews: 0, offers: 0 },
  { source: "Remotive", jobs: 17, matches: 6, applied: 1, interviews: 0, offers: 0 },
];

const SKILLS_GAP = [
  { skill: "SAP BTP Security", required: 85, current: 40, priority: "High" },
  { skill: "Fiori Security", required: 72, current: 55, priority: "High" },
  { skill: "ABAP Development", required: 45, current: 20, priority: "Medium" },
  { skill: "Cloud Foundry", required: 38, current: 15, priority: "Medium" },
  { skill: "Kubernetes", required: 25, current: 10, priority: "Low" },
  { skill: "Python Scripting", required: 30, current: 25, priority: "Low" },
];

const RESPONSE_TIMES = [
  { period: "Week 1", avgDays: 12, medianDays: 8 },
  { period: "Week 2", avgDays: 9, medianDays: 6 },
  { period: "Week 3", avgDays: 14, medianDays: 10 },
  { period: "Week 4", avgDays: 7, medianDays: 5 },
  { period: "Week 5", avgDays: 11, medianDays: 7 },
];

const KEY_METRICS = [
  { label: "Total Discovered", value: "247", change: "+23%", trend: "up", icon: Briefcase, color: "blue" },
  { label: "High Matches", value: "89", change: "+12%", trend: "up", icon: Target, color: "purple" },
  { label: "Applications", value: "18", change: "+5", trend: "up", icon: FileText, color: "indigo" },
  { label: "Interviews", value: "7", change: "+2", trend: "up", icon: Calendar, color: "amber" },
  { label: "Offers", value: "2", change: "+1", trend: "up", icon: Trophy, color: "green" },
  { label: "Conversion Rate", value: "8.1%", change: "+1.2%", trend: "up", icon: TrendingUp, color: "emerald" },
  { label: "Avg Response", value: "10.6 days", change: "-2.3 days", trend: "up", icon: Clock, color: "blue" },
  { label: "Top Source", value: "Company Career", change: "38% of matches", trend: "neutral", icon: Building2, color: "purple" },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your job search performance and identify improvement areas
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Last 30 days</Badge>
            <Badge variant="outline">Updated 2 min ago</Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
          {KEY_METRICS.map((metric) => (
            <Card key={metric.label} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-3xl font-bold mt-1">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {metric.trend === "down" && <TrendingDown className="h-4 w-4 text-red-600" />}
                      {metric.trend === "neutral" && <Activity className="h-4 w-4 text-gray-500" />}
                      <span className={cn("text-sm font-medium", metric.trend === "up" && "text-green-600", metric.trend === "down" && "text-red-600")}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={cn("p-3 rounded-xl bg-" + metric.color + "-100 dark:bg-" + metric.color + "-900/30")}>
                    <metric.icon className={cn("h-6 w-6 text-" + metric.color + "-600 dark:text-" + metric.color + "-400")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Application Funnel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Application Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {FUNNEL_DATA.map((stage, index) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: stage.color }}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium">{stage.stage}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-bold w-16 text-right">{stage.count}</span>
                        <span className="text-muted-foreground w-16 text-right">({stage.percentage}%)</span>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {WEEKLY_ACTIVITY.map((week) => (
                  <div key={week.week}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{week.week}</span>
                      <span className="text-sm text-muted-foreground">
                        {week.discovered} found • {week.matched} matched • {week.applied} applied • {week.interviews} interviews
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(week.matched / week.discovered) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Source Effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Source Effectiveness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm font-medium text-muted-foreground">
                  <span className="w-32">Source</span>
                  <span className="w-16 text-right">Jobs</span>
                  <span className="w-16 text-right">Matches</span>
                  <span className="w-16 text-right">Applied</span>
                  <span className="w-16 text-right">Interviews</span>
                  <span className="w-16 text-right">Offers</span>
                </div>
                {SOURCE_EFFECTIVENESS.map((source) => (
                  <div key={source.source} className="flex items-center text-sm gap-4">
                    <span className="w-32 font-medium">{source.source}</span>
                    <span className="w-16 text-right text-muted-foreground">{source.jobs}</span>
                    <span className="w-16 text-right text-primary font-medium">{source.matches}</span>
                    <span className="w-16 text-right text-muted-foreground">{source.applied}</span>
                    <span className="w-16 text-right text-amber-600">{source.interviews}</span>
                    <span className="w-16 text-right text-green-600 font-bold">{source.offers}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skills Gap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Skills Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {SKILLS_GAP.map((skill) => (
                  <div key={skill.skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{skill.skill}</span>
                      <Badge variant={
                        skill.priority === "High" ? "destructive" :
                        skill.priority === "Medium" ? "warning" : "info"
                      }>{skill.priority}</Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.current}%`,
                          backgroundColor: skill.current >= skill.required ? "#22c55e" : "#3b82f6"
                        }}
                      />
                      <div
                        className="absolute h-full rounded-full border-2 border-dashed border-red-500"
                        style={{ width: `${skill.required}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Current: {skill.current}%</span>
                      <span>Required: {skill.required}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Response Times */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Time Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {RESPONSE_TIMES.map((rt) => (
                  <div key={rt.period} className="flex items-center justify-between">
                    <span className="font-medium">{rt.period}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">Avg: {rt.avgDays}d</span>
                      <span className="font-medium text-primary">Median: {rt.medianDays}d</span>
                      <div
                        className="h-2 w-24 bg-muted rounded-full overflow-hidden"
                      >
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${Math.min(100, (rt.medianDays / 14) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion by Stage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Conversion Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { from: "Discovered → Matched", rate: 36, total: 247, next: 89 },
                  { from: "Matched → Shortlisted", rate: 38, total: 89, next: 34 },
                  { from: "Shortlisted → Prepared", rate: 53, total: 34, next: 18 },
                  { from: "Prepared → Submitted", rate: 67, total: 18, next: 12 },
                  { from: "Submitted → Interview", rate: 58, total: 12, next: 7 },
                  { from: "Interview → Offer", rate: 29, total: 7, next: 2 },
                ].map((conv) => (
                  <div key={conv.from}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{conv.from}</span>
                      <span className="text-sm font-bold text-primary">{conv.rate}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${conv.rate}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conv.total} → {conv.next} applications
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Key Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-800 dark:text-green-200">Improving Conversion</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Your interview-to-offer rate improved from 15% to 29% this month. Strong technical preparation paying off.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800 dark:text-amber-200">Skills Gap Priority</h4>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  SAP BTP Security and Fiori Security are your top gaps. 68% of high-match jobs require these skills.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Faster Responses</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Average response time decreased from 12 to 7 days. Company career pages respond 40% faster than job boards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}