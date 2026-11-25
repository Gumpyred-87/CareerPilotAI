"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, formatRelativeTime, formatSalary } from "@/lib/utils";
import {
  Briefcase,
  Star,
  FileText,
  Clock,
  TrendingUp,
  Target,
  Trophy,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  Globe,
  Shield,
  Brain,
  Zap,
  Rocket,
} from "@/components/ui/icons";

const STAT_CARDS = [
  {
    title: "Jobs Discovered",
    value: "247",
    change: "+12%",
    changeLabel: "vs last week",
    trend: "up",
    icon: Briefcase,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    title: "High Match Jobs",
    value: "23",
    change: "+5",
    changeLabel: "new this week",
    trend: "up",
    icon: Star,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    title: "Applications Ready",
    value: "8",
    change: "3 pending review",
    changeLabel: "awaiting approval",
    trend: "neutral",
    icon: FileText,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    title: "Interviews Scheduled",
    value: "3",
    change: "2 this week",
    changeLabel: "1 offer pending",
    trend: "up",
    icon: Calendar,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
];

const RECENT_ACTIVITY = [
  {
    id: "1",
    type: "job_discovered",
    title: "Senior SAP Security Consultant",
    company: "SAP Labs India",
    location: "Bangalore, India",
    matchScore: 92,
    time: "2 hours ago",
    status: "new",
  },
  {
    id: "2",
    type: "application_prepared",
    title: "SAP GRC Specialist",
    company: "Infosys",
    location: "Pune, India",
    matchScore: 87,
    time: "5 hours ago",
    status: "ready_for_review",
  },
  {
    id: "3",
    type: "interview_scheduled",
    title: "SAP Security Lead",
    company: "TCS",
    location: "Hyderabad, India",
    matchScore: 78,
    time: "1 day ago",
    status: "interview",
  },
  {
    id: "4",
    type: "job_discovered",
    title: "SAP BTP Security Architect",
    company: "Accenture",
    location: "Remote (India)",
    matchScore: 85,
    time: "1 day ago",
    status: "new",
  },
  {
    id: "5",
    type: "application_submitted",
    title: "SAP Fiori Security Expert",
    company: "Capgemini",
    location: "Bangalore, India",
    matchScore: 81,
    time: "2 days ago",
    status: "submitted",
  },
];

const TOP_MATCHES = [
  {
    id: "1",
    title: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    location: "Bangalore, India",
    type: "Full-time",
    remote: true,
    salary: { min: 2500000, max: 3500000, currency: "INR", period: "yearly" },
    matchScore: 95,
    skillsMatched: ["SAP Security", "GRC", "S/4HANA", "Fiori", "BTP"],
    skillsMissing: ["ABAP"],
    posted: "3 hours ago",
    source: "Company Career",
  },
  {
    id: "2",
    title: "SAP Security Architect",
    company: "Deloitte",
    location: "Hyderabad, India",
    type: "Full-time",
    remote: false,
    salary: { min: 3000000, max: 4500000, currency: "INR", period: "yearly" },
    matchScore: 91,
    skillsMatched: ["SAP Security", "S/4HANA", "GRC", "SoD", "Authorization"],
    skillsMissing: ["BTP", "Fiori"],
    posted: "1 day ago",
    source: "Greenhouse",
  },
  {
    id: "3",
    title: "SAP GRC AC 12.0 Consultant",
    company: "EY",
    location: "Pune, India",
    type: "Contract",
    remote: true,
    salary: { min: 150000, max: 200000, currency: "INR", period: "monthly" },
    matchScore: 89,
    skillsMatched: ["GRC", "ARA", "ARM", "BRM", "SoD"],
    skillsMissing: ["S/4HANA", "BTP"],
    posted: "2 days ago",
    source: "Lever",
  },
];

export default function OverviewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-muted-foreground mt-1">
              Your AI-powered job search command center
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Search
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STAT_CARDS.map((stat) => (
            <Card key={stat.title} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className={cn("h-4 w-4", stat.color)} />
                      ) : stat.trend === "down" ? (
                        <ArrowDownRight className={cn("h-4 w-4", stat.color)} />
                      ) : (
                        <Activity className={cn("h-4 w-4", stat.color)} />
                      )}
                      <span className={cn("text-sm font-medium", stat.color)}>{stat.change}</span>
                      <span className="text-sm text-muted-foreground">{stat.changeLabel}</span>
                    </div>
                  </div>
                  <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {RECENT_ACTIVITY.map((activity) => (
                  <div
                    key={activity.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg transition-colors",
                      "hover:bg-accent/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg",
                        activity.type === "job_discovered" && "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
                        activity.type === "application_prepared" && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
                        activity.type === "interview_scheduled" && "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
                        activity.type === "application_submitted" && "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
                      )}
                    >
                      {activity.type === "job_discovered" && <Briefcase className="h-5 w-5" />}
                      {activity.type === "application_prepared" && <FileText className="h-5 w-5" />}
                      {activity.type === "interview_scheduled" && <Calendar className="h-5 w-5" />}
                      {activity.type === "application_submitted" && <Rocket className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.company} • {activity.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={
                        activity.matchScore >= 80 ? "success" :
                        activity.matchScore >= 60 ? "info" :
                        activity.matchScore >= 40 ? "warning" : "destructive"
                      }>
                        {activity.matchScore}% Match
                      </Badge>
                      <Badge variant={
                        activity.status === "new" ? "default" :
                        activity.status === "ready_for_review" ? "purple" :
                        activity.status === "interview" ? "warning" :
                        activity.status === "submitted" ? "success" : "gray"
                      }>
                        {activity.status.replace("_", " ")}
                      </Badge>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Search className="h-5 w-5" />
                  <span>Search New Jobs</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileText className="h-5 w-5" />
                  <span>Upload Resume</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Brain className="h-5 w-5" />
                  <span>AI Career Coach</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Target className="h-5 w-5" />
                  <span>Interview Prep</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Bell className="h-5 w-5" />
                  <span>Configure Alerts</span>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Matches */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Job Matches</CardTitle>
            <Button variant="ghost" size="sm">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {TOP_MATCHES.map((job) => (
                <div
                  key={job.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border",
                    "hover:bg-accent/50 transition-colors"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{job.title}</h3>
                      <Badge variant="success">{job.matchScore}% Match</Badge>
                      {job.remote && <Badge variant="info">Remote</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {job.company} • {job.location} • {job.type}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />
                        {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="h-3.5 w-3.5" />
                        {job.source}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.skillsMatched.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="success" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {job.skillsMissing.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="gray" className="text-xs">
                          Missing: {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-1 h-4 w-4" />
                      Prepare
                    </Button>
                    <Button variant="default" size="sm">
                      <Rocket className="mr-1 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Application Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Discovered", value: 247, color: "blue" },
                  { label: "Matched (>70%)", value: 89, color: "purple" },
                  { label: "Shortlisted", value: 34, color: "indigo" },
                  { label: "Applied", value: 18, color: "amber" },
                  { label: "Interviews", value: 7, color: "orange" },
                  { label: "Offers", value: 2, color: "green" },
                ].map((stage) => (
                  <div key={stage.label} className="flex items-center justify-between">
                    <span className="text-sm">{stage.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(stage.value / 247) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{stage.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                Skills Gap Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { skill: "SAP BTP Security", gap: 85, priority: "High" },
                  { skill: "Fiori Security", gap: 72, priority: "High" },
                  { skill: "ABAP Development", gap: 45, priority: "Medium" },
                  { skill: "Cloud Foundry", gap: 38, priority: "Medium" },
                  { skill: "Kubernetes", gap: 25, priority: "Low" },
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.skill}</span>
                      <Badge variant={item.priority === "High" ? "destructive" : item.priority === "Medium" ? "warning" : "info"}>
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.gap}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Job Discovery", status: "healthy", lastRun: "2 min ago" },
                  { label: "Job Matching", status: "healthy", lastRun: "5 min ago" },
                  { label: "Alert Monitoring", status: "healthy", lastRun: "1 min ago" },
                  { label: "Chrome Extension", status: "connected", lastRun: "Active" },
                  { label: "AI Provider (Ollama)", status: "healthy", lastRun: "Ready" },
                  { label: "Database", status: "healthy", lastRun: "Connected" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        item.status === "healthy" || item.status === "connected" ? "bg-green-500" : "bg-yellow-500"
                      )} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{item.lastRun}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}