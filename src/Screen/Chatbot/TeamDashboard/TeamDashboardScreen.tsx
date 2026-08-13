import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Feather from '@react-native-vector-icons/feather';

import AgentStatus from '../../../components/chatbotCompo/TeamChat/AgentStatus';

const TeamDashboardScreen = () => {
  const navigation = useNavigation();

  const handleOpenConversations = () => {
    navigation.navigate('TeamConversations' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.eyebrow}>
              TEAM SUPPORT
            </Text>

            <Text style={styles.title}>
              Support Dashboard
            </Text>

            <Text style={styles.subtitle}>
              Manage client conversations
            </Text>
          </View>

          <View style={styles.agentWrapper}>
            <AgentStatus
              status="online"
              agentName="Dharmendra"
            />
          </View>
        </View>

        {/* =====================================================
            OVERVIEW
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Overview
            </Text>

            <Text style={styles.sectionSubtitle}>
              Today's support activity
            </Text>
          </View>

          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />

            <Text style={styles.liveText}>
              LIVE
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>

          {/* TOTAL */}
          <View style={styles.statCard}>
            <View style={styles.statTopRow}>
              <View
                style={[
                  styles.statIcon,
                  styles.blueIcon,
                ]}>
                <Feather
                  name="message-square"
                  size={18}
                  color="#4F46E5"
                />
              </View>

              <Feather
                name="arrow-up-right"
                size={16}
                color="#94A3B8"
              />
            </View>

            <Text style={styles.statValue}>
              28
            </Text>

            <Text style={styles.statLabel}>
              Total Chats
            </Text>
          </View>

          {/* WAITING */}
          <View style={styles.statCard}>
            <View style={styles.statTopRow}>
              <View
                style={[
                  styles.statIcon,
                  styles.orangeIcon,
                ]}>
                <Feather
                  name="clock"
                  size={18}
                  color="#EA580C"
                />
              </View>

              <View style={styles.smallStatus}>
                <Text style={styles.smallStatusText}>
                  12
                </Text>
              </View>
            </View>

            <Text style={styles.statValue}>
              12
            </Text>

            <Text style={styles.statLabel}>
              Waiting
            </Text>
          </View>

          {/* ACTIVE */}
          <View style={styles.statCard}>
            <View style={styles.statTopRow}>
              <View
                style={[
                  styles.statIcon,
                  styles.greenIcon,
                ]}>
                <Feather
                  name="activity"
                  size={18}
                  color="#16A34A"
                />
              </View>

              <View style={styles.activeIndicator}>
                <View style={styles.activeDot} />
              </View>
            </View>

            <Text style={styles.statValue}>
              16
            </Text>

            <Text style={styles.statLabel}>
              Active
            </Text>
          </View>

          {/* HUMAN */}
          <View style={styles.statCard}>
            <View style={styles.statTopRow}>
              <View
                style={[
                  styles.statIcon,
                  styles.purpleIcon,
                ]}>
                <Feather
                  name="users"
                  size={18}
                  color="#7C3AED"
                />
              </View>

              <Feather
                name="user-check"
                size={16}
                color="#94A3B8"
              />
            </View>

            <Text style={styles.statValue}>
              8
            </Text>

            <Text style={styles.statLabel}>
              Human Handled
            </Text>
          </View>

        </View>

        {/* =====================================================
            QUESTION TIERS
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Question Tiers
            </Text>

            <Text style={styles.sectionSubtitle}>
              Conversation complexity
            </Text>
          </View>
        </View>

        <View style={styles.tierContainer}>

          {/* TIER 1 */}
          <View style={styles.tierCard}>
            <View style={styles.tierIconContainer}>
              <View
                style={[
                  styles.tierIcon,
                  styles.tier1Background,
                ]}>
                <Feather
                  name="help-circle"
                  size={17}
                  color="#16A34A"
                />
              </View>
            </View>

            <View style={styles.tierInfo}>
              <View style={styles.tierTitleRow}>
                <Text style={styles.tierTitle}>
                  Tier 1
                </Text>

                <View style={styles.tierStatusGreen}>
                  <Text style={styles.tierStatusTextGreen}>
                    GENERAL
                  </Text>
                </View>
              </View>

              <Text style={styles.tierDescription}>
                General questions
              </Text>
            </View>

            <View style={styles.tierCountContainer}>
              <Text style={styles.tierCount}>
                14
              </Text>

              <Text style={styles.tierChats}>
                chats
              </Text>
            </View>
          </View>

          {/* TIER 2 */}
          <View style={styles.tierCard}>
            <View style={styles.tierIconContainer}>
              <View
                style={[
                  styles.tierIcon,
                  styles.tier2Background,
                ]}>
                <Feather
                  name="settings"
                  size={17}
                  color="#D97706"
                />
              </View>
            </View>

            <View style={styles.tierInfo}>
              <View style={styles.tierTitleRow}>
                <Text style={styles.tierTitle}>
                  Tier 2
                </Text>

                <View style={styles.tierStatusOrange}>
                  <Text style={styles.tierStatusTextOrange}>
                    SERVICE
                  </Text>
                </View>
              </View>

              <Text style={styles.tierDescription}>
                Account & service issues
              </Text>
            </View>

            <View style={styles.tierCountContainer}>
              <Text style={styles.tierCount}>
                9
              </Text>

              <Text style={styles.tierChats}>
                chats
              </Text>
            </View>
          </View>

          {/* TIER 3 */}
          <View
            style={[
              styles.tierCard,
              styles.lastTierCard,
            ]}>
            <View style={styles.tierIconContainer}>
              <View
                style={[
                  styles.tierIcon,
                  styles.tier3Background,
                ]}>
                <Feather
                  name="alert-triangle"
                  size={17}
                  color="#DC2626"
                />
              </View>
            </View>

            <View style={styles.tierInfo}>
              <View style={styles.tierTitleRow}>
                <Text style={styles.tierTitle}>
                  Tier 3
                </Text>

                <View style={styles.tierStatusRed}>
                  <Text style={styles.tierStatusTextRed}>
                    CRITICAL
                  </Text>
                </View>
              </View>

              <Text style={styles.tierDescription}>
                Critical issues
              </Text>
            </View>

            <View style={styles.tierCountContainer}>
              <Text style={styles.tierCount}>
                5
              </Text>

              <Text style={styles.tierChats}>
                chats
              </Text>
            </View>
          </View>

        </View>

        {/* =====================================================
            PRIORITY
        ===================================================== */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Priority
            </Text>

            <Text style={styles.sectionSubtitle}>
              Conversations requiring attention
            </Text>
          </View>
        </View>

        <View style={styles.priorityCard}>

          {/* URGENT */}
          <View style={styles.priorityItem}>
            <View
              style={[
                styles.priorityIcon,
                styles.urgentBackground,
              ]}>
              <Feather
                name="alert-circle"
                size={17}
                color="#DC2626"
              />
            </View>

            <View style={styles.priorityInfo}>
              <Text style={styles.priorityTitle}>
                Urgent
              </Text>

              <Text style={styles.priorityDescription}>
                Immediate attention
              </Text>
            </View>

            <Text
              style={[
                styles.priorityCount,
                styles.urgentText,
              ]}>
              3
            </Text>
          </View>

          <View style={styles.priorityDivider} />

          {/* HIGH */}
          <View style={styles.priorityItem}>
            <View
              style={[
                styles.priorityIcon,
                styles.highBackground,
              ]}>
              <Feather
                name="arrow-up"
                size={17}
                color="#EA580C"
              />
            </View>

            <View style={styles.priorityInfo}>
              <Text style={styles.priorityTitle}>
                High
              </Text>

              <Text style={styles.priorityDescription}>
                Needs attention soon
              </Text>
            </View>

            <Text
              style={[
                styles.priorityCount,
                styles.highText,
              ]}>
              5
            </Text>
          </View>

          <View style={styles.priorityDivider} />

          {/* MEDIUM */}
          <View style={styles.priorityItem}>
            <View
              style={[
                styles.priorityIcon,
                styles.mediumBackground,
              ]}>
              <Feather
                name="minus"
                size={17}
                color="#D97706"
              />
            </View>

            <View style={styles.priorityInfo}>
              <Text style={styles.priorityTitle}>
                Medium
              </Text>

              <Text style={styles.priorityDescription}>
                Normal attention
              </Text>
            </View>

            <Text
              style={[
                styles.priorityCount,
                styles.mediumText,
              ]}>
              8
            </Text>
          </View>

        </View>

        {/* =====================================================
            OPEN CONVERSATIONS
        ===================================================== */}

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.openButton}
          onPress={handleOpenConversations}>

          <View style={styles.openButtonLeft}>
            <View style={styles.openButtonIcon}>
              <Feather
                name="message-circle"
                size={19}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.openButtonTitle}>
                Open Conversations
              </Text>

              <Text style={styles.openButtonSubtitle}>
                View and manage client chats
              </Text>
            </View>
          </View>

          <View style={styles.arrowContainer}>
            <Feather
              name="arrow-right"
              size={19}
              color="#FFFFFF"
            />
          </View>

        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TeamDashboardScreen;

const styles = StyleSheet.create({
  /* =====================================================
     CONTAINER
  ===================================================== */

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 35,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },

  headerLeft: {
    flex: 1,
    marginRight: 12,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    color: '#6366F1',
    marginBottom: 5,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
  },

  agentWrapper: {
    alignItems: 'flex-end',
  },

  /* =====================================================
     SECTION HEADER
  ===================================================== */

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
    marginBottom: 13,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: '#94A3B8',
  },

  /* =====================================================
     LIVE BADGE
  ===================================================== */

  liveBadge: {
    height: 26,
    paddingHorizontal: 9,
    borderRadius: 13,
    backgroundColor: '#ECFDF5',
    flexDirection: 'row',
    alignItems: 'center',
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
    marginRight: 5,
  },

  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 0.5,
  },

  /* =====================================================
     STATS
  ===================================================== */

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  statCard: {
    width: '48.2%',
    minHeight: 142,
    padding: 15,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF0F5',

    shadowColor: '#0F172A',
    shadowOpacity: 0.045,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  statTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blueIcon: {
    backgroundColor: '#EEF2FF',
  },

  orangeIcon: {
    backgroundColor: '#FFF7ED',
  },

  greenIcon: {
    backgroundColor: '#ECFDF5',
  },

  purpleIcon: {
    backgroundColor: '#F5F3FF',
  },

  smallStatus: {
    minWidth: 25,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF7ED',
  },

  smallStatusText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#EA580C',
  },

  activeIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
  },

  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#16A34A',
  },

  statValue: {
    marginTop: 18,
    fontSize: 27,
    fontWeight: '800',
    color: '#111827',
  },

  statLabel: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },

  /* =====================================================
     TIERS
  ===================================================== */

  tierContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#EEF0F5',
    overflow: 'hidden',

    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  tierCard: {
    minHeight: 78,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  lastTierCard: {
    borderBottomWidth: 0,
  },

  tierIconContainer: {
    marginRight: 12,
  },

  tierIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tier1Background: {
    backgroundColor: '#ECFDF5',
  },

  tier2Background: {
    backgroundColor: '#FFFBEB',
  },

  tier3Background: {
    backgroundColor: '#FEF2F2',
  },

  tierInfo: {
    flex: 1,
  },

  tierTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  tierTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },

  tierDescription: {
    marginTop: 4,
    fontSize: 11,
    color: '#94A3B8',
  },

  tierStatusGreen: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: '#ECFDF5',
  },

  tierStatusTextGreen: {
    fontSize: 7,
    fontWeight: '800',
    color: '#15803D',
    letterSpacing: 0.4,
  },

  tierStatusOrange: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: '#FFFBEB',
  },

  tierStatusTextOrange: {
    fontSize: 7,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.4,
  },

  tierStatusRed: {
    marginLeft: 7,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: '#FEF2F2',
  },

  tierStatusTextRed: {
    fontSize: 7,
    fontWeight: '800',
    color: '#B91C1C',
    letterSpacing: 0.4,
  },

  tierCountContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },

  tierCount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
  },

  tierChats: {
    marginTop: 1,
    fontSize: 9,
    color: '#94A3B8',
  },

  /* =====================================================
     PRIORITY
  ===================================================== */

  priorityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#EEF0F5',

    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  priorityItem: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
  },

  priorityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  urgentBackground: {
    backgroundColor: '#FEF2F2',
  },

  highBackground: {
    backgroundColor: '#FFF7ED',
  },

  mediumBackground: {
    backgroundColor: '#FFFBEB',
  },

  priorityInfo: {
    flex: 1,
  },

  priorityTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E293B',
  },

  priorityDescription: {
    marginTop: 3,
    fontSize: 10,
    color: '#94A3B8',
  },

  priorityCount: {
    fontSize: 20,
    fontWeight: '800',
  },

  urgentText: {
    color: '#DC2626',
  },

  highText: {
    color: '#EA580C',
  },

  mediumText: {
    color: '#D97706',
  },

  priorityDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  /* =====================================================
     OPEN CONVERSATIONS
  ===================================================== */

  openButton: {
    minHeight: 70,
    marginTop: 22,
    paddingLeft: 14,
    paddingRight: 10,
    borderRadius: 17,

    backgroundColor: '#4F46E5',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#4F46E5',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  openButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  openButtonIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  openButtonTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  openButtonSubtitle: {
    marginTop: 3,
    fontSize: 10,
    color: 'rgba(255,255,255,0.72)',
  },

  arrowContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
});







