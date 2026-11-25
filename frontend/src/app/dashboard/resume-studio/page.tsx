"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  FileText,
  Upload,
  Download,
  Edit,
  Delete,
  Eye,
  Plus,
  Loader2,
  Check,
  X,
  Copy,
  FilePlus,
  FileMinus,
  Search,
} from "@/components/ui/icons";

const RESUMES = [
  {
    id: "1",
    name: "SAP Security Consultant - Master Resume",
    filename: "SAP_Security_Consultant_Master.pdf",
    version: 1,
    isActive: true,
    uploadedAt: "2024-01-15",
    parsed: true,
    skills: 45,
    experiences: 5,
    educations: 2,
    certifications: 8,
  },
  {
    id: "2",
    name: "SAP GRC Specialist - Tailored",
    filename: "SAP_GRC_Specialist_Tailored.pdf",
    version: 2,
    isActive: false,
    uploadedAt: "2024-01-20",
    parsed: true,
    skills: 38,
    experiences: 4,
    educations: 2,
    certifications: 6,
  },
];

const TAILORS_VERSIONS = [
  {
    id: "1",
    jobTitle: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    matchScore: 95,
    createdAt: "2 hours ago",
    atsScore: 92,
    status: "ready",
  },
  {
    id: "2",
    jobTitle: "SAP Security Architect",
    company: "Deloitte",
    matchScore: 91,
    createdAt: "1 day ago",
    atsScore: 88,
    status: "ready",
  },
];

export default function ResumeStudioPage() {
  const [activeTab, setActiveTab] = React.useState("resumes");
  const [isUploading, setIsUploading] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resume Studio</h1>
            <p className="text-muted-foreground mt-1">
              Manage, parse, and tailor your resumes for each application
            </p>
          </div>
          <Button variant="default" onClick={() => {}} disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="resumes">My Resumes ({RESUMES.length})</TabsTrigger>
            <TabsTrigger value="tailored">Tailored Versions ({TAILORS_VERSIONS.length})</TabsTrigger>
            <TabsTrigger value="compare">Compare</TabsTrigger>
            <TabsTrigger value="ats">ATS Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="resumes" className="mt-4">
            <ResumesList resumes={RESUMES} />
          </TabsContent>

          <TabsContent value="tailored" className="mt-4">
            <TailoredVersionsList versions={TAILORS_VERSIONS} />
          </TabsContent>

          <TabsContent value="compare" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Resume Comparison</h3>
                <p className="text-muted-foreground mt-1">
                  Select two resume versions to compare changes side by side
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ats" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Check className="h-12 w-12 mx-auto text-muted-foreground/50 text-green-500" />
                <h3 className="mt-4 text-lg font-medium">ATS Keyword Analysis</h3>
                <p className="text-muted-foreground mt-1">
                  Upload a job description to analyze ATS keyword gaps
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function ResumesList({ resumes }: { resumes: typeof RESUMES }) {
  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <Card key={resume.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{resume.name}</h3>
                    {resume.isActive && <Badge variant="success">Active</Badge>}
                    <Badge variant="gray">v{resume.version}</Badge>
                    {resume.parsed && <Badge variant="info">Parsed</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {resume.filename} • Uploaded {resume.uploadedAt}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span><FileText className="inline h-3.5 w-3.5 mr-1" /> {resume.skills} skills</span>
                    <span><Briefcase className="inline h-3.5 w-3.5 mr-1" /> {resume.experiences} experiences</span>
                    <span><GraduationCap className="inline h-3.5 w-3.5 mr-1" /> {resume.educations} educations</span>
                    <span><Award className="inline h-3.5 w-3.5 mr-1" /> {resume.certifications} certifications</span>
                  </div>
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
                    Export
                  </Button>
                  <Button variant="default" size="sm" className="w-full sm:w-auto">
                    <FilePlus className="mr-1 h-4 w-4" />
                    Tailor for Job
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {resumes.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No resumes uploaded</h3>
            <p className="text-muted-foreground mt-1">
              Upload your resume to get started with parsing and tailoring
            </p>
            <Button variant="default" className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TailoredVersionsList({ versions }: { versions: typeof TAILORS_VERSIONS }) {
  return (
    <div className="space-y-4">
      {versions.map((version) => (
        <Card key={version.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{version.jobTitle}</h3>
                    <Badge variant={
                      version.matchScore >= 80 ? "success" :
                      version.matchScore >= 60 ? "info" : "warning"
                    }>
                      {version.matchScore}% Match
                    </Badge>
                    <Badge variant="purple">ATS: {version.atsScore}%</Badge>
                    <Badge variant={version.status === "ready" ? "success" : "warning"}>
                      {version.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{version.company}</p>
                  <p className="text-sm text-muted-foreground">Created {version.createdAt}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Eye className="mr-1 h-4 w-4" />
                    View
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
                    Prepare Application
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {versions.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FilePlus className="h-12 w-12 mx-auto text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-medium">No tailored versions</h3>
            <p className="text-muted-foreground mt-1">
              Create tailored resumes from the "My Resumes" tab
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}