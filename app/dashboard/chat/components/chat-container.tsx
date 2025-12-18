"use client";

import { useState, useCallback, useEffect } from "react";
import { ChatSidebar, type Conversation } from "./chat-sidebar";
import { ChatArea, type Message } from "./chat-area";

interface ChatContainerProps {
  onClose?: () => void;
}

export function ChatContainer({ onClose }: ChatContainerProps) {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // 🔐 Simulated logged-in user
  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "John Doe",
      avatar: "JD",
      lastMessage: "Hey there!",
      timestamp: "just now",
      unread: 0,
      online: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "JS",
      lastMessage: "Hello!",
      timestamp: "1 min ago",
      unread: 0,
      online: true,
    },
  ]);

  // 📥 Fetch messages when conversation changes
  useEffect(() => {
    if (!selectedConversationId || !currentUser) return;

    fetch(`/api/chat?conversationId=${selectedConversationId}`)
      .then((res) => res.json())
      .then((data: Message[]) => {
        const updated = data.map((msg) => ({
          ...msg,
          isOwn: msg.senderId === currentUser.id,
        }));
        setMessages(updated);
      });
  }, [selectedConversationId, currentUser]);

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedConversationId(id);
  }, []);

  // 📤 Send message
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!selectedConversationId || !currentUser) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        conversationId: selectedConversationId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        text,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };

      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });

      setMessages((prev) => [...prev, newMessage]);

      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversationId
            ? { ...c, lastMessage: text, timestamp: "just now" }
            : c
        )
      );
    },
    [selectedConversationId, currentUser]
  );

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        conversations={conversations}
        selectedId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
      />
      <ChatArea
        conversationId={selectedConversationId}
        conversationName={selectedConversation?.name || ""}
        conversationAvatar={selectedConversation?.avatar || ""}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
