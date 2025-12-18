"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Video,
    VideoOff,
    Mic,
    MicOff,
    Settings,
    AlertCircle,
    CheckCircle2,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DeviceStatus = "checking" | "granted" | "denied" | "error";

interface MediaDevices {
    camera: DeviceStatus;
    microphone: DeviceStatus;
}

interface PreJoinScreenProps {
    onJoin: (name: string, roomName?: string) => void;
    meetingCode?: string;
}

export default function PreJoinScreen({ onJoin, meetingCode }: PreJoinScreenProps) {
    const [participantName, setParticipantName] = useState("");
    const [roomName, setRoomName] = useState(meetingCode || "");
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [mediaDevices, setMediaDevices] = useState<MediaDevices>({
        camera: "checking",
        microphone: "checking",
    });
    const [isReady, setIsReady] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
    const [availableMicrophones, setAvailableMicrophones] = useState<MediaDeviceInfo[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string>("");
    const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        checkPermissionsAndDevices();

        // Get room name from URL if present
        const params = new URLSearchParams(window.location.search);
        const urlRoomName = params.get("room");
        if (urlRoomName) {
            setRoomName(urlRoomName);
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    const checkPermissionsAndDevices = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            setStream(mediaStream);
            setMediaDevices({
                camera: "granted",
                microphone: "granted",
            });

            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === "videoinput");
            const microphones = devices.filter(device => device.kind === "audioinput");

            setAvailableCameras(cameras);
            setAvailableMicrophones(microphones);

            if (cameras.length > 0) setSelectedCamera(cameras[0].deviceId);
            if (microphones.length > 0) setSelectedMicrophone(microphones[0].deviceId);

            setIsReady(true);
        } catch (error: any) {
            console.error("Error accessing media devices:", error);

            if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
                setMediaDevices({
                    camera: "denied",
                    microphone: "denied",
                });
            } else {
                setMediaDevices({
                    camera: "error",
                    microphone: "error",
                });
            }
        }
    };

    const toggleVideo = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoEnabled(videoTrack.enabled);
            }
        }
    };

    const toggleAudio = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioEnabled(audioTrack.enabled);
            }
        }
    };

    const changeCamera = async (deviceId: string) => {
        try {
            if (stream) {
                stream.getVideoTracks().forEach(track => track.stop());
            }

            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: { exact: deviceId } },
                audio: { deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined },
            });

            setStream(newStream);
            setSelectedCamera(deviceId);
        } catch (error) {
            console.error("Error changing camera:", error);
        }
    };

    const changeMicrophone = async (deviceId: string) => {
        try {
            if (stream) {
                stream.getAudioTracks().forEach(track => track.stop());
            }

            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { deviceId: selectedCamera ? { exact: selectedCamera } : undefined },
                audio: { deviceId: { exact: deviceId } },
            });

            setStream(newStream);
            setSelectedMicrophone(deviceId);
        } catch (error) {
            console.error("Error changing microphone:", error);
        }
    };

    const handleJoinMeeting = () => {
<<<<<<< HEAD
    if (!participantName.trim() || !roomName.trim()) {
        alert("Please enter your name and room code");
        return;
    }

    // DO NOT stop the preview stream here — keep preview running.
    // Let the meeting-room handle publishing camera/mic after connection.
    onJoin(participantName, roomName);
};
=======
        if (!participantName.trim() || !roomName.trim()) {
            alert("Please enter your name and room code");
            return;
        }

        // Stop local stream before joining
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        onJoin(participantName, roomName);
    };
