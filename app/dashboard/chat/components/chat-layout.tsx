'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConversationList } from './conversation-list';
import { ChatWindow } from './chat-window';
import { Conversation, Message } from '@/types/chat';
import { useChat } from '@/hooks/use-chat';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatLayoutProps {
  conversations: Conversation[];
}

export function ChatLayout({ conversations: initialConversations }: ChatLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get('id');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  const {
    conversations,
    currentConversation,
    messages,
    loading,
    sendMessage,
    searchQuery,
    setSearchQuery,
    markAsRead,
    isTyping,
  } = useChat({ initialConversations, initialConversationId: conversationId || undefined });

  // Toggle sidebar on mobile
  useEffect(() => {
    setShowSidebar(!isMobile ? true : false);
  }, [isMobile]);

  // Update URL when conversation changes
  useEffect(() => {
    if (currentConversation) {
      router.push(`/dashboard/chat?id=${currentConversation.id}`, { scroll: false });
      markAsRead(currentConversation.id);
    }
  }, [currentConversation?.id, router, markAsRead]);

  const handleSelectConversation = (conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      // In a real app, you would update the current conversation in your state
      // and fetch messages for this conversation
      if (isMobile) {
        setShowSidebar(false);
      }
    }
  };

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!currentConversation) return;

    // In a real app, you would send this to your API
    await sendMessage({
      content,
      sender: 'user',
    });
  };

  return (
    <div className="flex h-full w-full">
      {/* Mobile menu toggle - Will be handled by the main layout */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-20 bg-background/80 backdrop-blur-sm"
          onClick={() => {
            // This will be handled by the main layout's mobile menu toggle
            const event = new CustomEvent('toggle-mobile-menu');
            window.dispatchEvent(event);
          }}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Main chat area - Takes full width */}
      <div className="w-full h-full">
        {currentConversation ? (
          <ChatWindow
            conversation={currentConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            className="flex-1"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">No conversation selected</h2>
              <p className="text-muted-foreground">
                Select a conversation from the sidebar or start a new one.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
