"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Brain,
  Send,
  Loader2,
  Copy,
  Star,
  Target,
  Briefcase,
  GraduationCap,
  DollarSign,
  TrendingUp,
  Sparkles,
  X,
} from "@/components/ui/icons";

const QUICK_ACTIONS = [
  { label: "Review my resume", icon: FileText, prompt: "Please review my resume and suggest improvements for SAP Security roles" },
  { label: "Salary negotiation tips", icon: DollarSign, prompt: "What salary should I ask for as a SAP Security Consultant with 6+ years in India/UAE?" },
  { label: "Interview prep for SAP Labs", icon: GraduationCap, prompt: "Help me prepare for a Senior SAP Security interview at SAP Labs India" },
  { label: "Career path guidance", icon: TrendingUp, prompt: "What's the best career path for a SAP Security consultant - architect, manager, or specialist?" },
  { label: "Skill gap analysis", icon: Target, prompt: "Analyze my skill gaps for SAP BTP Security and Fiori Security roles" },
  { label: "Follow-up email template", icon: MessageSquare, prompt: "Write a follow-up email after a SAP Security interview" },
];

const MOCK_MESSAGES = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Career Coach. I have access to your profile as a SAP Security & GRC Consultant with 6+ years experience targeting India and UAE markets. How can I help you today?",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    role: "user",
    content: "What are the most in-demand SAP Security skills for 2024?",
    timestamp: "1 min ago",
  },
  {
    id: "3",
    role: "assistant",
    content: "Based on current market analysis, the most in-demand SAP Security skills for 2024 are:\n\n**High Priority:**\n• SAP BTP Security (IAS, IPS, IAG) - Cloud identity and access management\n• Fiori Security & OData Authorization - Critical for S/4HANA UI\n• SAP Cloud Identity Services - Integration with IdPs\n\n**Growing Demand:**\n• SAP GRC Access Control 12.0 - SoD, Firefighter, EAM\n• Authorization troubleshooting in S/4HANA\n• SAP Security on Cloud (AWS/Azure/GCP)\n\n**Your Profile Match:**\nYou have strong foundations in GRC, SoD, PFCG, and authorization troubleshooting. The main gaps are BTP Security (IAS/IPS/IAG) and Fiori Security - these are mentioned in 68% of high-match job postings for your profile.\n\nWould you like me to create a learning plan for these areas?",
    timestamp: "Just now",
  },
];

export default function AICareerCoachPage() {
  const [messages, setMessages] = React.useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: inputValue,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiResponse = {
      id: (Date.now() + 1).toString(),
      role: "assistant" as const,
      content: "This is a simulated AI response. In the full implementation, this would connect to your configured AI provider (Ollama, OpenAI, Anthropic, or Gemini) with your candidate profile context to provide personalized career guidance.",
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt);
    handleSend();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Career Coach</h1>
            <p className="text-muted-foreground mt-1">
              Your personalized career advisor powered by AI
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Context: SAP Security & GRC</Badge>
            <Badge variant="outline">6+ years exp</Badge>
            <Badge variant="outline">India/UAE</Badge>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Chat Sidebar */}
          <div className="lg:col-span-3">
            <Card className="flex flex-col h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Career Coach Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    {isLoading && (
                      <MessageBubble
                        message={{
                          id: "loading",
                          role: "assistant",
                          content: "",
                          timestamp: "",
                        }}
                        isLoading
                      />
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t pt-4 mt-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
                      placeholder="Ask about career, resume, interviews, salary, skills..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      variant="default"
                      onClick={handleSend}
                      disabled={isLoading || !inputValue.trim()}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {QUICK_ACTIONS.map((action) => (
                    <Button
                      key={action.label}
                      variant="outline"
                      className="w-full justify-start gap-2 text-left"
                      onClick={() => handleQuickAction(action.prompt)}
                    >
                      <action.icon className="h-4 w-4" />
                      <span>{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Specializations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { label: "Resume Optimization", icon: FileText, desc: "ATS keywords, formatting, achievements" },
                    { label: "Interview Preparation", icon: GraduationCap, desc: "Technical, behavioral, scenario questions" },
                    { label: "Salary Negotiation", icon: DollarSign, desc: "Market rates, negotiation strategies" },
                    { label: "Career Planning", icon: TrendingUp, desc: "Path planning, skill development" },
                    { label: "Networking", icon: Users, desc: "Referral strategies, LinkedIn optimization" },
                    { label: "Job Search Strategy", icon: Briefcase, desc: "Source selection, application timing" },
                  ].map((spec) => (
                    <button
                      key={spec.label}
                      onClick={() => handleQuickAction(`Help me with ${spec.label.toLowerCase()}`)}
                      className="w-full p-3 rounded-lg text-left hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <spec.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{spec.label}</p>
                          <p className="text-xs text-muted-foreground">{spec.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium">Role: SAP Security & GRC Consultant</p>
                    <p className="text-muted-foreground">6+ years experience</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium">Target Markets</p>
                    <p className="text-muted-foreground">India (Hyderabad, Bangalore, Pune)</p>
                    <p className="text-muted-foreground">UAE (AED 5,000+ monthly)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium">Key Skills</p>
                    <p className="text-muted-foreground">SAP Security, GRC AC 12.0, S/4HANA, SoD, Fiori, BTP</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="font-medium">Preferences</p>
                    <p className="text-muted-foreground">Remote/Hybrid/Onsite • Permanent/Contract</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MessageBubble({ message, isLoading }: { message: typeof MOCK_MESSAGES[0]; isLoading?: boolean }) {
  return (
    <div className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {message.role === "user" ? (
          <span className="text-xs font-bold">U</span>
        ) : (
          <Brain className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2",
          message.role === "user"
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted rounded-bl-none"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.timestamp && (
              <p className="text-xs opacity-60 mt-1 text-right">{message.timestamp}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}