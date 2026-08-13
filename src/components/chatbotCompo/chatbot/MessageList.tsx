import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MessageBubble, {
  SenderType,
} from './MessageBubble';

export interface ChatMessage {
  id: string;
  message: string;
  senderType: SenderType;
  senderName?: string;
  time?: string;
}

interface MessageListProps {
  messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
}) => {
  if (messages.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>
          Hello 👋
        </Text>

        <Text style={styles.emptyText}>
          How can we help you today?
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <MessageBubble
          message={item.message}
          senderType={item.senderType}
          senderName={item.senderName}
          time={item.time}
        />
      )}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default MessageList;