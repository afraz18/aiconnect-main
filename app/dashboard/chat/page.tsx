"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChatWindow } from './components/chat-window';
import { ConversationList } from './components/conversation-list';
import { useChat } from '@/hooks/use-chat';
import { getConversations } from '@/data/chats.mock';
import { Button } from '@/components/ui/button';
import { Menu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

function ChatContent() {
  const router = useRouter();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const searchParams = useSearchParams();
  const conversationId = searchParams.get('id');

  const {
    conversations,
    currentConversation,
    messages,
    loading,
    sendMessage,
    searchQuery,
    setSearchQuery,
    markAsRead
  } = useChat({
    initialConversations: [],
    initialConversationId: conversationId || undefined
  });

  // Load conversations
  const [loadedConversations, setLoadedConversations] = useState(conversations);

  // In a real app, you would fetch this data on the server
  useEffect(() => {
    const loadConversations = async () => {
      const data = await getConversations();
      setLoadedConversations(data);
    };
    loadConversations();
  }, []);

  // Handle conversation selection
  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      router.push(`/dashboard/chat?id=${conversation.id}`);
      markAsRead(conversation.id);
      setShowMobileSidebar(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!currentConversation) return;

    await sendMessage({
      content,
      sender: 'user',
    });
  };

  return (
    <div className="flex h-full w-full">
      {/* Mobile menu toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-20 md:hidden bg-background/80 backdrop-blur-sm"
        onClick={() => setShowMobileSidebar(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-80 border-r bg-background transition-transform duration-300 ease-in-out md:hidden',
          showMobileSidebar ? 'translate-x-0' : '-translate-x-full',
          'pt-16'
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={loadedConversations}
              currentConversationId={currentConversation?.id}
              onSelectConversation={handleSelectConversation}
            />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block w-80 border-r">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Conversations</h2>
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={loadedConversations}
              currentConversationId={currentConversation?.id}
              onSelectConversation={handleSelectConversation}
            />
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 h-full">
        {currentConversation ? (
          <ChatWindow
            conversation={currentConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={false}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <h2 className="text-2xl font-bold mb-2">No conversation selected</h2>
              <p className="text-muted-foreground">
                Select a conversation from the sidebar or start a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
