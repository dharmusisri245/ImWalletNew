// import React, { useEffect, useRef } from 'react';
// import {
//     Animated,
//     Easing,
//     Modal,
//     Pressable,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     Dimensions,
// } from 'react-native';

// import Ionicons from '@react-native-vector-icons/ionicons';

// interface ProfileDrawerProps {
//     visible: boolean;
//     onClose: () => void;

//     onProfilePress?: () => void;
//     onSettingsPress?: () => void;
//     onNotificationsPress?: () => void;
//     onQueriesPress?: () => void;
//     onHelpPress?: () => void;
//     onLogoutPress?: () => void;
// }

// const SCREEN_WIDTH = Dimensions.get('window').width;

// const DRAWER_WIDTH = Math.min(
//     SCREEN_WIDTH * 0.84,
//     380,
// );

// const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
//     visible,
//     onClose,
//     onProfilePress,
//     onSettingsPress,
//     onNotificationsPress,
//     onQueriesPress,
//     onHelpPress,
//     onLogoutPress,
// }) => {
//     const translateX = useRef(
//         new Animated.Value(-DRAWER_WIDTH),
//     ).current;

//     const backdropOpacity = useRef(
//         new Animated.Value(0),
//     ).current;

//     useEffect(() => {
//         if (visible) {
//             // Start from outside the LEFT side
//             translateX.setValue(-DRAWER_WIDTH);
//             backdropOpacity.setValue(0);

//             Animated.parallel([
//                 Animated.timing(translateX, {
//                     toValue: 0,
//                     duration: 280,
//                     easing: Easing.out(Easing.cubic),
//                     useNativeDriver: true,
//                 }),

//                 Animated.timing(backdropOpacity, {
//                     toValue: 1,
//                     duration: 280,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         } else {
//             Animated.parallel([
//                 Animated.timing(translateX, {
//                     toValue: -DRAWER_WIDTH,
//                     duration: 220,
//                     easing: Easing.in(Easing.cubic),
//                     useNativeDriver: true,
//                 }),

//                 Animated.timing(backdropOpacity, {
//                     toValue: 0,
//                     duration: 220,
//                     useNativeDriver: true,
//                 }),
//             ]).start();
//         }
//     }, [
//         visible,
//         translateX,
//         backdropOpacity,
//     ]);

//     return (
//         <Modal
//             visible={visible}
//             transparent
//             animationType="none"
//             onRequestClose={onClose}
//             statusBarTranslucent
//         >
//             <View style={styles.overlay}>

//                 {/* ========================= */}
//                 {/* LEFT DRAWER */}
//                 {/* ========================= */}

//                 <Animated.View
//                     style={[
//                         styles.drawer,
//                         {
//                             transform: [
//                                 {
//                                     translateX,
//                                 },
//                             ],
//                         },
//                     ]}
//                 >
//                     {/* Header */}

//                     <View style={styles.header}>
//                         <View>
//                             {/* <Text style={styles.headerTitle}>
//                 Profile uyyuoh
//               </Text> */}

//                             {/* <Text style={styles.headerSubtitle}>
//                 Account & Settings
//               </Text> */}
//                         </View>
//                         <TouchableOpacity
//                             style={styles.closeButton}
//                             activeOpacity={0.7}
//                             onPress={onClose}
//                         >
//                             <Ionicons
//                                 name="close-outline"
//                                 size={24}
//                                 color="#333333"
//                             />
//                         </TouchableOpacity>
//                     </View>

//                     {/* User Profile */}

//                     <View style={styles.userCard}>

//                         <View style={styles.avatar}>
//                             <Ionicons
//                                 name="person"
//                                 size={27}
//                                 color="#2563EB"
//                             />
//                         </View>

//                         <View style={styles.userInfo}>

//                             <Text
//                                 style={styles.userName}
//                                 numberOfLines={1}
//                             >
//                                 Dharmendra Gupta
//                             </Text>

//                             <Text
//                                 style={styles.userRole}
//                                 numberOfLines={1}
//                             >
//                                 Field Sales Executive
//                             </Text>

//                             <View style={styles.employeeRow}>

//                                 <Text style={styles.employeeLabel}>
//                                     Employee ID
//                                 </Text>

//                                 <Text style={styles.employeeId}>
//                                     EMP-4521
//                                 </Text>

//                             </View>
//                         </View>

//                     </View>

//                     {/* Online Status */}

//                     <View style={styles.statusContainer}>

//                         <View style={styles.onlineDot} />

//                         <Text style={styles.statusText}>
//                             Online
//                         </Text>

//                     </View>

//                     {/* Divider */}

//                     <View style={styles.divider} />

//                     {/* Menu */}

