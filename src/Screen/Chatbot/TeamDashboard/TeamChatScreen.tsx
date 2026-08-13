import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';


import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import TeamChatHeader from '../../../components/chatbotCompo/TeamChat/TeamChatHeader';
import TeamMessageList from '../../../components/chatbotCompo/TeamChat/TeamMessageList';
import TeamMessageInput from '../../../components/chatbotCompo/TeamChat/TeamMessageInput';

import {useChat} from '../../../context/Chatcontext';

/* =========================================================
   ROUTE PARAMS
========================================================= */

interface TeamChatRouteParams {
  conversationId: string;
}

/* =========================================================
   SCREEN
========================================================= */

const TeamChatScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const {
    conversationId,
  } = route.params as TeamChatRouteParams;

  /* =======================================================
     CHAT CONTEXT
  ======================================================= */

  const {
    getConversation,
    sendAgentMessage,
    takeOverConversation,
    releaseToAI,
    markConversationRead,
  } = useChat();

  /* =======================================================
     CURRENT CONVERSATION
  ======================================================= */

  const conversation =
    getConversation(conversationId);

  /* =======================================================
     CHAT MODE
  ======================================================= */

  const mode =
    conversation?.mode ?? 'ai';

  /* =======================================================
     MESSAGES
  ======================================================= */

  const messages =
    conversation?.messages ?? [];

  /* =======================================================
     MARK AS READ
  ======================================================= */

  useEffect(() => {
  markConversationRead(
    conversationId,
  );
}, [conversationId]);

  /* =======================================================
     BACK
  ======================================================= */

  const handleBack = () => {
    navigation.goBack();
  };

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSendMessage = (
    message: string,
  ) => {

    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) {
      return;
    }

    sendAgentMessage(
      conversationId,
      trimmedMessage,
      'Dharmendra',
    );
  };

  
  /* =======================================================
     TAKE OVER FROM AI
  ======================================================= */

  const handleTakeOver = () => {

    takeOverConversation(
      conversationId,
    );
  };

  /* =======================================================
     RELEASE BACK TO AI
  ======================================================= */

  const handleReleaseToAI = () => {

    releaseToAI(
      conversationId,
    );
  };

  /* =======================================================
     CONVERSATION NOT FOUND
  ======================================================= */

  if (!conversation) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={[
          'top',
          'left',
          'right',
          'bottom',
        ]}>
        <View />
      </SafeAreaView>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <SafeAreaView
      style={styles.container}
      edges={[
        'top',
        'left',
        'right',
        'bottom',
      ]}>

      {/* =================================================
          CHAT HEADER
      ================================================= */}

      <TeamChatHeader
        clientName={
          conversation.clientName
        }

        category={
          conversation.category
        }

        tier={
          conversation.tier
        }

        priority={
          conversation.priority
        }

        mode={mode}

        onBack={handleBack}

        onTakeOver={
          handleTakeOver
        }

        onReleaseToAI={
          handleReleaseToAI
        }
      />

      {/* =================================================
          MESSAGE LIST
      ================================================= */}

      <View
        style={
          styles.messageContainer
        }>

        <TeamMessageList
          messages={messages}
        />

      </View>

      {/* =================================================
          MESSAGE INPUT
      ================================================= */}

      <TeamMessageInput
        onSend={
          handleSendMessage
        }

        disabled={
          mode === 'ai'
        }

        placeholder={
          mode === 'ai'
            ? 'AI is handling this conversation'
            : 'Type your reply...'
        }
      />

    </SafeAreaView>
  );
};

export default TeamChatScreen;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },

  messageContainer: {
    flex: 1,
  },
});