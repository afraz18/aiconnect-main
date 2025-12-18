"use client";

import React, { useState } from "react";
import { sendData } from "@/lib/livekit-data";

export default function RaiseHand({ room }) {
    const [raised, setRaised] = useState(false);

    const handleRaise = () => {
        setRaised(true);

        sendData(room, "raise-hand", {
            user: room?.localParticipant?.identity || "unknown",
            time: Date.now(),
        });
    };

    return (
        <div className="text-center">
            {!raised ? (
                <button
                    onClick={handleRaise}
                    className="px-4 py-2 bg-yellow-500 text-black rounded shadow"
                >
                    ✋ Raise Hand
                </button>
            ) : (
                <p className="text-green-400 font-semibold">Hand Raised</p>
            )}
        </div>
    );
}
