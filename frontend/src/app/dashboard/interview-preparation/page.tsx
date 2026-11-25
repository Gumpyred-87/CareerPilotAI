"use client";

import * as React from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  MessageSquare,
  Brain,
  Zap,
  Target,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Play,
  Pause,
  Volume2,
  Mic,
  FileText,
  Plus,
} from "@/components/ui/icons";

const INTERVIEW_SESSIONS = [
  {
    id: "1",
    jobTitle: "Senior SAP Security & GRC Consultant",
    company: "SAP Labs India",
    type: "technical",
    status: "completed",
    score: 87,
    questions: 12,
    answered: 12,
    duration: "45 min",
    createdAt: "2 days ago",
    weakAreas: ["SAP BTP Security", "Fiori Security"],
    strongAreas: ["SAP GRC", "SoD Analysis", "Authorization Troubleshooting"],
  },
  {
    id: "2",
    jobTitle: "SAP Security Architect",
    company: "Deloitte",
    type: "scenario",
    status: "in_progress",
    score: null,
    questions: 8,
    answered: 3,
    duration: "22 min",
    createdAt: "1 day ago",
    weakAreas: [],
    strongAreas: [],
  },
  {
    id: "3",
    jobTitle: "SAP GRC AC 12.0 Consultant",
    company: "EY",
    type: "hr",
    status: "pending",
    score: null,
    questions: 10,
    answered: 0,
    duration: "0 min",
    createdAt: "Today",
    weakAreas: [],
    strongAreas: [],
  },
];

const QUESTION_BANKS = [
  { category: "SAP Security", count: 45, icon: Shield },
  { category: "SAP GRC", count: 38, icon: Brain },
  { category: "S/4HANA Authorization", count: 32, icon: Zap },
  { category: "Fiori Security", count: 28, icon: Target },
  { category: "BTP Security (IAS/IPS/IAG)", count: 25, icon: Brain },
  { category: "SoD & Risk Analysis", count: 30, icon: AlertCircle },
  { category: "HR/Behavioral", count: 40, icon: MessageSquare },
  { category: "Scenario-Based", count: 22, icon: Target },
];

