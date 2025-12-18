"use client";

import React, { useEffect, useState } from "react";

export default function MeetingHistoryPage() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/meeting/history");
      const data = await res.json();

      // Backend returns direct array, so set it directly
      setMeetings(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Meeting History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((m: any) => (
          <div
            key={m.id}
            className="bg-black/40 p-5 rounded-xl border border-gray-700"
          >
            <h2 className="text-xl font-semibold">{m.title}</h2>

            <p className="text-sm mt-2">
              {new Date(m.date).toLocaleDateString()}
            </p>

            <p className="text-sm mt-1">
              {new Date(m.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              —{" "}
              {new Date(m.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p className="mt-1 text-sm">
              Duration: {m.durationMins} mins
            </p>

            <button className="mt-4 bg-purple-600 px-4 py-2 rounded w-full">
              View Details
            </button>
          </div>
        ))}

        {meetings.length === 0 && (
          <p className="text-gray-400">No meetings found.</p>
        )}
      </div>
    </div>
  );
}
