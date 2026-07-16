import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  achieved?: number;
  target?: number;
}

export default function MonthlyChart({
  achieved = 142,
  target = 200,
}: Props) {
  const percent =
    target > 0
      ? Math.min(100, Math.round((achieved / target) * 100))
      : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Monthly Target
        </Text>

        <Text style={styles.percent}>
          {percent}%
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percent}%`,
            },
          ]}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.box}>
          <Text style={styles.label}>
            Achieved
          </Text>

          <Text style={styles.value}>
            {achieved}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
            Target
          </Text>

          <Text style={styles.value}>
            {target}
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.label}>
            Remaining
          </Text>

          <Text style={styles.value}>
            {Math.max(target - achieved, 0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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

    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  percent: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
  },

  progressBackground: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 20,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  box: {
    flex: 1,
    alignItems: 'center',
  },

  label: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },

  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
});



// import { View, Text } from 'react-native'
// import React from 'react'

// const MonthlyChart = () => {
//   return (
//     <View>
//       <Text>MonthlyChart</Text>
//     </View>
//   )
// }

// export default MonthlyChart