// import React, {useMemo, useState} from 'react';
// import {
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import TeamChatHeader from '../../../components/chatbotCompo/TeamChat/TeamChatHeader';
// import TeamMessageList from '../../../components/chatbotCompo/TeamChat/TeamMessageList';
// import TeamMessageInput from '../../../components/chatbotCompo/TeamChat/TeamMessageInput';
// import AgentStatus from '../../../components/chatbotCompo/TeamChat/AgentStatus';
// import ConversationFilter from '../../../components/chatbotCompo/TeamChat/ConversationFilter';
// import ConversationList from '../../../components/chatbotCompo/TeamChat/ConversationList';


// const TeamDashboardScreen = () => {
//   // --------------------------------------------------
//   // Selected conversation
//   // --------------------------------------------------
//   const [selectedConversationId, setSelectedConversationId] =
//     useState<string | null>(null);

//   // --------------------------------------------------
//   // Conversation filter
//   // --------------------------------------------------

//   const [selectedFilter, setSelectedFilter] =
//     useState<ConversationFilterType>('all');

//   // --------------------------------------------------
//   // Chat mode
//   // --------------------------------------------------

//   const [chatMode, setChatMode] =
//     useState<'ai' | 'human'>('human');

//   // --------------------------------------------------
//   // Temporary conversations
//   // Later -> Redux / RTK Query
//   // --------------------------------------------------

