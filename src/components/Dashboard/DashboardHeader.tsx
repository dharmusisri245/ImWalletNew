import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';

interface DashboardHeaderProps {
  name?: string;
  employeeId?: string;
  designation?: string;
  avatar?: string;
  notificationCount?: number;
}

const DashboardHeader = ({
  name = 'Dharmendra Gupta',
  employeeId = 'EMP-4521',
  designation = 'Field Sales Executive',
  avatar = 'https://i.pravatar.cc/150?img=12',
  notificationCount = 5,
}: DashboardHeaderProps) => {
  let navigation: any = null;

  // Prevent crash while testing component directly from App.tsx
  try {
    navigation = useNavigation();
  } catch (e) {
    navigation = null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: avatar }}
          defaultSource={require('../../assets/images/logo.png')} // change/remove if not available
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.greeting}>
            Good Morning 👋
          </Text>

          <Text
            numberOfLines={1}
            style={styles.name}>
            {name}
          </Text>

          <View style={styles.bottomRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {designation}
              </Text>
            </View>

            <Text style={styles.employeeId}>
              {employeeId}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.notificationButton}
        onPress={() => {
          navigation?.navigate?.('Notifications');
        }}>
        <Feather
          name="bell"
          size={22}
          color="#334155"
        />

        {notificationCount > 0 && (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  leftContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E7EB',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  greeting: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  badge: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
  },

  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
  },

  employeeId: {
    marginLeft: 10,
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  notificationText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

