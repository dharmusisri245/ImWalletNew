import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface ChatModeIndicatorProps {
  mode: 'ai' | 'human';
  agentName?: string;
}

const ChatModeIndicator: React.FC<
  ChatModeIndicatorProps
> = ({
  mode,
  agentName,
}) => {
  const isAI = mode === 'ai';

  return (
    <View
      style={[
        styles.container,
        isAI ? styles.aiContainer : styles.humanContainer,
      ]}
    >
      <Text style={styles.icon}>
        {isAI ? '🤖' : '👨‍💼'}
      </Text>

      <Text style={styles.text}>
        {isAI
          ? 'You are chatting with AI Assistant'
          : `${agentName || 'Support Agent'} has joined the chat`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  aiContainer: {
    backgroundColor: '#F5F5F5',
  },

  humanContainer: {
    backgroundColor: '#FFF7ED',
  },

  icon: {
    fontSize: 14,
    marginRight: 6,
  },

  text: {
    fontSize: 11,
    color: '#666',
  },
});

export default ChatModeIndicator;