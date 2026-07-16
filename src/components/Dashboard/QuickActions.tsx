import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

export interface QuickAction {
  id: number;
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
  color: string;
}

interface Props {
  actions?: QuickAction[];
  onPress?: (item: QuickAction) => void;
}

const defaultActions: QuickAction[] = [
  {
    id: 1,
    title: 'Check In',
    subtitle: 'Mark attendance',
    icon: 'log-in',
    color: '#16A34A',
  },
  {
    id: 2,
    title: 'Start Visit',
    subtitle: 'Begin customer visit',
    icon: 'map-pin',
    color: '#2563EB',
  },
  {
    id: 3,
    title: 'Scan QR',
    subtitle: 'Verify shop',
    icon: 'camera',
    color: '#F59E0B',
  },
  {
    id: 4,
    title: 'Apply Leave',
    subtitle: 'Create leave request',
    icon: 'calendar',
    color: '#EF4444',
  },
  {
    id: 5,
    title: 'Daily Report',
    subtitle: 'Submit today',
    icon: 'file-text',
    color: '#7C3AED',
  },
];

const QuickActions = ({
  actions = defaultActions,
  onPress,
}: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Quick Actions
      </Text>

      {actions.map(item => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          style={styles.item}
          onPress={() => onPress?.(item)}>

          <View
            style={[
              styles.icon,
              {
                backgroundColor: `${item.color}20`,
              },
            ]}>
            <Feather
              name={item.icon}
              size={22}
              color={item.color}
            />
            {/* <Text>⭐</Text> */}
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.subtitle}>
              {item.subtitle}
            </Text>
          </View>

          <Feather
            name="chevron-right"
            size={18}
            color="#CBD5E1"
          />

          {/* <Text>{'>'}</Text> */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuickActions;

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
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

  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F8FAFC',

    borderRadius: 16,

    padding: 14,

    marginBottom: 12,
  },

  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 2,
    fontSize: 12,
    color: '#64748B',
  },

});



// import { View, Text } from 'react-native'
// import React from 'react'

// const QuickActions = () => {
//   return (
//     <View>
//       <Text>QuickActions</Text>
//     </View>
//   )
// }

// export default QuickActions