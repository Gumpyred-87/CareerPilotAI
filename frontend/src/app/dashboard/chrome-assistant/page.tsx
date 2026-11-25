"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Monitor,
  CheckCircle,
  AlertCircle,
  Download,
  RefreshCw,
  Loader2,
  Link2,
  Settings,
  Zap,
  Shield,
  Wifi,
  WifiOff,
} from "@/components/ui/icons";

const SUPPORTED_ATS = [
  { id: "greenhouse", name: "Greenhouse", status: "supported", color: "green", lastTested: "2 hours ago" },
  { id: "lever", name: "Lever", status: "supported", color: "green", lastTested: "1 day ago" },
  { id: "workday", name: "Workday", status: "partial", color: "amber", lastTested: "3 days ago" },
  { id: "ashby", name: "Ashby", status: "supported", color: "green", lastTested: "5 hours ago" },
  { id: "smartrecruiters", name: "SmartRecruiters", status: "supported", color: "green", lastTested: "1 day ago" },
  { id: "icims", name: "iCIMS", status: "unsupported", color: "red", lastTested: "Never" },
  { id: "taleo", name: "Taleo", status: "unsupported", color: "red", lastTested: "Never" },
  { id: "bamboohr", name: "BambooHR", status: "partial", color: "amber", lastTested: "1 week ago" },
];

const EXTENSION_STATUS = {
  connected: false,
  version: "1.0.0",
  lastSync: null,
  permissions: ["activeTab", "storage", "scripting"],
  hostPermissions: ["*://*.greenhouse.io/*", "*://*.lever.co/*", "*://*.workday.com/*", "*://*.ashbyhq.com/*", "*://*.smartrecruiters.com/*"],
};

