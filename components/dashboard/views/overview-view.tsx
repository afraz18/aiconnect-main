"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
<<<<<<< HEAD
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
=======
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video, Plus, Calendar, Clock, Users, PlayCircle } from "lucide-react";

<<<<<<< HEAD
export default function OverviewView({ setActiveView }: { setActiveView: (view: 'overview' | 'recording' | 'interviews') => void }) {
    const router = useRouter();
    const [meetingCode, setMeetingCode] = useState("");

    const handleCreateMeeting = () => {
        // Generate a random meeting code
        const randomCode = Math.random().toString(36).substring(2, 10);
        router.push(`/meeting/${randomCode}`);
    };

    const handleJoinMeeting = () => {
        if (meetingCode.trim()) {
            router.push(`/meeting/${meetingCode.trim()}`);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Welcome back!</h1>
                    <p className="text-sm text-muted-foreground">Start or join an interview session</p>
                </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Create New Meeting Card */}
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-primary/10">
                                <Video className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>New Meeting</CardTitle>
                                <CardDescription>Start an instant interview</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Create a new interview room and get a meeting link to share with candidates
                        </p>
                        <Button className="w-full" size="lg" onClick={handleCreateMeeting}>
                            <Plus className="mr-2 h-5 w-5" />
                            Create Meeting
                        </Button>
                    </CardContent>
                </Card>

                {/* Join Meeting Card */}
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-blue-500/10">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle>Join Meeting</CardTitle>
                                <CardDescription>Enter a meeting code</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                placeholder="Enter meeting code or link"
                                className="h-11"
                                value={meetingCode}
                                onChange={(e) => setMeetingCode(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleJoinMeeting()}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="w-full"
                            size="lg"
                            onClick={handleJoinMeeting}
                            disabled={!meetingCode.trim()}
                        >
                            Join
                        </Button>
                    </CardContent>
                </Card>

                {/* Schedule Interview Card */}
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-green-500/10">
                                <Calendar className="h-6 w-6 text-green-600" />
                            </div>
                            <div >
                                <CardTitle>Schedule Interview</CardTitle>
                                <CardDescription>Plan for later</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Schedule an interview with calendar integration and email invites
                        </p>
                        <Button variant="outline" className="w-full" size="lg" onClick={() => setActiveView("interviews")}>
                            <Calendar className="mr-2 h-5 w-5" />
                            Schedule
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Recordings Card */}
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-purple-500/10">
                                <PlayCircle className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <CardTitle>Recordings</CardTitle>
                                <CardDescription>View past sessions</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Access and review all your recorded interview sessions
                        </p>
                        <Button variant="outline" className="w-full" size="lg" onClick={() => setActiveView("recording")}>
                            <PlayCircle className="mr-2 h-5 w-5" />
                            View Recordings
                        </Button>
                    </CardContent>
                </Card>
            </section>

            {/* Upcoming Interviews */}
            <section>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Interviews</CardTitle>
                        <CardDescription>Your scheduled sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Video className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Frontend Developer Interview</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Today, 10:00 AM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            John Doe
                                        </span>
                                    </div>
                                </div>
                                <Button size="sm">
                                    Join Now
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <Video className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Backend Developer Interview</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Tomorrow, 2:00 PM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            Sarah Smith
                                        </span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Clock className="mr-2 h-3 w-3" />
                                    Reschedule
                                </Button>
                            </div>

                            <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                    <Video className="h-6 w-6 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Senior React Developer</p>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            Nov 22, 3:30 PM
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3 w-3" />
                                            Mike Johnson
                                        </span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
=======
interface OverviewViewProps {
  setActiveView?: (view: "overview" | "recording" | "interviews") => void;
}

export default function OverviewView({
  setActiveView = () => {},
}: OverviewViewProps) {
  const router = useRouter();
  const [meetingCode, setMeetingCode] = useState("");

  const handleCreateMeeting = () => {
    // Generate a random meeting code
    const randomCode = Math.random().toString(36).substring(2, 10);
    router.push(`/meeting/${randomCode}`);
  };

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      router.push(`/meeting/${meetingCode.trim()}`);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">
            Start or join an interview session
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create New Meeting Card */}
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>New Meeting</CardTitle>
                <CardDescription>Start an instant interview</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Create a new interview room and get a meeting link to share with
              candidates
            </p>
            <Button className="w-full" size="lg" onClick={handleCreateMeeting}>
              <Plus className="mr-2 h-5 w-5" />
              Create Meeting
            </Button>
          </CardContent>
        </Card>

        {/* Join Meeting Card */}
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle>Join Meeting</CardTitle>
                <CardDescription>Enter a meeting code</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter meeting code or link"
                className="h-11"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoinMeeting()}
              />
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={handleJoinMeeting}
              disabled={!meetingCode.trim()}
            >
              Join
            </Button>
          </CardContent>
        </Card>

        {/* Schedule Interview Card */}
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Schedule Interview</CardTitle>
                <CardDescription>Plan for later</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Schedule an interview with calendar integration and email invites
            </p>
            <Button
              className="w-full"
              size="lg"
              onClick={() => setActiveView("interviews")}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Recordings Card */}
        <Card className="border-2 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <PlayCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle>Recordings</CardTitle>
                <CardDescription>View past sessions</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Access and review all your recorded interview sessions
            </p>
            <Button
              className="w-full"
              size="lg"
              onClick={() => setActiveView("recording")}

            >
              <Calendar className="mr-2 h-5 w-5" />
              Recordings
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Upcoming Interviews */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>Your scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Frontend Developer Interview
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Today, 10:00 AM
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      John Doe
                    </span>
                  </div>
                </div>
                <Button size="sm">Join Now</Button>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Backend Developer Interview
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Tomorrow, 2:00 PM
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Sarah Smith
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-3 w-3" />
                  Reschedule
                </Button>
              </div>

              <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Video className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Senior React Developer</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Nov 22, 3:30 PM
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      Mike Johnson
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
