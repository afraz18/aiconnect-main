"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useEffect, useRef, useState, useCallback } from "react"
import { Maximize2, Volume2, VolumeX, RotateCcw, RotateCw, Play, Pause, Settings } from "lucide-react"

interface RecordingModalProps {
  open: boolean
  onClose: () => void
  title: string
  videoUrl: string
}

interface DoubleTapState {
  x: number
  y: number
  lastTap: number
}

export function RecordingModal({ open, onClose, title, videoUrl }: RecordingModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [buffered, setBuffered] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [volume, setVolume] = useState(1)
  const [doubleTapState, setDoubleTapState] = useState<DoubleTapState>({
    x: 0,
    y: 0,
    lastTap: 0,
  })
  const [doubleClickFeedback, setDoubleClickFeedback] = useState<{
    type: "left" | "right" | null
    show: boolean
  }>({ type: null, show: false })
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()

  // Format time display
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }, [])

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      const newMuted = !muted
      videoRef.current.muted = newMuted
      setMuted(newMuted)
      if (!newMuted) {
        setVolume(videoRef.current.volume || 1)
      }
    }
  }, [muted])

  // Change playback speed
  const changeSpeed = useCallback(() => {
    const newSpeed = speed >= 2 ? 0.5 : speed + 0.25
    setSpeed(newSpeed)
    if (videoRef.current) videoRef.current.playbackRate = newSpeed
  }, [speed])

  // Skip forward/backward
  const skip = useCallback(
    (seconds: number) => {
      if (videoRef.current) {
        videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds))
      }
    },
    [duration],
  )

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => console.error(err))
    } else {
      document.exitFullscreen()
    }
  }, [])

  // Handle double tap for seeking
  const handleDoubleTap = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const now = Date.now()
      const timeSinceLastTap = now - doubleTapState.lastTap

      if (timeSinceLastTap < 300) {
        // Double tap detected
        if (x < rect.width / 2) {
          // Left side - seek backward
          skip(-10)
          setDoubleClickFeedback({ type: "left", show: true })
        } else {
          // Right side - seek forward
          skip(10)
          setDoubleClickFeedback({ type: "right", show: true })
        }

        setTimeout(() => {
          setDoubleClickFeedback({ type: null, show: false })
        }, 400)

        setDoubleTapState({ x: 0, y: 0, lastTap: 0 })
      } else {
        setDoubleTapState({ x, y: e.clientY - rect.top, lastTap: now })
      }
    },
    [doubleTapState, skip],
  )

  // Handle seeking via progress bar
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!videoRef.current || !containerRef.current) return
      const progressBar = e.currentTarget
      const rect = progressBar.getBoundingClientRect()
      const percentage = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percentage * duration
    },
    [duration],
  )

  // Update progress
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }, [])

  // Update duration
  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }, [])

  // Update buffered
  const handleProgress = useCallback(() => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      setBuffered(videoRef.current.buffered.end(0))
    }
  }, [])

  // Volume control
  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      if (newVolume > 0 && muted) {
        setMuted(false)
        videoRef.current.muted = false
      }
    }
  }

  // Show controls and hide after delay
  const showControlsHandler = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      const video = videoRef.current
      if (!video || !open) return

      switch (event.key.toLowerCase()) {
        case " ":
          event.preventDefault()
          togglePlayPause()
          break
        case "arrowright":
          event.preventDefault()
          skip(5)
          break
        case "arrowleft":
          event.preventDefault()
          skip(-5)
          break
        case "f":
          event.preventDefault()
          toggleFullscreen()
          break
        case "m":
          event.preventDefault()
          toggleMute()
          break
        case ">":
          event.preventDefault()
          changeSpeed()
          break
        case ".":
          if (video.paused) {
            video.currentTime += 0.03
          }
          break
      }
    }

    document.addEventListener("keydown", handleKeys)
    return () => document.removeEventListener("keydown", handleKeys)
  }, [togglePlayPause, skip, toggleFullscreen, toggleMute, changeSpeed, open])

  // Cleanup
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 text-white max-w-5xl p-0 rounded-xl overflow-hidden border border-gray-800">
        <div className="absolute inset-0 pointer-events-none" />

        {/* Video Container */}
        <div
          ref={containerRef}
          className="relative w-full bg-black aspect-video cursor-pointer group"
          onMouseMove={showControlsHandler}
          onClick={handleDoubleTap}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onProgress={handleProgress}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Double Tap Feedback */}
          {doubleClickFeedback.show && (
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-fade-out`}
            >
              {doubleClickFeedback.type === "left" ? (
                <div className="flex flex-col items-center gap-2">
                  <RotateCcw size={48} className="text-white opacity-80" />
                  <span className="text-white text-sm font-semibold opacity-80">-10s</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <RotateCw size={48} className="text-white opacity-80" />
                  <span className="text-white text-sm font-semibold opacity-80">+10s</span>
                </div>
              )}
            </div>
          )}

          {/* Center Play/Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              togglePlayPause()
            }}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-4 transition-all duration-200 ${
              showControls || !isPlaying ? "opacity-100" : "opacity-0"
            }`}
          >
            {isPlaying ? (
              <Pause size={48} className="text-white fill-white" />
            ) : (
              <Play size={48} className="text-white fill-white ml-1" />
            )}
          </button>

          {/* Top Controls */}
          <div
            className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <DialogHeader>
              <DialogTitle className="text-white text-lg">{title}</DialogTitle>
            </DialogHeader>
          </div>

          {/* Bottom Controls */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Progress Bar */}
            <div
              className="w-full h-1 bg-gray-700 rounded-full cursor-pointer group/progress mb-3 hover:h-2 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-gray-400 rounded-full pointer-events-none"
                style={{ width: `${bufferedPercentage}%` }}
              />
              <div
                className="h-full bg-red-500 rounded-full pointer-events-none transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Time Display */}
            <div className="flex items-center justify-between mb-3 text-sm font-medium">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-400">{formatTime(duration)}</span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <button
                  onClick={togglePlayPause}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Play/Pause (Space)"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>

                {/* Volume */}
                <div className="flex items-center gap-2 group/volume">
                  <button
                    onClick={toggleMute}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Mute (M)"
                  >
                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>

                  {/* Volume Slider */}
                  <div className="hidden group-hover/volume:flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={muted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                      className="w-20 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
                      title="Volume"
                    />
                    <span className="text-xs text-gray-400 w-6">{Math.round(muted ? 0 : volume * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Skip Back */}
                <button
                  onClick={() => skip(-10)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Skip -10s"
                >
                  <RotateCcw size={20} />
                </button>

                {/* Playback Speed */}
                <button
                  onClick={changeSpeed}
                  className="px-3 py-1.5 text-sm font-semibold hover:bg-white/10 rounded-lg transition-colors"
                  title="Change Speed (>)"
                >
                  {speed.toFixed(2)}x
                </button>

                {/* Skip Forward */}
                <button
                  onClick={() => skip(10)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Skip +10s"
                >
                  <RotateCw size={20} />
                </button>

                {/* Settings */}
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Settings">
                  <Settings size={20} />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Fullscreen (F)"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .animate-fade-out {
          animation: fadeOut 0.4s ease-out forwards;
        }

        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          background: white;
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </Dialog>
  )
}
