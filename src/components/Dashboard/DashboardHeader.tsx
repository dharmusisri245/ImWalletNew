import React, { useMemo } from 'react';
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

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { text: 'Good Morning', emoji: '☀️' };
  }
  if (hour >= 12 && hour < 17) {
    return { text: 'Good Afternoon', emoji: '🌤️' };
  }
  if (hour >= 17 && hour < 21) {
    return { text: 'Good Evening', emoji: '🌆' };
  }
  return { text: 'Good Night', emoji: '🌙' };
};


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

    // Recompute only if the component re-renders across a minute/hour boundary
  const greeting = useMemo(() => getGreeting(), []);

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
            {greeting.emoji} {greeting.text} 
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




// import React, { useMemo } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// import Feather from '@react-native-vector-icons/feather';
// import { useNavigation } from '@react-navigation/native';

// interface DashboardHeaderProps {
//   name?: string;
//   employeeId?: string;
//   designation?: string;
//   avatar?: string;
//   notificationCount?: number;
// }

// // Returns greeting text + emoji based on current time of day
// const getGreeting = () => {
//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {
//     return { text: 'Good Morning', emoji: '☀️' };
//   }
//   if (hour >= 12 && hour < 17) {
//     return { text: 'Good Afternoon', emoji: '🌤️' };
//   }
//   if (hour >= 17 && hour < 21) {
//     return { text: 'Good Evening', emoji: '🌆' };
//   }
//   return { text: 'Good Night', emoji: '🌙' };
// };

// const DashboardHeader = ({
//   name = 'Dharmendra Gupta',
//   employeeId = 'EMP-4521',
//   designation = 'Field Sales Executive',
//   avatar = 'https://i.pravatar.cc/150?img=12',
//   notificationCount = 5,
// }: DashboardHeaderProps) => {
//   let navigation: any = null;

//   // Prevent crash while testing component directly from App.tsx
//   try {
//     navigation = useNavigation();
//   } catch (e) {
//     navigation = null;
//   }

//   // Recompute only if the component re-renders across a minute/hour boundary
//   const greeting = useMemo(() => getGreeting(), []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         <View style={styles.avatarRing}>
//           <Image
//             source={{ uri: avatar }}
//             defaultSource={require('../../assets/images/logo.png')} // change/remove if not available
//             style={styles.avatar}
//           />
//         </View>

//         <View style={styles.info}>
//           <Text style={styles.greeting}>
//             {greeting.text} {greeting.emoji}
//           </Text>

//           <Text numberOfLines={1} style={styles.name}>
//             {name}
//           </Text>

//           <View style={styles.bottomRow}>
//             <View style={styles.badge}>
//               <Feather name="briefcase" size={10} color="#FFF" style={styles.badgeIcon} />
//               <Text style={styles.badgeText}>{designation}</Text>
//             </View>

//             <View style={styles.idPill}>
//               <Text style={styles.employeeId}>{employeeId}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       <TouchableOpacity
//         activeOpacity={0.75}
//         style={styles.notificationButton}
//         onPress={() => {
//           navigation?.navigate?.('Notifications');
//         }}>
//         <Feather name="bell" size={21} color="#334155" />

//         {notificationCount > 0 && (
//           <View style={styles.notificationBadge}>
//             <Text style={styles.notificationText}>
//               {notificationCount > 9 ? '9+' : notificationCount}
//             </Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DashboardHeader;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginBottom: 18,
//     backgroundColor: '#F8FAFC',
//     borderRadius: 18,
//   },

//   leftContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     alignItems: 'center',
//   },

//   avatarRing: {
//     width: 62,
//     height: 62,
//     borderRadius: 31,
//     padding: 3,
//     borderWidth: 1.5,
//     borderColor: '#2563EB33',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   avatar: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     backgroundColor: '#E5E7EB',
//   },

//   info: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   greeting: {
//     fontSize: 13,
//     color: '#64748B',
//     fontWeight: '500',
//   },

//   name: {
//     fontSize: 19,
//     fontWeight: '700',
//     color: '#0F172A',
//     marginTop: 2,
//   },

//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 7,
//     flexWrap: 'wrap',
//   },

//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2563EB',
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },

//   badgeIcon: {
//     marginRight: 4,
//   },

//   badgeText: {
//     color: '#FFF',
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   idPill: {
//     marginLeft: 8,
//     backgroundColor: '#EFF6FF',
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     borderRadius: 8,
//   },

//   employeeId: {
//     color: '#2563EB',
//     fontSize: 11,
//     fontWeight: '700',
//   },

//   notificationButton: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },

//   notificationBadge: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     minWidth: 18,
//     height: 18,
//     borderRadius: 9,
//     backgroundColor: '#EF4444',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//     borderWidth: 1.5,
//     borderColor: '#FFF',
//   },

//   notificationText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: '700',
//   },
// });
