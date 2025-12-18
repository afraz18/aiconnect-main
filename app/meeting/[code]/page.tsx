"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import PreJoinScreen from "@/components/meeting/pre-join-screen";
import MeetingRoom from "@/components/meeting/meeting-room";

export default function MeetingPage() {
    const params = useParams();
    const router = useRouter();
    const [hasJoined, setHasJoined] = useState(false);
    const [participantName, setParticipantName] = useState("");

    const meetingCode = params.code as string;

    useEffect(() => {
        // If no meeting code, redirect to dashboard
        if (!meetingCode) {
            router.push("/dashboard");
        }
    }, [meetingCode, router]);

    const handleJoin = (name: string) => {
        setParticipantName(name);
        setHasJoined(true);
    };

    const handleLeave = () => {
        setHasJoined(false);
        setParticipantName("");
        router.push("/dashboard");
    };

    if (!meetingCode) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {!hasJoined ? (
                <PreJoinScreen
                    onJoin={handleJoin}
                    meetingCode={meetingCode}
                />
            ) : (
                <MeetingRoom
                    roomName={meetingCode}
                    participantName={participantName}
                    onLeave={handleLeave}
                />
            )}
        </div>
    );
}
