// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// import Feather from '@react-native-vector-icons/feather';
// // import { useNavigation } from '@react-navigation/native';

// interface NotificationCardProps {
//   title?: string;
//   message?: string;
//   date?: string;
// }

// const NotificationCard = ({
//   title = 'Company Announcement',
//   message = 'Attendance must be marked before 09:30 AM. Late check-ins will be recorded automatically.',
//   date = 'Today',
// }: NotificationCardProps) => {

//   return (
//     <TouchableOpacity
//       activeOpacity={0.8}
//       // onPress={() => navigation.navigate('Notifications')}
//       // onPress={() => console.log('Pressed')}
//     >
//       <View style={styles.container}>
//         <View style={styles.iconContainer}>
//           <Feather
//             name="bell"
//             size={20}
//             color="#2563EB"
//           />
//         </View>

//         <View style={styles.content}>
//           <View style={styles.header}>
//             <Text style={styles.title}>{title}</Text>

//             <Text style={styles.date}>{date}</Text>
//           </View>

//           <Text style={styles.message}>{message}</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default NotificationCard;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 20,
//     elevation: 2,
//   },

//   iconContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: '#EAF2FF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   content: {
//     flex: 1,
//     marginLeft: 14,
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 6,
//   },

//   title: {
//     flex: 1,
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#111827',
//   },

//   date: {
//     fontSize: 12,
//     color: '#6B7280',
//   },

//   message: {
//     fontSize: 14,
//     color: '#4B5563',
//     lineHeight: 20,
//   },
// });





// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// // } from 'react-native';

// // import Feather from '@react-native-vector-icons/feather';
// // // import { useNavigation } from '@react-navigation/native';

// // interface NotificationCardProps {
// //   title?: string;
// //   message?: string;
// //   date?: string;
// // }

// // const NotificationCard = ({
// //   title = 'Company Announcement',
// //   message = 'Attendance must be marked before 09:30 AM. Late check-ins will be recorded automatically.',
// //   date = 'Today',
// // }: NotificationCardProps) => {

// //   return (
// //    <TouchableOpacity
// //   activeOpacity={0.9}
// //   style={styles.container}>

// //   <View style={styles.iconContainer}>
// //     <Feather
// //       name="bell"
// //       size={28}
// //       color="#2563EB"
// //     />
// //   </View>

// //   <View style={styles.content}>

// //     <View style={styles.header}>

// //       <Text
// //         style={styles.title}
// //         numberOfLines={1}>
// //         {title}
// //       </Text>

// //       <View style={styles.dateBadge}>
// //         <Text style={styles.date}>
// //           {date}
// //         </Text>
// //       </View>

// //     </View>

// //     <Text
// //       numberOfLines={2}
// //       style={styles.message}>
// //       {message}
// //     </Text>

// //   </View>

// //   <Feather
// //     name="chevron-right"
// //     size={22}
// //     color="#94A3B8"
// //   />

// // </TouchableOpacity>
// //   );
// // };

// // export default NotificationCard;

// // const styles = StyleSheet.create({

// //   container: {
// //     flexDirection: 'row',
// //     alignItems: 'center',

// //     backgroundColor: '#FFFFFF',

// //     borderRadius: 22,

// //     paddingHorizontal: 18,
// //     paddingVertical: 18,

// //     marginBottom: 18,

// //     borderWidth: 1,
// //     borderColor: '#EEF2FF',

// //     shadowColor: '#1E40AF',

// //     shadowOpacity: 0.08,
// //     shadowRadius: 18,

// //     shadowOffset: {
// //       width: 0,
// //       height: 6,
// //     },

// //     elevation: 5,
// //   },

// //   iconContainer: {

// //     width: 62,
// //     height: 62,

// //     borderRadius: 31,

// //     backgroundColor: '#EEF4FF',

// //     justifyContent: 'center',
// //     alignItems: 'center',

// //     marginRight: 16,
// //   },

// //   content: {
// //     flex: 1,
// //   },

// //   header: {

// //     flexDirection: 'row',

// //     justifyContent: 'space-between',

// //     alignItems: 'center',

// //     marginBottom: 8,
// //   },

// //   title: {
// //     flex: 1,

// //     color: '#111827',

// //     fontSize: 18,

// //     fontWeight: '700',

// //     marginRight: 10,
// //   },

// //   dateBadge: {

// //     backgroundColor: '#F1F5F9',

// //     paddingHorizontal: 10,

// //     height: 28,

// //     borderRadius: 14,

// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },

// //   date: {

// //     color: '#64748B',

// //     fontWeight: '600',

// //     fontSize: 12,
// //   },

// //   message: {

// //     color: '#475569',

// //     fontSize: 15,

// //     lineHeight: 23,
// //   },

// // });


import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';
// import { useNavigation } from '@react-navigation/native';

interface NotificationCardProps {
  title?: string;
  message?: string;
  date?: string;
  unread?: boolean;
  icon?: string;
  accentColor?: string;
  badge?: string; // e.g. "New", "Urgent", "Reminder"
}

const NotificationCard = ({
  title = 'Company Announcement',
  message = 'Attendance must be marked before 09:30 AM. Late check-ins will be recorded automatically.',
  date = 'Today',
  unread = true,
  icon = 'bell',
  accentColor = '#2563EB',
  badge = 'New',
}: NotificationCardProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  return (
    <Pressable
      onPressIn={pressIn}
      onPressOut={pressOut}
      // onPress={() => navigation.navigate('Notifications')}
    >
      <Animated.View style={[styles.wrapper, { transform: [{ scale }] }]}>
        <View style={styles.container}>
          {unread && <View style={[styles.accentBar, { backgroundColor: accentColor }]} />}

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: `${accentColor}12`,
                borderColor: `${accentColor}25`,
              },
            ]}
          >
            <Feather name={icon} size={21} color={accentColor} />
          </View>

          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                {unread && <View style={styles.unreadDot} />}
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
              </View>
              <Text style={styles.date}>{date}</Text>
            </View>

            <Text style={styles.message} numberOfLines={2}>
              {message}
            </Text>

            {unread && badge ? (
              <View style={styles.footerRow}>
                <View style={[styles.badge, { backgroundColor: `${accentColor}12` }]}>
                  <Text style={[styles.badgeText, { color: accentColor }]}>{badge}</Text>
                </View>
              </View>
            ) : null}
          </View>

          <Feather
            name="chevron-right"
            size={18}
            color="#CBD2DE"
            style={styles.chevron}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    borderRadius: 22,
    shadowColor: '#1E293B',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.05)',
  },

  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderWidth: 1,
  },

  content: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },

  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginRight: 6,
  },

  title: {
    flex: 1,
    fontSize: 15.5,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },

  date: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#A0A8B8',
  },

  message: {
    fontSize: 13.5,
    color: '#64748B',
    lineHeight: 19,
  },

  footerRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  chevron: {
    marginLeft: 4,
    marginTop: 4,
  },
});