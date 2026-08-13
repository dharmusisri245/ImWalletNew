import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import QuestionTierBadge, {
  QuestionTier,
} from './QuestionTierBadge';

export type ConversationPriority =
  | 'low'
  | 'medium'
  | 'high'
  | 'urgent';

export type ConversationMode =
  | 'ai'
  | 'human';

interface ConversationCardProps {
  id: string;
  clientName: string;
  category: string;
  lastMessage: string;
  time: string;
  tier: QuestionTier;
  priority: ConversationPriority;
  mode: ConversationMode;
  unreadCount?: number;
  selected?: boolean;
  onPress: (id: string) => void;
}

const ConversationCard: React.FC<
  ConversationCardProps
> = ({
  id,
  clientName,
  category,
  lastMessage,
  time,
  tier,
  priority,
  mode,
  unreadCount = 0,
  selected = false,
  onPress,
}) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'urgent':
        return '#DC2626';

      case 'high':
        return '#EA580C';

      case 'medium':
        return '#D97706';

      case 'low':
      default:
        return '#16A34A';
    }
  };

  return (
    <Pressable
      onPress={() => onPress(id)}
      style={[
        styles.container,
        selected && styles.selectedContainer,
      ]}>

      <View style={styles.topRow}>
        <View style={styles.clientInfo}>
          <Text
            style={styles.clientName}
            numberOfLines={1}>
            {clientName}
          </Text>

          <Text
            style={styles.category}
            numberOfLines={1}>
            {category}
          </Text>
        </View>

        <Text style={styles.time}>
          {time}
        </Text>
      </View>

      <Text
        style={styles.lastMessage}
        numberOfLines={2}>
        {lastMessage}
      </Text>

      <View style={styles.bottomRow}>
        <QuestionTierBadge tier={tier} />

        <View style={styles.rightInfo}>
          <View style={styles.modeContainer}>
            <View
              style={[
                styles.modeDot,
                {
                  backgroundColor:
                    mode === 'ai'
                      ? '#6366F1'
                      : '#16A34A',
                },
              ]}
            />

            <Text style={styles.modeText}>
              {mode === 'ai' ? 'AI' : 'Human'}
            </Text>
          </View>

          <View style={styles.priorityContainer}>
            <View
              style={[
                styles.priorityDot,
                {
                  backgroundColor:
                    getPriorityColor(),
                },
              ]}
            />

            <Text style={styles.priorityText}>
              {priority.toUpperCase()}
            </Text>
          </View>

          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {unreadCount > 99 ? '99+' : unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ConversationCard;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  selectedContainer: {
    backgroundColor: '#F5F7FF',
    borderLeftWidth: 3,
    borderLeftColor: '#6366F1',
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  clientInfo: {
    flex: 1,
    marginRight: 10,
  },

  clientName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222222',
  },

  category: {
    marginTop: 3,
    fontSize: 12,
    color: '#777777',
  },

  time: {
    fontSize: 10,
    color: '#999999',
  },

  lastMessage: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: 18,
    color: '#555555',
  },

  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 9,
  },

  modeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },

  modeText: {
    fontSize: 10,
    color: '#666666',
    fontWeight: '600',
  },

  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 9,
  },

  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },

  priorityText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#777777',
  },

  unreadBadge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  unreadText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});