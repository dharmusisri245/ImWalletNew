import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type TeamSenderType =
  | 'client'
  | 'ai'
  | 'agent';

export interface TeamMessage {
  id: string;
  message: string;
  senderType: TeamSenderType;
  senderName?: string;
  time?: string;
}

interface TeamMessageListProps {
  messages: TeamMessage[];
}

const TeamMessageList: React.FC<
  TeamMessageListProps
> = ({
  messages,
}) => {
  return (
    <FlatList
      data={messages}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        const isClient =
          item.senderType === 'client';

        const isAI =
          item.senderType === 'ai';

        return (
          <View
            style={[
              styles.messageContainer,
              isClient
                ? styles.clientContainer
                : styles.otherContainer,
            ]}>

            {!isClient && (
              <Text style={styles.senderName}>
                {isAI
                  ? 'AI Assistant'
                  : item.senderName ||
                    'Support Agent'}
              </Text>
            )}

            <View
              style={[
                styles.bubble,
                isClient
                  ? styles.clientBubble
                  : isAI
                  ? styles.aiBubble
                  : styles.agentBubble,
              ]}>
              <Text
                style={[
                  styles.message,
                  isClient &&
                    styles.clientMessage,
                ]}>
                {item.message}
              </Text>
            </View>

            {item.time && (
              <Text style={styles.time}>
                {item.time}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default TeamMessageList;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    paddingBottom: 20,
  },

  messageContainer: {
    maxWidth: '80%',
    marginBottom: 12,
  },

  clientContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },

  otherContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },

  senderName: {
    marginBottom: 4,
    fontSize: 11,
    fontWeight: '600',
    color: '#777777',
  },

  bubble: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 15,
  },

  clientBubble: {
    backgroundColor: '#6366F1',
    borderBottomRightRadius: 4,
  },

  aiBubble: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },

  agentBubble: {
    backgroundColor: '#DCFCE7',
    borderBottomLeftRadius: 4,
  },

  message: {
    fontSize: 14,
    lineHeight: 20,
    color: '#222222',
  },

  clientMessage: {
    color: '#FFFFFF',
  },

  time: {
    marginTop: 3,
    fontSize: 9,
    color: '#999999',
  },
});