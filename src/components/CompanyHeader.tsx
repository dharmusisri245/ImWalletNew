// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ImageSourcePropType,
//   StyleSheet,
//   TouchableOpacity,
//   Platform,
//   StyleProp,
//   ViewStyle,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Ionicons from '@react-native-vector-icons/ionicons';

// // ─────────────────────────────────────────────────────────────
// // CompanyHeader
// // Drop-in reusable header. Default shows the ImWallet logo/brand.
// // Pass `title` to override the logo with a screen-specific title
// // (e.g. "Attendance Management", "Settings", etc.).
// // ─────────────────────────────────────────────────────────────

// export interface CompanyHeaderProps {
//   /** Screen title. If provided, this replaces the ImWallet logo/brand. */
//   title?: string;
//   /** Optional subtitle shown under the title (or under the logo). */
//   subtitle?: string;
//   /** Show/hide the back button. Default: true. */
//   showBack?: boolean;
//   /** Custom back handler. Default: navigation.goBack(). */
//   onBackPress?: () => void;
//   /** Optional custom logo image. If omitted, a text-based ImWallet mark is used. */
//   logoSource?: ImageSourcePropType;
//   /** Company name shown in logo mode. Default: "ImWallet". */
//   companyName?: string;
//   /** Single right-side icon (e.g. "options-outline", "notifications-outline"). */
//   rightIcon?: string;
//   onRightPress?: () => void;
//   /** Fully custom right-side content — overrides rightIcon if provided. */
//   rightComponent?: React.ReactNode;
//   /** Show a bottom divider line. Default: true. */
//   showDivider?: boolean;
//   style?: StyleProp<ViewStyle>;
// }

// const CompanyHeader: React.FC<CompanyHeaderProps> = ({
//   title,
//   subtitle,
//   showBack = true,
//   onBackPress,
//   logoSource,
//   companyName = 'ImWallet',
//   rightIcon,
//   onRightPress,
//   rightComponent,
//   showDivider = true,
//   style,
// }) => {
//   const navigation = useNavigation();
//   const isLogoMode = !title;

//   const handleBack = () => {
//     if (onBackPress) return onBackPress();
//     if (navigation?.canGoBack?.()) navigation.goBack();
//   };

//   return (
//     <View style={[styles.wrapper, style]}>
//       <View style={styles.row}>
//         {showBack ? (
//           <TouchableOpacity
//             style={styles.iconBtn}
//             onPress={handleBack}
//             activeOpacity={0.7}
//             hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
//           >
//             <Ionicons name="chevron-back" size={22} color={COLORS.text} />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.iconBtnPlaceholder} />
//         )}

//         <View style={styles.center}>
//           {isLogoMode ? (
//             <View style={styles.logoRow}>
//               {logoSource ? (
//                 <Image
//                   source={logoSource}
//                   style={styles.logoImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <View style={styles.logoMark}>
//                   <Ionicons name="wallet" size={15} color="#fff" />
//                 </View>
//               )}
//               <Text style={styles.logoText}>{companyName}</Text>
//             </View>
//           ) : (
//             <>
//               <Text style={styles.brandTag}>{companyName}</Text>
//               <Text style={styles.title} numberOfLines={1}>
//                 {title}
//               </Text>
//             </>
//           )}
//           {subtitle ? (
//             <Text style={styles.subtitle} numberOfLines={1}>
//               {subtitle}
//             </Text>
//           ) : null}
//         </View>

//         {rightComponent ? (
//           rightComponent
//         ) : rightIcon ? (
//           <TouchableOpacity
//             style={styles.iconBtn}
//             onPress={onRightPress}
//             activeOpacity={0.85}
//           >
//             <Ionicons name={rightIcon} size={18} color={COLORS.primary} />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.iconBtnPlaceholder} />
//         )}
//       </View>

//       {showDivider && <View style={styles.divider} />}
//     </View>
//   );
// };

// export default CompanyHeader;

// // ─────────────────────────────────────────────────────────────
// // Design tokens — keep in sync with the rest of the app,
// // or replace with your shared theme.
// // ─────────────────────────────────────────────────────────────

// const COLORS = {
//   bg: '#F4F6F9',
//   surface: '#FFFFFF',
//   border: '#E7EAF0',
//   text: '#12141C',
//   textMuted: '#6B7280',
//   primary: '#3454D1',
//   primarySoft: '#EAEEFC',
// };

// const styles = StyleSheet.create({
//   wrapper: {
//     backgroundColor: COLORS.bg,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingTop: Platform.OS === 'android' ? 12 : 4,
//     paddingBottom: 12,
//     minHeight: 52,
//   },
//   iconBtn: {
//     width: 38,
//     height: 38,
//     borderRadius: 11,
//     backgroundColor: COLORS.surface,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   iconBtnPlaceholder: {
//     width: 38,
//     height: 38,
//   },
//   center: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   logoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   logoMark: {
//     width: 26,
//     height: 26,
//     borderRadius: 8,
//     backgroundColor: COLORS.primary,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoImage: {
//     width: 26,
//     height: 26,
//   },
//   logoText: {
//     fontSize: 18,
//     fontWeight: '800',
//     color: COLORS.text,
//     letterSpacing: -0.3,
//   },
//   brandTag: {
//     fontSize: 11,
//     fontWeight: '700',
//     color: COLORS.primary,
//     letterSpacing: 1.2,
//     textTransform: 'uppercase',
//     marginBottom: 2,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.text,
//     letterSpacing: -0.2,
//   },
//   subtitle: {
//     fontSize: 12,
//     color: COLORS.textMuted,
//     marginTop: 2,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: COLORS.border,
//     marginHorizontal: 16,
//   },
// });

