"use client";

import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export default function LiveCodeEditor({ roomId }) {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("");
  const [editorHeight, setEditorHeight] = useState(300); // resizable height

  // ===== REALTIME COLLAB =====
  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      "wss://demos.yjs.dev",
      "aiconnect-" + roomId,
      ydoc
    );

    const yText = ydoc.getText("monaco");
    const init = () => {
      if (!editorRef.current) return;
      const model = editorRef.current.getModel();

      model.onDidChangeContent(() => {
        yText.delete(0, yText.length);
        yText.insert(0, model.getValue());
      });

      yText.observe(() => {
        if (model.getValue() !== yText.toString()) {
          model.setValue(yText.toString());
        }
      });
    };

    setTimeout(init, 300);
    return () => provider.disconnect();
  }, [roomId]);

  // ===== RUN BUTTON =====
  const runCode = () => {
    if (!editorRef.current) return;
    const code = editorRef.current.getModel().getValue();

    try {
      let consoleOutput = "";
      const originalLog = console.log;

      console.log = (...args) => {
        consoleOutput += args.join(" ") + "\n";
      };

      new Function(code)();
      console.log = originalLog;

      setOutput(consoleOutput || "✔ Code executed successfully. No output.");
    } catch (err) {
      setOutput("❌ Error:\n" + err.message);
    }
  };

  // ===== DRAG TO RESIZE =====
  const handleDrag = (e) => {
    setEditorHeight(e.clientY - 150); // adjust panel height
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* RUN BUTTON */}
      <div className="flex justify-end mb-2">
        <button
          onClick={runCode}
          className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          ▶ Run
        </button>
      </div>

      {/* EDITOR */}
      <div style={{ height: editorHeight }} className="border rounded overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue="// Write code here"
          onMount={(editor) => (editorRef.current = editor)}
          options={{
            readOnly: false,
            domReadOnly: false,
            smoothScrolling: true,
            cursorBlinking: "blink",
            fontSize: 14,
          }}
        />
      </div>

      {/* DRAG BAR */}
      <div
        onMouseDown={() => {
          window.addEventListener("mousemove", handleDrag);
          window.addEventListener("mouseup", () => {
            window.removeEventListener("mousemove", handleDrag);
          });
        }}
        className="h-2 bg-gray-600 cursor-row-resize my-1 rounded"
      ></div>

      {/* CONSOLE */}
      <div className="bg-black text-green-400 p-3 rounded h-40 overflow-auto">
        <strong>Console Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}
