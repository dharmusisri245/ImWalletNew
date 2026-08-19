// import React, {
//   useMemo,
//   useState,
// } from 'react';

// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';

// import Feather from '@react-native-vector-icons/feather';

// import {
//   useNavigation,
// } from '@react-navigation/native';

// import AppDrawer from '../profileDrawer/AppDrawer';

// interface DashboardHeaderProps {
//   name?: string;
//   employeeId?: string;
//   designation?: string;
//   avatar?: string;
//   notificationCount?: number;
// }

// // ==================================================
// // GREETING
// // ==================================================

// const getGreeting = () => {
//   const hour = new Date().getHours();

//   if (hour >= 5 && hour < 12) {
//     return {
//       text: 'Good Morning',
//       emoji: '☀️',
//     };
//   }

//   if (hour >= 12 && hour < 17) {
//     return {
//       text: 'Good Afternoon',
//       emoji: '🌤️',
//     };
//   }

//   if (hour >= 17 && hour < 21) {
//     return {
//       text: 'Good Evening',
//       emoji: '🌆',
//     };
//   }

//   return {
//     text: 'Good Night',
//     emoji: '🌙',
//   };
// };

// // ==================================================
// // DASHBOARD HEADER
// // ==================================================

// const DashboardHeader = ({
//   name = 'Dharmendra Gupta',
//   employeeId = 'EMP-4521',
//   designation = 'Field Sales Executive',

//   avatar = 'https://i.pravatar.cc/150?img=12',

//   notificationCount = 5,
// }: DashboardHeaderProps) => {

//   const navigation = useNavigation();



//    const logout = () => {
//       Alert.alert(
//         'Logout',
//         'Are you sure you want to logout?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Logout',
//             style: 'destructive',
//             onPress: () => {
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'Login' }],
//               });
//             },
//           },
//         ],
//       );
//     };
  

//   // ==================================================
//   // DRAWER STATE
//   // ==================================================

//   const [
//     appDrawerVisible,
//     setAppDrawerVisible,
//   ] = useState(false);

//   // ==================================================
//   // GREETING
//   // ==================================================

//   const greeting = useMemo(
//     () => getGreeting(),
//     [],
//   );

//   // ==================================================
//   // OPEN DRAWER
//   // ==================================================

//   const openAppDrawer = () => {
//     setAppDrawerVisible(true);
//   };

//   // ==================================================
//   // CLOSE DRAWER
//   // ==================================================

//   const closeAppDrawer = () => {
//     setAppDrawerVisible(false);
//   };

//   // ==================================================
//   // RENDER
//   // ==================================================

//   return (
//     <>
//       {/* ==========================================
//           HEADER
//       ========================================== */}

//       <View style={styles.container}>

//         {/* ========================================
//             PROFILE / AVATAR
//         ======================================== */}

//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.leftContainer}
//           onPress={openAppDrawer}
//         >

//           <Image
//             source={{
//               uri: avatar,
//             }}
//             defaultSource={require('../../assets/images/logo.png')}
//             style={styles.avatar}
//           />

//           <View style={styles.info}>

//             {/* Greeting */}

//             <Text style={styles.greeting}>
//               {greeting.emoji} {greeting.text}
//             </Text>

//             {/* Name */}

//             <Text
//               numberOfLines={1}
//               style={styles.name}
//             >
//               {name}
//             </Text>

//             {/* Designation + Employee ID */}

//             <View style={styles.bottomRow}>

//               <View style={styles.badge}>

//                 <Text style={styles.badgeText}>
//                   {designation}
//                 </Text>

//               </View>

//               <Text style={styles.employeeId}>
//                 {employeeId}
//               </Text>

//             </View>

//           </View>

//         </TouchableOpacity>

//         {/* ========================================
//             RIGHT ACTIONS
//         ======================================== */}

//         <View style={styles.actionContainer}>

