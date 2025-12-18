"use client";

import React, { useState, useEffect } from "react";
import LiveCodeEditor from "@/components/global/LiveCodeEditor";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function LiveEditor({ room }: { room: any }) {
  const roomId = room?.name || "default-room";
  const [mode, setMode] = useState<"code" | "word" | "excel">("code");
  const [mounted, setMounted] = useState(false);

  // ✅ Ensure client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ WORD (Microsoft Word–like editor)
  const wordEditor = useEditor(
    {
      extensions: [StarterKit],
      content: "<p>Start typing like Microsoft Word...</p>",
      editorProps: {
        attributes: {
          class:
            "prose prose-invert max-w-none outline-none min-h-full p-4",
        },
      },
      immediatelyRender: false, // ⭐ FIX
    },
    [mounted]
  );

  if (!mounted) return null;

  return (
    <div className="h-full flex flex-col bg-neutral-900 text-white">
      {/* 🔘 TOOL SWITCH BAR */}
      <div className="flex gap-3 px-3 py-2 border-b border-neutral-700">
        <button
          onClick={() => setMode("code")}
          className={`px-4 py-1.5 rounded ${
            mode === "code"
              ? "bg-white text-black"
              : "bg-neutral-700"
          }`}
        >
          Code
        </button>

        <button
          onClick={() => setMode("word")}
          className={`px-4 py-1.5 rounded ${
            mode === "word"
              ? "bg-blue-600"
              : "bg-neutral-700"
          }`}
        >
          Word
        </button>

        <button
          onClick={() => setMode("excel")}
          className={`px-4 py-1.5 rounded ${
            mode === "excel"
              ? "bg-green-600"
              : "bg-neutral-700"
          }`}
        >
          Excel
        </button>
      </div>

      {/* 🧠 EDITOR AREA */}
      <div className="flex-1 overflow-auto bg-neutral-950">
        {/* CODE */}
        {mode === "code" && <LiveCodeEditor roomId={roomId} />}

        {/* WORD (REAL WORD EXPERIENCE) */}
        {mode === "word" && (
          <EditorContent editor={wordEditor} className="h-full" />
        )}

        {/* EXCEL */}
        {mode === "excel" && (
          <div className="p-4 grid grid-cols-6 gap-2">
            {Array.from({ length: 36 }).map((_, i) => (
              <input
                key={i}
                className="bg-neutral-900 border border-neutral-700 p-1 text-sm text-white focus:border-green-500 outline-none"
                placeholder={`Cell ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
