"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Building2,
  Search,
  Users,
  Globe,
  DollarSign,
  TrendingUp,
  Award,
  Shield,
  Brain,
  Zap,
  Linkedin,
  Twitter,
  Github,
  ExternalLink,
  Star,
  Clock,
  MapPin,
  Briefcase,
} from "@/components/ui/icons";

const COMPANIES = [
  {
    id: "1",
    name: "SAP Labs India",
    domain: "sap.com",
    industry: "Enterprise Software",
    size: "10,000+",
    headquarters: "Bangalore, India",
    founded: "1972",
    description: "SAP Labs India is the second largest R&D center for SAP globally, focusing on innovation in cloud, analytics, and enterprise applications.",
    techStack: ["SAP HANA", "S/4HANA", "BTP", "Fiori", "Kubernetes", "Cloud Foundry", "Python", "Java"],
    openRoles: 45,
    matchScore: 92,
    glassdoorRating: 4.2,
    linkedinEmployees: 12000,
    recentNews: [
      "SAP Labs India announces 1,000 new hires in 2024",
      "New BTP innovation center opened in Bangalore",
      "Partnership with IIT Bangalore for AI research",
    ],
    hiringPatterns: "Hires heavily for SAP Security, GRC, BTP, and Fiori roles. Prefers candidates with S/4HANA migration experience.",
    culture: "Innovation-driven, strong work-life balance, excellent benefits, remote-friendly",
    benefits: ["Competitive salary", "Stock options", "Health insurance", "Learning budget", "Flexible work"],
  },
  {
    id: "2",
    name: "Deloitte India",
    domain: "deloitte.com",
    industry: "Professional Services",
    size: "50,000+",
    headquarters: "Mumbai, India",
    founded: "1845",
    description: "Deloitte India provides audit, consulting, tax, and advisory services across industries.",
    techStack: ["SAP S/4HANA", "SAP Security", "GRC", "Cloud", "AI/ML", "Data Analytics"],
    openRoles: 78,
    matchScore: 88,
    glassdoorRating: 4.0,
    linkedinEmployees: 55000,
    recentNews: [
      "Deloitte expands SAP practice in India",
      "New cybersecurity center launched",
      "Partnership with SAP for S/4HANA Cloud",
    ],
    hiringPatterns: "Consulting-focused roles. Values project management and client-facing experience alongside technical skills.",
    culture: "Fast-paced, client-oriented, strong learning culture, travel may be required",
    benefits: ["Competitive compensation", "Professional development", "Global mobility", "Health benefits"],
  },
  {
    id: "3",
    name: "EY India",
    domain: "ey.com",
    industry: "Professional Services",
    size: "40,000+",
    headquarters: "Gurugram, India",
    founded: "1989",
    description: "EY India provides assurance, tax, strategy, and consulting services.",
    techStack: ["SAP GRC", "SAP Security", "S/4HANA", "Cloud", "Risk Management"],
    openRoles: 52,
    matchScore: 85,
    glassdoorRating: 3.9,
    linkedinEmployees: 42000,
    recentNews: [
      "EY launches SAP GRC Center of Excellence",
      "Digital transformation practice growing 40% YoY",
    ],
    hiringPatterns: "Strong focus on GRC and Risk. Contract roles common for specialized skills.",
    culture: "Collaborative, inclusive, strong emphasis on ethics and quality",
    benefits: ["Flexible working", "Learning programs", "Wellness programs", "Volunteer time off"],
  },
];

