"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Bot,
  FileText,
  PenTool,
  Check,
  Clock,
  AlertCircle,
  ArrowRight,
  Loader2,
  RefreshCw,
  Trash2,
  Edit,
  Eye,
} from "@/components/ui/icons";

const APPLICATION_QUEUE = [
  {
    id: "1",
    jobTitle: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    status: "ready_for_review",
    matchScore: 95,
    resumeVersion: "v2.1",
    coverLetter: "Generated",
    screeningAnswers: "Prepared",
    createdAt: "2 hours ago",
    updatedAt: "30 min ago",
  },
  {
    id: "2",
    jobTitle: "SAP Security Architect",
    company: "Deloitte",
    status: "awaiting_approval",
    matchScore: 91,
    resumeVersion: "v1.3",
    coverLetter: "Generated",
    screeningAnswers: "Prepared",
    createdAt: "1 day ago",
    updatedAt: "2 hours ago",
  },
  {
    id: "3",
    jobTitle: "SAP GRC AC 12.0 Consultant",
    company: "EY",
    status: "resume_prepared",
    matchScore: 89,
    resumeVersion: "v2.0",
    coverLetter: "Pending",
    screeningAnswers: "Pending",
    createdAt: "2 days ago",
    updatedAt: "1 day ago",
  },
];

const STATUS_CONFIG = {
  discovered: { label: "Discovered", color: "gray", icon: FileText },
  shortlisted: { label: "Shortlisted", color: "blue", icon: Star },
  resume_prepared: { label: "Resume Prepared", color: "purple", icon: FileText },
  ready_for_review: { label: "Ready for Review", color: "indigo", icon: Eye },
  awaiting_approval: { label: "Awaiting Approval", color: "amber", icon: AlertCircle },
  submitted: { label: "Submitted", color: "green", icon: Check },
  confirmation_received: { label: "Confirmed", color: "emerald", icon: Check },
  interview: { label: "Interview", color: "orange", icon: Calendar },
  rejected: { label: "Rejected", color: "red", icon: X },
  withdrawn: { label: "Withdrawn", color: "gray", icon: Trash2 },
  offer: { label: "Offer", color: "amber", icon: Trophy },
};

export default function ApplicationAgentPage() {
  const [activeTab, setActiveTab] = React.useState("queue");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Application Agent</h1>
            <p className="text-muted-foreground mt-1">
              Prepare, review, and manage job applications with AI assistance
            </p>
          </div>
          <Button variant="default">
            <FileText className="mr-2 h-4 w-4" />
            Prepare New Application
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="queue">Queue ({APPLICATION_QUEUE.length})</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="review">In Review</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
          </TabsList>

          <TabsContent value="queue" className="mt-4">
            <ApplicationQueue jobs={APPLICATION_QUEUE} />
          </TabsContent>

          <TabsContent value="preparing" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Loader2 className="h-12 w-12 mx-auto text-muted-foreground/50 animate-spin" />
                <h3 className="mt-4 text-lg font-medium">Preparing applications...</h3>
                <p className="text-muted-foreground mt-1">Applications being prepared will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Eye className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No applications in review</h3>
                <p className="text-muted-foreground mt-1">Applications awaiting your review will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submitted" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Check className="h-12 w-12 mx-auto text-muted-foreground/50 text-green-500" />
                <h3 className="mt-4 text-lg font-medium">No submitted applications</h3>
                <p className="text-muted-foreground mt-1">Submitted applications will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function ApplicationQueue({ jobs }: { jobs: typeof APPLICATION_QUEUE }) {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-semibold">{job.jobTitle}</h3>
                    <Badge variant={
                      job.matchScore >= 80 ? "success" :
                      job.matchScore >= 60 ? "info" : "warning"
                    }>
                      {job.matchScore}% Match
                    </Badge>
                    <Badge variant={STATUS_CONFIG[job.status as keyof typeof STATUS_CONFIG]?.color as any || "gray"}>
                      {STATUS_CONFIG[job.status as keyof typeof STATUS_CONFIG]?.label || job.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" /> Resume: {job.resumeVersion}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <PenTool className="h-3.5 w-3.5" /> Cover Letter: {job.coverLetter}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Check className="h-3.5 w-3.5" /> Screening: {job.screeningAnswers}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Created: {job.createdAt}
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Eye className="mr-1 h-4 w-4" />
                    Review
                  </Button>
                  {job.status === "awaiting_approval" && (
                    <Button variant="default" size="sm" className="w-full sm:w-auto">
                      <ArrowRight className="mr-1 h-4 w-4" />
                      Approve & Submit
                    </Button>
                  )}
                  {job.status === "ready_for_review" && (
                    <Button variant="default" size="sm" className="w-full sm:w-auto">
                      <ArrowRight className="mr-1 h-4 w-4" />
                      Approve & Submit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {jobs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Bot className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">Application queue is empty</h3>
            <p className="text-muted-foreground mt-1">
              Start by preparing an application from a recommended job
            </p>
            <Button variant="default" className="mt-4">
              <FileText className="mr-2 h-4 w-4" />
              Prepare New Application
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}