//                     <View style={styles.menuContainer}>

//                         {/* My Profile */}

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             activeOpacity={0.7}
//                             onPress={onProfilePress}
//                         >
//                             <View style={styles.iconContainer}>
//                                 <Ionicons
//                                     name="person-outline"
//                                     size={21}
//                                     color="#2563EB"
//                                 />
//                             </View>

//                             <View style={styles.menuInfo}>

//                                 <Text style={styles.menuTitle}>
//                                     My Profile
//                                 </Text>

//                                 <Text style={styles.menuSubtitle}>
//                                     View and edit profile
//                                 </Text>

//                             </View>

//                             <Ionicons
//                                 name="chevron-forward-outline"
//                                 size={18}
//                                 color="#A0A6B0"
//                             />
//                         </TouchableOpacity>

//                         {/* Settings */}

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             activeOpacity={0.7}
//                             onPress={onSettingsPress}
//                         >
//                             <View style={styles.iconContainer}>
//                                 <Ionicons
//                                     name="settings-outline"
//                                     size={21}
//                                     color="#2563EB"
//                                 />
//                             </View>

//                             <View style={styles.menuInfo}>

//                                 <Text style={styles.menuTitle}>
//                                     Settings
//                                 </Text>

//                                 <Text style={styles.menuSubtitle}>
//                                     App preferences
//                                 </Text>

//                             </View>

//                             <Ionicons
//                                 name="chevron-forward-outline"
//                                 size={18}
//                                 color="#A0A6B0"
//                             />
//                         </TouchableOpacity>

//                         {/* Notifications */}

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             activeOpacity={0.7}
//                             onPress={onNotificationsPress}
//                         >
//                             <View style={styles.iconContainer}>
//                                 <Ionicons
//                                     name="notifications-outline"
//                                     size={21}
//                                     color="#2563EB"
//                                 />
//                             </View>

//                             <View style={styles.menuInfo}>

//                                 <Text style={styles.menuTitle}>
//                                     Notifications
//                                 </Text>

//                                 <Text style={styles.menuSubtitle}>
//                                     Manage notifications
//                                 </Text>

//                             </View>

//                             <Ionicons
//                                 name="chevron-forward-outline"
//                                 size={18}
//                                 color="#A0A6B0"
//                             />
//                         </TouchableOpacity>

//                         {/* My Queries */}

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             activeOpacity={0.7}
//                             onPress={onQueriesPress}
//                         >
//                             <View style={styles.iconContainer}>
//                                 <Ionicons
//                                     name="chatbubbles-outline"
//                                     size={21}
//                                     color="#2563EB"
//                                 />
//                             </View>

//                             <View style={styles.menuInfo}>

//                                 <Text style={styles.menuTitle}>
//                                     My Queries
//                                 </Text>

//                                 <Text style={styles.menuSubtitle}>
//                                     View your conversations
//                                 </Text>

//                             </View>

//                             <Ionicons
//                                 name="chevron-forward-outline"
//                                 size={18}
//                                 color="#A0A6B0"
//                             />
//                         </TouchableOpacity>

//                         {/* Help */}

//                         <TouchableOpacity
//                             style={styles.menuItem}
//                             activeOpacity={0.7}
//                             onPress={onHelpPress}
//                         >
//                             <View style={styles.iconContainer}>
//                                 <Ionicons
//                                     name="help-circle-outline"
//                                     size={21}
//                                     color="#2563EB"
//                                 />
//                             </View>

//                             <View style={styles.menuInfo}>

//                                 <Text style={styles.menuTitle}>
//                                     Help & Support
//                                 </Text>

//                                 <Text style={styles.menuSubtitle}>
//                                     Get help with ImWallet
//                                 </Text>

//                             </View>

//                             <Ionicons
//                                 name="chevron-forward-outline"
//                                 size={18}
//                                 color="#A0A6B0"
//                             />
//                         </TouchableOpacity>

//                     </View>

//                     {/* Bottom Divider */}

//                     <View style={styles.divider} />

//                     {/* Logout */}

//                     <TouchableOpacity
//                         style={styles.logoutButton}
//                         activeOpacity={0.7}
//                         onPress={onLogoutPress}
//                     >
//                         <View style={styles.logoutIcon}>
//                             <Ionicons
//                                 name="log-out-outline"
//                                 size={22}
//                                 color="#DC2626"
//                             />
//                         </View>

//                         <Text style={styles.logoutText}>
//                             Logout
//                         </Text>
//                     </TouchableOpacity>

//                 </Animated.View>

//                 {/* ========================= */}
//                 {/* RIGHT BACKDROP */}
//                 {/* ========================= */}

