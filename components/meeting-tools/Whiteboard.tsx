"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { sendData } from "@/lib/livekit-data";

export default function Whiteboard({ room, messages }: { room: any; messages: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<any | null>(null);
  const strokesRef = useRef<any[]>([]);
  const [tool, setTool] = useState<"pen" | "marker" | "eraser">("pen");
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(3);
  const [markerWidth, setMarkerWidth] = useState(12);
  const [_, setVersion] = useState(0);

  // redraw all strokes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const s of strokesRef.current) {
      if (!s.points || !s.points.length) continue;

      if (s.tool === "eraser") {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = s.width;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length; i++) {
          ctx.lineTo(s.points[i].x, s.points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      } else {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.width;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.globalAlpha = s.tool === "marker" ? 0.65 : 1;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length; i++) {
          ctx.lineTo(s.points[i].x, s.points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const w = Math.max(300, Math.floor(rect.width));
    const h = Math.max(200, Math.floor(rect.height));

    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    redraw();
  }, [redraw]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // incoming remote strokes
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last?.msg?.type === "whiteboard:update") {
      if (Array.isArray(last.msg.payload)) {
        strokesRef.current = last.msg.payload;
        setVersion(v => v + 1);
        setTimeout(redraw, 0);
      }
    }
  }, [messages, redraw]);

  const getPoint = (ev: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: (ev as any).clientX - rect.left, y: (ev as any).clientY - rect.top };
  };

  const handlePointerDown = (ev: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture((ev as any).pointerId);
    setIsDrawing(true);

    const pt = getPoint(ev);
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const sWidth =
      tool === "marker"
        ? markerWidth
        : tool === "eraser"
        ? Math.max(8, width * 2)
        : width;

    const stroke = {
      id,
      tool,
      color,
      width: sWidth,
      points: [{ x: pt.x, y: pt.y }],
    };

    setCurrentStroke(stroke);
  };

  const handlePointerMove = (ev: React.PointerEvent) => {
    if (!isDrawing || !currentStroke) return;
    const pt = getPoint(ev);
    currentStroke.points.push(pt);

    // temporary draw
    const canvas = canvasRef.current;
    if (!canvas) return;
    const backup = strokesRef.current;
    strokesRef.current = backup.concat([currentStroke]);
    redraw();
    strokesRef.current = backup;
  };

  const handlePointerUp = async () => {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);

    strokesRef.current = strokesRef.current.concat([currentStroke]);
    setCurrentStroke(null);
    setVersion(v => v + 1);
    redraw();

    try {
      await sendData(room, "whiteboard:update", strokesRef.current);
    } catch {}
  };

  // clear whiteboard
  const clearAll = async () => {
    strokesRef.current = [];
    redraw();
    setVersion(v => v + 1);
    await sendData(room, "whiteboard:update", strokesRef.current);
  };

  const undo = async () => {
    strokesRef.current = strokesRef.current.slice(0, -1);
    redraw();
    setVersion(v => v + 1);
    await sendData(room, "whiteboard:update", strokesRef.current);
  };

  const savePNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `whiteboard-${Date.now()}.png`;
    a.click();
  };

  const selectTool = (t: "pen" | "marker" | "eraser") => {
    setTool(t);
  };

  return (
    <div className="text-white flex flex-col gap-2">

      {/* toolbar */}
      <div className="flex items-center gap-2 pb-2">

        <button onClick={() => selectTool("pen")}
          className={`px-3 py-1 rounded ${tool === "pen" ? "bg-gray-700" : "bg-gray-800"}`}>
          Pen
        </button>

        <button onClick={() => selectTool("marker")}
          className={`px-3 py-1 rounded ${tool === "marker" ? "bg-gray-700" : "bg-gray-800"}`}>
          Marker
        </button>

        <button onClick={() => selectTool("eraser")}
          className={`px-3 py-1 rounded ${tool === "eraser" ? "bg-gray-700" : "bg-gray-800"}`}>
          Eraser
        </button>

        {/* FIXED COLOR PICKER */}
        <div className="flex items-center gap-2 ml-2">
          <label className="text-sm">Color</label>
          <input
            type="color"
            value={color}
            disabled={tool === "eraser"}
            onChange={(e) => {
              const newColor = e.target.value;
              setColor(newColor);

              // 🔥 FIX: Apply color instantly to ongoing stroke
              setCurrentStroke((s: any) => (s ? { ...s, color: newColor } : s));
            }}
            className="w-9 h-9 border-0 bg-transparent"
          />
        </div>

        <div className="flex items-center gap-2 ml-2">
          <label className="text-sm">Width</label>
          <input
            type="range"
            min={1}
            max={30}
            value={tool === "marker" ? markerWidth : width}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (tool === "marker") setMarkerWidth(v);
              else setWidth(v);

              // 🔥 FIX: update current stroke width if drawing
              setCurrentStroke((s: any) =>
                s ? { ...s, width: v } : s
              );
            }}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={undo} className="px-3 py-1 rounded bg-gray-800">Undo</button>
          <button onClick={clearAll} className="px-3 py-1 rounded bg-gray-800">Clear</button>
          <button onClick={savePNG} className="px-3 py-1 rounded bg-gray-800">Save</button>
        </div>

      </div>

      {/* canvas */}
      <div
        ref={containerRef}
        className="bg-white rounded h-[400px] border border-gray-700 overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ width: "100%", height: "100%", display: "block", touchAction: "none" }}
        />
      </div>

    </div>
  );
}
