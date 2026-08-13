import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import ChatHeader from '../../../components/chatbotCompo/chatbot/ChatHeader';
import ChatModeIndicator from '../../../components/chatbotCompo/chatbot/ChatModeIndicator';
import MessageList from '../../../components/chatbotCompo/chatbot/MessageList';
import TypingIndicator from '../../../components/chatbotCompo/chatbot/TypingIndicator';
import AgentJoinedBanner from '../../../components/chatbotCompo/chatbot/AgentJoinedBanner';
import MessageInput from '../../../components/chatbotCompo/chatbot/MessageInput';

const ChatScreen = () => {
  
  // Temporary frontend state.
  // Later these will come from Redux + Socket.IO.

  const [chatMode, setChatMode] = useState<'ai' | 'human'>('ai');

  const [messages, setMessages] = useState([
    {
      id: '1',
      message: 'Hello 👋 How can I help you today?',
      senderType: 'ai' as const,
      time: '12:30 PM',
    },
    {
      id: '2',
      message: 'I have a problem with my account.',
      senderType: 'client' as const,
      time: '12:31 PM',
    },
    {
      id: '3',
      message: 'Sure, please tell me more about the problem.',
      senderType: 'ai' as const,
      time: '12:31 PM',
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const [agentJoined, setAgentJoined] = useState(false);

  const agentName = 'Support Agent';

  const typingName =
    chatMode === 'ai' ? 'AI Assistant' : agentName;

  const sendMessage = (message: string) => {
    // Temporary frontend implementation.
    // Later this will send the message through Socket.IO.

    const newMessage = {
      id: Date.now().toString(),
      message,
      senderType: 'client' as const,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages(prev => [...prev, newMessage]);

    // Temporary typing simulation
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const reply = {
        id: `${Date.now()}-reply`,
        message:
          chatMode === 'ai'
            ? 'Thanks for your message. How can I help you further?'
            : 'Sure, I am checking this for you.',
        senderType: chatMode === 'ai'
          ? ('ai' as const)
          : ('agent' as const),
        senderName:
          chatMode === 'human'
            ? agentName
            : undefined,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader
        title="Support Assistant"
        isOnline={true}
        mode={chatMode}
      />

      <ChatModeIndicator
        mode={chatMode}
        agentName={agentName}
      />

      <MessageList
        messages={messages}
      />

      <TypingIndicator
        visible={isTyping}
        name={typingName}
      />

      <AgentJoinedBanner
        visible={agentJoined}
        agentName={agentName}
      />

      <MessageInput
        onSend={sendMessage}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});