export default function CompanyIntelligencePage() {
  const [activeTab, setActiveTab] = React.useState("search");
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Company Intelligence</h1>
            <p className="text-muted-foreground mt-1">
              Research companies, analyze hiring patterns, and find strategic insights
            </p>
          </div>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search companies by name, domain, or industry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="default">
                <Search className="mr-2 h-4 w-4" />
                Research
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="search">Discover Companies</TabsTrigger>
            <TabsTrigger value="tracked">Tracked ({COMPANIES.length})</TabsTrigger>
            <TabsTrigger value="insights">Hiring Insights</TabsTrigger>
            <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Search for companies</h3>
                <p className="text-muted-foreground mt-1">
                  Enter a company name or domain to get detailed intelligence
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracked" className="mt-4">
            <div className="space-y-4">
              {COMPANIES.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-4">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Hiring Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { metric: "Avg Time to Fill", value: "42 days", trend: "down", change: "-5 days vs last month" },
                      { metric: "Remote Role %", value: "38%", trend: "up", change: "+8% vs last quarter" },
                      { metric: "Contract vs Permanent", value: "45:55", trend: "neutral", change: "Stable ratio" },
                      { metric: "Top Skill Demand", value: "SAP BTP Security", trend: "up", change: "+40% mentions" },
                      { metric: "Avg Applications/Role", value: "127", trend: "up", change: "+23% vs last year" },
                      { metric: "Referral Hire Rate", value: "32%", trend: "up", change: "+5% vs last quarter" },
                    ].map((item) => (
                      <div key={item.metric} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="font-medium">{item.metric}</p>
                          <p className="text-sm text-muted-foreground">{item.change}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{item.value}</p>
                          <Badge variant={
                            item.trend === "up" ? "success" :
                            item.trend === "down" ? "destructive" : "gray"
                          } className="text-xs">
                            {item.trend === "up" ? "Improving" : item.trend === "down" ? "Declining" : "Stable"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Companies by Match
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {COMPANIES.sort((a, b) => b.matchScore - a.matchScore).map((company, i) => (
                      <div key={company.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 text-center font-bold text-muted-foreground">{i + 1}</span>
                          <div>
                            <p className="font-medium">{company.name}</p>
                            <p className="text-sm text-muted-foreground">{company.openRoles} open roles</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            company.matchScore >= 80 ? "success" :
                            company.matchScore >= 60 ? "info" : "warning"
                          }>
                            {company.matchScore}% Match
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{company.glassdoorRating}★ Glassdoor</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitors" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Competitor Analysis</h3>
                <p className="text-muted-foreground mt-1">
                  Compare companies side by side for strategic decision making
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function CompanyCard({ company }: { company: typeof COMPANIES[0] }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{company.name}</h3>
                <Badge variant={
                  company.matchScore >= 80 ? "success" :
                  company.matchScore >= 60 ? "info" : "warning"
                }>
                  {company.matchScore}% Match
                </Badge>
                <Badge variant="gray">{company.industry}</Badge>
                <Badge variant="gray">{company.size} employees</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {company.headquarters} • Founded {company.founded} • {company.glassdoorRating}★ Glassdoor
              </p>
              <p className="text-sm mt-2 line-clamp-2">{company.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {company.techStack.slice(0, 6).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" /> {company.openRoles} roles
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-3.5 w-3.5" /> {company.linkedinEmployees.toLocaleString()} LinkedIn
              </div>
              <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Less" : "Details"}
              </Button>
              <Button variant="default" size="sm">
                <Star className="mr-1 h-4 w-4" />
                Track
              </Button>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="border-t bg-muted/30 p-4 animate-in slide-in-from-top-2">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Hiring Patterns
                  </h4>
                  <p className="text-sm text-muted-foreground">{company.hiringPatterns}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Culture & Benefits
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">{company.culture}</p>
                  <div className="flex flex-wrap gap-1">
                    {company.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline" className="text-xs">{benefit}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Recent News
                  </h4>
                  <ul className="space-y-1">
                    {company.recentNews.map((news, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{news}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-background border">
                  <h5 className="font-medium mb-2">Quick Stats</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Size</span><span className="font-medium">{company.size}</span></div>
                    <div className="flex justify-between"><span>Founded</span><span className="font-medium">{company.founded}</span></div>
                    <div className="flex justify-between"><span>HQ</span><span className="font-medium">{company.headquarters}</span></div>
                    <div className="flex justify-between"><span>Open Roles</span><span className="font-medium text-primary">{company.openRoles}</span></div>
                    <div className="flex justify-between"><span>Glassdoor</span><span className="font-medium">{company.glassdoorRating}★</span></div>
                    <div className="flex justify-between"><span>LinkedIn</span><span className="font-medium">{company.linkedinEmployees.toLocaleString()}</span></div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-background border">
                  <h5 className="font-medium mb-2">Links</h5>
                  <div className="space-y-2">
                    <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <ExternalLink className="h-3.5 w-3.5" /> Website
                    </a>
                    <a href={`https://linkedin.com/company/${company.name.toLowerCase().replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                    <a href={`https://glassdoor.com/Reviews/${company.name.replace(/\s+/g, '-')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <Award className="h-3.5 w-3.5" /> Glassdoor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}