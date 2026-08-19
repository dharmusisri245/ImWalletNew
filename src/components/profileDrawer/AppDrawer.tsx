// import React, {useEffect, useMemo, useRef} from 'react';
// import {
//   Animated,
//   Dimensions,
//   Easing,
//   Modal,
//   Pressable,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';

// import type {
//   DrawerUser,
//   UserRole,
// } from '../../auth/types/drawer/drawer';

// import DrawerHeader from './DrawerHeader';
// import DrawerProfileCard from './DrawerProfileCard';
// import DrawerMenuSection from './DrawerMenuSection';
// import DrawerFooter from './DrawerFooter';

// import {employeeDrawerItems} from '../../components/config/drawer/employeeDrawer';
// import {managerDrawerItems} from '../../components/config/drawer/managerDrawer';
// import {adminDrawerItems} from '../../components/config/drawer/adminDrawer';

// type AppDrawerProps = {
//   visible: boolean;
//   role: UserRole;
//   user: DrawerUser;

//   onClose: () => void;
//   onNavigate: (route: string) => void;
//   onLogout: () => void;
// };

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const DRAWER_WIDTH = Math.min(
//   SCREEN_WIDTH * 0.84,
//   380,
// );

// const AppDrawer = ({
//   visible,
//   role,
//   user,
//   onClose,
//   onNavigate,
//   onLogout,
// }: AppDrawerProps) => {
//   // --------------------------------------------------
//   // Drawer animation
//   // --------------------------------------------------

//   const translateX = useRef(
//     new Animated.Value(-DRAWER_WIDTH),
//   ).current;

//   const backdropOpacity = useRef(
//     new Animated.Value(0),
//   ).current;

//   // --------------------------------------------------
//   // Role based menu
//   // --------------------------------------------------

//   const drawerItems = useMemo(() => {
//     switch (role) {
//       case 'employee':
//         return employeeDrawerItems;

//       case 'manager':
//         return managerDrawerItems;

//       case 'admin':
//         return adminDrawerItems;

//       default:
//         return employeeDrawerItems;
//     }
//   }, [role]);

//   // --------------------------------------------------
//   // Safe online status
//   // --------------------------------------------------

//   const isOnline = user?.isOnline ?? false;

//   // --------------------------------------------------
//   // Open / Close animation
//   // --------------------------------------------------

//   useEffect(() => {
//     if (visible) {
//       translateX.setValue(-DRAWER_WIDTH);
//       backdropOpacity.setValue(0);

//       Animated.parallel([
//         Animated.timing(translateX, {
//           toValue: 0,
//           duration: 280,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),

//         Animated.timing(backdropOpacity, {
//           toValue: 1,
//           duration: 280,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       Animated.parallel([
//         Animated.timing(translateX, {
//           toValue: -DRAWER_WIDTH,
//           duration: 220,
//           easing: Easing.in(Easing.cubic),
//           useNativeDriver: true,
//         }),

//         Animated.timing(backdropOpacity, {
//           toValue: 0,
//           duration: 220,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     }
//   }, [
//     visible,
//     translateX,
//     backdropOpacity,
//   ]);

//   // --------------------------------------------------
//   // Render
//   // --------------------------------------------------

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="none"
//       statusBarTranslucent
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>

//         {/* =========================================
//             SIDEBAR
//         ========================================= */}

//         <Animated.View
//           style={[
//             styles.drawer,
//             {
//               transform: [
//                 {
//                   translateX,
//                 },
//               ],
//             },
//           ]}
//         >
//           {/* Header */}

//           <DrawerHeader
//             onClose={onClose}
//           />

//           {/* Profile */}

//           <DrawerProfileCard
//             user={user}
//           />

//           {/* Online Status */}

//           <View style={styles.statusContainer}>

//             <View
//               style={[
//                 styles.statusDot,
//                 {
//                   backgroundColor: isOnline
//                     ? '#20C66B'
//                     : '#9AA3B2',
//                 },
//               ]}
//             />

//             <Text
//               style={[
//                 styles.statusText,
//                 {
//                   color: isOnline
//                     ? '#20B963'
//                     : '#8A94A6',
//                 },
//               ]}
//             >
//               {isOnline
//                 ? 'Online'
//                 : 'Offline'}
//             </Text>

//           </View>

//           {/* Divider */}

//           <View style={styles.divider} />

//           {/* Role Based Menu */}

//           <DrawerMenuSection
//             items={drawerItems}
//             onNavigate={onNavigate}
//           />

//           {/* Footer */}

//           <DrawerFooter
//             onLogout={onLogout}
//           />

//         </Animated.View>

//         {/* =========================================
//             BACKDROP
//         ========================================= */}

//         <Animated.View
//           pointerEvents={
//             visible ? 'auto' : 'none'
//           }
//           style={[
//             styles.backdropContainer,
//             {
//               opacity: backdropOpacity,
//             },
//           ]}
//         >
//           <Pressable
//             style={styles.backdrop}
//             onPress={onClose}
//           />
//         </Animated.View>

//       </View>
//     </Modal>
//   );
// };

// export default AppDrawer;

// // ==================================================
// // STYLES
// // ==================================================

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//   },

//   drawer: {
//     width: DRAWER_WIDTH,
//     height: '100%',

//     backgroundColor: '#FFFFFF',

//     paddingTop: 35,
//     paddingHorizontal: 18,

//     zIndex: 2,

//     shadowColor: '#000',

//     shadowOffset: {
//       width: 3,
//       height: 0,
//     },

//     shadowOpacity: 0.18,
//     shadowRadius: 10,

//     elevation: 15,
//   },

//   backdropContainer: {
//     flex: 1,
//     zIndex: 1,
//   },

//   backdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.35)',
//   },

//   statusContainer: {
//     height: 62,

//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   statusDot: {
//     width: 14,
//     height: 14,

//     borderRadius: 7,

//     marginRight: 12,
//   },

//   statusText: {
//     fontSize: 19,
//     fontWeight: '600',
//   },

//   divider: {
//     height: 1,

//     backgroundColor: '#E3E7EE',
//   },
// });






import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {
  DrawerUser,
  UserRole,
} from '../../auth/types/drawer/drawer';

import DrawerHeader from './DrawerHeader';
import DrawerProfileCard from './DrawerProfileCard';
import DrawerMenuSection from './DrawerMenuSection';
import DrawerFooter from './DrawerFooter';

import {employeeDrawerItems} from '../../components/config/drawer/employeeDrawer';
import {managerDrawerItems} from '../../components/config/drawer/managerDrawer';
import {adminDrawerItems} from '../../components/config/drawer/adminDrawer';

type AppDrawerProps = {
  visible: boolean;
  role: UserRole;
  user: DrawerUser;

  onClose: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const DRAWER_WIDTH =
  SCREEN_WIDTH < 600
    ? Math.min(SCREEN_WIDTH * 0.88, 390)
    : Math.min(SCREEN_WIDTH * 0.48, 420);

const AppDrawer = ({
  visible,
  role,
  user,
  onClose,
  onNavigate,
  onLogout,
}: AppDrawerProps) => {
  // --------------------------------------------------
  // Drawer animation
  // --------------------------------------------------

  const translateX = useRef(
    new Animated.Value(-DRAWER_WIDTH),
  ).current;

  const backdropOpacity = useRef(
    new Animated.Value(0),
  ).current;

  // --------------------------------------------------
  // Role based menu
  // --------------------------------------------------

  const drawerItems = useMemo(() => {
    switch (role) {
      case 'employee':
        return employeeDrawerItems;

      case 'manager':
        return managerDrawerItems;

      case 'admin':
        return adminDrawerItems;

      default:
        return employeeDrawerItems;
    }
  }, [role]);

  // --------------------------------------------------
  // Safe online status
  // --------------------------------------------------

  const isOnline = user?.isOnline ?? false;

  // --------------------------------------------------
  // Open / Close animation
  // --------------------------------------------------

  useEffect(() => {
    if (visible) {
      translateX.setValue(-DRAWER_WIDTH);
      backdropOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),

        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    visible,
    translateX,
    backdropOpacity,
  ]);

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>

        {/* =========================================
            SIDEBAR
        ========================================= */}

        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [
                {
                  translateX,
                },
              ],
            },
          ]}
        >
          {/* Header */}

          <DrawerHeader
            onClose={onClose}
          />

          {/* Profile */}

          <DrawerProfileCard
            user={user}
          />

          {/* Online Status */}

          <View style={styles.statusContainer}>

            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: isOnline
                    ? '#20C66B'
                    : '#9AA3B2',
                },
              ]}
            />

            <Text
              style={[
                styles.statusText,
                {
                  color: isOnline
                    ? '#20B963'
                    : '#8A94A6',
                },
              ]}
            >
              {isOnline
                ? 'Online'
                : 'Offline'}
            </Text>

          </View>

          {/* Divider */}

          <View style={styles.divider} />

          {/* Role Based Menu */}

          <DrawerMenuSection
            items={drawerItems}
            onNavigate={onNavigate}
          />

          {/* Footer */}

          <DrawerFooter
            onLogout={onLogout}
          />

        </Animated.View>

        {/* =========================================
            BACKDROP
        ========================================= */}

        <Animated.View
          pointerEvents={
            visible ? 'auto' : 'none'
          }
          style={[
            styles.backdropContainer,
            {
              opacity: backdropOpacity,
            },
          ]}
        >
          <Pressable
            style={styles.backdrop}
            onPress={onClose}
          />
        </Animated.View>

      </View>
    </Modal>
  );
};

export default AppDrawer;

// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },

  drawer: {
  width: DRAWER_WIDTH,
  height: '100%',

  backgroundColor: '#FFFFFF',

  paddingTop: 20,
  paddingHorizontal: 15,

  zIndex: 2,

  shadowColor: '#000',

  shadowOffset: {
    width: 3,
    height: 0,
  },

  shadowOpacity: 0.18,
  shadowRadius: 10,

  elevation: 15,
},

  backdropContainer: {
    flex: 1,
    zIndex: 1,
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },

  statusContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 10,
    height: 10,

    borderRadius: 7,

    marginRight: 10,
  },

  statusText: {
    fontSize: 15,
    fontWeight: '600',
  },

  divider: {
    height: 1,

    backgroundColor: '#E3E7EE',
  },
});