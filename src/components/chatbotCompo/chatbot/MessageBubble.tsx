import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type SenderType = 'client' | 'ai' | 'agent';

interface MessageBubbleProps {
  message: string;
  senderType: SenderType;
  senderName?: string;
  time?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  senderType,
  senderName,
  time,
}) => {
  const isClient = senderType === 'client';

  const getSenderLabel = () => {
    if (senderType === 'ai') {
      return 'AI Assistant';
    }

    if (senderType === 'agent') {
      return senderName || 'Support Agent';
    }

    return 'You';
  };

  return (
    <View
      style={[
        styles.container,
        isClient ? styles.clientContainer : styles.otherContainer,
      ]}
    >
      {!isClient && (
        <Text style={styles.senderName}>
          {getSenderLabel()}
        </Text>
      )}

      <View
        style={[
          styles.bubble,
          isClient ? styles.clientBubble : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.message,
            isClient ? styles.clientMessage : styles.otherMessage,
          ]}
        >
          {message}
        </Text>
      </View>

      {time && (
        <Text
          style={[
            styles.time,
            isClient ? styles.clientTime : styles.otherTime,
          ]}
        >
          {time}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 6,
    maxWidth: '82%',
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
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    color: '#666',
  },

  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },

  clientBubble: {
    borderBottomRightRadius: 4,
    backgroundColor: '#7A1F2B',
  },

  otherBubble: {
    borderBottomLeftRadius: 4,
    backgroundColor: '#F1F1F1',
  },

  message: {
    fontSize: 15,
    lineHeight: 21,
  },

  clientMessage: {
    color: '#FFFFFF',
  },

  otherMessage: {
    color: '#222222',
  },

  time: {
    fontSize: 10,
    marginTop: 3,
    color: '#999',
  },

  clientTime: {
    marginRight: 3,
  },

  otherTime: {
    marginLeft: 3,
  },
});

export default MessageBubble;