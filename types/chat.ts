export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot' | string;
  timestamp: string;
  status?: MessageStatus;
  // For future use:
  // attachments?: FileAttachment[];
  // replyTo?: string; // ID of the message being replied to
  // reactions?: Reaction[];
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastMessage?: string;
  unreadCount: number;
  messages: Message[];
  updatedAt: string;
  // For future use:
  // participants?: string[];
  // isGroup?: boolean;
  // isPinned?: boolean;
  // isMuted?: boolean;
  // customStatus?: string;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Message[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  isTyping: boolean;
}

export type ChatAction =
  | { type: 'SET_CONVERSATIONS'; payload: Conversation[] }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'SEND_MESSAGE'; payload: Message }
  | { type: 'MESSAGE_SENT'; payload: { messageId: string; status: MessageStatus } }
  | { type: 'MESSAGE_DELIVERED'; payload: { messageId: string } }
  | { type: 'MESSAGE_READ'; payload: { messageId: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_TYPING'; payload: boolean };

export interface UseChatReturn extends Omit<ChatState, 'error'> {
  sendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'status'>) => Promise<Message>;
  markAsRead: (conversationId: string) => void;
  setSearchQuery: (query: string) => void;
  // For future use:
  // addReaction: (messageId: string, reaction: string) => void;
  // deleteMessage: (messageId: string) => void;
  // forwardMessage: (messageId: string, conversationIds: string[]) => void;
}
