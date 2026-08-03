import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface LeadStatusCardProps {
  interested: number;
  followUp: number;
  decisionPending: number;
  notInterested: number;
  shopClosed: number;
}

const LeadStatusCard: React.FC<LeadStatusCardProps> = ({
  interested,
  followUp,
  decisionPending,
  notInterested,
  shopClosed,
}) => {

  const StatusRow = ({
    icon,
    color,
    title,
    value,
  }: {
    icon: string;
    color: string;
    title: string;
    value: number;
  }) => (
    <View style={styles.row}>

      <View style={styles.left}>

        <Ionicons
          name={icon as any}
          size={18}
          color={color}
        />

        <Text style={styles.title}>
          {title}
        </Text>

      </View>

      <View
        style={[
          styles.countContainer,
          {
            backgroundColor: `${color}20`,
          },
        ]}>

        <Text
          style={[
            styles.count,
            {
              color,
            },
          ]}>
          {value}
        </Text>

      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Ionicons
          name="pie-chart-outline"
          size={22}
          color="#0936B0"
        />

        <Text style={styles.headerTitle}>
          Lead Status
        </Text>

      </View>

      <StatusRow
        icon="checkmark-circle"
        color="#10B981"
        title="Interested"
        value={interested}
      />

      <StatusRow
        icon="calendar-outline"
        color="#F59E0B"
        title="Follow-up"
        value={followUp}
      />

      <StatusRow
        icon="time-outline"
        color="#3B82F6"
        title="Decision Pending"
        value={decisionPending}
      />

      <StatusRow
        icon="close-circle"
        color="#EF4444"
        title="Not Interested"
        value={notInterested}
      />

      <StatusRow
        icon="lock-closed"
        color="#6B7280"
        title="Shop Closed"
        value={shopClosed}
      />

    </View>
  );
};

export default React.memo(LeadStatusCard);

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,

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
    alignItems: 'center',
    marginBottom: 18,
  },

  headerTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 12,

    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    marginLeft: 10,
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },

  countContainer: {
    minWidth: 42,
    height: 30,

    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 12,
  },

  count: {
    fontSize: 15,
    fontWeight: '700',
  },

});