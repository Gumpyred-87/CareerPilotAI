"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  User,
  Settings,
  Key,
  Shield,
  Bell,
  Database,
  Cpu,
  Globe,
  Moon,
  Sun,
  Save,
  Loader2,
} from "@/components/ui/icons";

const TIMEZONES = ["Asia/Kolkata", "Asia/Dubai", "UTC", "America/New_York", "Europe/London"];
const LANGUAGES = ["en-US", "en-GB", "de-DE", "hi-IN", "ar-AE"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isSaving, setIsSaving] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your CareerPilot AI preferences
            </p>
          </div>
          <Button variant="default" onClick={handleSave} disabled={isSaving}>
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="candidate">
              <Settings className="mr-2 h-4 w-4" />
              Candidate Profile
            </TabsTrigger>
            <TabsTrigger value="ai">
              <Cpu className="mr-2 h-4 w-4" />
              AI Providers
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Moon className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Shield className="mr-2 h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6 max-w-2xl">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input placeholder="John Doe" defaultValue="User Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input type="email" placeholder="john@example.com" defaultValue="user@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Timezone</label>
                    <Select defaultValue="Asia/Kolkata">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMEZONES.map((tz) => (
                          <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <Select defaultValue="en-US">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Profile</CardTitle>
                <CardDescription>Your professional information used for job matching</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6 max-w-3xl">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Designation</label>
                        <Input placeholder="SAP Security & GRC Consultant" defaultValue="SAP Security & GRC Consultant" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Years of Experience</label>
                        <Input type="number" placeholder="6" defaultValue="6" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Location</label>
                        <Input placeholder="Hyderabad, India" defaultValue="Hyderabad, India" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Technical Skills</label>
                    <textarea
                      placeholder="Enter skills separated by commas..."
                      defaultValue="SAP ECC, SAP S/4HANA, SAP Security, SAP GRC AC 12.0, ARA, ARM, BRM, EAM, FFID, SoD, PFCG, SU01, SU24, SU25, SUIM, SU53, STAUTHTRACE, Fiori Security, SAP BTP Security, IAS, IPS, IAG, SAML, OAuth, role collections, OData, authorization troubleshooting, transports and audit compliance"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Target Countries</label>
                      <Select defaultValue="India">
                        <SelectTrigger>
                          <SelectValue placeholder="Select countries" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="UAE">UAE</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Singapore">Singapore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Preferred Locations (India)</label>
                      <Input placeholder="Hyderabad, Bangalore, Pune" defaultValue="Hyderabad, Bangalore, Pune" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Employment Types</label>
                      <Select defaultValue="permanent">
                        <SelectTrigger>
                          <SelectValue placeholder="Select types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Permanent</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="contract-to-hire">Contract-to-Hire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Work Arrangements</label>
                      <Select defaultValue="remote">
                        <SelectTrigger>
                          <SelectValue placeholder="Select arrangements" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="onsite">Onsite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Min Salary (UAE AED/month)</label>
                      <Input type="number" placeholder="5000" defaultValue="5000" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Languages</label>
                      <Input placeholder="English B2, German B1" defaultValue="English B2, German B1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Visa Requirements</label>
                      <Input placeholder="Employer-sponsored work visa" defaultValue="Employer-sponsored work visa" />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Provider Configuration</CardTitle>
                <CardDescription>Configure AI models for different tasks. Local models (Ollama) are preferred for privacy.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Ollama */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">Ollama (Local)</h4>
                        <p className="text-sm text-muted-foreground">Self-hosted models for maximum privacy</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Base URL</label>
                        <Input placeholder="http://localhost:11434" defaultValue="http://localhost:11434" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Default Model</label>
                        <Input placeholder="llama3.1:70b" defaultValue="llama3.1:70b" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Job Matching Model</label>
                        <Input placeholder="llama3.1:70b" defaultValue="llama3.1:70b" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Resume Analysis Model</label>
                        <Input placeholder="llama3.1:8b" defaultValue="llama3.1:8b" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Cover Letter Model</label>
                        <Input placeholder="llama3.1:70b" defaultValue="llama3.1:70b" />
                      </div>
                    </div>
                    <Button variant="outline" className="mt-4" size="sm">
                      Test Connection
                    </Button>
                  </div>

                  {/* OpenAI */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">OpenAI API</h4>
                        <p className="text-sm text-muted-foreground">GPT-4, GPT-3.5-turbo models</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">API Key</label>
                        <Input type="password" placeholder="sk-..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Model</label>
                        <Select defaultValue="gpt-4-turbo">
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                            <SelectItem value="gpt-4">GPT-4</SelectItem>
                            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Anthropic */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">Anthropic API</h4>
                        <p className="text-sm text-muted-foreground">Claude models</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">API Key</label>
                        <Input type="password" placeholder="sk-ant-..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Model</label>
                        <Select defaultValue="claude-3-5-sonnet">
                          <SelectTrigger>
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                            <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                            <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Gemini */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">Google Gemini API</h4>
                        <p className="text-sm text-muted-foreground">Gemini Pro models</p>
                      </div>
                      <Switch />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">API Key</label>
                      <Input type="password" placeholder="AIza..." />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how and when you receive alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Channels</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Dashboard Notifications</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Browser Push Notifications</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4" />
                        <span>Email Notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Alert Types</h4>
                    <div className="space-y-2">
                      {[
                        "New matching jobs",
                        "High-match jobs (80%+)",
                        "Urgent application deadlines",
                        "Interview invitations",
                        "Application status changes",
                        "Follow-up reminders",
                        "Daily digest",
                        "Weekly report",
                      ].map((alert) => (
                        <label key={alert} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                          <span>{alert}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Frequency</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="frequency" defaultChecked className="h-4 w-4" />
                        <span>Immediate (real-time)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="frequency" className="h-4 w-4" />
                        <span>Daily digest (9 AM)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="frequency" className="h-4 w-4" />
                        <span>Weekly digest (Monday 9 AM)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of CareerPilot AI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Theme</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      {[
                        { value: "light", label: "Light", icon: Sun },
                        { value: "dark", label: "Dark", icon: Moon },
                        { value: "system", label: "System", icon: Globe },
                      ].map((t) => (
                        <button
                          key={t.value}
                          onClick={() => setTheme(t.value as any)}
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            theme === t.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <t.icon className="h-8 w-8 mx-auto mb-2" />
                          <span className="font-medium">{t.label}</span>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t.value === "system" ? "Follows OS setting" : `${t.value.charAt(0).toUpperCase() + t.value.slice(1)} mode`}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Sidebar</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Collapse sidebar on hover</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4" />
                        <span>Show tooltips on collapsed items</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Animations</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Enable page transitions</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Enable hover effects</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4" />
                        <span>Reduce motion (accessibility)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>System configuration and data management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Job Discovery</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Polling Interval (minutes)</label>
                        <Input type="number" placeholder="30" defaultValue="30" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Max Jobs Per Source</label>
                        <Input type="number" placeholder="100" defaultValue="100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Min Match Score for Alerts</label>
                        <Input type="number" placeholder="70" defaultValue="70" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Duplicate Detection Threshold</label>
                        <Input type="number" placeholder="0.85" defaultValue="0.85" step="0.01" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Data Management</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export All Data
                      </Button>
                      <Button variant="outline">
                        <Database className="mr-2 h-4 w-4" />
                        Backup Database
                      </Button>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete All Data
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Chrome Extension</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Auto-detect job pages</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span>Auto-fill supported fields</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="h-4 w-4" />
                        <span>Require confirmation before submit</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Security</h4>
                    <div className="space-y-2">
                      <Button variant="outline">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                      <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Manage Sessions
                      </Button>
                      <Button variant="outline">
                        <Key className="mr-2 h-4 w-4" />
                        API Keys
                      </Button>
                    </div>
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