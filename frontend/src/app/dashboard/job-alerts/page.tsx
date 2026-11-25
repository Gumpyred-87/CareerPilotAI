"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Bell,
  Plus,
  Edit,
  Delete,
  Play,
  Pause,
  Clock,
  Mail,
  Globe,
  Smartphone,
  Filter,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "@/components/ui/icons";

const ALERTS = [
  {
    id: "1",
    name: "SAP Security - High Match",
    criteria: { keywords: ["SAP Security", "GRC", "S/4HANA"], locations: ["India"], minScore: 80 },
    frequency: "immediate",
    channels: ["dashboard", "browser", "email"],
    active: true,
    lastRun: "5 min ago",
    matchesFound: 23,
  },
  {
    id: "2",
    name: "Remote SAP Roles",
    criteria: { keywords: ["SAP"], locations: ["Remote"], remoteOnly: true, minScore: 70 },
    frequency: "daily",
    channels: ["dashboard", "email"],
    active: true,
    lastRun: "2 hours ago",
    matchesFound: 12,
  },
  {
    id: "3",
    name: "UAE SAP Opportunities",
    criteria: { keywords: ["SAP"], locations: ["UAE", "Dubai", "Abu Dhabi"], minScore: 60 },
    frequency: "weekly",
    channels: ["dashboard", "email"],
    active: false,
    lastRun: "3 days ago",
    matchesFound: 5,
  },
];

const RECENT_NOTIFICATIONS = [
  { id: "1", alert: "SAP Security - High Match", jobTitle: "Senior SAP Security Consultant", company: "SAP Labs India", matchScore: 95, time: "5 min ago", read: false },
  { id: "2", alert: "SAP Security - High Match", jobTitle: "SAP GRC Specialist", company: "Infosys", matchScore: 89, time: "1 hour ago", read: false },
  { id: "3", alert: "Remote SAP Roles", jobTitle: "SAP BTP Security Architect", company: "Accenture", matchScore: 87, time: "2 hours ago", read: true },
  { id: "4", alert: "SAP Security - High Match", jobTitle: "SAP Fiori Security Expert", company: "Capgemini", matchScore: 84, time: "4 hours ago", read: true },
  { id: "5", alert: "Remote SAP Roles", jobTitle: "SAP Security Analyst", company: "TCS", matchScore: 78, time: "1 day ago", read: true },
];

export default function JobAlertsPage() {
  const [activeTab, setActiveTab] = React.useState("alerts");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Alerts</h1>
            <p className="text-muted-foreground mt-1">
              Configure automated job monitoring and notifications
            </p>
          </div>
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Create Alert
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="alerts">My Alerts ({ALERTS.length})</TabsTrigger>
            <TabsTrigger value="notifications">Notifications ({RECENT_NOTIFICATIONS.filter(n => !n.read).length} unread)</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="mt-4">
            <div className="space-y-4">
              {ALERTS.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}

              {ALERTS.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No alerts configured</h3>
                    <p className="text-muted-foreground mt-1">
                      Create your first alert to get notified about matching jobs
                    </p>
                    <Button variant="default" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Alert
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Notifications</CardTitle>
                <Button variant="outline" size="sm">
                  Mark all read
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {RECENT_NOTIFICATIONS.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">Alert History</h3>
                <p className="text-muted-foreground mt-1">
                  View all past alert triggers and matches
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function AlertCard({ alert }: { alert: typeof ALERTS[0] }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{alert.name}</h3>
                <Badge variant={alert.active ? "success" : "gray"}>
                  {alert.active ? "Active" : "Paused"}
                </Badge>
                <Badge variant="info">{alert.frequency}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Min Score: {alert.criteria.minScore}% • {alert.criteria.keywords.join(", ")}
                {alert.criteria.remoteOnly && " • Remote Only"}
              </p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> {alert.matchesFound} matches found
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Last run: {alert.lastRun}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
              <Switch checked={alert.active} onCheckedChange={() => {}} />
              <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Less" : "Details"}
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Play className="mr-1 h-4 w-4" />
                Test Now
              </Button>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" className="w-full sm:w-auto">
                <Delete className="mr-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="border-t bg-muted/30 p-4 animate-in slide-in-from-top-2">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium mb-2">Search Criteria</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Keywords:</span> {alert.criteria.keywords.join(", ")}</div>
                  <div><span className="font-medium">Locations:</span> {alert.criteria.locations.join(", ")}</div>
                  <div><span className="font-medium">Min Match Score:</span> {alert.criteria.minScore}%</div>
                  {alert.criteria.remoteOnly && <div><span className="font-medium">Remote Only:</span> Yes</div>}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Notification Channels</h4>
                <div className="flex flex-wrap gap-1">
                  {alert.channels.map((channel) => (
                    <Badge key={channel} variant="outline">
                      {channel === "dashboard" && <Globe className="mr-1 h-3 w-3" />}
                      {channel === "browser" && <Smartphone className="mr-1 h-3 w-3" />}
                      {channel === "email" && <Mail className="mr-1 h-3 w-3" />}
                      {channel.charAt(0).toUpperCase() + channel.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Play className="mr-1 h-4 w-4" />
                    Test Alert Now
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Filter className="mr-1 h-4 w-4" />
                    View Matches
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Clock className="mr-1 h-4 w-4" />
                    Run History
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function NotificationItem({ notification }: { notification: typeof RECENT_NOTIFICATIONS[0] }) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 rounded-lg border transition-colors",
      !notification.read && "bg-primary/5 border-primary/20"
    )}>
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full flex-shrink-0",
        !notification.read ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        {!notification.read ? (
          <AlertCircle className="h-4 w-4" />
        ) : (
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{notification.jobTitle}</h4>
          <Badge variant={
            notification.matchScore >= 80 ? "success" :
            notification.matchScore >= 60 ? "info" : "warning"
          } className="text-xs">
            {notification.matchScore}% Match
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{notification.company} • From: {notification.alert}</p>
        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
      </div>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
        <AlertCircle className="h-4 w-4" />
      </Button>
    </div>
  );
}