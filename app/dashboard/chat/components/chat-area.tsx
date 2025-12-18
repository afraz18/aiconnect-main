"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

export interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  text: string
  timestamp: string
  isOwn: boolean
}

interface ChatAreaProps {
  conversationId: string | null
  conversationName: string
  conversationAvatar: string
  messages: Message[]
  onSendMessage: (text: string) => void
}

export function ChatArea({
  conversationId,
  conversationName,
  conversationAvatar,
  messages,
  onSendMessage,
}: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!messageInput.trim() || !conversationId) return

    setIsLoading(true)
    try {
      onSendMessage(messageInput)
      setMessageInput("")
    } finally {
      setIsLoading(false)
    }
  }

  if (!conversationId) {
    return (
      <div className="flex-1 bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">No conversation selected</h2>
          <p className="text-muted-foreground">Select a conversation from the sidebar or start a new one.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {conversationAvatar}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{conversationName}</h3>
            <p className="text-xs text-muted-foreground">Active now</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
            <Phone size={20} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
            <Video size={20} />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}>
              {!message.isOwn && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs flex-shrink-0">
                  {message.senderAvatar}
                </div>
              )}
              <div className={message.isOwn ? "flex-row-reverse flex gap-2" : "flex gap-2"}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {!message.isOwn && (
                    <p className="text-xs font-semibold text-muted-foreground mb-1">{message.senderName}</p>
                  )}
                  <p className="text-sm break-words">{message.text}</p>
                </div>
                <span className="text-xs text-muted-foreground flex items-end">{message.timestamp}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-input border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !messageInput.trim()}
            className="bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground rounded-lg p-2 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
