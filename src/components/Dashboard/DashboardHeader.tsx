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

//     // Recompute only if the component re-renders across a minute/hour boundary

//   const greeting = useMemo(() => getGreeting(), []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftContainer}>
//         <Image
//           source={{ uri: avatar }}
//           defaultSource={require('../../assets/images/logo.png')} // change/remove if not available
//           style={styles.avatar}
//         />

//         <View style={styles.info}>
//           <Text style={styles.greeting}>
//             {greeting.emoji} {greeting.text} 
//           </Text>

//           <Text
//             numberOfLines={1}
//             style={styles.name}>
//             {name}
//           </Text>

//           <View style={styles.bottomRow}>
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>
//                 {designation}
//               </Text>
//             </View>

//             <Text style={styles.employeeId}>
//               {employeeId}
//             </Text>
//           </View>
//         </View>
//       </View>

//       <TouchableOpacity
//         activeOpacity={0.8}
//         style={styles.notificationButton}
//         onPress={() => {
//           navigation?.navigate?.('Notifications');
//         }}>
//         <Feather
//           name="bell"
//           size={22}
//           color="#334155"
//         />

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
//     marginBottom: 18,
//     // backgroundColor:'blue'
//   },

//   leftContainer: {
//     flexDirection: 'row',
//     flex: 1,
//     alignItems: 'center',
//   },

//   avatar: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
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
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginTop: 2,
//   },

//   bottomRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },

//   badge: {
//     backgroundColor: '#2563EB',
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 7,
//   },

//   badgeText: {
//     color: '#FFF',
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   employeeId: {
//     marginLeft: 10,
//     color: '#2563EB',
//     fontSize: 12,
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
//   },

//   notificationText: {
//     color: '#FFF',
//     fontSize: 10,
//     fontWeight: '700',
//   },
// }







import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

import {
  useNavigation,
} from '@react-navigation/native';

import AppDrawer from '../profileDrawer/AppDrawer';

interface DashboardHeaderProps {
  name?: string;
  employeeId?: string;
  designation?: string;
  avatar?: string;
  notificationCount?: number;
}

// ==================================================
// GREETING
// ==================================================

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      text: 'Good Morning',
      emoji: '☀️',
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      text: 'Good Afternoon',
      emoji: '🌤️',
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      text: 'Good Evening',
      emoji: '🌆',
    };
  }

  return {
    text: 'Good Night',
    emoji: '🌙',
  };
};

// ==================================================
// DASHBOARD HEADER
// ==================================================

const DashboardHeader = ({
  name = 'Dharmendra Gupta',
  employeeId = 'EMP-4521',
  designation = 'Field Sales Executive',

  avatar = 'https://i.pravatar.cc/150?img=12',

  notificationCount = 5,
}: DashboardHeaderProps) => {

  const navigation = useNavigation();

  // ==================================================
  // DRAWER STATE
  // ==================================================

  const [
    appDrawerVisible,
    setAppDrawerVisible,
  ] = useState(false);

  // ==================================================
  // GREETING
  // ==================================================

  const greeting = useMemo(
    () => getGreeting(),
    [],
  );

  // ==================================================
  // OPEN DRAWER
  // ==================================================

  const openAppDrawer = () => {
    setAppDrawerVisible(true);
  };

  // ==================================================
  // CLOSE DRAWER
  // ==================================================

  const closeAppDrawer = () => {
    setAppDrawerVisible(false);
  };

  // ==================================================
  // RENDER
  // ==================================================

  return (
    <>
      {/* ==========================================
          HEADER
      ========================================== */}

      <View style={styles.container}>

        {/* ========================================
            PROFILE / AVATAR
        ======================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.leftContainer}
          onPress={openAppDrawer}
        >

          <Image
            source={{
              uri: avatar,
            }}
            defaultSource={require('../../assets/images/logo.png')}
            style={styles.avatar}
          />

          <View style={styles.info}>

            {/* Greeting */}

            <Text style={styles.greeting}>
              {greeting.emoji} {greeting.text}
            </Text>

            {/* Name */}

            <Text
              numberOfLines={1}
              style={styles.name}
            >
              {name}
            </Text>

            {/* Designation + Employee ID */}

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

        </TouchableOpacity>

        {/* ========================================
            RIGHT ACTIONS
        ======================================== */}

        <View style={styles.actionContainer}>

          {/* Query / Chat */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(
                'TeamDashBoardScreen' as never,
              );
            }}
          >
            <Feather
              name="message-circle"
              size={21}
              color="#334155"
            />
          </TouchableOpacity>

          {/* Notification */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(
                'Notifications' as never,
              );
            }}
          >

            <Feather
              name="bell"
              size={22}
              color="#334155"
            />

            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>

                <Text style={styles.notificationText}>
                  {notificationCount > 9
                    ? '9+'
                    : notificationCount}
                </Text>

              </View>
            )}

          </TouchableOpacity>

        </View>

      </View>

      {/* ==========================================
          APP DRAWER
      ========================================== */}

      <AppDrawer
        visible={appDrawerVisible}

        role="employee"

        user={{
          name,
          employeeId,
          designation,
          avatar,
          isOnline: true,
        }}

        onClose={closeAppDrawer}

        onNavigate={route => {
          closeAppDrawer();

          console.log(
            'Drawer navigation:',
            route,
          );

          // Later you can navigate:
          //
          // navigation.navigate(route as never);
        }}

        onLogout={() => {
          closeAppDrawer();

          console.log('Logout pressed');

          // Put your logout logic here.
        }}
      />

    </>
  );
};

export default DashboardHeader;

// ==================================================
// STYLES
// ==================================================

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

  actionContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 10,
  },

  actionButton: {
    width: 38,

    height: 38,

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