"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatSalary } from "@/lib/utils";
import {
  Star,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Globe,
  Clock,
  Check,
  X,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Rocket,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "@/components/ui/icons";

const RECOMMENDED_JOBS = [
  {
    id: "1",
    title: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    location: "Bangalore, India",
    type: "Full-time",
    remote: true,
    salary: { min: 2500000, max: 3500000, currency: "INR", period: "yearly" },
    matchScore: 95,
    skillsMatched: ["SAP Security", "GRC", "S/4HANA", "Fiori", "BTP", "SoD", "PFCG", "SU01"],
    skillsMissing: ["ABAP", "Cloud Foundry"],
    experienceMatch: "Perfect - 6+ years required, you have 6+",
    locationMatch: "Perfect - Bangalore preferred",
    salaryMatch: "Excellent - Within your range",
    visaMatch: "Not required - India local",
    reasonsToApply: [
      "Direct match for your SAP Security & GRC expertise",
      "Top-tier company with excellent benefits",
      "Work on cutting-edge S/4HANA and BTP security",
      "Remote option available",
    ],
    reasonsNotToApply: [
      "Highly competitive - many applicants expected",
      "May require ABAP knowledge for some tasks",
    ],
    posted: "3 hours ago",
    source: "Company Career",
    status: "discovered",
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
    skillsMatched: ["SAP Security", "S/4HANA", "GRC", "SoD", "Authorization", "SU24", "SU25"],
    skillsMissing: ["BTP Security", "Fiori Security"],
    experienceMatch: "Good - Lead role, you have senior experience",
    locationMatch: "Good - Hyderabad in your target locations",
    salaryMatch: "Excellent - Above your minimum",
    visaMatch: "Not required - India local",
    reasonsToApply: [
      "Prestigious consulting firm",
      "High salary range",
      "Leadership opportunity",
      "Hyderabad location preferred",
    ],
    reasonsNotToApply: [
      "Onsite only - no remote option",
      "Missing BTP/Fiori security experience",
      "Consulting travel may be required",
    ],
    posted: "1 day ago",
    source: "Greenhouse",
    status: "shortlisted",
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
    skillsMatched: ["GRC", "ARA", "ARM", "BRM", "SoD", "FFID", "EAM"],
    skillsMissing: ["S/4HANA", "BTP", "Fiori"],
    experienceMatch: "Good - Senior contractor role",
    locationMatch: "Good - Pune in your target locations",
    salaryMatch: "Good - Contract rate acceptable",
    visaMatch: "Not required - India local",
    reasonsToApply: [
      "Perfect match for your GRC AC 12.0 expertise",
      "Remote work available",
      "Pune location preferred",
      "Contract flexibility",
    ],
    reasonsNotToApply: [
      "Contract only - not permanent",
      "Limited S/4HANA/BTP exposure",
      "May not lead to permanent role",
    ],
    posted: "2 days ago",
    source: "Lever",
    status: "discovered",
  },
];

const TABS = [
  { id: "all", label: "All (3)" },
  { id: "new", label: "New (2)" },
  { id: "shortlisted", label: "Shortlisted (1)" },
  { id: "applied", label: "Applied (0)" },
];

export default function RecommendedJobsPage() {
  const [activeTab, setActiveTab] = React.useState("all");
  const [minScore, setMinScore] = React.useState(70);

  const filteredJobs = RECOMMENDED_JOBS.filter((job) => {
    if (job.matchScore < minScore) return false;
    if (activeTab === "new" && job.status !== "discovered") return false;
    if (activeTab === "shortlisted" && job.status !== "shortlisted") return false;
    if (activeTab === "applied" && !["submitted", "confirmation_received", "interview", "offer"].includes(job.status)) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recommended Jobs</h1>
            <p className="text-muted-foreground mt-1">
              AI-matched jobs ranked by compatibility with your profile
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Min Match Score:</label>
              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="px-2 py-1 border rounded-md text-sm bg-background"
              >
                <option value={50}>50%</option>
                <option value={60}>60%</option>
                <option value={70}>70%</option>
                <option value={80}>80%</option>
                <option value={90}>90%</option>
              </select>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <JobList jobs={filteredJobs} />
          </TabsContent>
          <TabsContent value="new" className="mt-4">
            <JobList jobs={filteredJobs.filter(j => j.status === "discovered")} />
          </TabsContent>
          <TabsContent value="shortlisted" className="mt-4">
            <JobList jobs={filteredJobs.filter(j => j.status === "shortlisted")} />
          </TabsContent>
          <TabsContent value="applied" className="mt-4">
            <JobList jobs={filteredJobs.filter(j => ["submitted", "confirmation_received", "interview", "offer"].includes(j.status))} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function JobList({ jobs }: { jobs: typeof RECOMMENDED_JOBS }) {
  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Star className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your filters or minimum match score
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Showing 1 to {jobs.length} of {jobs.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm">1</Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function JobCard({ job }: { job: typeof RECOMMENDED_JOBS[0] }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Main card content */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 flex-wrap">
                <h3 className="font-semibold">{job.title}</h3>
                <Badge variant={
                  job.matchScore >= 80 ? "success" :
                  job.matchScore >= 60 ? "info" : "warning"
                } className="text-lg px-3 py-1">
                  {job.matchScore}% Match
                </Badge>
                {job.remote && <Badge variant="info">Remote</Badge>}
                <Badge variant="gray">{job.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5" /> {job.company}
                <span>•</span>
                <MapPin className="h-3.5 w-3.5" /> {job.location}
                <span>•</span>
                <Clock className="h-3.5 w-3.5" /> {job.posted}
              </p>
              <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  {formatSalary(job.salary.min, job.salary.max, job.salary.currency, job.salary.period)}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3.5 w-3.5" />
                  {job.source}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => setExpanded(!expanded)}>
                {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {expanded ? "Less" : "Details"}
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Star className="mr-1 h-4 w-4" />
                Shortlist
              </Button>
              <Button variant="default" size="sm" className="w-full sm:w-auto">
                <FileText className="mr-1 h-4 w-4" />
                Prepare
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="border-t bg-muted/30 p-4 animate-in slide-in-from-top-2">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Match Breakdown */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    Match Breakdown
                  </h4>
                  <div className="space-y-2">
                    {[
                      { label: "Skills Match", score: Math.min(100, job.skillsMatched.length * 10), color: "green" },
                      { label: "Experience", score: 90, color: "blue" },
                      { label: "Location", score: 100, color: "green" },
                      { label: "Salary", score: 85, color: "blue" },
                      { label: "Visa/Eligibility", score: 100, color: "green" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <span className="text-sm w-32">{item.label}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${item.score}%`,
                              backgroundColor: item.color === "green" ? "#22c55e" : "#3b82f6",
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Skills Matched ({job.skillsMatched.length})
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {job.skillsMatched.map((skill) => (
                      <Badge key={skill} variant="success" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {job.skillsMissing.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Skills Missing ({job.skillsMissing.length})
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {job.skillsMissing.map((skill) => (
                        <Badge key={skill} variant="destructive" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Compatibility Details */}
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-background border">
                  <h5 className="font-medium mb-2">Experience Compatibility</h5>
                  <p className="text-sm text-muted-foreground">{job.experienceMatch}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border">
                  <h5 className="font-medium mb-2">Location Compatibility</h5>
                  <p className="text-sm text-muted-foreground">{job.locationMatch}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border">
                  <h5 className="font-medium mb-2">Salary Compatibility</h5>
                  <p className="text-sm text-muted-foreground">{job.salaryMatch}</p>
                </div>
                <div className="p-3 rounded-lg bg-background border">
                  <h5 className="font-medium mb-2">Visa/Eligibility</h5>
                  <p className="text-sm text-muted-foreground">{job.visaMatch}</p>
                </div>
              </div>

              {/* Reasons */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                    Reasons to Apply
                  </h4>
                  <ul className="space-y-1">
                    {job.reasonsToApply.map((reason, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                    Reasons Not to Apply
                  </h4>
                  <ul className="space-y-1">
                    {job.reasonsNotToApply.map((reason, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}