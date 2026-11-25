"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import {
  Kanban,
  Table,
  Plus,
  Filter,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Trash2,
  Calendar,
  Building2,
  MapPin,
  DollarSign,
  Star,
  FileText,
  PenTool,
} from "@/components/ui/icons";

const APPLICATIONS = [
  {
    id: "1",
    jobTitle: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    location: "Bangalore, India",
    salary: { min: 2500000, max: 3500000, currency: "INR", period: "yearly" },
    matchScore: 95,
    status: "interview",
    appliedDate: "2024-01-15",
    interviewDate: "2024-01-25",
    recruiter: "Priya Sharma",
    recruiterEmail: "priya.sharma@sap.com",
    notes: "Technical round scheduled. Prepare SAP BTP security questions.",
    followUpDate: "2024-01-22",
  },
  {
    id: "2",
    jobTitle: "SAP Security Architect",
    company: "Deloitte",
    location: "Hyderabad, India",
    salary: { min: 3000000, max: 4500000, currency: "INR", period: "yearly" },
    matchScore: 91,
    status: "submitted",
    appliedDate: "2024-01-10",
    interviewDate: null,
    recruiter: "Rajesh Kumar",
    recruiterEmail: "rajesh.kumar@deloitte.com",
    notes: "Application submitted via Greenhouse. Reference: DLT-2024-001",
    followUpDate: "2024-01-17",
  },
  {
    id: "3",
    jobTitle: "SAP GRC AC 12.0 Consultant",
    company: "EY",
    location: "Pune, India",
    salary: { min: 150000, max: 200000, currency: "INR", period: "monthly" },
    matchScore: 89,
    status: "shortlisted",
    appliedDate: "2024-01-08",
    interviewDate: null,
    recruiter: "Anita Desai",
    recruiterEmail: "anita.desai@ey.com",
    notes: "Recruiter reached out. Awaiting interview schedule.",
    followUpDate: "2024-01-15",
  },
  {
    id: "4",
    jobTitle: "SAP BTP Security Specialist",
    company: "Accenture",
    location: "Remote (India)",
    salary: { min: 2000000, max: 3000000, currency: "INR", period: "yearly" },
    matchScore: 87,
    status: "ready_for_review",
    appliedDate: null,
    interviewDate: null,
    recruiter: "",
    recruiterEmail: "",
    notes: "Application prepared, awaiting approval to submit.",
    followUpDate: "2024-01-12",
  },
  {
    id: "5",
    jobTitle: "SAP Fiori Security Expert",
    company: "Capgemini",
    location: "Bangalore, India",
    salary: { min: 1800000, max: 2500000, currency: "INR", period: "yearly" },
    matchScore: 84,
    status: "rejected",
    appliedDate: "2024-01-05",
    interviewDate: null,
    recruiter: "Vikram Singh",
    recruiterEmail: "vikram.singh@capgemini.com",
    notes: "Position filled internally. Keep for future opportunities.",
    followUpDate: null,
  },
];

const STATUS_COLUMNS = [
  { id: "discovered", label: "Discovered" },
  { id: "shortlisted", label: "Shortlisted" },
  { id: "resume_prepared", label: "Resume Prepared" },
  { id: "ready_for_review", label: "Ready for Review" },
  { id: "awaiting_approval", label: "Awaiting Approval" },
  { id: "submitted", label: "Submitted" },
  { id: "confirmation_received", label: "Confirmed" },
  { id: "interview", label: "Interview" },
  { id: "rejected", label: "Rejected" },
  { id: "withdrawn", label: "Withdrawn" },
  { id: "offer", label: "Offer" },
];

const STATUS_COLORS: Record<string, string> = {
  discovered: "gray",
  shortlisted: "blue",
  resume_prepared: "purple",
  ready_for_review: "indigo",
  awaiting_approval: "amber",
  submitted: "green",
  confirmation_received: "emerald",
  interview: "orange",
  rejected: "red",
  withdrawn: "gray",
  offer: "amber",
};

