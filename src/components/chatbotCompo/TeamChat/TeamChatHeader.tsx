import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

type ChatMode = 'ai' | 'human';

type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface TeamChatHeaderProps {
  clientName: string;
  category?: string;
  tier?: number;
  priority?: Priority;
  mode: ChatMode;

  onBack: () => void;
  onTakeOver?: () => void;
  onReleaseToAI?: () => void;
}

const TeamChatHeader = ({
  clientName,
  category,
  tier,
  priority = 'low',
  mode,
  onBack,
  onTakeOver,
  onReleaseToAI,
}: TeamChatHeaderProps) => {
  return (
    <View style={styles.container}>

      {/* Back Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onBack}
        style={styles.backButton}>
        <Feather
          name="arrow-left"
          size={22}
          color="#111827"
        />
      </TouchableOpacity>

      {/* Client Information */}
      <View style={styles.infoContainer}>
        <Text
          numberOfLines={1}
          style={styles.clientName}>
          {clientName}
        </Text>

        <View style={styles.detailsRow}>

          {category && (
            <Text
              numberOfLines={1}
              style={styles.category}>
              {category}
            </Text>
          )}

          {tier !== undefined && (
            <>
              <View style={styles.dot} />

              <Text style={styles.tier}>
                Tier {tier}
              </Text>
            </>
          )}

          {priority && (
            <>
              <View style={styles.dot} />

              <Text
                style={[
                  styles.priority,
                  priority === 'urgent' && styles.urgent,
                  priority === 'high' && styles.high,
                  priority === 'medium' && styles.medium,
                  priority === 'low' && styles.low,
                ]}>
                {priority.toUpperCase()}
              </Text>
            </>
          )}

        </View>
      </View>

      {/* AI / Human Action */}
      {mode === 'ai' ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onTakeOver}
          style={styles.takeOverButton}>

          <Feather
            name="user"
            size={15}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Take Over
          </Text>

        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onReleaseToAI}
          style={styles.returnAIButton}>

          <Feather
            name="cpu"
            size={15}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Return AI
          </Text>

        </TouchableOpacity>
      )}

    </View>
  );
};

export default TeamChatHeader;

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
    paddingHorizontal: 12,
    paddingVertical: 10,

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

  infoContainer: {
    flex: 1,
    minWidth: 0,
  },

  clientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 5,
  },

  category: {
    flexShrink: 1,

    fontSize: 11,
    color: '#64748B',
  },

  tier: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },

  dot: {
    width: 3,
    height: 3,

    borderRadius: 2,

    backgroundColor: '#94A3B8',

    marginHorizontal: 6,
  },

  priority: {
    fontSize: 10,
    fontWeight: '800',
  },

  urgent: {
    color: '#DC2626',
  },

  high: {
    color: '#EA580C',
  },

  medium: {
    color: '#D97706',
  },

  low: {
    color: '#16A34A',
  },

  takeOverButton: {
    minHeight: 36,

    paddingHorizontal: 10,

    borderRadius: 8,

    backgroundColor: '#2563EB',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },

  returnAIButton: {
    minHeight: 36,

    paddingHorizontal: 10,

    borderRadius: 8,

    backgroundColor: '#16A34A',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 8,
  },

  buttonText: {
    marginLeft: 5,

    color: '#FFFFFF',

    fontSize: 11,
    fontWeight: '700',
  },
});