import { Conversation, Message } from '@/types/chat';

// Generate a date that's X minutes ago
const minutesAgo = (minutes: number): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutes);
  return date.toISOString();
};

// Mock messages for conversations
const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Hey there! How are you doing?',
      sender: 'bot',
      timestamp: minutesAgo(30),
      status: 'read',
    },
    {
      id: '102',
      content: "I'm doing great, thanks for asking! How about you?",
      sender: 'user',
      timestamp: minutesAgo(25),
      status: 'read',
    },
  ],
  '2': [
    {
      id: '201',
      content: 'Did you see the latest updates?',
      sender: 'bot',
      timestamp: minutesAgo(120),
      status: 'read',
    },
    {
      id: '202',
      content: 'Not yet. What changed?',
      sender: 'user',
      timestamp: minutesAgo(90),
      status: 'read',
    },
    {
      id: '203',
      content: 'We added new features to the dashboard. Check it out!',
      sender: 'bot',
      timestamp: minutesAgo(85),
      status: 'read',
    },
  ],
  '3': [
    {
      id: '301',
      content: 'Meeting at 2 PM tomorrow',
      sender: 'user',
      timestamp: minutesAgo(1440), // 1 day ago
      status: 'read',
    },
    {
      id: '302',
      content: 'Got it! I\'ve added it to the calendar.',
      sender: 'bot',
      timestamp: minutesAgo(1430),
      status: 'read',
    },
  ],
  '4': [
    {
      id: '401',
      content: 'Welcome to your new chat!',
      sender: 'bot',
      timestamp: minutesAgo(10080), // 1 week ago
      status: 'read',
    },
    {
      id: '402',
      content: 'Thanks! Excited to be here.',
      sender: 'user',
      timestamp: minutesAgo(10070),
      status: 'read',
    },
  ],
};

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    isOnline: true,
    lastMessage: 'I\'m doing great, thanks for asking!',
    unreadCount: 2,
    messages: mockMessages['1'],
    updatedAt: minutesAgo(25),
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    isOnline: false,
    lastMessage: 'We added new features to the dashboard. Check it out!',
    unreadCount: 0,
    messages: mockMessages['2'],
    updatedAt: minutesAgo(85),
  },
  {
    id: '3',
    name: 'Team Standup',
    avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
    isOnline: true,
    lastMessage: 'Got it! I\'ve added it to the calendar.',
    unreadCount: 5,
    messages: mockMessages['3'],
    updatedAt: minutesAgo(1430),
  },
  {
    id: '4',
    name: 'Support Team',
    avatar: 'https://randomuser.me/api/portraits/lego/4.jpg',
    isOnline: false,
    lastMessage: 'Thanks! Excited to be here.',
    unreadCount: 0,
    messages: mockMessages['4'],
    updatedAt: minutesAgo(10070),
  },
];

// Function to get conversations (simulating an API call)
export const getConversations = async (): Promise<Conversation[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [...mockConversations];
};

// Function to get a single conversation by ID
export const getConversationById = async (id: string): Promise<Conversation | undefined> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockConversations.find(conv => conv.id === id);
};
