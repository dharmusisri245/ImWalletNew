import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface FollowUpCardProps {
  shopName: string;
  ownerName: string;
  followUpDate: string;
  followUpTime: string;
  reason: string;
  priority?: 'High' | 'Medium' | 'Low';
  onPress?: () => void;
}

const FollowUpCard: React.FC<FollowUpCardProps> = ({
  shopName,
  ownerName,
  followUpDate,
  followUpTime,
  reason,
  priority = 'Medium',
  onPress,
}) => {

  const getPriorityColor = () => {
    switch (priority) {
      case 'High':
        return '#EF4444';

      case 'Medium':
        return '#F59E0B';

      case 'Low':
        return '#10B981';

      default:
        return '#6B7280';
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}>

      <View style={styles.header}>

        <View style={styles.shopSection}>

          <View style={styles.iconContainer}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#0936B0"
            />
          </View>

          <View style={styles.shopInfo}>

            <Text
              numberOfLines={1}
              style={styles.shopName}>
              {shopName}
            </Text>

            <Text style={styles.ownerName}>
              {ownerName}
            </Text>

          </View>

        </View>

        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor: `${getPriorityColor()}20`,
            },
          ]}>

          <Text
            style={[
              styles.priorityText,
              {
                color: getPriorityColor(),
              },
            ]}>
            {priority}
          </Text>

        </View>

      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>

        <Ionicons
          name="calendar"
          size={18}
          color="#6B7280"
        />

        <Text style={styles.infoText}>
          {followUpDate}
        </Text>

      </View>

      <View style={styles.infoRow}>

        <Ionicons
          name="time-outline"
          size={18}
          color="#6B7280"
        />

        <Text style={styles.infoText}>
          {followUpTime}
        </Text>

      </View>

      <View style={styles.infoRow}>

        <Ionicons
          name="document-text-outline"
          size={18}
          color="#6B7280"
        />

        <Text
          numberOfLines={2}
          style={styles.infoText}>
          {reason}
        </Text>

      </View>

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          Tap to View Details
        </Text>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#0936B0"
        />

      </View>

    </TouchableOpacity>
  );
};

export default React.memo(FollowUpCard);

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 18,

    marginBottom: 16,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  header: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  shopSection: {

    flexDirection: 'row',

    alignItems: 'center',

    flex: 1,
  },

  iconContainer: {

    width: 52,

    height: 52,

    borderRadius: 26,

    backgroundColor: '#EEF4FF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  shopInfo: {
    flex: 1,
  },

  shopName: {

    fontSize: 17,

    fontWeight: '700',

    color: '#111827',
  },

  ownerName: {

    marginTop: 4,

    fontSize: 13,

    color: '#6B7280',
  },

  priorityBadge: {

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 16,
  },

  priorityText: {

    fontSize: 12,

    fontWeight: '700',
  },

  divider: {

    marginVertical: 16,

    height: 1,

    backgroundColor: '#E5E7EB',
  },

  infoRow: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 12,
  },

  infoText: {

    flex: 1,

    marginLeft: 10,

    fontSize: 14,

    color: '#4B5563',
  },

  footer: {

    marginTop: 8,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  footerText: {

    fontSize: 14,

    fontWeight: '600',

    color: '#0936B0',
  },

});