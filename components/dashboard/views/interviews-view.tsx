import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Clock, User } from "lucide-react";

export default function InterviewsView() {
    const interviews = [
        {
            id: 1,
            title: "Frontend Developer Interview",
            candidate: "John Doe",
            date: "Nov 20, 2025",
            time: "10:00 AM",
            status: "scheduled",
        },
        {
            id: 2,
            title: "Backend Developer Interview",
            candidate: "Sarah Smith",
            date: "Nov 18, 2025",
            time: "2:00 PM",
            status: "completed",
        },
        {
            id: 3,
            title: "Senior React Developer",
            candidate: "Mike Johnson",
            date: "Nov 22, 2025",
            time: "3:30 PM",
            status: "scheduled",
        },
        {
            id: 4,
            title: "Full Stack Engineer",
            candidate: "Emma Wilson",
            date: "Nov 15, 2025",
            time: "11:00 AM",
            status: "completed",
        },
    ];

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Interviews</h1>
                    <p className="text-sm text-muted-foreground">Manage all your interview sessions</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule Interview
                </Button>
            </header>

            <div className="flex gap-4">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="ghost" size="sm">Scheduled</Button>
                <Button variant="ghost" size="sm">Completed</Button>
                <Button variant="ghost" size="sm">Cancelled</Button>
            </div>

            <section className="grid gap-4">
                {interviews.map((interview) => (
                    <Card key={interview.id}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-3 flex-1">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-semibold">{interview.title}</h3>
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded-full ${interview.status === "completed"
                                                        ? "bg-green-500/10 text-green-600"
                                                        : "bg-blue-500/10 text-blue-600"
                                                    }`}
                                            >
                                                {interview.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4" />
                                                {interview.candidate}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {interview.date}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="h-4 w-4" />
                                                {interview.time}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {interview.status === "scheduled" ? (
                                        <>
                                            <Button variant="outline" size="sm">
                                                Reschedule
                                            </Button>
                                            <Button size="sm">Join</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outline" size="sm">
                                                View Recording
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                View Report
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </div>
    );
}
