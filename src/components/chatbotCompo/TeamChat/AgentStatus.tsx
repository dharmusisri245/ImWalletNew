import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export type AgentStatusType =
  | 'online'
  | 'busy'
  | 'offline';

interface AgentStatusProps {
  status: AgentStatusType;
  agentName?: string;
}

const AgentStatus: React.FC<
  AgentStatusProps
> = ({
  status,
  agentName = 'Support Agent',
}) => {
  const getStatus = () => {
    switch (status) {
      case 'online':
        return {
          label: 'Online',
          color: '#16A34A',
        };

      case 'busy':
        return {
          label: 'Busy',
          color: '#EA580C',
        };

      case 'offline':
      default:
        return {
          label: 'Offline',
          color: '#999999',
        };
    }
  };

  const currentStatus = getStatus();

  return (
    <View style={styles.container}>

      <View
        style={[
          styles.dot,
          {
            backgroundColor:
              currentStatus.color,
          },
        ]}
      />

      <View>
        <Text style={styles.name}>
          {agentName}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color:
                currentStatus.color,
            },
          ]}>
          {currentStatus.label}
        </Text>
      </View>

    </View>
  );
};

export default AgentStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
  },

  name: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333333',
  },

  status: {
    marginTop: 1,
    fontSize: 10,
    fontWeight: '500',
  },
});