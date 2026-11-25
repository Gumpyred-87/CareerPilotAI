"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn, formatSalary } from "@/lib/utils";
import {
  Search,
  Filter,
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  Globe,
  Clock,
  Star,
  StarHalf,
  Star as StarEmpty,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Loader2,
} from "@/components/ui/icons";

const JOB_SOURCES = [
  "All Sources",
  "Adzuna",
  "Remotive",
  "Arbeitnow",
  "Greenhouse",
  "Lever",
  "Ashby",
  "SmartRecruiters",
  "Company Career Pages",
];

const LOCATION_TYPES = ["All", "Remote", "Hybrid", "Onsite"];
const EMPLOYMENT_TYPES = ["All", "Full-time", "Part-time", "Contract", "Contract-to-hire", "Internship"];
const EXPERIENCE_LEVELS = ["All", "Entry", "Mid", "Senior", "Lead", "Principal"];

const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    location: "Bangalore, India",
    type: "Full-time",
    remote: true,
    salary: { min: 2500000, max: 3500000, currency: "INR", period: "yearly" },
    experience: "Senior",
    matchScore: 95,
    skills: ["SAP Security", "GRC", "S/4HANA", "Fiori", "BTP", "SoD"],
    posted: "3 hours ago",
    source: "Company Career",
    visaSponsorship: false,
  },
  {
    id: "2",
    title: "SAP Security Architect",
    company: "Deloitte",
    location: "Hyderabad, India",
    type: "Full-time",
    remote: false,
    salary: { min: 3000000, max: 4500000, currency: "INR", period: "yearly" },
    experience: "Lead",
    matchScore: 91,
    skills: ["SAP Security", "S/4HANA", "GRC", "SoD", "Authorization"],
    posted: "1 day ago",
    source: "Greenhouse",
    visaSponsorship: false,
  },
  {
    id: "3",
    title: "SAP GRC AC 12.0 Consultant",
    company: "EY",
    location: "Pune, India",
    type: "Contract",
    remote: true,
    salary: { min: 150000, max: 200000, currency: "INR", period: "monthly" },
    experience: "Senior",
    matchScore: 89,
    skills: ["GRC", "ARA", "ARM", "BRM", "SoD"],
    posted: "2 days ago",
    source: "Lever",
    visaSponsorship: false,
  },
  {
    id: "4",
    title: "SAP BTP Security Specialist",
    company: "Accenture",
    location: "Remote (India)",
    type: "Full-time",
    remote: true,
    salary: { min: 2000000, max: 3000000, currency: "INR", period: "yearly" },
    experience: "Mid",
    matchScore: 87,
    skills: ["BTP", "IAS", "IPS", "IAG", "SAML", "OAuth"],
    posted: "4 hours ago",
    source: "Adzuna",
    visaSponsorship: false,
  },
  {
    id: "5",
    title: "SAP Fiori Security Expert",
    company: "Capgemini",
    location: "Bangalore, India",
    type: "Full-time",
    remote: false,
    salary: { min: 1800000, max: 2500000, currency: "INR", period: "yearly" },
    experience: "Senior",
    matchScore: 84,
    skills: ["Fiori", "OData", "Authorization", "SUIM", "STAUTHTRACE"],
    posted: "1 day ago",
    source: "SmartRecruiters",
    visaSponsorship: false,
  },
];

export default function AIJobSearchPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSource, setSelectedSource] = React.useState("All Sources");
  const [selectedLocation, setSelectedLocation] = React.useState("All");
  const [selectedEmployment, setSelectedEmployment] = React.useState("All");
  const [selectedExperience, setSelectedExperience] = React.useState("All");
  const [minSalary, setMinSalary] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [sortBy, setSortBy] = React.useState<"match" | "date" | "salary">("match");

  const handleSearch = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Job Search</h1>
            <p className="text-muted-foreground mt-1">
              Discover jobs from multiple sources with intelligent matching
            </p>
          </div>
          <Button variant="outline" onClick={handleSearch} disabled={isLoading}>
            <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
            Refresh Results
          </Button>
        </div>

        {/* Search Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-1">Keywords</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Job title, skills, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Source</label>
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_SOURCES.map((source) => (
                      <SelectItem key={source} value={source}>
                        {source}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location Type</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Employment Type</label>
                <Select value={selectedEmployment} onValueChange={setSelectedEmployment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Experience Level</label>
                <Select value={selectedExperience} onValueChange={setSelectedExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Min Salary (Annual)</label>
                <Input
                  type="number"
                  placeholder="e.g., 2000000"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <Button variant="default" onClick={handleSearch} disabled={isLoading}>
                <Search className="mr-2 h-4 w-4" />
                Search Jobs
              </Button>
              <Button variant="outline" onClick={() => {
                setSearchQuery("");
                setSelectedSource("All Sources");
                setSelectedLocation("All");
                setSelectedEmployment("All");
                setSelectedExperience("All");
                setMinSalary("");
              }}>
                Clear Filters
              </Button>
              <div className="flex-1" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Match Score (High to Low)</SelectItem>
                  <SelectItem value="date">Posted Date (Newest First)</SelectItem>
                  <SelectItem value="salary">Salary (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              Search Results
              <Badge variant="secondary" className="ml-2">
                {MOCK_JOBS.length} jobs found
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_JOBS.map((job) => (
                <div
                  key={job.id}
                  className={cn(
                    "flex flex-col sm:flex-row gap-4 p-4 rounded-lg border",
                    "hover:bg-accent/50 transition-colors"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                      <h3 className="font-semibold">{job.title}</h3>
                      <Badge variant={
                        job.matchScore >= 80 ? "success" :
                        job.matchScore >= 60 ? "info" : "warning"
                      }>
                        {job.matchScore}% Match
                      </Badge>
                      {job.remote && <Badge variant="info">Remote</Badge>}
                      {job.visaSponsorship && <Badge variant="purple">Visa Sponsorship</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {job.company} • {job.location} • {job.type} • {job.experience}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills.slice(0, 6).map((skill) => (
                        <Badge key={skill} variant="gray" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
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
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Star className="mr-1 h-4 w-4" />
                      Shortlist
                    </Button>
                    <Button variant="default" size="sm" className="w-full sm:w-auto">
                      <Briefcase className="mr-1 h-4 w-4" />
                      Prepare Application
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {MOCK_JOBS.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search filters or keywords
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing 1 to 5 of 247 results
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">4</Button>
                <Button variant="outline" size="sm">5</Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}