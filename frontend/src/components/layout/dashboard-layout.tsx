"use client";

import * as React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        collapsed={isMobile ? mobileSidebarOpen : sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main content */}
      <div
        className={cn(
          "min-h-screen transition-all duration-300 lg:transition-all",
          isMobile
            ? "lg:pl-64"
            : sidebarCollapsed
            ? "pl-16 lg:pl-16"
            : "pl-64 lg:pl-64"
        )}
      >
        <Header
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main
          className={cn(
            "pt-16 min-h-screen pb-8 transition-all duration-300",
            sidebarCollapsed && !isMobile ? "lg:ml-0" : ""
          )}
          role="main"
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}