"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

const LiveEditor = dynamic(() => import("./LiveEditor"), { ssr: false });
const Whiteboard = dynamic(() => import("./Whiteboard"), { ssr: false });
const Captions = dynamic(() => import("./Captions"), { ssr: false });
const RaiseHand = dynamic(() => import("./RaiseHand"), { ssr: false });

export default function MeetingToolsSidebar({
  visible,
  onClose,
  room,
  onBackgroundChange,
}: {
  visible: boolean;
  onClose: () => void;
  room: any;
  onBackgroundChange: (bg: string) => void;
}) {
  if (!visible) return null;

  const [active, setActive] = useState("editor");

  return (
    <div className="fixed right-4 top-4 w-[380px] h-[92vh] bg-[#111] text-white rounded-xl shadow-xl z-[9999] p-4 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Meeting Tools</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✖
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3 overflow-x-auto">
        <button
          onClick={() => setActive("editor")}
          className={`px-3 py-1 rounded ${active === "editor" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Editor
        </button>

        <button
          onClick={() => setActive("whiteboard")}
          className={`px-3 py-1 rounded ${active === "whiteboard" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Whiteboard
        </button>

        <button
          onClick={() => setActive("captions")}
          className={`px-3 py-1 rounded ${active === "captions" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Captions
        </button>

        <button
          onClick={() => setActive("hand")}
          className={`px-3 py-1 rounded ${active === "hand" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Raise Hand
        </button>

        <button
          onClick={() => setActive("background")}
          className={`px-3 py-1 rounded ${active === "background" ? "bg-gray-700" : "bg-gray-800"}`}
        >
          Background
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {active === "editor" && <LiveEditor room={room} />}
        {active === "whiteboard" && <Whiteboard room={room} />}
        {active === "captions" && <Captions />}
        {active === "hand" && <RaiseHand room={room} />}

        {/* 🎨 Background Control */}
        {active === "background" && (
          <div className="space-y-4">
            <p className="text-sm text-gray-400">
              Change meeting background (local only)
            </p>

            <div className="flex gap-2">
              {["#000000", "#1e293b", "#0f172a", "#14532d"].map((bg) => (
                <button
                  key={bg}
                  onClick={() => onBackgroundChange(bg)}
                  className="w-8 h-8 rounded"
                  style={{ background: bg }}
                />
              ))}
            </div>

            <button
              onClick={() => onBackgroundChange("#000000")}
              className="px-3 py-1 bg-red-600 rounded text-sm"
            >
              Reset Background
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
