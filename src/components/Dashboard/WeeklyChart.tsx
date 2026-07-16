import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

import Svg, {
  Polyline,
  Circle,
  Line,
} from 'react-native-svg';

interface WeeklyPoint {
  day: string;
  value: number;
}

interface Props {
  title?: string;
  total?: number;
  growth?: number;
  average?: number;
  bestDay?: string;
  bestValue?: number;
  data?: WeeklyPoint[];
}

const defaultData: WeeklyPoint[] = [
  { day: 'Mon', value: 4 },
  { day: 'Tue', value: 6 },
  { day: 'Wed', value: 9 },
  { day: 'Thu', value: 5 },
  { day: 'Fri', value: 7 },
  { day: 'Sat', value: 3 },
  { day: 'Sun', value: 5 },
];

const CHART_WIDTH = 280;
const CHART_HEIGHT = 120;
const MAX_VALUE = 10;

const WeeklyChart = ({
  title = 'Weekly Performance',
  total = 39,
  growth = 12.4,
  average = 5.6,
  bestDay = 'Wed',
  bestValue = 9,
  data = defaultData,
}: Props) => {

  const points = data
    .map((item, index) => {
      const x = (index * (CHART_WIDTH - 20)) / (data.length - 1) + 10;

      const y =
        CHART_HEIGHT -
        (item.value / MAX_VALUE) * (CHART_HEIGHT - 20);

      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.card}>

      {/* Header */}

      <View style={styles.header}>

        <Text style={styles.heading}>
          {title}
        </Text>

        <View style={styles.weekBox}>
          <Text style={styles.weekText}>
            This Week
          </Text>

          <Feather
            name="chevron-down"
            size={14}
            color="#64748B"
          />
        </View>

      </View>

      {/* Summary */}

      <View style={styles.summary}>

        <View>
          <Text style={styles.label}>
            Registrations
          </Text>

          <Text style={styles.total}>
            {total}
          </Text>
        </View>

        <View style={styles.growthBox}>

          <Feather
            name="trending-up"
            size={14}
            color="#16A34A"
          />

          <Text style={styles.growth}>
            {growth}%
          </Text>

        </View>

      </View>

      {/* Chart */}

      <Svg
        width="100%"
        height={150}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>

        {[20, 40, 60, 80, 100].map((line, index) => (
          <Line
            key={index}
            x1="0"
            y1={line}
            x2={CHART_WIDTH}
            y2={line}
            stroke="#EEF2F7"
            strokeWidth="1"
          />
        ))}

        <Polyline
          points={points}
          stroke="#2563EB"
          strokeWidth={3}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {data.map((item, index) => {

          const x =
            (index * (CHART_WIDTH - 20)) /
              (data.length - 1) +
            10;

          const y =
            CHART_HEIGHT -
            (item.value / MAX_VALUE) *
              (CHART_HEIGHT - 20);

          return (
            <Circle
              key={index}
              cx={x}
              cy={y}
              r={4.5}
              fill="#2563EB"
              stroke="#FFF"
              strokeWidth={2}
            />
          );
        })}
      </Svg>

      {/* Days */}

      <View style={styles.days}>

        {data.map(item => (
          <Text
            key={item.day}
            style={styles.day}>
            {item.day}
          </Text>
        ))}

      </View>

      {/* Footer */}

      <View style={styles.footer}>

        <View style={styles.infoCard}>

          <Text style={styles.infoLabel}>
            Avg / Day
          </Text>

          <Text style={styles.infoValue}>
            {average}
          </Text>

        </View>

        <View style={styles.infoCard}>

          <Text style={styles.infoLabel}>
            Best Day
          </Text>

          <Text
            style={[
              styles.infoValue,
              {
                color: '#16A34A',
              },
            ]}>
            {bestDay} • {bestValue}
          </Text>

        </View>

      </View>

    </View>
  );
};

export default WeeklyChart;

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 22,

    padding: 18,

    marginBottom: 20,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  heading: {
    fontSize: 17,

    fontWeight: '700',

    color: '#111827',
  },

  weekBox: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  weekText: {
    fontSize: 12,

    color: '#64748B',

    marginRight: 3,
  },

  summary: {
    marginTop: 16,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  label: {
    fontSize: 12,

    color: '#64748B',
  },

  total: {
    marginTop: 2,

    fontSize: 28,

    fontWeight: '700',

    color: '#111827',
  },

  growthBox: {
    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#EAF8EE',

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 20,
  },

  growth: {
    marginLeft: 4,

    color: '#16A34A',

    fontWeight: '700',

    fontSize: 12,
  },

  days: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginTop: 8,
  },

  day: {
    flex: 1,

    textAlign: 'center',

    color: '#64748B',

    fontSize: 11,
  },

  footer: {
    flexDirection: 'row',

    marginTop: 18,

    justifyContent: 'space-between',
  },

  infoCard: {
    flex: 1,

    backgroundColor: '#F8FAFC',

    borderRadius: 14,

    paddingVertical: 12,

    marginHorizontal: 5,

    alignItems: 'center',
  },

  infoLabel: {
    color: '#64748B',

    fontSize: 11,
  },

  infoValue: {
    marginTop: 4,

    fontSize: 16,

    fontWeight: '700',

    color: '#111827',
  },

});