>>>>>>> 9598468a7d902b7262fb8d1c84e058e32e1361cf

    const getStatusIcon = (status: DeviceStatus) => {
        switch (status) {
            case "checking":
                return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
            case "granted":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "denied":
            case "error":
                return <AlertCircle className="h-4 w-4 text-red-500" />;
        }
    };

    const getStatusText = (status: DeviceStatus) => {
        switch (status) {
            case "checking":
                return "Checking...";
            case "granted":
                return "Ready";
            case "denied":
                return "Permission denied";
            case "error":
                return "Error";
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                <header>
                    <h1 className="text-3xl font-bold">Ready to join?</h1>
                    <p className="text-muted-foreground">Check your camera and microphone before joining</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Video Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardContent className="p-6">
                                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                                    {isVideoEnabled && stream ? (
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="w-full h-full object-cover scale-x-[-1]"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <div className="text-center">
                                                <VideoOff className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-muted-foreground">Camera is off</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Permission Warning Badges */}
                                {(mediaDevices.camera === "denied" || mediaDevices.microphone === "denied") && (
                                    <div className="absolute top-4 left-4 right-4 bg-destructive/90 text-white px-4 py-3 rounded-lg flex items-start gap-3 shadow-lg">
                                        <div className="relative shrink-0">
                                            <AlertCircle className="h-6 w-6" />
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-white">
                                                    <span className="text-destructive text-[8px] font-bold flex items-center justify-center w-full">!</span>
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">Permission Required</p>
                                            <p className="text-xs mt-1 opacity-90">
                                                {mediaDevices.camera === "denied" && mediaDevices.microphone === "denied"
                                                    ? "Camera and microphone access blocked. Click the lock icon in your browser's address bar to allow."
                                                    : mediaDevices.camera === "denied"
                                                        ? "Camera access blocked. Enable it in your browser settings."
                                                        : "Microphone access blocked. Enable it in your browser settings."}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-4 mt-6">
                                    <div className="relative">
                                        <Button
                                            size="lg"
                                            variant={isVideoEnabled ? "default" : "destructive"}
                                            onClick={toggleVideo}
                                            className="rounded-full h-14 w-14 p-0"
                                            disabled={mediaDevices.camera !== "granted"}
                                        >
                                            {isVideoEnabled ? (
                                                <Video className="h-6 w-6" />
                                            ) : (
                                                <VideoOff className="h-6 w-6" />
                                            )}
                                        </Button>
                                        {mediaDevices.camera === "denied" && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white">
                                                <span className="text-xs font-bold">!</span>
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <Button
                                            size="lg"
                                            variant={isAudioEnabled ? "default" : "destructive"}
                                            onClick={toggleAudio}
                                            className="rounded-full h-14 w-14 p-0"
                                            disabled={mediaDevices.microphone !== "granted"}
                                        >
                                            {isAudioEnabled ? (
                                                <Mic className="h-6 w-6" />
                                            ) : (
                                                <MicOff className="h-6 w-6" />
                                            )}
                                        </Button>
                                        {mediaDevices.microphone === "denied" && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white">
                                                <span className="text-xs font-bold">!</span>
                                            </span>
                                        )}
                                    </div>

                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="rounded-full h-14 w-14 p-0"
                                        onClick={() => setShowSettings(!showSettings)}
                                    >
                                        <Settings className="h-6 w-6" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Settings & Info */}
                    <div className="space-y-6">
                        {/* Participant Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Join Meeting</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Enter your name"
                                        value={participantName}
                                        onChange={(e) => setParticipantName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="room">Room Code</Label>
                                    <Input
                                        id="room"
                                        placeholder="Enter room code"
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        disabled={!!meetingCode}
                                        className={meetingCode ? "bg-muted" : ""}
                                    />
                                    {meetingCode && (
                                        <p className="text-xs text-muted-foreground">
                                            Joining meeting: <span className="font-mono font-semibold">{meetingCode}</span>
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Device Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Device Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Video className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Camera</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(mediaDevices.camera)}
                                        <span className={cn(
                                            "text-sm",
                                            mediaDevices.camera === "granted" && "text-green-600",
                                            mediaDevices.camera === "denied" && "text-red-600"
                                        )}>
                                            {getStatusText(mediaDevices.camera)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Mic className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">Microphone</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(mediaDevices.microphone)}
                                        <span className={cn(
                                            "text-sm",
                                            mediaDevices.microphone === "granted" && "text-green-600",
                                            mediaDevices.microphone === "denied" && "text-red-600"
                                        )}>
                                            {getStatusText(mediaDevices.microphone)}
                                        </span>
                                    </div>
                                </div>

                                {(mediaDevices.camera === "denied" || mediaDevices.microphone === "denied") && (
                                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                                        <p className="font-medium mb-1">Permission Required</p>
                                        <p className="text-xs">
                                            Please allow camera and microphone access in your browser settings.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Device Selection */}
                        {showSettings && isReady && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Device Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Camera</Label>
                                        <select
                                            className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                                            value={selectedCamera}
                                            onChange={(e) => changeCamera(e.target.value)}
                                        >
                                            {availableCameras.map((camera) => (
                                                <option key={camera.deviceId} value={camera.deviceId}>
                                                    {camera.label || `Camera ${camera.deviceId.slice(0, 5)}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Microphone</Label>
                                        <select
                                            className="w-full h-9 px-3 rounded-md border bg-background text-sm"
                                            value={selectedMicrophone}
                                            onChange={(e) => changeMicrophone(e.target.value)}
                                        >
                                            {availableMicrophones.map((mic) => (
                                                <option key={mic.deviceId} value={mic.deviceId}>
                                                    {mic.label || `Microphone ${mic.deviceId.slice(0, 5)}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Join Button */}
                        <Button
                            size="lg"
                            className="w-full"
                            disabled={
                                !isReady ||
                                !participantName.trim() ||
                                !roomName.trim() ||
                                mediaDevices.camera === "denied" ||
                                mediaDevices.microphone === "denied"
                            }
                            onClick={handleJoinMeeting}
                        >
                            Join Meeting
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
