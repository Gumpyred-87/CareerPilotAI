"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Search,
  Star,
  Bot,
  FileText,
  PenTool,
  Monitor,
  Kanban,
  Building2,
  Users,
  GraduationCap,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogoIcon,
} from "@/components/ui/icons";

const NAVIGATION_ITEMS = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/ai-job-search", label: "AI Job Search", icon: Search },
  { href: "/dashboard/recommended-jobs", label: "Recommended Jobs", icon: Star },
  { href: "/dashboard/application-agent", label: "Application Agent", icon: Bot },
  { href: "/dashboard/resume-studio", label: "Resume Studio", icon: FileText },
  { href: "/dashboard/cover-letter-studio", label: "Cover Letter Studio", icon: PenTool },
  { href: "/dashboard/chrome-assistant", label: "Chrome Assistant", icon: Monitor },
  { href: "/dashboard/application-tracker", label: "Application Tracker", icon: Kanban },
  { href: "/dashboard/company-intelligence", label: "Company Intelligence", icon: Building2 },
  { href: "/dashboard/referral-finder", label: "Referral Finder", icon: Users },
  { href: "/dashboard/interview-preparation", label: "Interview Preparation", icon: GraduationCap },
  { href: "/dashboard/ai-career-coach", label: "AI Career Coach", icon: MessageSquare },
  { href: "/dashboard/job-alerts", label: "Job Alerts", icon: Bell },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ collapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div
          className={cn(
            "flex h-16 items-center justify-center border-b px-4",
            collapsed && "justify-center px-0"
          )}
        >
          <Link href="/dashboard/overview" className="flex items-center gap-2">
            <LogoIcon className="h-8 w-8 text-primary" />
            {!collapsed && (
              <span className="text-xl font-bold gradient-text">CareerPilot AI</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-hidden" aria-label="Main navigation">
          <ScrollArea className="h-full pr-2">
            <ul className="flex flex-col gap-1 px-2 py-4" role="list">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </nav>

        {/* Collapse toggle */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn("w-full justify-center", collapsed && "rotate-180")}
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </aside>
  );
}