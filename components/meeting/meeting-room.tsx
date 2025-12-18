"use client";

<<<<<<< HEAD
import React, { useState, useEffect, useRef } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";

<<<<<<< HEAD
import MeetingToolsSidebar from "@/components/meeting-tools/MeetingToolsSidebar";
import { setupDataChannel } from "@/lib/livekit-data";

interface MeetingRoomProps {
  roomName: string;
  participantName: string;
  onLeave: () => void;
}

export default function MeetingRoom({
  roomName,
  participantName,
  onLeave,
}: MeetingRoomProps) {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toolsOpen, setToolsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  const roomRef = useRef<any>(null);

  /* 🔐 FETCH TOKEN */
  useEffect(() => {
    const fetchToken = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/livekit/token?room=${encodeURIComponent(
            roomName
          )}&username=${encodeURIComponent(participantName)}`
        );

        if (!response.ok) throw new Error("Failed to fetch token");

        const data = await response.json();
        setToken(data.token);
        setError("");
      } catch (err) {
        console.error("Error fetching token:", err);
        setError("Failed to connect to meeting. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [roomName, participantName]);

  /* ⏳ LOADING */
  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-lg">Connecting to meeting...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Room: {roomName}
          </p>
        </div>
      </div>
    );
  }

  /* ❌ ERROR */
  if (error) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg text-destructive mb-4">{error}</p>
          <button
            onClick={onLeave}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!token) return null;

  const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

  if (!serverUrl) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white max-w-md">
          <p className="text-lg text-destructive mb-4">
            LiveKit not configured
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Add NEXT_PUBLIC_LIVEKIT_URL to .env.local
          </p>
          <button
            onClick={onLeave}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <LiveKitRoom
      video
      audio
      token={token}
      serverUrl={serverUrl}
      data-lk-theme="default"
      onConnected={(room) => {
        roomRef.current = room;
        room.localParticipant.enableCameraAndMicrophone();

        if (!room.engine) {
          console.error("LiveKit engine is not ready");
          return;
        }

        setupDataChannel(room.engine, (msg, participant) => {
          setMessages((prev) => [...prev, { msg, participant }]);
        });
      }}
      onDisconnected={(room, reason) => {
        console.log("Disconnected:", reason);
        if (
          reason === "leave" ||
          reason === "peer disconnected" ||
          reason === "closed"
        ) {
          onLeave();
        }
      }}
      style={{ height: "100vh" }}
    >
      {/* 🎥 VIDEO CONFERENCE */}
      <VideoConference />

      {/* ⚙️ TOOLS BUTTON */}
      <button
        onClick={() => setToolsOpen(true)}
        className="fixed bottom-6 right-6 bg-white text-black px-4 py-2 rounded-xl shadow-lg z-[9999]"
      >
        Tools ⚙️
      </button>

      {/* 🛠️ TOOLS SIDEBAR (Editor, Word, Excel inside this) */}
      <MeetingToolsSidebar
        visible={toolsOpen}
        onClose={() => setToolsOpen(false)}
        room={roomRef.current}
        messages={messages}
      />
    </LiveKitRoom>
  );
=======
interface MeetingRoomProps {
    roomName: string;
    participantName: string;
    onLeave: () => void;
}

export default function MeetingRoom({ roomName, participantName, onLeave }: MeetingRoomProps) {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `/api/livekit/token?room=${encodeURIComponent(roomName)}&username=${encodeURIComponent(participantName)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch token");
                }

                const data = await response.json();
                setToken(data.token);
                setError("");
            } catch (err) {
                console.error("Error fetching token:", err);
                setError("Failed to connect to meeting. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchToken();
    }, [roomName, participantName]);

    if (isLoading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
                    <p className="text-lg">Connecting to meeting...</p>
                    <p className="text-sm text-muted-foreground mt-2">Room: {roomName}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <p className="text-lg text-destructive mb-4">{error}</p>
                    <button
                        onClick={onLeave}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!token) {
        return null;
    }

    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!serverUrl) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="text-center text-white max-w-md">
                    <p className="text-lg text-destructive mb-4">LiveKit not configured</p>
                    <p className="text-sm text-muted-foreground mb-4">
                        Please add NEXT_PUBLIC_LIVEKIT_URL to your .env.local file
                    </p>
                    <button
                        onClick={onLeave}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <LiveKitRoom
            video={true}
            audio={true}
            token={token}
            serverUrl={serverUrl}
            data-lk-theme="default"
            onDisconnected={onLeave}
            style={{ height: "100vh" }}
        >
            <VideoConference />
        </LiveKitRoom>
    );
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf
}