//   const conversations: TeamConversation[] = [
//     {
//       id: '1',
//       clientName: 'Rahul Kumar',
//       category: 'Payment Issue',
//       lastMessage: 'My payment failed twice.',
//       time: '2 min',
//       tier: 2,
//       priority: 'high',
//       mode: 'human',
//       unreadCount: 2,
//     },

//     {
//       id: '2',
//       clientName: 'Amit Sharma',
//       category: 'General Question',
//       lastMessage:
//         'What services do you provide?',
//       time: '5 min',
//       tier: 1,
//       priority: 'low',
//       mode: 'ai',
//       unreadCount: 0,
//     },

//     {
//       id: '3',
//       clientName: 'Priya Singh',
//       category: 'Account Issue',
//       lastMessage:
//         'I cannot access my account.',
//       time: '8 min',
//       tier: 2,
//       priority: 'urgent',
//       mode: 'human',
//       unreadCount: 4,
//     },

//     {
//       id: '4',
//       clientName: 'Vikas Gupta',
//       category: 'Refund Request',
//       lastMessage:
//         'I want to request a refund.',
//       time: '15 min',
//       tier: 3,
//       priority: 'high',
//       mode: 'ai',
//       unreadCount: 1,
//     },
//   ];

//   // --------------------------------------------------
//   // Temporary messages
//   // Later -> Redux + Socket.IO
//   // --------------------------------------------------

