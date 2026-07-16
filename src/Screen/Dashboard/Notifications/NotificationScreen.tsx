import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Feather from '@react-native-vector-icons/feather';

import NotificationItem, {
  NotificationItemProps,
} from '../../../components/Dashboard/notifications/NotificationItem';

type Props = NativeStackScreenProps<any>;

const notifications: NotificationItemProps[] = [
  {
    title: 'Attendance Reminder',
    message: 'Please check in before 09:30 AM. Late check-ins will be recorded automatically.',
    date: 'Today • 09:00 AM',
    isRead: false,
  },
  {
    title: 'Leave Approved',
    message: 'Your leave request for 15 July has been approved.',
    date: 'Yesterday • 05:30 PM',
    isRead: true,
  },
  {
    title: 'Salary Credited',
    message: 'Your salary for July has been credited successfully.',
    date: '08 Jul • 10:15 AM',
    isRead: true,
  },
  {
    title: 'Target Updated',
    message: 'Your monthly visit target has been updated to 150 shops.',
    date: '05 Jul • 03:40 PM',
    isRead: true,
  },
  {
    title: 'Meeting Reminder',
    message: 'Sales meeting starts today at 11:00 AM.',
    date: '03 Jul • 09:15 AM',
    isRead: true,
  },
];

const NotificationScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={24}
          color="#111827"
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.headerTitle}>
          Notifications
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <NotificationItem
            {...item}
            onPress={() => {
              console.log(item.title);
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Feather
              name="bell-off"
              size={60}
              color="#9CA3AF"
            />

            <Text style={styles.emptyTitle}>
              No Notifications
            </Text>

            <Text style={styles.emptyMessage}>
              You're all caught up.
            </Text>
          </View>
        }
      />

    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 2,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  emptyContainer: {
    marginTop: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  emptyMessage: {
    marginTop: 8,
    fontSize: 15,
    color: '#6B7280',
  },
});