export default function ApplicationTrackerPage() {
  const [activeTab, setActiveTab] = React.useState("kanban");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [sortBy, setSortBy] = React.useState<"date" | "company" | "score" | "status">("date");

  const filteredApps = APPLICATIONS.filter((app) => {
    if (searchQuery && !app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !app.company.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (statusFilter !== "all" && app.status !== statusFilter) return false;
    return true;
  });

  const appsByStatus = STATUS_COLUMNS.reduce((acc, col) => {
    acc[col.id] = filteredApps.filter((app) => app.status === col.id);
    return acc;
  }, {} as Record<string, typeof APPLICATIONS>);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Application Tracker</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all your job applications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="default">
              <Plus className="mr-2 h-4 w-4" />
              Add Application
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {STATUS_COLUMNS.map((col) => (
                    <SelectItem key={col.id} value={col.id}>{col.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Newest First)</SelectItem>
                  <SelectItem value="company">Company (A-Z)</SelectItem>
                  <SelectItem value="score">Match Score (High to Low)</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Kanban Board */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="kanban">
              <Kanban className="mr-2 h-4 w-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="table">
              <Table className="mr-2 h-4 w-4" />
              Table
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kanban" className="mt-4">
            <div className="flex gap-4 overflow-x-auto pb-4">
              {STATUS_COLUMNS.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  applications={appsByStatus[column.id] || []}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="table" className="mt-4">
            <Card>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Job Title</th>
                        <th className="text-left p-4 font-medium">Company</th>
                        <th className="text-left p-4 font-medium">Location</th>
                        <th className="text-left p-4 font-medium">Match</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Applied</th>
                        <th className="text-left p-4 font-medium">Interview</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApps.map((app) => (
                        <tr key={app.id} className="border-b hover:bg-accent/50">
                          <td className="p-4 font-medium">{app.jobTitle}</td>
                          <td className="p-4">{app.company}</td>
                          <td className="p-4">{app.location}</td>
                          <td className="p-4">
                            <Badge variant={
                              app.matchScore >= 80 ? "success" :
                              app.matchScore >= 60 ? "info" : "warning"
                            }>
                              {app.matchScore}%
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant={STATUS_COLORS[app.status] as any}>
                              {columnLabels[app.status]}
                            </Badge>
                          </td>
                          <td className="p-4">{app.appliedDate ? formatDate(app.appliedDate) : "-"}</td>
                          <td className="p-4">{app.interviewDate ? formatDate(app.interviewDate) : "-"}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function KanbanColumn({ column, applications }: { column: typeof STATUS_COLUMNS[0]; applications: typeof APPLICATIONS }) {
  return (
    <div className="min-w-[320px] max-w-[320px] flex flex-col">
      <div className="flex items-center justify-between p-3 rounded-t-lg bg-muted">
        <h3 className="font-medium text-sm">{column.label}</h3>
        <Badge variant="secondary">{applications.length}</Badge>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[400px] bg-background/50 rounded-b-lg">
        {applications.length === 0 ? (
          <div className="text-center text-muted-foreground py-8 text-sm">
            No applications
          </div>
        ) : (
          applications.map((app) => (
            <ApplicationCard key={app.id} app={app} />
          ))
        )}
      </div>
    </div>
  );
}

function ApplicationCard({ app }: { app: typeof APPLICATIONS[0] }) {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate">{app.jobTitle}</h4>
            <p className="text-sm text-muted-foreground">{app.company}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {app.location}
              </span>
              <Badge variant={
                app.matchScore >= 80 ? "success" :
                app.matchScore >= 60 ? "info" : "warning"
              } className="text-xs">
                {app.matchScore}%
              </Badge>
            </div>
            {app.interviewDate && (
              <div className="mt-2 p-2 rounded bg-amber-50 dark:bg-amber-900/20">
                <p className="text-xs font-medium text-amber-800 dark:text-amber-200 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Interview: {formatDate(app.interviewDate)}
                </p>
              </div>
            )}
            {app.followUpDate && (
              <div className="mt-2 p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                <p className="text-xs font-medium text-blue-800 dark:text-blue-200 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Follow up: {formatDate(app.followUpDate)}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const columnLabels: Record<string, string> = {
  discovered: "Discovered",
  shortlisted: "Shortlisted",
  resume_prepared: "Resume Prepared",
  ready_for_review: "Ready for Review",
  awaiting_approval: "Awaiting Approval",
  submitted: "Submitted",
  confirmation_received: "Confirmed",
  interview: "Interview",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
  offer: "Offer",
};