//   const [messages, setMessages] =
//     useState<TeamMessage[]>([
//       {
//         id: '1',
//         message:
//           'Hello, my payment failed twice.',
//         senderType: 'client',
//         time: '12:30 PM',
//       },

//       {
//         id: '2',
//         message:
//           'I am checking your issue.',
//         senderType: 'ai',
//         time: '12:30 PM',
//       },

//       {
//         id: '3',
//         message:
//           'Hi Rahul, I will help you with this payment issue.',
//         senderType: 'agent',
//         senderName: 'Dharmendra',
//         time: '12:31 PM',
//       },
//     ]);

//   // --------------------------------------------------
//   // Find selected conversation
//   // --------------------------------------------------

//   const selectedConversation = conversations.find(
//     conversation =>
//       conversation.id === selectedConversationId,
//   );

//   // --------------------------------------------------
//   // Filter conversations
//   // --------------------------------------------------

//   const filteredConversations = useMemo(() => {
//     switch (selectedFilter) {
//       case 'tier1':
//         return conversations.filter(
//           item => item.tier === 1,
//         );

//       case 'tier2':
//         return conversations.filter(
//           item => item.tier === 2,
//         );

//       case 'tier3':
//         return conversations.filter(
//           item => item.tier === 3,
//         );

//       case 'ai':
//         return conversations.filter(
//           item => item.mode === 'ai',
//         );

