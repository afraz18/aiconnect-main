"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 🆕 DOCX EXPORT
import { Document, Packer, Paragraph, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

export default function AIMeetingNotesPage() {
  const [transcriptText, setTranscriptText] = useState("");
  const [notes, setNotes] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Load transcript automatically from session (live captions)
  useEffect(() => {
    const saved = sessionStorage.getItem("meetingTranscript");
    if (saved) {
      setTranscriptText(saved);
    }
  }, []);

  async function generateNotes() {
    setError(null);
    setNotes(null);

    const lines = transcriptText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      setError("Please paste or wait for meeting transcript.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/ai/meeting-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transcript: lines,
        }),
      });

      const data = await res.json();

      // ✅ show REAL backend error (quota, API failure, etc.)
      if (!res.ok) {
        console.error("AI Notes API Error:", data);
        setError(data.error || "AI service failed");
        setLoading(false);
        return;
      }

      setNotes(data.notes);
    } catch (err: any) {
      console.error("Frontend Error:", err);
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  }

  // 🆕 Convert AI notes to Word document
  const downloadAsDocument = async (notesText: string) => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Meeting Notes",
              heading: HeadingLevel.TITLE,
            }),

            ...notesText.split("\n").map(
              (line) =>
                new Paragraph({
                  text: line,
                })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "Meeting_Notes.docx");
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-background flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        <h1 className="text-3xl font-bold">AI Meeting Notes</h1>
        <p className="text-muted-foreground">
          Paste the transcript here. If live captions were enabled, it loads automatically.
        </p>

        {/* Transcript Input */}
        <Card>
          <CardHeader>
            <CardTitle>Transcript</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <textarea
              placeholder="Paste transcript here..."
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              className="w-full min-h-[180px] p-3 rounded-md border border-gray-700 bg-black text-white"
            />

            <div className="flex gap-3 flex-wrap">
              <Button onClick={generateNotes} disabled={loading}>
                {loading ? "Generating notes..." : "Generate Notes"}
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setTranscriptText("");
                  setNotes(null);
                  setError(null);
                }}
              >
                Clear
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  sessionStorage.setItem("meetingTranscript", transcriptText)
                }
              >
                Save to Session
              </Button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2">
                {error}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Generated Notes */}
        {notes && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Notes</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="whitespace-pre-wrap leading-relaxed text-sm">
                {notes}
              </div>

              {/* 🆕 Download Button */}
              <Button
                onClick={() => downloadAsDocument(notes)}
                className="bg-blue-600 text-white"
              >
                Download as Document
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
