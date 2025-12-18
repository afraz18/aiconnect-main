import { useState, useEffect, useCallback } from 'react';
import { Conversation, Message } from '@/types/chat';

interface UseChatProps {
  initialConversations?: Conversation[];
  initialConversationId?: string;
}

export function useChat({ initialConversations = [], initialConversationId }: UseChatProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations || []);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Set initial conversation
  useEffect(() => {
    if (!conversations || conversations.length === 0) return;
    
    if (initialConversationId) {
      const conversation = conversations.find(c => c.id === initialConversationId);
      if (conversation) {
        setCurrentConversation(conversation);
        setMessages(conversation.messages || []);
      } else if (conversations.length > 0) {
        // If the specified conversation isn't found, default to the first one
        setCurrentConversation(conversations[0]);
        setMessages(conversations[0].messages || []);
      }
    } else if (conversations.length > 0) {
      setCurrentConversation(conversations[0]);
      setMessages(conversations[0].messages || []);
    }
  }, [initialConversationId, conversations]);

  // Filter conversations based on search query
  const filteredConversations = useCallback(() => {
    if (!searchQuery.trim()) return conversations;
    
    const query = searchQuery.toLowerCase();
    return conversations.filter(conv => 
      conv.name.toLowerCase().includes(query) ||
      conv.messages.some(msg => 
        msg.content.toLowerCase().includes(query)
      )
    );
  }, [conversations, searchQuery]);

  // Send a new message
  const sendMessage = useCallback(async (message: Omit<Message, 'id' | 'status' | 'timestamp'>) => {
    if (!currentConversation) return;
    
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    // Optimistically update the UI
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' as const }
            : msg
        )
      );
    }, 1000);

    // Simulate read receipt
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' as const }
            : msg
        )
      );
    }, 2000);

    // Simulate typing indicator from the other side
    if (message.sender === 'user') {
      setIsTyping(true);
      
      // Simulate response after a delay
      setTimeout(() => {
        setIsTyping(false);
        
        const responseMessage: Message = {
          id: `bot-${Date.now()}`,
          content: `This is an automated response to: "${message.content}"`,
          sender: 'bot',
          timestamp: new Date().toISOString(),
          status: 'read',
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }

    return newMessage;
  }, [currentConversation]);

  // Mark a conversation as read
  const markAsRead = useCallback((conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  }, []);

  // Update search query
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    conversations: filteredConversations(),
    currentConversation,
    messages,
    loading,
    searchQuery,
    setSearchQuery: handleSearch,
    sendMessage,
    markAsRead,
    isTyping,
  };
}

export default useChat;