//       case 'human':
//         return conversations.filter(
//           item => item.mode === 'human',
//         );

//       case 'urgent':
//         return conversations.filter(
//           item => item.priority === 'urgent',
//         );

//       default:
//         return conversations;
//     }
//   }, [selectedFilter]);

//   // --------------------------------------------------
//   // Select conversation
//   // --------------------------------------------------

//   const handleConversationPress = (
//     id: string,
//   ) => {
//     setSelectedConversationId(id);

//     const conversation = conversations.find(
//       item => item.id === id,
//     );

//     if (conversation) {
//       setChatMode(conversation.mode);
//     }
//   };

//   // --------------------------------------------------
//   // Go back to conversation list
//   // --------------------------------------------------

//   const handleBack = () => {
//     setSelectedConversationId(null);
//   };

//   // --------------------------------------------------
//   // Send agent message
//   // --------------------------------------------------

//   const handleSendMessage = (
//     message: string,
//   ) => {
//     const newMessage: TeamMessage = {
//       id: Date.now().toString(),
//       message,
//       senderType: 'agent',
//       senderName: 'Dharmendra',
//       time: new Date().toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//       }),
//     };

//     setMessages(prev => [
//       ...prev,
//       newMessage,
//     ]);

//     // Later:
//     // socket.emit('send_message', {
//     //   conversationId: selectedConversationId,
//     //   message,
//     // });
//   };

//   // --------------------------------------------------
//   // Take over conversation
//   // --------------------------------------------------

//   const handleTakeOver = () => {
//     setChatMode('human');

//     // Later:
//     // RTK Query / Socket.IO
//     //
//     // socket.emit('take_over_conversation', {
//     //   conversationId: selectedConversationId,
//     // });
//   };

//   // --------------------------------------------------
//   // Return conversation to AI
//   // --------------------------------------------------

//   const handleReleaseToAI = () => {
//     setChatMode('ai');

//     // Later:
//     // RTK Query / Socket.IO
//     //
//     // socket.emit('release_to_ai', {
//     //   conversationId: selectedConversationId,
//     // });
//   };

//   // ==================================================
//   // CHAT VIEW
//   // ==================================================

