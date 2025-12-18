"use client";

import React, { useEffect, useState } from "react";

export default function Captions() {
    const [liveText, setLiveText] = useState("");
    const [transcript, setTranscript] = useState<string[]>([]);

    useEffect(() => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setLiveText("Speech Recognition not supported.");
            return;
        }

        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";

        recog.onresult = (event: any) => {
            let temp = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                temp += event.results[i][0].transcript;
            }

            setLiveText(temp);

            // Save only when a result is FINAL
            if (event.results[event.results.length - 1].isFinal) {
                setTranscript((prev) => {
                    const updated = [...prev, temp.trim()];
                    sessionStorage.setItem(
                        "meetingTranscript",
                        updated.join("\n")
                    );
                    return updated;
                });
            }
        };

        recog.start();
        return () => recog.stop();
    }, []);

    return (
        <div className="text-white">
            <h3 className="font-semibold mb-2">Live Captions</h3>
            <p className="p-2 bg-gray-700 rounded min-h-[60px]">
                {liveText || "Listening..."}
            </p>
        </div>
    );
}