//           {/* Query / Chat */}

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.actionButton}
//             onPress={() => {
//               navigation.navigate(
//                 'TeamDashBoardScreen' as never,
//               );
//             }}
//           >
//             <Feather
//               name="message-circle"
//               size={21}
//               color="#334155"
//             />
//           </TouchableOpacity>

//           {/* Notification */}

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={styles.actionButton}
//             onPress={() => {
//               navigation.navigate(
//                 'Notifications' as never,
//               );
//             }}
//           >

//             <Feather
//               name="bell"
//               size={22}
//               color="#334155"
//             />

//             {notificationCount > 0 && (
//               <View style={styles.notificationBadge}>

//                 <Text style={styles.notificationText}>
//                   {notificationCount > 9
//                     ? '9+'
//                     : notificationCount}
//                 </Text>

//               </View>
//             )}

//           </TouchableOpacity>

//         </View>

//       </View>

//       {/* ==========================================
//           APP DRAWER
//       ========================================== */}

//       <AppDrawer
//         visible={appDrawerVisible}
//         role="employee"
//         user={{
//           name,
//           employeeId,
//           designation,
//           avatar,
//           isOnline: true,
//         }}

//         onClose={closeAppDrawer}

//         onNavigate={route => {
//           closeAppDrawer();

//           console.log(
//             'Drawer navigation:',
//             route,
//           );

//           // Later you can navigate:
//           //
//           // navigation.navigate(route as never);
//           navigation.navigate(
//             'EmployeeStack' as never,
//             {
//               screen: route,
//             } as never,
//           );
//         }}

//         // onLogout={() => {
//         //   closeAppDrawer();

//         //   console.log('Logout pressed');
          
//         //   // Put your logout logic here.
          
//         // }}
//         onLogout={logout}
//       />

//     </>
//   );
// };

// export default DashboardHeader;

// // ==================================================
// // STYLES
// // ==================================================

// const styles = StyleSheet.create({

//   container: {
//     flexDirection: 'row',

//     justifyContent: 'space-between',

//     alignItems: 'center',

//     marginBottom: 18,
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

//   actionContainer: {
//     flexDirection: 'row',

//     alignItems: 'center',

//     gap: 10,
//   },

//   actionButton: {
//     width: 38,

//     height: 38,

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
// });

















import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';

import {useNavigation} from '@react-navigation/native';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import AppDrawer from '../profileDrawer/AppDrawer';

interface DashboardHeaderProps {
  name?: string;
  employeeId?: string;
  designation?: string;
  avatar?: string;
  notificationCount?: number;

