import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface TargetCardProps {
  target: number;
  completed: number;
}

const TargetCard: React.FC<TargetCardProps> = ({
  target,
  completed,
}) => {

  const remaining = Math.max(target - completed, 0);

  const progress =
    target > 0 ? completed / target : 0;

  const percentage = Math.round(progress * 100);

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.titleRow}>
          <Ionicons
            name="flag-outline"
            size={22}
            color="#0936B0"
          />

          <Text style={styles.title}>
            Today's Target
          </Text>
        </View>

        <Text style={styles.percent}>
          {percentage}%
        </Text>

      </View>

      <View style={styles.progressBackground}>

        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />

      </View>

      <View style={styles.statsRow}>

        <View style={styles.statItem}>
          <Text style={styles.value}>
            {target}
          </Text>

          <Text style={styles.label}>
            Target
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text
            style={[
              styles.value,
              {
                color: '#10B981',
              },
            ]}>
            {completed}
          </Text>

          <Text style={styles.label}>
            Completed
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text
            style={[
              styles.value,
              {
                color: '#F59E0B',
              },
            ]}>
            {remaining}
          </Text>

          <Text style={styles.label}>
            Remaining
          </Text>
        </View>

      </View>

    </View>
  );
};

export default React.memo(TargetCard);

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 18,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    marginLeft: 10,

    fontSize: 18,
    fontWeight: '700',

    color: '#111827',
  },

  percent: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0936B0',
  },

  progressBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#0936B0',
  },

  statsRow: {
    marginTop: 22,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  divider: {
    width: 1,
    height: 45,
    backgroundColor: '#E5E7EB',
  },

  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  label: {
    marginTop: 4,

    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

});