// // ─────────────────────────────────────────────────────────────
// // Usage:
// //
// // 1) Default — shows the ImWallet logo, no back button needed on
// //    a root/home screen:
// //    <CompanyHeader showBack={false} />
// //
// // 2) Screen with a custom title (logo is replaced automatically):
// //    <CompanyHeader
// //      title="Attendance Management"
// //      subtitle="This week"
// //      rightIcon="options-outline"
// //      onRightPress={() => setFilterVisible(true)}
// //    />
// //
// // 3) Custom back behavior / custom right content:
// //    <CompanyHeader
// //      title="Employee Profile"
// //      onBackPress={() => navigation.navigate('Home')}
// //      rightComponent={<MyAvatarButton />}
// //    />
// //
// // Requires: react-native-vector-icons, @react-navigation/native
// // ─────────────────────────────────────────────────────────────






import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    SafeAreaView,
    StatusBar,
    ViewStyle,
    StyleProp,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';

interface CompanyHeaderProps {
    title: string;
    subtitle?: string;

    showBack?: boolean;

    onBackPress?: () => void;

    showNotification?: boolean;

    notificationCount?: number;

    showProfile?: boolean;

    profileInitial?: string;

    style?: StyleProp<ViewStyle>;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
    title,
    subtitle = 'Attendance Management',

    showBack = true,

    onBackPress,

    showNotification = true,

    notificationCount = 0,

    showProfile = true,

    profileInitial = 'DG',

    style,
}) => {

    const navigation = useNavigation();

    const handleBack = () => {

        if (onBackPress) {
            onBackPress();
            return;
        }

        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (

        <SafeAreaView style={styles.safeArea}>

            <StatusBar
                backgroundColor="#0936b0"
                barStyle="light-content"
            />

            <LinearGradient
                // colors={['#06308c', '#062c93']}
                colors={['#ffff', '#ffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, style]}>

                {/* Back Button */}

                {showBack ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleBack}
                        style={styles.backButton}>

                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#e6c8c8"
                        />

                    </TouchableOpacity>

                ) : (

                    <View style={styles.emptySpace} />

                )}

                {/* Title Section */}

                <View style={styles.titleContainer}>

                    <Text
                        numberOfLines={1}
                        style={styles.title}>
                        {title}
                    </Text>

                    <Text
                        numberOfLines={1}
                        style={styles.subtitle}>
                        {subtitle}
                    </Text>

                </View>

                {/* Right Section Starts */}
                {/* Notification Button */}

                {showNotification ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.notificationButton}>

                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#FFFFFF"
                        />

                        {notificationCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {notificationCount > 99
                                        ? '99+'
                                        : notificationCount}
                                </Text>
                            </View>
                        )}

                    </TouchableOpacity>
                ) : (
                    <View style={styles.emptySpace} />
                )}

                {/* Profile */}

                {showProfile && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.profileButton}>

                        <Text style={styles.profileInitial}>
                            {profileInitial}
                        </Text>

                    </TouchableOpacity>
                )}

            </LinearGradient>

        </SafeAreaView>

    );
};

export default CompanyHeader;

const styles = StyleSheet.create({
    safeArea: {
        // backgroundColor: '#1D4ED8',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 16 : 8,
        paddingBottom: 25,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.18,
        shadowRadius: 8,
    },

    backButton: {
        width: 46,
        height: 46,
        borderRadius: 23,

        backgroundColor: 'rgba(124, 51, 118, 0.87)',

        justifyContent: 'center',
        alignItems: 'center',
    },

    emptySpace: {
        width: 46,
        height: 46,
    },

    titleContainer: {
        flex: 1,
        marginHorizontal: 16,
        fontWeight:700
    },

    title: {
        color: '#011311',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    subtitle: {
        color: '#100bb1',
        fontSize: 15,
        marginTop: 4,
        fontWeight: '700',
    },

    notificationButton: {
        width: 46,
        height: 46,
        borderRadius: 23,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: 12,

        backgroundColor: 'rgba(60, 3, 3, 0.7)',
    },

    badge: {
        position: 'absolute',

        top: 8,
        right: 8,

        minWidth: 18,
        height: 18,

        borderRadius: 9,

        backgroundColor: '#eb574f',

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 4,

        borderWidth: 2,
        borderColor: '#264078',
    },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },

    profileButton: {
        width: 46,
        height: 46,
        borderRadius: 23,

        backgroundColor: '#0926b7',

        justifyContent: 'center',
        alignItems: 'center',
    },

    profileInitial: {
        color: '#9eb2dd',
        fontSize: 18,
        fontWeight: '700',
    },
});