//   if (selectedConversation) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <TeamChatHeader
//           clientName={
//             selectedConversation.clientName
//           }
//           category={
//             selectedConversation.category
//           }
//           tier={selectedConversation.tier}
//           priority={
//             selectedConversation.priority
//           }
//           mode={chatMode}
//           onBack={handleBack}
//           onTakeOver={handleTakeOver}
//           onReleaseToAI={
//             handleReleaseToAI
//           }
//         />

//         <View style={styles.chatContainer}>
//           <TeamMessageList
//             messages={messages}
//           />
//         </View>

//         <TeamMessageInput
//           onSend={handleSendMessage}
//           disabled={chatMode === 'ai'}
//           placeholder={
//             chatMode === 'ai'
//               ? 'AI is handling this conversation...'
//               : 'Reply to client...'
//           }
//         />
//       </SafeAreaView>
//     );
//   }

//   // ==================================================
//   // DASHBOARD VIEW
//   // ==================================================

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Dashboard Header */}

//       <View style={styles.dashboardHeader}>
//         <View>
//           <Text style={styles.title}>
//             Support Dashboard
//           </Text>

//           <Text style={styles.subtitle}>
//             Manage client conversations
//           </Text>
//         </View>

//         <AgentStatus
//           status="online"
//           agentName="Dharmendra"
//         />
//       </View>

//       {/* Quick Stats */}

//       <View style={styles.statsContainer}>
//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>
//             28
//           </Text>

//           <Text style={styles.statLabel}>
//             Total
//           </Text>
//         </View>

//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>
//             12
//           </Text>

//           <Text style={styles.statLabel}>
//             Waiting
//           </Text>
//         </View>

//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>
//             8
//           </Text>

//           <Text style={styles.statLabel}>
//             Human
//           </Text>
//         </View>

//         <View style={styles.statCard}>
//           <Text style={styles.statNumber}>
//             3
//           </Text>

//           <Text style={styles.statLabel}>
//             Urgent
//           </Text>
//         </View>
//       </View>

//       {/* Section Header */}

//       <View style={styles.conversationHeader}>
//         <Text style={styles.conversationTitle}>
//           Conversations
//         </Text>

//         <Text style={styles.conversationCount}>
//           {filteredConversations.length}
//         </Text>
//       </View>

//       {/* Filters */}

//       <ConversationFilter
//         selected={selectedFilter}
//         onChange={setSelectedFilter}
//       />

//       {/* Conversation List */}

//       <View style={styles.listContainer}>
//         <ConversationList
//           conversations={
//             filteredConversations
//           }
//           selectedConversationId={
//             selectedConversationId
//           }
//           onConversationPress={
//             handleConversationPress
//           }
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default TeamDashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F8F9FC',
//   },

//   dashboardHeader: {
//     minHeight: 72,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#FFFFFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#EEEEEE',
//   },

//   title: {
//     fontSize: 21,
//     fontWeight: '800',
//     color: '#222222',
//   },

//   subtitle: {
//     marginTop: 3,
//     fontSize: 12,
//     color: '#777777',
//   },

//   statsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     backgroundColor: '#FFFFFF',
//   },

//   statCard: {
//     flex: 1,
//     marginHorizontal: 3,
//     paddingVertical: 10,
//     alignItems: 'center',
//     borderRadius: 9,
//     backgroundColor: '#F7F7F9',
//   },

//   statNumber: {
//     fontSize: 19,
//     fontWeight: '800',
//     color: '#6366F1',
//   },

//   statLabel: {
//     marginTop: 2,
//     fontSize: 10,
//     color: '#777777',
//   },

//   conversationHeader: {
//     height: 52,
//     paddingHorizontal: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },

//   conversationTitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#222222',
//   },

//   conversationCount: {
//     marginLeft: 7,
//     minWidth: 20,
//     paddingHorizontal: 6,
//     paddingVertical: 3,
//     textAlign: 'center',
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: '#EEF2FF',
//     color: '#6366F1',
//     fontSize: 10,
//     fontWeight: '700',
//   },

//   listContainer: {
//     flex: 1,
//   },

//   chatContainer: {
//     flex: 1,
//   },
// });