  // Scroll position from HomeScreen
  scrollY?: SharedValue<number>;
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
  scrollY,
}: DashboardHeaderProps) => {
  const navigation = useNavigation();

  const [appDrawerVisible, setAppDrawerVisible] = useState(false);

  const greeting = useMemo(() => getGreeting(), []);

  // ==================================================
  // LOGOUT
  // ==================================================

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          },
        },
      ],
    );
  };

  // ==================================================
  // DRAWER
  // ==================================================

  const openAppDrawer = () => {
    setAppDrawerVisible(true);
  };

  const closeAppDrawer = () => {
    setAppDrawerVisible(false);
  };

  // ==================================================
  // HEADER ANIMATION
  // ==================================================

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }

    return {
      height: interpolate(
        scrollY.value,
        [0, 40, 100],
        [86, 76, 62],
        Extrapolation.CLAMP,
      ),

      marginBottom: interpolate(
        scrollY.value,
        [0, 40, 100],
        [18, 12, 8],
        Extrapolation.CLAMP,
      ),
    };
  });

  // ==================================================
  // AVATAR ANIMATION
  // ==================================================

  const animatedAvatarStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }

    return {
      width: interpolate(
        scrollY.value,
        [0, 40, 100],
        [56, 46, 38],
        Extrapolation.CLAMP,
      ),

      height: interpolate(
        scrollY.value,
        [0, 40, 100],
        [56, 46, 38],
        Extrapolation.CLAMP,
      ),

      borderRadius: interpolate(
        scrollY.value,
        [0, 40, 100],
        [28, 23, 19],
        Extrapolation.CLAMP,
      ),
    };
  });

  // ==================================================
  // GREETING ANIMATION
  // ==================================================

  const animatedGreetingStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }

    return {
      opacity: interpolate(
        scrollY.value,
        [0, 25, 70],
        [1, 0.5, 0],
        Extrapolation.CLAMP,
      ),

      height: interpolate(
        scrollY.value,
        [0, 25, 70],
        [18, 10, 0],
        Extrapolation.CLAMP,
      ),

      marginBottom: interpolate(
        scrollY.value,
        [0, 25, 70],
        [0, 0, -3],
        Extrapolation.CLAMP,
      ),
    };
  });

  // ==================================================
  // NAME ANIMATION
  // ==================================================

  const animatedNameStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }

    return {
      fontSize: interpolate(
        scrollY.value,
        [0, 60, 100],
        [20, 17, 15],
        Extrapolation.CLAMP,
      ),
    };
  });

  // ==================================================
  // BOTTOM ROW
  // ==================================================

  const animatedBottomRowStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }

    return {
      opacity: interpolate(
        scrollY.value,
        [0, 35, 75],
        [1, 0.5, 0],
        Extrapolation.CLAMP,
      ),

      height: interpolate(
        scrollY.value,
        [0, 35, 75],
        [28, 16, 0],
        Extrapolation.CLAMP,
      ),
    };
  });

  // ==================================================
  // ACTION BUTTONS
  // ==================================================

  const animatedActionStyle = useAnimatedStyle(() => {
    if (!scrollY) {
      return {};
    }

    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [0, 50, 100],
            [1, 0.9, 0.82],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  // ==================================================
  // HEADER
  // ==================================================

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          animatedContainerStyle,
        ]}>

        {/* ========================================
            PROFILE
        ======================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.leftContainer}
          onPress={openAppDrawer}>

          <Animated.Image
            source={{
              uri: avatar,
            }}
            defaultSource={require('../../assets/images/logo.png')}
            style={[
              styles.avatar,
              animatedAvatarStyle,
            ]}
          />

          <View style={styles.info}>

            {/* Greeting */}

            <Animated.View
              style={animatedGreetingStyle}>

              <Text style={styles.greeting}>
                {greeting.emoji} {greeting.text}
              </Text>

            </Animated.View>

            {/* Name */}

            <Animated.Text
              numberOfLines={1}
              style={[
                styles.name,
                animatedNameStyle,
              ]}>
              {name}
            </Animated.Text>

            {/* Designation + ID */}

            <Animated.View
              style={[
                styles.bottomRow,
                animatedBottomRowStyle,
              ]}>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {designation}
                </Text>
              </View>

              <Text style={styles.employeeId}>
                {employeeId}
              </Text>

            </Animated.View>

          </View>

        </TouchableOpacity>

        {/* ========================================
            RIGHT ACTIONS
        ======================================== */}

        <View style={styles.actionContainer}>

          {/* Chat */}

          <Animated.View style={animatedActionStyle}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}
              onPress={() => {
                navigation.navigate(
                  'TeamDashBoardScreen' as never,
                );
              }}>

              <Feather
                name="message-circle"
                size={21}
                color="#334155"
              />

            </TouchableOpacity>

          </Animated.View>

          {/* Notification */}

          <Animated.View style={animatedActionStyle}>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.actionButton}
              onPress={() => {
                navigation.navigate(
                  'Notifications' as never,
                );
              }}>

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

          </Animated.View>

        </View>

      </Animated.View>

      {/* ==========================================
          DRAWER
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

          navigation.navigate(
            'EmployeeStack' as never,
            {
              screen: route,
            } as never,
          );
        }}
        onLogout={logout}
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
    // backgroundColor:'blue',
    minHeight: 62,

    overflow: 'hidden',
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
    justifyContent: 'center',
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
    marginTop: 5,
    overflow: 'hidden',
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
    marginLeft: 8,
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