export default function InterviewPreparationPage() {
  const [activeTab, setActiveTab] = React.useState("sessions");
  const [isGenerating, setIsGenerating] = React.useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Interview Preparation</h1>
            <p className="text-muted-foreground mt-1">
              Practice with AI-generated questions tailored to your target roles
            </p>
          </div>
          <Button variant="default" onClick={() => {}} disabled={isGenerating}>
            <Plus className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "New Practice Session"}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="sessions">My Sessions ({INTERVIEW_SESSIONS.length})</TabsTrigger>
            <TabsTrigger value="question-bank">Question Bank</TabsTrigger>
            <TabsTrigger value="simulation">Live Simulation</TabsTrigger>
            <TabsTrigger value="improvement">Improvement Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="mt-4">
            <div className="space-y-4">
              {INTERVIEW_SESSIONS.map((session) => (
                <InterviewSessionCard key={session.id} session={session} />
              ))}

              {INTERVIEW_SESSIONS.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center">
                    <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No practice sessions yet</h3>
                    <p className="text-muted-foreground mt-1">
                      Start your first interview simulation
                    </p>
                    <Button variant="default" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      New Practice Session
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="question-bank" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {QUESTION_BANKS.map((bank) => (
                <Card key={bank.category} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <bank.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{bank.category}</h4>
                        <p className="text-sm text-muted-foreground">{bank.count} questions available</p>
                        <Button variant="outline" size="sm" className="mt-2 w-full">
                          Practice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="mt-4">
            <InterviewSimulation />
          </TabsContent>

          <TabsContent value="improvement" className="mt-4">
            <ImprovementPlan />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function InterviewSessionCard({ session }: { session: typeof INTERVIEW_SESSIONS[0] }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold">{session.jobTitle}</h3>
                <Badge variant={
                  session.type === "technical" ? "purple" :
                  session.type === "hr" ? "blue" :
                  session.type === "scenario" ? "amber" : "gray"
                }>
                  {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                </Badge>
                <Badge variant={
                  session.status === "completed" ? "success" :
                  session.status === "in_progress" ? "info" : "gray"
                }>
                  {session.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{session.company}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                <span><FileText className="inline h-3.5 w-3.5 mr-1" /> {session.answered}/{session.questions} answered</span>
                <span><Clock className="inline h-3.5 w-3.5 mr-1" /> {session.duration}</span>
                {session.score !== null && (
                  <span><Trophy className="inline h-3.5 w-3.5 mr-1" /> Score: {session.score}%</span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:ml-auto">
              {session.status === "in_progress" && (
                <Button variant="default" size="sm" className="w-full sm:w-auto">
                  <Play className="mr-1 h-4 w-4" />
                  Continue
                </Button>
              )}
              {session.status === "pending" && (
                <Button variant="default" size="sm" className="w-full sm:w-auto">
                  <Play className="mr-1 h-4 w-4" />
                  Start
                </Button>
              )}
              {session.status === "completed" && (
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <FileText className="mr-1 h-4 w-4" />
                  Review
                </Button>
              )}
            </div>
          </div>
        </div>

        {(session.status === "completed" || session.status === "in_progress") && session.weakAreas.length > 0 && (
          <div className="border-t bg-muted/30 p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-red-600">
                  <XCircle className="h-4 w-4" />
                  Areas to Improve
                </h4>
                <div className="flex flex-wrap gap-1">
                  {session.weakAreas.map((area) => (
                    <Badge key={area} variant="destructive" className="text-xs">{area}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Strong Areas
                </h4>
                <div className="flex flex-wrap gap-1">
                  {session.strongAreas.map((area) => (
                    <Badge key={area} variant="success" className="text-xs">{area}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function InterviewSimulation() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [isRecording, setIsRecording] = React.useState(false);

  const questions = [
    "Explain the difference between SAP ECC and S/4HANA authorization concepts.",
    "How do you design a SoD matrix for a large organization?",
    "What are the key components of SAP GRC Access Control 12.0?",
    "Describe your approach to troubleshooting authorization failures in S/4HANA.",
    "How do you secure Fiori applications and OData services?",
    "Explain SAP BTP Security: IAS, IPS, and IAG roles.",
    "What is your process for role design and maintenance?",
    "How do you handle emergency access management (Firefighter)?",
  ];

  if (currentQuestion >= questions.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Trophy className="h-16 w-16 mx-auto text-amber-500 mb-4" />
          <h3 className="text-2xl font-bold">Simulation Complete!</h3>
          <p className="text-muted-foreground mt-2">You've answered all {questions.length} questions.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="default" onClick={() => { setCurrentQuestion(0); setAnswers([]); }}>
              <Play className="mr-2 h-4 w-4" />
              Restart
            </Button>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Evaluation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Live Interview Simulation</CardTitle>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">{currentQuestion + 1} / {questions.length}</span>
            <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-6 rounded-lg bg-muted/50">
            <p className="text-lg font-medium">{questions[currentQuestion]}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Answer</label>
            <textarea
              value={answers[currentQuestion] || ""}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[currentQuestion] = e.target.value;
                setAnswers(newAnswers);
              }}
              placeholder="Type your answer here... or use voice input"
              rows={6}
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <>
                  <Pause className="mr-1 h-4 w-4" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-1 h-4 w-4" />
                  Start Voice Input
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="mr-1 h-4 w-4" />
              Read Question
            </Button>
          </div>

          <div className="flex justify-between pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ImprovementPlan() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Personalized Improvement Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Based on your recent sessions</h4>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  area: "SAP BTP Security",
                  priority: "High",
                  currentLevel: 35,
                  targetLevel: 75,
                  resources: ["SAP BTP Security Guide", "IAS/IPS/IAG Documentation", "Hands-on Trial"],
                  actions: ["Complete SAP BTP Security certification", "Build demo project with IAS", "Practice scenario questions"],
                },
                {
                  area: "Fiori Security",
                  priority: "High",
                  currentLevel: 45,
                  targetLevel: 80,
                  resources: ["Fiori Security Guide", "OData Authorization", "Launchpad Configuration"],
                  actions: ["Study Fiori Launchpad security", "Practice OData service protection", "Review SUIM for Fiori"],
                },
                {
                  area: "ABAP for Security",
                  priority: "Medium",
                  currentLevel: 25,
                  targetLevel: 60,
                  resources: ["ABAP Security Basics", "Authorization Objects in Code", "Code Scanner"],
                  actions: ["Learn basic ABAP syntax", "Understand AUTHORITY-CHECK", "Practice with Code Inspector"],
                },
              ].map((item) => (
                <Card key={item.area} className="border-l-4 border-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold">{item.area}</h5>
                      <Badge variant={item.priority === "High" ? "destructive" : "warning"}>{item.priority}</Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${item.currentLevel}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span>Current: {item.currentLevel}%</span>
                      <span>Target: {item.targetLevel}%</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Recommended Actions:</p>
                      {item.actions.map((action, i) => (
                        <div key={i} className="flex items-start gap-1 text-muted-foreground">
                          <span>•</span> <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Weekly Study Plan</h4>
            <div className="grid gap-2 md:grid-cols-7 text-sm">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div key={day} className="text-center p-2 rounded bg-background">
                  <p className="font-medium">{day}</p>
                  <p className="text-xs text-muted-foreground">1-2 hrs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}