"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  PenTool,
  FileText,
  Download,
  Edit,
  Delete,
  Eye,
  Plus,
  Loader2,
  Copy,
  FilePlus,
  Type,
} from "@/components/ui/icons";

const COVER_LETTERS = [
  {
    id: "1",
    jobTitle: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    version: "Professional",
    matchScore: 95,
    createdAt: "2 hours ago",
    status: "ready",
    wordCount: 342,
  },
  {
    id: "2",
    jobTitle: "SAP Security Architect",
    company: "Deloitte",
    version: "Concise",
    matchScore: 91,
    createdAt: "1 day ago",
    status: "ready",
    wordCount: 198,
  },
  {
    id: "3",
    jobTitle: "SAP GRC AC 12.0 Consultant",
    company: "EY",
    version: "Personalized",
    matchScore: 89,
    createdAt: "2 days ago",
    status: "draft",
    wordCount: 287,
  },
];

const VERSIONS = [
  { id: "professional", label: "Professional", description: "Formal, comprehensive cover letter" },
  { id: "concise", label: "Concise", description: "Brief, to-the-point version" },
  { id: "personalized", label: "Personalized", description: "Customized with company research" },
];

export default function CoverLetterStudioPage() {
  const [activeTab, setActiveTab] = React.useState("letters");
  const [isGenerating, setIsGenerating] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cover Letter Studio</h1>
            <p className="text-muted-foreground mt-1">
              Generate customized cover letters for each application
            </p>
          </div>
          <Button variant="default" onClick={() => {}} disabled={isGenerating}>
            <Plus className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Cover Letter"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="letters">My Letters ({COVER_LETTERS.length})</TabsTrigger>
            <TabsTrigger value="generate">Generate New</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="letters" className="mt-4">
            <CoverLettersList letters={COVER_LETTERS} />
          </TabsContent>

          <TabsContent value="generate" className="mt-4">
            <GenerateCoverLetterForm />
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            <TemplatesList versions={VERSIONS} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function CoverLettersList({ letters }: { letters: typeof COVER_LETTERS }) {
  return (
    <div className="space-y-4">
      {letters.map((letter) => (
        <Card key={letter.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{letter.jobTitle}</h3>
                    <Badge variant={
                      letter.matchScore >= 80 ? "success" :
                      letter.matchScore >= 60 ? "info" : "warning"
                    }>
                      {letter.matchScore}% Match
                    </Badge>
                    <Badge variant="purple">{letter.version}</Badge>
                    <Badge variant={letter.status === "ready" ? "success" : "warning"}>
                      {letter.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{letter.company}</p>
                  <p className="text-sm text-muted-foreground">{letter.wordCount} words • Created {letter.createdAt}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="mr-1 h-4 w-4" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Download className="mr-1 h-4 w-4" />
                    DOCX
                  </Button>
                  <Button variant="default" size="sm" className="w-full sm:w-auto">
                    <FileText className="mr-1 h-4 w-4" />
                    Use for Application
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {letters.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <PenTool className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No cover letters generated</h3>
            <p className="text-muted-foreground mt-1">
              Generate your first cover letter from the "Generate New" tab
            </p>
            <Button variant="default" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Generate Cover Letter
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function GenerateCoverLetterForm() {
  const [jobTitle, setJobTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [selectedVersion, setSelectedVersion] = React.useState("professional");
  const [resumeId, setResumeId] = React.useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate New Cover Letter</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title *</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Senior SAP Security Consultant"
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company *</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g., SAP Labs India"
                className="w-full px-3 py-2 border rounded-md bg-background"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Description *</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={8}
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Base Resume</label>
            <select
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              <option value="">Select a resume...</option>
              <option value="1">SAP Security Consultant - Master Resume</option>
              <option value="2">SAP GRC Specialist - Tailored</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Letter Style</label>
            <div className="grid gap-2 md:grid-cols-3">
              {VERSIONS.map((version) => (
                <button
                  key={version.id}
                  type="button"
                  onClick={() => setSelectedVersion(version.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedVersion === version.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <h4 className="font-medium">{version.label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{version.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline">Cancel</Button>
            <Button variant="default" disabled={!jobTitle || !company || !jobDescription || !resumeId}>
              <Type className="mr-2 h-4 w-4" />
              Generate Cover Letter
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function TemplatesList({ versions }: { versions: typeof VERSIONS }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {versions.map((version) => (
        <Card key={version.id} className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Type className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{version.label}</h3>
                <p className="text-sm text-muted-foreground">{version.description}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Use Template
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}