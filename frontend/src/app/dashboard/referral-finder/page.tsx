"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Users,
  Search,
  Linkedin,
  Mail,
  Copy,
  Check,
  Star,
  Building2,
  MapPin,
  Briefcase,
  MessageSquare,
  Loader2,
} from "@/components/ui/icons";

const REFERRALS = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Senior SAP Security Lead",
    company: "SAP Labs India",
    location: "Bangalore, India",
    profileUrl: "https://linkedin.com/in/priyasharma",
    relevance: 95,
    source: "LinkedIn",
    connectionDegree: "2nd",
    mutualConnections: 3,
    suggestedMessage: "Hi Priya, I noticed you're leading SAP Security at SAP Labs. I'm a SAP Security & GRC Consultant with 6+ years experience...",
    status: "identified",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    title: "SAP Security Architect",
    company: "Deloitte",
    location: "Hyderabad, India",
    profileUrl: "https://linkedin.com/in/rajeshkumar",
    relevance: 91,
    source: "LinkedIn",
    connectionDegree: "3rd",
    mutualConnections: 1,
    suggestedMessage: "Hi Rajesh, I see you're working on SAP Security Architecture at Deloitte. I'm targeting similar roles...",
    status: "contacted",
  },
  {
    id: "3",
    name: "Anita Desai",
    title: "SAP GRC Practice Lead",
    company: "EY",
    location: "Pune, India",
    profileUrl: "https://linkedin.com/in/anitadesai",
    relevance: 88,
    source: "LinkedIn",
    connectionDegree: "2nd",
    mutualConnections: 2,
    suggestedMessage: "Hi Anita, I'm impressed by your work in SAP GRC at EY. As a GRC AC 12.0 specialist...",
    status: "identified",
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "SAP BTP Security Specialist",
    company: "Accenture",
    location: "Remote (India)",
    profileUrl: "https://linkedin.com/in/vikramsingh",
    relevance: 85,
    source: "LinkedIn",
    connectionDegree: "3rd",
    mutualConnections: 0,
    suggestedMessage: "Hi Vikram, I came across your profile while researching SAP BTP Security roles at Accenture...",
    status: "responded",
  },
];

const TARGET_COMPANIES = [
  "SAP Labs India", "Deloitte", "EY", "Accenture", "Capgemini", "Infosys", "TCS", "Wipro",
  "IBM", "Microsoft", "Google", "Amazon", "Oracle", "Salesforce", "ServiceNow"
];

export default function ReferralFinderPage() {
  const [activeTab, setActiveTab] = React.useState("referrals");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [targetCompany, setTargetCompany] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSearching(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Referral Finder</h1>
            <p className="text-muted-foreground mt-1">
              Discover professional contacts for referrals at target companies
            </p>
          </div>
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Export Contacts
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Referral Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium mb-1">Target Company</label>
                <select
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">Select a company...</option>
                  {TARGET_COMPANIES.map((company) => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role/Keywords</label>
                <Input
                  placeholder="e.g., SAP Security, GRC Architect"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button variant="default" onClick={handleSearch} disabled={isSearching} className="w-full">
                  {isSearching ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                  {isSearching ? "Searching..." : "Find Contacts"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="referrals">My Referrals ({REFERRALS.length})</TabsTrigger>
            <TabsTrigger value="search">Search New</TabsTrigger>
            <TabsTrigger value="messages">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="referrals" className="mt-4">
            <div className="space-y-4">
              {REFERRALS.map((referral) => (
                <ReferralCard key={referral.id} referral={referral} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="search" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Search for new contacts</h3>
                <p className="text-muted-foreground mt-1">
                  Use the search form above to find referral contacts at target companies
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="mt-4">
            <div className="space-y-4">
              {[
                {
                  name: "Cold Outreach",
                  template: "Hi {name}, I noticed you're working as {title} at {company}. I'm a SAP Security & GRC Consultant with 6+ years experience...",
                  variables: ["name", "title", "company"],
                },
                {
                  name: "Mutual Connection",
                  template: "Hi {name}, {mutual_connection} suggested I reach out. I'm exploring opportunities at {company}...",
                  variables: ["name", "mutual_connection", "company"],
                },
                {
                  name: "Alma Mater",
                  template: "Hi {name}, I see we both attended {university}. I'm a SAP Security professional interested in {company}...",
                  variables: ["name", "university", "company"],
                },
                {
                  name: "Follow-up",
                  template: "Hi {name}, following up on my previous message. I'm very interested in the {role} position at {company}...",
                  variables: ["name", "role", "company"],
                },
              ].map((msg) => (
                <Card key={msg.name}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold">{msg.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{msg.template}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {msg.variables.map((v) => (
                            <Badge key={v} variant="outline" className="text-xs">{v}</Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-1 h-4 w-4" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function ReferralCard({ referral }: { referral: typeof REFERRALS[0] }) {
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{referral.name}</h3>
                <Badge variant={
                  referral.relevance >= 90 ? "success" :
                  referral.relevance >= 70 ? "info" : "warning"
                }>
                  {referral.relevance}% Relevance
                </Badge>
                <Badge variant="gray">{referral.connectionDegree}</Badge>
                {referral.mutualConnections > 0 && (
                  <Badge variant="info">{referral.mutualConnections} mutual connections</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {referral.title} at {referral.company}
              </p>
              <p className="text-sm text-muted-foreground">
                {referral.location} • Source: {referral.source}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={referral.status === "identified" ? "gray" :
                  referral.status === "contacted" ? "blue" :
                  referral.status === "responded" ? "success" : "amber"
                }>
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => setShowMessage(!showMessage)}>
                <MessageSquare className="mr-1 h-4 w-4" />
                {showMessage ? "Hide" : "Message"}
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Linkedin className="mr-1 h-4 w-4" />
                Profile
              </Button>
              <Button variant="default" size="sm" className="w-full sm:w-auto">
                <Mail className="mr-1 h-4 w-4" />
                Contact
              </Button>
            </div>
          </div>
        </div>

        {showMessage && (
          <div className="border-t bg-muted/30 p-4 animate-in slide-in-from-top-2">
            <h4 className="font-medium mb-2">Suggested Message</h4>
            <div className="p-3 rounded bg-background border mb-3">
              <p className="text-sm">{referral.suggestedMessage}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Copy className="mr-1 h-4 w-4" />
                Copy Message
              </Button>
              <Button variant="default" size="sm">
                <Mail className="mr-1 h-4 w-4" />
                Send via Email
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="mr-1 h-4 w-4" />
                Send via LinkedIn
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}