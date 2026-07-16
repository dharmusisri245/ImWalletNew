import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

export interface NotificationItemProps {
  title: string;
  message: string;
  date: string;
  isRead?: boolean;
  onPress?: () => void;
}

const NotificationItem = ({
  title,
  message,
  date,
  isRead = false,
  onPress,
}: NotificationItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        !isRead && styles.unreadContainer,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          !isRead && styles.unreadIcon,
        ]}
      >
        <Feather
          name="bell"
          size={22}
          color="#2563EB"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </Text>

          <Text style={styles.date}>
            {date}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={styles.message}
        >
          {message}
        </Text>
      </View>

      {!isRead && (
        <View style={styles.badge} />
      )}
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  unreadContainer: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  unreadIcon: {
    backgroundColor: '#DCEBFF',
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginRight: 8,
  },

  date: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  message: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 20,
  },

  badge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    marginLeft: 10,
  },
});