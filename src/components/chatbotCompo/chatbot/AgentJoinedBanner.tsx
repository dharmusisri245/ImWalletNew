import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface AgentJoinedBannerProps {
  visible: boolean;
  agentName?: string;
}

const AgentJoinedBanner: React.FC<
  AgentJoinedBannerProps
> = ({
  visible,
  agentName = 'Support Agent',
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <Text style={styles.text}>
        {agentName} joined the conversation
      </Text>

      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },

  text: {
    marginHorizontal: 10,
    fontSize: 11,
    color: '#999',
  },
});

export default AgentJoinedBanner;