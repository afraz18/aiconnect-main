<<<<<<< HEAD
import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
=======
"use client";

import React, { useState } from "react";
import {
    Card,
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, PlayCircle, Download, Trash2, Calendar, Clock } from "lucide-react";
<<<<<<< HEAD

export default function RecordingView() {
=======
import { RecordingModal } from "@/components/recording-modal/recording-modal";

export default function RecordingView() {
    const [selectedRecording, setSelectedRecording] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // === Updated: Recordings loaded from public/recording-demo ===
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
    const recordings = [
        {
            id: 1,
            title: "Frontend Developer Interview - John Doe",
            duration: "32:45",
            date: "Nov 15, 2025",
            time: "2 hours ago",
<<<<<<< HEAD
            thumbnail: "/placeholder.jpg"
=======
            thumbnail: "/placeholder.jpg",
            videoUrl: "/recording-demo/demo.mp4",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
        },
        {
            id: 2,
            title: "Backend Developer Interview - Sarah Smith",
            duration: "45:12",
            date: "Nov 14, 2025",
            time: "1 day ago",
<<<<<<< HEAD
            thumbnail: "/placeholder.jpg"
=======
            thumbnail: "/placeholder.jpg",
            videoUrl: "/recording-demo/interview2.mp4",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
        },
        {
            id: 3,
            title: "Senior React Developer - Mike Johnson",
            duration: "28:33",
            date: "Nov 13, 2025",
            time: "2 days ago",
<<<<<<< HEAD
            thumbnail: "/placeholder.jpg"
        },
        {
            id: 4,
            title: "Full Stack Engineer - Emma Wilson",
            duration: "38:20",
            date: "Nov 12, 2025",
            time: "3 days ago",
            thumbnail: "/placeholder.jpg"
        },
        {
            id: 5,
            title: "DevOps Engineer Interview - Tom Brown",
            duration: "41:15",
            date: "Nov 11, 2025",
            time: "4 days ago",
            thumbnail: "/placeholder.jpg"
        },
        {
            id: 6,
            title: "UI/UX Designer - Lisa Anderson",
            duration: "35:50",
            date: "Nov 10, 2025",
            time: "5 days ago",
            thumbnail: "/placeholder.jpg"
=======
            thumbnail: "/placeholder.jpg",
            videoUrl: "/recording-demo/interview3.mp4",
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
        },
    ];

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Recordings</h1>
<<<<<<< HEAD
                    <p className="text-sm text-muted-foreground">View and manage all your interview recordings</p>
=======
                    <p className="text-sm text-muted-foreground">
                        View and manage all your interview recordings
                    </p>
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                </div>
            </header>

            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">All Recordings</Button>
                    <Button variant="ghost" size="sm">This Week</Button>
                    <Button variant="ghost" size="sm">This Month</Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        Sort by Date
                    </Button>
                </div>
            </div>

            <section className="grid gap-4">
                {recordings.map((recording) => (
                    <Card key={recording.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                            <div className="flex items-center gap-4 p-4">
<<<<<<< HEAD
=======
                                {/* Thumbnail */}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                <div className="h-24 w-40 rounded-lg bg-muted flex items-center justify-center shrink-0 relative overflow-hidden">
                                    <Video className="h-8 w-8 text-muted-foreground" />
                                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded">
                                        {recording.duration}
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
<<<<<<< HEAD
                                    <h3 className="font-semibold text-base mb-2">{recording.title}</h3>
=======
                                    <h3 className="font-semibold text-base mb-2">
                                        {recording.title}
                                    </h3>
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4" />
                                            {recording.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" />
                                            {recording.time}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 shrink-0">
<<<<<<< HEAD
                                    <Button size="sm">
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Play
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>
=======
                                    {/* PLAY BUTTON */}
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            setSelectedRecording(recording);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        <PlayCircle className="mr-2 h-4 w-4" />
                                        Play
                                    </Button>

                                    {/* DOWNLOAD */}
                                    <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                    </Button>

                                    {/* DELETE */}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
                                    <Button variant="ghost" size="sm">
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>

<<<<<<< HEAD
            {/* Empty State (show when no recordings) */}
=======
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
            {recordings.length === 0 && (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Video className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No recordings yet</h3>
                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                            Your interview recordings will appear here once you complete your first session.
                        </p>
                    </CardContent>
                </Card>
            )}
<<<<<<< HEAD
        </div>
    );
}
=======

            {/* Modal */}
            {selectedRecording && (
                <RecordingModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={selectedRecording.title}
                    duration={selectedRecording.duration}
                    videoUrl={selectedRecording.videoUrl} // already correct
                />
            )}
        </div>
    );
}
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
