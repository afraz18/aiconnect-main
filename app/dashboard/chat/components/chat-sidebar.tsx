"use client"

import { useState, useMemo } from "react"
import { Search, Bell, Moon, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

interface ChatSidebarProps {
  conversations: Conversation[]
  selectedId: string | null
  onSelectConversation: (id: string) => void
}

export function ChatSidebar({ conversations, selectedId, onSelectConversation }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = useMemo(() => {
    return conversations.filter(
      (conv) =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [conversations, searchQuery])

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0)

  return (
    <div className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col max-w-sm w-full">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-sidebar-foreground">AiConnect</h1>
          <div className="flex items-center gap-3">
            <button className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
              <Moon size={20} />
            </button>
            <button className="relative text-muted-foreground hover:text-sidebar-foreground transition-colors">
              <Bell size={20} />
              {totalUnread > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalUnread > 9 ? "9+" : totalUnread}
                </span>
              )}
            </button>
            <button className="text-muted-foreground hover:text-sidebar-foreground transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-sidebar-accent rounded-lg p-3">
          <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
            PV
          </div>
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Prince vaya</p>
            <p className="text-xs text-muted-foreground">princevaya02@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-sidebar-accent border border-sidebar-border rounded-lg pl-10 pr-4 py-2 text-sm text-sidebar-foreground placeholder-muted-foreground focus:outline-none focus:border-sidebar-ring transition-colors"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <h2 className="text-xs font-semibold text-muted-foreground px-2 py-2 uppercase tracking-wider">
            Conversations
          </h2>
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No conversations found</div>
          ) : (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "w-full px-3 py-3 rounded-lg mb-2 text-left transition-colors flex items-start gap-3 group",
                  selectedId === conversation.id
                    ? "bg-sidebar-accent border border-sidebar-border"
                    : "hover:bg-sidebar-accent/50",
                )}
              >
                {/* Avatar with Online Status */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm overflow-hidden">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-chart-1 rounded-full border-2 border-sidebar" />
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-sidebar-foreground text-sm truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{conversation.timestamp}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>

                {/* Unread Badge */}
                {conversation.unread > 0 && (
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {conversation.unread}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
