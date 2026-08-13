export type ChatMode = 'ai' | 'human';

export type SenderType =
  | 'client'
  | 'ai'
  | 'agent';

export type Priority =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type QuestionTier = 1 | 2 | 3;

export interface ChatMessage {
  id: string;

  conversationId: string;

  message: string;

  senderType: SenderType;

  senderName?: string;

  time: string;
}

export interface Conversation {
  id: string;

  clientName: string;

  category: string;

  tier: QuestionTier;

  priority: Priority;

  mode: ChatMode;

  unreadCount: number;

  messages: ChatMessage[];
}