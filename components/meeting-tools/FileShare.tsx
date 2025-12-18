"use client";

import React, { useEffect, useState } from "react";

export default function FileShare({
  room,
  messages = [],
}: {
  room: any;
  messages?: any[];
}) {
  const [files, setFiles] = useState<any[]>([]);

  // 🔁 Receive shared files safely
  useEffect(() => {
    if (!Array.isArray(messages) || messages.length === 0) return;

    const last = messages[messages.length - 1];
    if (!last) return;

    if (last.msg?.type === "file:shared") {
      setFiles((prev) => [...prev, last.msg.payload]);
    }
  }, [messages]);

  // 📤 Send file
  const sendFile = async (file: File) => {
    if (!room?.engine) return;

    const reader = new FileReader();
    reader.onload = () => {
      room.engine.sendData(
        JSON.stringify({
          type: "file:shared",
          payload: {
            name: file.name,
            size: file.size,
            content: reader.result,
          },
        })
      );
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        onChange={(e) => e.target.files && sendFile(e.target.files[0])}
        className="text-sm"
      />

      <div className="space-y-2">
        {files.length === 0 && (
          <p className="text-gray-400 text-sm">No files shared yet.</p>
        )}

        {files.map((file, i) => (
          <div
            key={i}
            className="bg-gray-800 p-2 rounded text-sm flex justify-between"
          >
            <span>{file.name}</span>
            <a
              href={file.content}
              download={file.name}
              className="text-blue-400"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
