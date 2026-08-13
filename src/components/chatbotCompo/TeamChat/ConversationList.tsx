import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ConversationCard, {
  ConversationMode,
  ConversationPriority,
} from './ConversationCard';

import {QuestionTier} from './QuestionTierBadge';

export interface TeamConversation {
  id: string;
  clientName: string;
  category: string;
  lastMessage: string;
  time: string;
  tier: QuestionTier;
  priority: ConversationPriority;
  mode: ConversationMode;
  unreadCount?: number;
}

interface ConversationListProps {
  conversations: TeamConversation[];
  selectedConversationId?: string | null;
  onConversationPress: (id: string) => void;
}

const ConversationList: React.FC<
  ConversationListProps
> = ({
  conversations,
  selectedConversationId,
  onConversationPress,
}) => {
  if (conversations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>
          💬
        </Text>

        <Text style={styles.emptyTitle}>
          No conversations
        </Text>

        <Text style={styles.emptyText}>
          There are no conversations to display.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={conversations}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ConversationCard
          {...item}
          selected={
            selectedConversationId === item.id
          }
          onPress={onConversationPress}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ConversationList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 35,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
  },

  emptyText: {
    marginTop: 5,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
});