//                 <Animated.View
//                     pointerEvents={visible ? 'auto' : 'none'}
//                     style={[
//                         styles.backdropContainer,
//                         {
//                             opacity: backdropOpacity,
//                         },
//                     ]}
//                 >
//                     <Pressable
//                         style={styles.backdrop}
//                         onPress={onClose}
//                     />
//                 </Animated.View>

//             </View>
//         </Modal>
//     );
// };

// export default ProfileDrawer;

// const styles = StyleSheet.create({

//     /* Full screen */

//     overlay: {
//         flex: 1,
//         position: 'relative',
//         backgroundColor: 'transparent',
//     },

//     /* Drawer */

//     drawer: {
//         width: DRAWER_WIDTH,
//         height: '100%',
//         backgroundColor: '#FFFFFF',

//         paddingTop: 18,
//         paddingHorizontal: 18,

//         // borderTopRightRadius: 24,
//         // borderBottomRightRadius: 24,

//         shadowColor: '#000',

//         shadowOffset: {
//             width: 3,
//             height: 0,
//         },

//         shadowOpacity: 0.15,
//         shadowRadius: 10,

//         elevation: 12,

//         zIndex: 2,
//     },

//     /* Right side dark area */

//     backdropContainer: {
//         flex: 1,
//         zIndex: 1,
//     },

//     backdrop: {
//         flex: 1,
//         backgroundColor: 'rgba(0, 0, 0, 0.35)',
//     },

//     /* Header */

//     header: {
//         minHeight: 60,

//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },

//     headerTitle: {
//         fontSize: 22,
//         fontWeight: '800',
//         color: '#172033',
//     },

//     headerSubtitle: {
//         marginTop: 3,
//         fontSize: 11,
//         color: '#8A94A6',
//     },

//     closeButton: {
//         width: 38,
//         height: 38,

//         borderRadius: 19,

//         backgroundColor: '#F3F5F8',

//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     /* User */

//     userCard: {
//         marginTop: 12,

//         padding: 14,

//         borderRadius: 16,

//         backgroundColor: '#F5F8FF',

//         flexDirection: 'row',
//         alignItems: 'center',
//     },

//     avatar: {
//         width: 58,
//         height: 58,

//         borderRadius: 29,

//         backgroundColor: '#E5EEFF',

//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     userInfo: {
//         flex: 1,
//         marginLeft: 13,
//     },

//     userName: {
//         fontSize: 17,
//         fontWeight: '800',
//         color: '#172033',
//     },

//     userRole: {
//         marginTop: 3,

//         fontSize: 12,

//         color: '#68758A',
//     },

//     employeeRow: {
//         flexDirection: 'row',
//         alignItems: 'center',

//         marginTop: 5,
//     },

//     employeeLabel: {
//         fontSize: 10,
//         color: '#8A94A6',
//     },

//     employeeId: {
//         marginLeft: 5,

//         fontSize: 10,

//         fontWeight: '700',

//         color: '#2563EB',
//     },

//     /* Status */

//     statusContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',

//         marginTop: 10,
//         marginLeft: 5,
//     },

//     onlineDot: {
//         width: 8,
//         height: 8,

//         borderRadius: 4,

//         backgroundColor: '#22C55E',

//         marginRight: 6,
//     },

//     statusText: {
//         fontSize: 11,

//         fontWeight: '600',

//         color: '#22C55E',
//     },

//     /* Divider */

//     divider: {
//         height: 1,

//         backgroundColor: '#E9ECF1',

//         marginVertical: 12,
//     },

//     /* Menu */

//     menuContainer: {
//         flex: 1,
//     },

//     menuItem: {
//         minHeight: 62,

//         flexDirection: 'row',

//         alignItems: 'center',

//         paddingVertical: 8,
//     },

//     iconContainer: {
//         width: 42,
//         height: 42,

//         borderRadius: 12,

//         backgroundColor: '#EEF4FF',

//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     menuInfo: {
//         flex: 1,

//         marginLeft: 12,
//     },

//     menuTitle: {
//         fontSize: 14,

//         fontWeight: '700',

//         color: '#293244',
//     },

//     menuSubtitle: {
//         marginTop: 3,

//         fontSize: 10,

//         color: '#8A94A6',
//     },

//     /* Logout */

//     logoutButton: {
//         minHeight: 52,

//         flexDirection: 'row',

//         alignItems: 'center',

//         marginBottom: 12,
//     },

//     logoutIcon: {
//         width: 42,
//         height: 42,

//         borderRadius: 12,

//         backgroundColor: '#FEF2F2',

//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     logoutText: {
//         marginLeft: 12,

//         fontSize: 14,

//         fontWeight: '700',

//         color: '#DC2626',
//     },
// });