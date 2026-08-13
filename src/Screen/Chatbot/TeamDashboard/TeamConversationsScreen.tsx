import React, {useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useNavigation,
} from '@react-navigation/native';

import Feather from '@react-native-vector-icons/feather';

import ConversationFilter from '../../../components/chatbotCompo/TeamChat/ConversationFilter';
import ConversationList from '../../../components/chatbotCompo/TeamChat/ConversationList';
import { useChat } from '../../../context/Chatcontext';
// import {useChat} from '../../../context/ChatContext';
/* =========================================================
   TYPES
========================================================= */

type ConversationFilterType =
  | 'all'
  | 'tier1'
  | 'tier2'
  | 'tier3'
  | 'ai'
  | 'human'
  | 'urgent';

type TeamConversation = {
  id: string;
  clientName: string;
  category: string;
  lastMessage: string;
  time: string;
  tier: 1 | 2 | 3;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  mode: 'ai' | 'human';
  unreadCount: number;
};

/* =========================================================
   SCREEN
========================================================= */

const TeamConversationsScreen = () => {
  const navigation = useNavigation();

  const [selectedFilter, setSelectedFilter] =
    useState<ConversationFilterType>('all');

    const {conversations} = useChat();
  /* =======================================================
     TEMPORARY DATA

     Later this will come from:
     RTK Query / Backend / Socket.IO
  ======================================================= */

  // const conversations: TeamConversation[] = [
  //   {
  //     id: '1',
  //     clientName: 'Rahul Kumar',
  //     category: 'Payment Issue',
  //     lastMessage: 'My payment failed twice.',
  //     time: '2 min',
  //     tier: 2,
  //     priority: 'high',
  //     mode: 'human',
  //     unreadCount: 2,
  //   },

  //   {
  //     id: '2',
  //     clientName: 'Amit Sharma',
  //     category: 'General Question',
  //     lastMessage: 'What services do you provide?',
  //     time: '5 min',
  //     tier: 1,
  //     priority: 'low',
  //     mode: 'ai',
  //     unreadCount: 0,
  //   },

  //   {
  //     id: '3',
  //     clientName: 'Priya Singh',
  //     category: 'Account Issue',
  //     lastMessage: 'I cannot access my account.',
  //     time: '8 min',
  //     tier: 2,
  //     priority: 'urgent',
  //     mode: 'human',
  //     unreadCount: 4,
  //   },

  //   {
  //     id: '4',
  //     clientName: 'Vikas Gupta',
  //     category: 'Refund Request',
  //     lastMessage: 'I want to request a refund.',
  //     time: '15 min',
  //     tier: 3,
  //     priority: 'high',
  //     mode: 'ai',
  //     unreadCount: 1,
  //   },
  // ];




  /* =======================================================
     FILTER CONVERSATIONS
  ======================================================= */

  const filteredConversations = useMemo(() => {
  switch (selectedFilter) {
    case 'tier1':
      return conversations.filter(
        item => item.tier === 1,
      );

    case 'tier2':
      return conversations.filter(
        item => item.tier === 2,
      );

    case 'tier3':
      return conversations.filter(
        item => item.tier === 3,
      );

    case 'ai':
      return conversations.filter(
        item => item.mode === 'ai',
      );

    case 'human':
      return conversations.filter(
        item => item.mode === 'human',
      );

    case 'urgent':
      return conversations.filter(
        item => item.priority === 'urgent',
      );

    default:
      return conversations;
  }
}, [conversations, selectedFilter]);
  /* =======================================================
     OPEN SELECTED CONVERSATION
  ======================================================= */

  const handleConversationPress = (
    conversationId: string,
  ) => {
    navigation.navigate(
      'TeamChatScreen' as never,
      {
        conversationId,
      } as never,
    );
  };

  /* =======================================================
     BACK
  ======================================================= */

  const handleBack = () => {
    navigation.goBack();
  };


  /* =======================================================
     UI
  ======================================================= */

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>

      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        {/* Back Button */}

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          onPress={handleBack}>

          <Feather
            name="arrow-left"
            size={22}
            color="#111827"
          />

        </TouchableOpacity>

        {/* Header Title */}

        <View style={styles.headerTitleContainer}>

          <Text style={styles.title}>
            Conversations
          </Text>

          <Text style={styles.subtitle}>
            Select a client conversation
          </Text>

        </View>

        {/* Count */}

        <View style={styles.countContainer}>

          <Text style={styles.countText}>
            {filteredConversations.length}
          </Text>

        </View>

      </View>

      {/* =================================================
          FILTER
      ================================================= */}

      <ConversationFilter
        selected={selectedFilter}
        onChange={setSelectedFilter}
      />

      {/* =================================================
          CONVERSATION LIST
      ================================================= */}

      <View style={styles.listContainer}>

        <ConversationList
          conversations={filteredConversations}
          onConversationPress={
            handleConversationPress
          }
        />

      </View>

    </SafeAreaView>
  );
};

export default TeamConversationsScreen;

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },

  /* ================= HEADER ================= */

  header: {
    minHeight: 72,

    paddingHorizontal: 14,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 40,
    height: 40,

    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 8,
  },

  headerTitleContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    marginTop: 2,

    fontSize: 11,
    color: '#64748B',
  },

  /* ================= COUNT ================= */

  countContainer: {
    minWidth: 30,
    height: 30,

    paddingHorizontal: 8,

    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#EEF2FF',
  },

  countText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6366F1',
  },

  /* ================= LIST ================= */

  listContainer: {
    flex: 1,
  },
});