import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';
import RingProgress from '../common/RingProgress';

interface Props {
  achieved?: number;
  target?: number;
  monthlyAchieved?: number;
  monthlyTarget?: number;
}

const TargetCard = ({
  achieved = 6,
  target = 10,
  monthlyAchieved = 142,
  monthlyTarget = 200,
}: Props) => {
  const percent = Math.min(
    100,
    Math.round((achieved / target) * 100),
  );

  const monthlyPercent = Math.min(
    100,
    Math.round(
      (monthlyAchieved / monthlyTarget) * 100,
    ),
  );

  return (
    <View style={styles.card}>
      <RingProgress
        percent={60}
        size={80}
        stroke={8}
        color="#22C55E"
        backgroundColor="#E5E7EB"
      />
      {/* <View
        style={{
          width: 76,
          height: 76,
          borderRadius: 38,
          backgroundColor: 'red',
        }}
      /> */}

      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.title}>
            Today's Target
          </Text>

          <Feather
            name="chevron-right"
            size={18}
            color="#94A3B8"
          />
        </View>

        <Text style={styles.value}>
          {achieved}
          <Text style={styles.target}>
            {' '} / {target} Shops
          </Text>
        </Text>

        <View style={styles.progress}>
          <View
            style={[
              styles.fill,
              {
                width: `${percent}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.footer}>
          Monthly : {monthlyAchieved}/{monthlyTarget}
          {'  '}
          ({monthlyPercent}%)
        </Text>

      </View>
    </View>
  );
};

export default TargetCard;

const styles = StyleSheet.create({

  card: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFF',

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 14,

    marginBottom: 18,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  content: {
    flex: 1,
    marginLeft: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },

  value: {
    marginTop: 2,
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  target: {
    fontSize: 15,
    color: '#64748B',
    fontWeight: '500',
  },

  progress: {
    marginTop: 10,
    height: 7,
    backgroundColor: '#EDF2F7',
    borderRadius: 20,
    overflow: 'hidden',
  },

  fill: {
    height: 7,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
  },

  footer: {
    marginTop: 8,
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
});