import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

export function formatDateTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(d);
}

export function formatSalary(min?: number, max?: number, currency = "USD", period = "yearly"): string {
  if (!min && !max) return "Not specified";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });
  const periodLabel = period === "monthly" ? "/mo" : period === "hourly" ? "/hr" : "/yr";
  if (min && max) return `${formatter.format(min)} - ${formatter.format(max)}${periodLabel}`;
  if (min) return `From ${formatter.format(min)}${periodLabel}`;
  return `Up to ${formatter.format(max!)}${periodLabel}`;
}

export function getMatchScoreColor(score: number): string {
  if (score >= 80) return "score-excellent";
  if (score >= 60) return "score-good";
  if (score >= 40) return "score-fair";
  return "score-poor";
}

export function getMatchScoreLabel(score: number): string {
  if (score >= 80) return "Excellent Match";
  if (score >= 60) return "Good Match";
  if (score >= 40) return "Fair Match";
  return "Low Match";
}

export function getStatusColor(status: string): string {
  return `status-${status}`;
}

export function getStatusLabel(status: string): string {
  return status.split("_").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" ");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "...";
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function parseJsonSafe<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] ?? [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, direction: "asc" | "desc" = "asc"): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterBy<T>(array: T[], filters: Partial<Record<keyof T, unknown>>): T[] {
  return array.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === "") return true;
      const itemValue = item[key as keyof T];
      if (Array.isArray(value)) return value.includes(itemValue);
      return itemValue === value;
    })
  );
}

export const APP_NAME = "CareerPilot AI";
export const APP_DESCRIPTION = "Your AI-Powered Job Search & Application Agent";

export const NAVIGATION_ITEMS = [
  { href: "/dashboard/overview", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/ai-job-search", label: "AI Job Search", icon: "Search" },
  { href: "/dashboard/recommended-jobs", label: "Recommended Jobs", icon: "Star" },
  { href: "/dashboard/application-agent", label: "Application Agent", icon: "Bot" },
  { href: "/dashboard/resume-studio", label: "Resume Studio", icon: "FileText" },
  { href: "/dashboard/cover-letter-studio", label: "Cover Letter Studio", icon: "PenTool" },
  { href: "/dashboard/chrome-assistant", label: "Chrome Assistant", icon: "Monitor" },
  { href: "/dashboard/application-tracker", label: "Application Tracker", icon: "Kanban" },
  { href: "/dashboard/company-intelligence", label: "Company Intelligence", icon: "Building2" },
  { href: "/dashboard/referral-finder", label: "Referral Finder", icon: "Users" },
  { href: "/dashboard/interview-preparation", label: "Interview Preparation", icon: "GraduationCap" },
  { href: "/dashboard/ai-career-coach", label: "AI Career Coach", icon: "MessageSquare" },
  { href: "/dashboard/job-alerts", label: "Job Alerts", icon: "Bell" },
  { href: "/dashboard/analytics", label: "Analytics", icon: "BarChart3" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
] as const;

export const APPLICATION_STATUSES = [
  "discovered",
  "shortlisted",
  "resume_prepared",
  "ready_for_review",
  "awaiting_approval",
  "submitted",
  "confirmation_received",
  "interview",
  "rejected",
  "withdrawn",
  "offer",
] as const;

export const JOB_SOURCES = [
  "adzuna",
  "remotive",
  "arbeitnow",
  "greenhouse",
  "lever",
  "ashby",
  "smartrecruiters",
  "company_career",
  "linkedin",
  "indeed",
] as const;

export const LOCATION_TYPES = ["remote", "hybrid", "onsite"] as const;
export const EMPLOYMENT_TYPES = ["full-time", "part-time", "contract", "contract-to-hire", "internship", "freelance"] as const;
export const EXPERIENCE_LEVELS = ["entry", "mid", "senior", "lead", "principal", "executive"] as const;