import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

export interface StatItem {
  title: string;
  value: string | number;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

interface Props {
  data?: StatItem[];
}

const defaultData: StatItem[] = [
  {
    title: 'Registered',
    value: 142,
    icon: 'check',
    color: '#22C55E',
  },
  {
    title: 'KYC Pending',
    value: 9,
    icon: 'clock',
    color: '#F59E0B',
  },
  {
    title: 'Visits Today',
    value: 8,
    icon: 'map-pin',
    color: '#3B82F6',
  },
  {
    title: 'Rank (Zone)',
    value: '#3',
    icon: 'award',
    color: '#8B5CF6',
  },
];

const StatsCard = ({
  data = defaultData,
}: Props) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View
          key={index}
          style={styles.item}>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: `${item.color}20`,
              },
            ]}>
            <Feather
              name={item.icon}
              size={18}
              color={item.color}
            />
          </View>

          <Text
            numberOfLines={2}
            style={styles.title}>
            {item.title}
          </Text>

          <Text
            style={[
              styles.value,
              {
                color: item.color,
              },
            ]}>
            {item.value}
          </Text>

        </View>
      ))}
    </View>
  );
};

export default StatsCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,

    marginBottom: 20,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    textAlign: 'center',
    fontSize: 11,
    color: '#64748B',
    minHeight: 30,
    fontWeight: '500',
  },

  value: {
    marginTop: 3,
    fontSize: 18,
    fontWeight: '700',
  },
});


// import { View, Text } from 'react-native'
// import React from 'react'

// const StatsCard = () => {
//   return (
//     <View>
//       <Text>StatsCard</Text>
//     </View>
//   )
// }

// export default StatsCard