export default function ChromeAssistantPage() {
  const [activeTab, setActiveTab] = React.useState("status");
  const [isInstalling, setIsInstalling] = React.useState(false);
  const [isTesting, setIsTesting] = React.useState<string | null>(null);

  const testATS = async (atsId: string) => {
    setIsTesting(atsId);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsTesting(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Chrome Assistant</h1>
            <p className="text-muted-foreground mt-1">
              Configure and monitor the CareerPilot Chrome Extension
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={EXTENSION_STATUS.connected ? "success" : "destructive"} className="text-lg px-3 py-1">
              {EXTENSION_STATUS.connected ? (
                <>
                  <Wifi className="mr-1 h-4 w-4" />
                  Connected
                </>
              ) : (
                <>
                  <WifiOff className="mr-1 h-4 w-4" />
                  Disconnected
                </>
              )}
            </Badge>
            <Button variant="outline" disabled={isInstalling}>
              <Download className="mr-2 h-4 w-4" />
              {isInstalling ? "Installing..." : "Install Extension"}
            </Button>
          </div>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Extension Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-mono text-lg font-semibold">{EXTENSION_STATUS.version}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-semibold capitalize">{EXTENSION_STATUS.connected ? "Connected" : "Disconnected"}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="font-mono text-sm">{EXTENSION_STATUS.lastSync ? "2 min ago" : "Never"}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <p className="text-sm text-muted-foreground">Permissions</p>
                <p className="font-mono text-sm">{EXTENSION_STATUS.permissions.length} granted</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg border">
              <h4 className="font-medium mb-3">Host Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {EXTENSION_STATUS.hostPermissions.map((perm) => (
                  <Badge key={perm} variant="outline" className="text-xs">
                    {perm}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="ats">Supported ATS Platforms</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
            <TabsTrigger value="troubleshoot">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="ats" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>ATS Platform Support</CardTitle>
                <CardDescription>
                  The extension provides autofill and job detection for these platforms.
                  Green = Full support, Amber = Partial, Red = Not supported
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {SUPPORTED_ATS.map((ats) => (
                    <div
                      key={ats.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-muted">
                          {ats.status === "supported" && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {ats.status === "partial" && <AlertCircle className="h-5 w-5 text-amber-600" />}
                          {ats.status === "unsupported" && <AlertCircle className="h-5 w-5 text-red-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{ats.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Last tested: {ats.lastTested}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          ats.status === "supported" ? "success" :
                          ats.status === "partial" ? "warning" : "destructive"
                        }>
                          {ats.status === "supported" ? "Full Support" :
                           ats.status === "partial" ? "Partial" : "Not Supported"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testATS(ats.id)}
                          disabled={isTesting === ats.id || ats.status === "unsupported"}
                        >
                          {isTesting === ats.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Job Detection",
                  description: "Automatically detects job application pages on supported ATS platforms",
                  status: "active",
                },
                {
                  icon: Shield,
                  title: "Secure Autofill",
                  description: "Maps form fields to your profile data without storing credentials",
                  status: "active",
                },
                {
                  icon: Link2,
                  title: "Job Extraction",
                  description: "Extracts job title, company, description, and requirements",
                  status: "active",
                },
                {
                  icon: Settings,
                  title: "Field Mapping",
                  description: "Intelligent mapping of application fields to your candidate profile",
                  status: "active",
                },
                {
                  icon: Download,
                  title: "Document Attach",
                  description: "Attach tailored resume and cover letter with one click",
                  status: "partial",
                },
                {
                  icon: Shield,
                  title: "Screening Answers",
                  description: "Prepares custom responses to common screening questions",
                  status: "partial",
                },
                {
                  icon: Zap,
                  title: "Real-time Sync",
                  description: "Application status synced instantly with your dashboard",
                  status: "active",
                },
                {
                  icon: Settings,
                  title: "Multi-ATS Support",
                  description: "Domain-specific adapters for Greenhouse, Lever, Workday, Ashby, SmartRecruiters",
                  status: "active",
                },
                {
                  icon: AlertCircle,
                  title: "Manual Fallback",
                  description: "Guided manual assistance when automation is blocked",
                  status: "active",
                },
              ].map((feature) => (
                <Card key={feature.title} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{feature.title}</h4>
                          <Badge variant={
                            feature.status === "active" ? "success" :
                            feature.status === "partial" ? "warning" : "destructive"
                          } className="text-xs">
                            {feature.status === "active" ? "Active" :
                             feature.status === "partial" ? "Partial" : "Planned"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="setup" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Installation Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Step 1: Build the Extension</h4>
                    <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto"><code>{`cd chrome-extension
npm install
npm run build`}</code></pre>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Step 2: Load in Chrome</h4>
                    <ol className="space-y-2 list-decimal list-inside text-sm">
                      <li>Open Chrome and navigate to <code className="bg-muted px-1 rounded">chrome://extensions/</code></li>
                      <li>Enable "Developer mode" (top right toggle)</li>
                      <li>Click "Load unpacked" button</li>
                      <li>Select the <code className="bg-muted px-1 rounded">chrome-extension/dist</code> folder</li>
                      <li>The extension should appear in your toolbar</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Step 3: Connect to Backend</h4>
                    <ol className="space-y-2 list-decimal list-inside text-sm">
                      <li>Click the CareerPilot extension icon</li>
                      <li>Click "Connect to CareerPilot"</li>
                      <li>Log in with your CareerPilot credentials</li>
                      <li>Grant requested permissions</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Step 4: Test on a Job Page</h4>
                    <ol className="space-y-2 list-decimal list-inside text-sm">
                      <li>Navigate to a job posting on Greenhouse, Lever, or other supported ATS</li>
                      <li>Click the extension icon - it should show "Job Detected"</li>
                      <li>Click "Prepare Application" to autofill</li>
                      <li>Review and submit</li>
                    </ol>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Notes</h4>
                    <ul className="space-y-1 text-sm text-amber-700 dark:text-amber-300">
                      <li>• Extension requires Chrome 88+ (Manifest V3)</li>
                      <li>• Never stores your passwords or session cookies</li>
                      <li>• Only accesses job application pages you visit</li>
                      <li>• Requires explicit approval before any form submission</li>
                      <li>• Some ATS platforms may block automation - manual fallback provided</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshoot" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Common Issues</h4>
                    <div className="space-y-4">
                      {[
                        {
                          issue: "Extension shows 'Not Connected'",
                          solution: "Ensure the backend server is running at http://localhost:8000. Check the extension popup for connection status and re-authenticate if needed.",
                        },
                        {
                          issue: "Job not detected on supported ATS",
                          solution: "Refresh the page. Some ATS platforms load content dynamically. Try clicking the extension icon to force detection.",
                        },
                        {
                          issue: "Autofill not working",
                          solution: "Check that the field mappings are correct in the extension popup. Some custom fields may not be supported. Use manual fallback.",
                        },
                        {
                          issue: "Extension blocked by ATS",
                          solution: "Some platforms (Workday, Taleo, iCIMS) have anti-automation measures. The extension will show a manual guidance mode instead.",
                        },
                        {
                          issue: "Changes not syncing to dashboard",
                          solution: "Check network connectivity. The extension syncs via the backend API. Check browser console for errors.",
                        },
                      ].map((item) => (
                        <div key={item.issue} className="p-4 rounded-lg border">
                          <h5 className="font-medium mb-1">{item.issue}</h5>
                          <p className="text-sm text-muted-foreground">{item.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Debug Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        View Extension Logs
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Settings className="mr-2 h-4 w-4" />
                        Reset Extension Data
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Link2 className="mr-2 h-4 w-4" />
                        Open Chrome DevTools
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Export Debug Report
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Need Help?</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Check the <a href="#" className="underline">documentation</a> or
                      <a href="#" className="underline">report an issue</a> on GitHub.
                      Include the debug report for faster resolution.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}