import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';
// import { useNavigation } from '@react-navigation/native';

interface NotificationCardProps {
  title?: string;
  message?: string;
  date?: string;
}

const NotificationCard = ({
  title = 'Company Announcement',
  message = 'Attendance must be marked before 09:30 AM. Late check-ins will be recorded automatically.',
  date = 'Today',
}: NotificationCardProps) => {
  // const navigation = useNavigation<any>();
// const navigation = null as any;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      // onPress={() => navigation.navigate('Notifications')}
      // onPress={() => console.log('Pressed')}
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Feather
            name="bell"
            size={20}
            color="#2563EB"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            <Text style={styles.date}>{date}</Text>
          </View>

          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  date: {
    fontSize: 12,
    color: '#6B7280',
  },

  message: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});





// import { View, Text } from 'react-native'
// import React from 'react'

// const NotificationCard = () => {
//   return (
//     <View>
//       <Text>NotificationCard</Text>
//     </View>
//   )
// }

// export default NotificationCard