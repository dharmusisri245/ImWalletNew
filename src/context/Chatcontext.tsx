import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import {
  ChatMessage,
  Conversation,
} from '../types/chat';

/* =========================================================
   CONTEXT TYPE
========================================================= */

interface ChatContextType {
  conversations: Conversation[];

  getConversation: (
    conversationId: string,
  ) => Conversation | undefined;

  sendClientMessage: (
    conversationId: string,
    message: string,
  ) => void;

  sendAgentMessage: (
    conversationId: string,
    message: string,
    agentName?: string,
  ) => void;

  takeOverConversation: (
    conversationId: string,
  ) => void;

  releaseToAI: (
    conversationId: string,
  ) => void;

  markConversationRead: (
    conversationId: string,
  ) => void;
}

/* =========================================================
   CREATE CONTEXT
========================================================= */

const ChatContext =
  createContext<ChatContextType | undefined>(
    undefined,
  );

/* =========================================================
   INITIAL MOCK DATA
========================================================= */

const initialConversations: Conversation[] = [
  {
    id: '1',

    clientName: 'Rahul Kumar',

    category: 'Payment Issue',

    tier: 2,

    priority: 'high',

    mode: 'human',

    unreadCount: 2,

    messages: [
      {
        id: '1',
        conversationId: '1',
        message:
          'Hello, my payment failed twice.',
        senderType: 'client',
        time: '12:30 PM',
      },

      {
        id: '2',
        conversationId: '1',
        message:
          'I am checking your issue.',
        senderType: 'ai',
        time: '12:30 PM',
      },

      {
        id: '3',
        conversationId: '1',
        message:
          'Hi Rahul, I will help you with this payment issue.',
        senderType: 'agent',
        senderName: 'Dharmendra',
        time: '12:31 PM',
      },
    ],
  },

  {
    id: '2',

    clientName: 'Amit Sharma',

    category: 'General Question',

    tier: 1,

    priority: 'low',

    mode: 'ai',

    unreadCount: 0,

    messages: [
      {
        id: '4',
        conversationId: '2',
        message:
          'What services do you provide?',
        senderType: 'client',
        time: '12:35 PM',
      },

      {
        id: '5',
        conversationId: '2',
        message:
          'We provide employee management and support services.',
        senderType: 'ai',
        time: '12:35 PM',
      },
    ],
  },

  {
    id: '3',

    clientName: 'Priya Singh',

    category: 'Account Issue',

    tier: 2,

    priority: 'urgent',

    mode: 'human',

    unreadCount: 4,

    messages: [
      {
        id: '6',
        conversationId: '3',
        message:
          'I cannot access my account.',
        senderType: 'client',
        time: '12:40 PM',
      },
    ],
  },

  {
    id: '4',

    clientName: 'Vikas Gupta',

    category: 'Refund Request',

    tier: 3,

    priority: 'high',

    mode: 'ai',

    unreadCount: 1,

    messages: [
      {
        id: '7',
        conversationId: '4',
        message:
          'I want to request a refund.',
        senderType: 'client',
        time: '12:45 PM',
      },
    ],
  },
];

/* =========================================================
   PROVIDER PROPS
========================================================= */

interface ChatProviderProps {
  children: ReactNode;
}

/* =========================================================
   CHAT PROVIDER
========================================================= */

export const ChatProvider: React.FC<
  ChatProviderProps
> = ({children}) => {

  const [
    conversations,
    setConversations,
  ] = useState<Conversation[]>(
    initialConversations,
  );

  /* =======================================================
     GET CONVERSATION
  ======================================================= */

  const getConversation = (
    conversationId: string,
  ): Conversation | undefined => {

    return conversations.find(
      conversation =>
        conversation.id === conversationId,
    );
  };

  /* =======================================================
     SEND CLIENT MESSAGE
  ======================================================= */

  const sendClientMessage = (
    conversationId: string,
    message: string,
  ) => {

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),

      conversationId,

      message: trimmedMessage,

      senderType: 'client',

      time: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      ),
    };

    setConversations(prev =>
      prev.map(conversation => {

        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [
            ...conversation.messages,
            newMessage,
          ],

          unreadCount:
            conversation.unreadCount + 1,
        };
      }),
    );
  };

  /* =======================================================
     SEND AGENT MESSAGE
  ======================================================= */

  const sendAgentMessage = (
    conversationId: string,
    message: string,
    agentName = 'Dharmendra',
  ) => {

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      return;
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),

      conversationId,

      message: trimmedMessage,

      senderType: 'agent',

      senderName: agentName,

      time: new Date().toLocaleTimeString(
        [],
        {
          hour: '2-digit',
          minute: '2-digit',
        },
      ),
    };

    setConversations(prev =>
      prev.map(conversation => {

        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          messages: [
            ...conversation.messages,
            newMessage,
          ],
        };
      }),
    );
  };

  /* =======================================================
     TAKE OVER FROM AI
  ======================================================= */

  const takeOverConversation = (
    conversationId: string,
  ) => {

    setConversations(prev =>
      prev.map(conversation => {

        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          mode: 'human',

          unreadCount: 0,
        };
      }),
    );
  };

  /* =======================================================
     RELEASE BACK TO AI
  ======================================================= */

  const releaseToAI = (
    conversationId: string,
  ) => {

    setConversations(prev =>
      prev.map(conversation => {

        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          mode: 'ai',
        };
      }),
    );
  };

  /* =======================================================
     MARK CONVERSATION READ
  ======================================================= */

  const markConversationRead = (
    conversationId: string,
  ) => {

    setConversations(prev =>
      prev.map(conversation => {

        if (
          conversation.id !==
          conversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,

          unreadCount: 0,
        };
      }),
    );
  };

  /* =======================================================
     PROVIDER RETURN
  ======================================================= */

  return (
    <ChatContext.Provider
      value={{
        conversations,
        getConversation,
        sendClientMessage,
        sendAgentMessage,
        takeOverConversation,
        releaseToAI,
        markConversationRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

/* =========================================================
   useChat HOOK
========================================================= */

export const useChat = (): ChatContextType => {

  const context =
    useContext(ChatContext);

  if (context === undefined) {
    throw new Error(
      'useChat must be used inside ChatProvider',
    );
  }

  return context;
};