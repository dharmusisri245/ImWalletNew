// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     ScrollView,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import FeatherIcon from '@react-native-vector-icons/feather';

// import { colors, spacing, typography, radius } from '../../color/Colurs';

// type Props = {
//     navigation: any;
//     route: any;
// };

// export default function VendorDetails({ navigation, route }: Props) {
//     // Later this will come from RegisteredScreen
//     const vendor = route?.params?.vendor || {
//         id: '1',
//         vendorCode: 'IMW-1001',
//         shopName: 'Apex FinServ',
//         ownerName: 'Rajesh Sharma',
//         mobile: '9876543210',
//         registeredOn: '20 Jul 2026',
//         status: 'Active',
//         kycStatus: 'Pending',
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 30 }}>

//                 {/* ================= HEADER ================= */}

//                 <LinearGradient
//                     colors={[colors.gradientStart, colors.gradientEnd]}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 1 }}
//                     style={styles.header}>

//                     <TouchableOpacity
//                         style={styles.backButton}
//                         onPress={() => navigation.goBack()}>

//                         <FeatherIcon
//                             name="arrow-left"
//                             size={22}
//                             color={colors.white}
//                         />
//                     </TouchableOpacity>

//                     <Text style={styles.headerTitle}>
//                         Vendor Details
//                     </Text>

//                     <View style={{ width: 40 }} />
//                 </LinearGradient>

//                 {/* ================= PROFILE CARD ================= */}




//                 <View style={styles.profileCard}>

//                     <View style={styles.avatar}>
//                         <Text style={styles.avatarText}>
//                             {vendor.shopName
//                                 .split(' ')
//                                 .map((i: string) => i[0])
//                                 .join('')
//                                 .substring(0, 2)}
//                         </Text>
//                     </View>

//                     <Text style={styles.shopName}>
//                         {vendor.shopName}
//                     </Text>

//                     <Text style={styles.vendorId}>
//                         Vendor ID : {vendor.vendorCode}
//                     </Text>

//                     {/* Status */}

//                     <View style={styles.badgeRow}>

//                         <View style={styles.activeBadge}>
//                             <FeatherIcon
//                                 name="check-circle"
//                                 size={14}
//                                 color="#1B8A5A"
//                             />

//                             <Text style={styles.activeText}>
//                                 {vendor.status}
//                             </Text>
//                         </View>

//                         <View style={styles.kycBadge}>
//                             <FeatherIcon
//                                 name="clock"
//                                 size={14}
//                                 color="#B7791F"
//                             />

//                             <Text style={styles.kycText}>
//                                 KYC {vendor.kycStatus}
//                             </Text>
//                         </View>

//                     </View>

//                 </View>

//                 {/* ================= QUICK INFO ================= */}

//                 <View style={styles.card}>

//                     <Text style={styles.cardTitle}>
//                         Quick Information
//                     </Text>

//                     <View style={styles.row}>
//                         <FeatherIcon
//                             name="user"
//                             size={18}
//                             color={colors.primary}
//                         />

//                         <View style={styles.info}>
//                             <Text style={styles.label}>
//                                 Owner Name
//                             </Text>

//                             <Text style={styles.value}>
//                                 {vendor.ownerName}
//                             </Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon
//                             name="phone"
//                             size={18}
//                             color={colors.primary}
//                         />

//                         <View style={styles.info}>
//                             <Text style={styles.label}>
//                                 Mobile Number
//                             </Text>

//                             <Text style={styles.value}>
//                                 {vendor.mobile}
//                             </Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon
//                             name="calendar"
//                             size={18}
//                             color={colors.primary}
//                         />

//                         <View style={styles.info}>
//                             <Text style={styles.label}>
//                                 Registered On
//                             </Text>

//                             <Text style={styles.value}>
//                                 {vendor.registeredOn}
//                             </Text>
//                         </View>
//                     </View>

//                 </View>

//                 {/* ================= CONTACT INFORMATION ================= */}

//                 <View style={styles.card}>
//                     <Text style={styles.cardTitle}>Contact Information</Text>

//                     <View style={styles.row}>
//                         <FeatherIcon name="phone" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Primary Mobile</Text>
//                             <Text style={styles.value}>{vendor.mobile}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="mail" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Email Address</Text>
//                             <Text style={styles.value}>demo@gmail.com</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="globe" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Website</Text>
//                             <Text style={styles.value}>www.apexfinserv.com</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* ================= BUSINESS INFORMATION ================= */}

//                 <View style={styles.card}>
//                     <Text style={styles.cardTitle}>Business Information</Text>

//                     <View style={styles.row}>
//                         <FeatherIcon name="briefcase" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Business Type</Text>
//                             <Text style={styles.value}>Retailer</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="dollar-sign" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Monthly Business</Text>
//                             <Text style={styles.value}>₹5–10 Lakh</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="grid" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Services</Text>
//                             <Text style={styles.value}>
//                                 AEPS, DMT, BBPS, Recharge, Wallet
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* ================= ADDRESS ================= */}

//                 <View style={styles.card}>
//                     <Text style={styles.cardTitle}>Address Information</Text>

//                     <View style={styles.row}>
//                         <FeatherIcon name="map-pin" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Business Address</Text>
//                             <Text style={styles.value}>
//                                 Sector 15, Noida
//                             </Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="map" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>State</Text>
//                             <Text style={styles.value}>Uttar Pradesh</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="navigation" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Pincode</Text>
//                             <Text style={styles.value}>201301</Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* ================= REGISTRATION ================= */}

//                 <View style={styles.card}>
//                     <Text style={styles.cardTitle}>Registration Information</Text>

//                     <View style={styles.row}>
//                         <FeatherIcon name="hash" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Vendor Code</Text>
//                             <Text style={styles.value}>{vendor.vendorCode}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="calendar" size={18} color={colors.primary} />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Registration Date</Text>
//                             <Text style={styles.value}>{vendor.registeredOn}</Text>
//                         </View>
//                     </View>

//                     <View style={styles.divider} />

//                     <View style={styles.row}>
//                         <FeatherIcon name="check-circle" size={18} color="#1B8A5A" />
//                         <View style={styles.info}>
//                             <Text style={styles.label}>Registration Status</Text>
//                             <Text style={[styles.value, { color: '#1B8A5A' }]}>
//                                 Registered
//                             </Text>
//                         </View>
//                     </View>
//                 </View>


//                 {/* ===================== KYC PROGRESS ===================== */}

//                 <View style={styles.card}>

//                     <Text style={styles.cardTitle}>
//                         KYC Verification
//                     </Text>

//                     <View style={styles.progressBackground}>
//                         <View style={styles.progressFill} />
//                     </View>

//                     <Text style={styles.progressText}>
//                         25% Completed (1 / 4 Documents)
//                     </Text>

//                     <View style={styles.divider} />

//                     <View style={styles.documentRow}>
//                         <Text style={styles.documentTitle}>PAN Card</Text>

//                         <View style={styles.pendingChip}>
//                             <Text style={styles.pendingText}>Pending</Text>
//                         </View>
//                     </View>

//                     <View style={styles.documentRow}>
//                         <Text style={styles.documentTitle}>Aadhaar Card</Text>

//                         <View style={styles.pendingChip}>
//                             <Text style={styles.pendingText}>Pending</Text>
//                         </View>
//                     </View>

//                     <View style={styles.documentRow}>
//                         <Text style={styles.documentTitle}>GST Certificate</Text>

//                         <View style={styles.successChip}>
//                             <Text style={styles.successText}>Uploaded</Text>
//                         </View>
//                     </View>

//                     <View style={styles.documentRow}>
//                         <Text style={styles.documentTitle}>Shop License</Text>

//                         <View style={styles.pendingChip}>
//                             <Text style={styles.pendingText}>Pending</Text>
//                         </View>
//                     </View>

//                 </View>

//                 {/* ===================== TIMELINE ===================== */}

//                 <View style={styles.card}>

//                     <Text style={styles.cardTitle}>
//                         Activity Timeline
//                     </Text>

//                     <View style={styles.timelineRow}>

//                         <View style={styles.timelineIcon}>
//                             <FeatherIcon
//                                 name="check"
//                                 size={15}
//                                 color="#FFFFFF"
//                             />
//                         </View>

//                         <View style={styles.timelineInfo}>
//                             <Text style={styles.timelineTitle}>
//                                 Vendor Registered
//                             </Text>

//                             <Text style={styles.timelineDate}>
//                                 20 Jul 2026
//                             </Text>
//                         </View>

//                     </View>

//                     <View style={styles.timelineLine} />

//                     <View style={styles.timelineRow}>

//                         <View
//                             style={[
//                                 styles.timelineIcon,
//                                 { backgroundColor: '#F5A623' },
//                             ]}>

//                             <FeatherIcon
//                                 name="clock"
//                                 size={15}
//                                 color="#FFFFFF"
//                             />

//                         </View>

//                         <View style={styles.timelineInfo}>

//                             <Text style={styles.timelineTitle}>
//                                 KYC Pending
//                             </Text>

//                             <Text style={styles.timelineDate}>
//                                 Waiting for document upload
//                             </Text>

//                         </View>

//                     </View>

//                 </View>

//                 {/* ===================== BUTTONS ===================== */}

//                 <TouchableOpacity
//                     activeOpacity={0.8}
//                     style={styles.editButton}>

//                     <FeatherIcon
//                         name="edit"
//                         size={18}
//                         color={colors.primary}
//                     />

//                     <Text style={styles.editButtonText}>
//                         Edit Vendor
//                     </Text>

//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     activeOpacity={0.9}
//                     onPress={() =>
//                         navigation.navigate('KycScreen', {
//                             vendor,
//                         })
//                     }>

//                     <LinearGradient
//                         colors={[
//                             colors.gradientStart,
//                             colors.gradientEnd,
//                         ]}
//                         style={styles.kycButton}>

//                         <FeatherIcon
//                             name="shield"
//                             size={18}
//                             color="#FFFFFF"
//                         />

//                         <Text style={styles.kycButtonText}>
//                             Continue KYC
//                         </Text>

//                     </LinearGradient>

//                 </TouchableOpacity>

//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         backgroundColor: colors.background,
//     },

//     header: {
//         height: 90,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: spacing.lg,
//         borderBottomLeftRadius: 22,
//         borderBottomRightRadius: 22,
//     },

//     backButton: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: 'rgba(255,255,255,0.2)',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     headerTitle: {
//         color: colors.white,
//         fontSize: 20,
//         fontWeight: '700',
//     },

//     profileCard: {
//         backgroundColor: colors.surface,
//         marginHorizontal: spacing.lg,
//         marginTop: -18,
//         borderRadius: radius.lg,
//         padding: spacing.lg,
//         alignItems: 'center',
//         elevation: 3,
//     },

//     avatar: {
//         width: 82,
//         height: 82,
//         borderRadius: 41,
//         backgroundColor: colors.primary,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     avatarText: {
//         color: colors.white,
//         fontSize: 28,
//         fontWeight: '800',
//     },

//     shopName: {
//         marginTop: 14,
//         fontSize: 22,
//         fontWeight: '700',
//         color: colors.textPrimary,
//     },

//     vendorId: {
//         marginTop: 6,
//         color: colors.textLabel,
//         fontWeight: '600',
//     },

//     badgeRow: {
//         flexDirection: 'row',
//         marginTop: 18,
//     },

//     activeBadge: {
//         flexDirection: 'row',
//         backgroundColor: '#E7F8EF',
//         paddingHorizontal: 14,
//         paddingVertical: 8,
//         borderRadius: 20,
//         alignItems: 'center',
//         marginRight: 10,
//     },

//     activeText: {
//         marginLeft: 6,
//         color: '#1B8A5A',
//         fontWeight: '700',
//     },

//     kycBadge: {
//         flexDirection: 'row',
//         backgroundColor: '#FFF4E0',
//         paddingHorizontal: 14,
//         paddingVertical: 8,
//         borderRadius: 20,
//         alignItems: 'center',
//     },

//     kycText: {
//         marginLeft: 6,
//         color: '#B7791F',
//         fontWeight: '700',
//     },

//     card: {
//         backgroundColor: colors.surface,
//         marginHorizontal: spacing.lg,
//         marginTop: spacing.lg,
//         borderRadius: radius.lg,
//         padding: spacing.lg,
//         elevation: 2,
//     },

//     cardTitle: {
//         fontSize: 18,
//         fontWeight: '700',
//         color: colors.textPrimary,
//         marginBottom: 20,
//     },

//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },

//     info: {
//         marginLeft: 16,
//         flex: 1,
//     },

//     label: {
//         color: colors.textLabel,
//         fontSize: 13,
//     },

//     value: {
//         marginTop: 4,
//         fontSize: 16,
//         fontWeight: '700',
//         color: colors.textPrimary,
//     },

//     divider: {
//         height: 1,
//         backgroundColor: '#ECECEC',
//         marginVertical: 18,
//     },
//     valueMultiline: {
//         marginTop: 4,
//         fontSize: 16,
//         fontWeight: '700',
//         color: colors.textPrimary,
//         lineHeight: 22,
//     },

//     progressBackground: {
//         height: 10,
//         borderRadius: 5,
//         backgroundColor: "#ECECEC",
//         overflow: "hidden",
//     },

//     progressFill: {
//         width: "25%",
//         height: "100%",
//         backgroundColor: "#4CAF50",
//     },

//     progressText: {
//         marginTop: 10,
//         fontWeight: "700",
//         color: colors.textPrimary,
//     },

//     documentRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 16,
//     },

//     documentTitle: {
//         fontSize: 15,
//         color: colors.textPrimary,
//         fontWeight: "600",
//     },

//     pendingChip: {
//         backgroundColor: "#FFF4E0",
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 20,
//     },

//     pendingText: {
//         color: "#B7791F",
//         fontWeight: "700",
//     },

//     successChip: {
//         backgroundColor: "#E6F8ED",
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 20,
//     },

//     successText: {
//         color: "#1B8A5A",
//         fontWeight: "700",
//     },

//     timelineRow: {
//         flexDirection: "row",
//         alignItems: "center",
//     },

//     timelineIcon: {
//         width: 34,
//         height: 34,
//         borderRadius: 17,
//         backgroundColor: "#4CAF50",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     timelineInfo: {
//         marginLeft: 15,
//         flex: 1,
//     },

//     timelineTitle: {
//         fontSize: 15,
//         fontWeight: "700",
//         color: colors.textPrimary,
//     },

//     timelineDate: {
//         marginTop: 3,
//         color: colors.textLabel,
//     },

//     timelineLine: {
//         width: 2,
//         height: 30,
//         backgroundColor: "#E5E5E5",
//         marginLeft: 16,
//         marginVertical: 6,
//     },

//     editButton: {
//         marginHorizontal: spacing.lg,
//         marginTop: 20,
//         height: 55,
//         borderRadius: 14,
//         borderWidth: 1,
//         borderColor: colors.primary,
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "row",
//     },

//     editButtonText: {
//         marginLeft: 8,
//         color: colors.primary,
//         fontWeight: "700",
//         fontSize: 16,
//     },

//     kycButton: {
//         marginHorizontal: spacing.lg,
//         marginTop: 15,
//         marginBottom: 40,
//         height: 56,
//         borderRadius: 14,
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "row",
//     },

//     kycButtonText: {
//         marginLeft: 8,
//         color: "#FFFFFF",
//         fontWeight: "700",
//         fontSize: 16,
//     },
// });












import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from '@react-native-vector-icons/feather';

import { colors, spacing, typography, radius } from '../../color/Colurs';

type Props = {
    navigation: any;
    route: any;
};

/* Local accent palette — layered on top of the existing theme so the
   base Colurs.ts file never needs to change. */
const accent = {
    successBg: '#E9F9F0',
    successText: '#12875C',
    successBorder: '#BEEFD6',
    warningBg: '#FFF6E6',
    warningText: '#B7791F',
    warningBorder: '#FCE3AE',
    iconChipBg: '#EEF2FF',
    cardBorder: '#F0F1F5',
    subtleText: '#8A8F9A',
    shadow: '#1A1F36',
};

/** Reusable elevated card shadow (works on iOS + Android) */
const cardShadow = {
    shadowColor: accent.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
};

export default function VendorDetails({ navigation, route }: Props) {
    // Later this will come from RegisteredScreen
    const vendor = route?.params?.vendor || {
        id: '1',
        vendorCode: 'IMW-1001',
        shopName: 'Apex FinServ',
        ownerName: 'Rajesh Sharma',
        mobile: '9876543210',
        registeredOn: '20 Jul 2026',
        status: 'Active',
        kycStatus: 'Pending',
    };

    const initials = vendor.shopName
        .split(' ')
        .map((i: string) => i[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}>

                {/* ================= HEADER ================= */}

                <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}>

                    <View style={styles.headerRow}>
                        <TouchableOpacity
                            style={styles.backButton}
                            activeOpacity={0.7}
                            onPress={() => navigation.goBack()}>

                            <FeatherIcon
                                name="arrow-left"
                                size={20}
                                color={colors.white}
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>
                            Vendor Details
                        </Text>

                        <TouchableOpacity
                            style={styles.backButton}
                            activeOpacity={0.7}>
                            <FeatherIcon
                                name="more-vertical"
                                size={20}
                                color={colors.white}
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>


                <View style={styles.cardContainer}>
                    {/* ================= PROFILE CARD ================= */}

                    <View style={[styles.profileCard, cardShadow]}>

                        <View style={styles.avatarRing}>
                            <LinearGradient
                                colors={[colors.gradientStart, colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {initials}
                                </Text>
                            </LinearGradient>
                        </View>

                        <Text style={styles.shopName}>
                            {vendor.shopName}
                        </Text>

                        <View style={styles.vendorIdPill}>
                            <FeatherIcon name="hash" size={12} color={accent.subtleText} />
                            <Text style={styles.vendorId}>
                                {vendor.vendorCode}
                            </Text>
                        </View>

                        {/* Status */}

                        <View style={styles.badgeRow}>

                            <View style={styles.activeBadge}>
                                <View style={styles.statusDot} />
                                <Text style={styles.activeText}>
                                    {vendor.status}
                                </Text>
                            </View>

                            <View style={styles.kycBadge}>
                                <FeatherIcon
                                    name="clock"
                                    size={13}
                                    color={accent.warningText}
                                />
                                <Text style={styles.kycText}>
                                    KYC {vendor.kycStatus}
                                </Text>
                            </View>

                        </View>

                    </View>

                    {/* ================= QUICK INFO ================= */}

                    <View style={[styles.card, cardShadow]}>

                        <Text style={styles.cardTitle}>
                            Quick Information
                        </Text>

                        <InfoRow icon="user" label="Owner Name" value={vendor.ownerName} />
                        <Divider />
                        <InfoRow icon="phone" label="Mobile Number" value={vendor.mobile} />
                        <Divider />
                        <InfoRow icon="calendar" label="Registered On" value={vendor.registeredOn} last />

                    </View>

                    {/* ================= CONTACT INFORMATION ================= */}

                    <View style={[styles.card, cardShadow]}>
                        <Text style={styles.cardTitle}>Contact Information</Text>

                        <InfoRow icon="phone" label="Primary Mobile" value={vendor.mobile} />
                        <Divider />
                        <InfoRow icon="mail" label="Email Address" value="demo@gmail.com" />
                        <Divider />
                        <InfoRow icon="globe" label="Website" value="www.apexfinserv.com" last />
                    </View>

                    {/* ================= BUSINESS INFORMATION ================= */}

                    <View style={[styles.card, cardShadow]}>
                        <Text style={styles.cardTitle}>Business Information</Text>

                        <InfoRow icon="briefcase" label="Business Type" value="Retailer" />
                        <Divider />
                        <InfoRow icon="dollar-sign" label="Monthly Business" value="₹5–10 Lakh" />
                        <Divider />
                        <InfoRow
                            icon="grid"
                            label="Services"
                            value="AEPS, DMT, BBPS, Recharge, Wallet"
                            last
                        />
                    </View>

                    {/* ================= ADDRESS ================= */}

                    <View style={[styles.card, cardShadow]}>
                        <Text style={styles.cardTitle}>Address Information</Text>

                        <InfoRow icon="map-pin" label="Business Address" value="Sector 15, Noida" />
                        <Divider />
                        <InfoRow icon="map" label="State" value="Uttar Pradesh" />
                        <Divider />
                        <InfoRow icon="navigation" label="Pincode" value="201301" last />
                    </View>

                    {/* ================= REGISTRATION ================= */}

                    <View style={[styles.card, cardShadow]}>
                        <Text style={styles.cardTitle}>Registration Information</Text>

                        <InfoRow icon="hash" label="Vendor Code" value={vendor.vendorCode} />
                        <Divider />
                        <InfoRow icon="calendar" label="Registration Date" value={vendor.registeredOn} />
                        <Divider />
                        <InfoRow
                            icon="check-circle"
                            iconColor={accent.successText}
                            iconBg={accent.successBg}
                            label="Registration Status"
                            value="Registered"
                            valueColor={accent.successText}
                            last
                        />
                    </View>


                    {/* ===================== KYC PROGRESS ===================== */}

                    <View style={[styles.card, cardShadow]}>

                        <View style={styles.progressHeaderRow}>
                            <Text style={styles.cardTitle}>
                                KYC Verification
                            </Text>
                            <Text style={styles.progressPercentBadge}>25%</Text>
                        </View>

                        <View style={styles.progressBackground}>
                            <LinearGradient
                                colors={['#34D399', '#10B981']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.progressFill}
                            />
                        </View>

                        <Text style={styles.progressText}>
                            1 of 4 documents uploaded
                        </Text>

                        <View style={styles.divider} />

                        <DocumentRow title="PAN Card" status="pending" />
                        <DocumentRow title="Aadhaar Card" status="pending" />
                        <DocumentRow title="GST Certificate" status="uploaded" />
                        <DocumentRow title="Shop License" status="pending" last />

                    </View>

                    {/* ===================== TIMELINE ===================== */}

                    <View style={[styles.card, cardShadow]}>

                        <Text style={styles.cardTitle}>
                            Activity Timeline
                        </Text>

                        <View style={styles.timelineRow}>

                            <View style={[styles.timelineIcon, { backgroundColor: accent.successText }]}>
                                <FeatherIcon
                                    name="check"
                                    size={14}
                                    color="#FFFFFF"
                                />
                            </View>

                            <View style={styles.timelineInfo}>
                                <Text style={styles.timelineTitle}>
                                    Vendor Registered
                                </Text>

                                <Text style={styles.timelineDate}>
                                    20 Jul 2026
                                </Text>
                            </View>

                        </View>

                        <View style={styles.timelineLine} />

                        <View style={styles.timelineRow}>

                            <View
                                style={[
                                    styles.timelineIcon,
                                    { backgroundColor: '#F5A623' },
                                ]}>

                                <FeatherIcon
                                    name="clock"
                                    size={14}
                                    color="#FFFFFF"
                                />

                            </View>

                            <View style={styles.timelineInfo}>

                                <Text style={styles.timelineTitle}>
                                    KYC Pending
                                </Text>

                                <Text style={styles.timelineDate}>
                                    Waiting for document upload
                                </Text>

                            </View>

                        </View>

                    </View>

                    {/* ===================== BUTTONS ===================== */}

                    <View style={styles.buttonGroup}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.editButton}>

                            <FeatherIcon
                                name="edit-2"
                                size={19}
                                color={colors.primary}
                            />

                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{ flex: 1 }}
                            onPress={() =>
                                navigation.navigate('KycScreen', {
                                    vendor,
                                })
                            }>

                            <LinearGradient
                                colors={[
                                    colors.gradientStart,
                                    colors.gradientEnd,
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.kycButton}>

                                <FeatherIcon
                                    name="shield"
                                    size={17}
                                    color="#FFFFFF"
                                />

                                <Text style={styles.kycButtonText}>
                                    Continue KYC
                                </Text>

                            </LinearGradient>

                        </TouchableOpacity>

                    </View>

                </View> 

            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------------------------------------------------------------- */
/* Small presentational helpers (kept in this file, no logic change) */
/* ---------------------------------------------------------------- */

function InfoRow({
    icon,
    label,
    value,
    iconColor,
    iconBg,
    valueColor,
    last,
}: {
    icon: string;
    label: string;
    value: string;
    iconColor?: string;
    iconBg?: string;
    valueColor?: string;
    last?: boolean;
}) {
    return (
        <View style={[styles.row, last && { marginBottom: 0 }]}>
            <View style={[styles.iconChip, iconBg ? { backgroundColor: iconBg } : null]}>
                <FeatherIcon
                    name={icon}
                    size={17}
                    color={iconColor || colors.primary}
                />
            </View>

            <View style={styles.info}>
                <Text style={styles.label}>{label}</Text>
                <Text style={[styles.value, valueColor ? { color: valueColor } : null]}>
                    {value}
                </Text>
            </View>
        </View>
    );
}

function Divider() {
    return <View style={styles.divider} />;
}

function DocumentRow({
    title,
    status,
    last,
}: {
    title: string;
    status: 'pending' | 'uploaded';
    last?: boolean;
}) {
    const isUploaded = status === 'uploaded';
    return (
        <View style={[styles.documentRow, last && { marginBottom: 0 }]}>
            <View style={styles.documentLeft}>
                <View
                    style={[
                        styles.documentDot,
                        { backgroundColor: isUploaded ? accent.successText : '#D8DCE3' },
                    ]}
                />
                <Text style={styles.documentTitle}>{title}</Text>
            </View>

            <View style={isUploaded ? styles.successChip : styles.pendingChip}>
                <Text style={isUploaded ? styles.successText : styles.pendingText}>
                    {isUploaded ? 'Uploaded' : 'Pending'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    cardContainer:{
     paddingHorizontal:1,
     paddingVertical:3,
    },
    header: {
        paddingTop: 8,
        paddingBottom: 34,
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    profileCard: {
        backgroundColor: colors.surface,
        marginHorizontal: spacing.lg,
        marginTop: -16,
        borderRadius: radius.lg,
        padding: spacing.lg,
        paddingTop: 28,
        alignItems: 'center',
    },

    avatarRing: {
        width: 92,
        height: 92,
        borderRadius: 46,
        padding: 4,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -54,
        shadowColor: accent.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 4,
    },

    avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarText: {
        color: colors.white,
        fontSize: 28,
        fontWeight: '800',
    },

    shopName: {
        marginTop: 16,
        fontSize: 21,
        fontWeight: '800',
        color: colors.textPrimary,
        letterSpacing: 0.1,
    },

    vendorIdPill: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F5F7',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },

    vendorId: {
        marginLeft: 5,
        color: accent.subtleText,
        fontWeight: '600',
        fontSize: 12.5,
    },

    badgeRow: {
        flexDirection: 'row',
        marginTop: 18,
    },

    activeBadge: {
        flexDirection: 'row',
        backgroundColor: accent.successBg,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: accent.successBorder,
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: accent.successText,
        marginRight: 7,
    },

    activeText: {
        color: accent.successText,
        fontWeight: '700',
        fontSize: 13,
    },

    kycBadge: {
        flexDirection: 'row',
        backgroundColor: accent.warningBg,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: accent.warningBorder,
    },

    kycText: {
        marginLeft: 6,
        color: accent.warningText,
        fontWeight: '700',
        fontSize: 13,
    },

    card: {
        backgroundColor: colors.surface,
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        borderRadius: radius.lg,
        padding: spacing.lg,
        borderWidth: 1,
        borderColor: accent.cardBorder,
    },

    cardTitle: {
        fontSize: 16.5,
        fontWeight: '800',
        color: colors.textPrimary,
        marginBottom: 18,
        letterSpacing: 0.1,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },

    iconChip: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: accent.iconChipBg,
        alignItems: 'center',
        justifyContent: 'center',
    },

    info: {
        marginLeft: 14,
        flex: 1,
    },

    label: {
        color: accent.subtleText,
        fontSize: 12.5,
        fontWeight: '600',
    },

    value: {
        marginTop: 4,
        fontSize: 15.5,
        fontWeight: '700',
        color: colors.textPrimary,
    },

    divider: {
        height: 1,
        backgroundColor: '#F1F2F5',
        marginVertical: 16,
    },

    valueMultiline: {
        marginTop: 4,
        fontSize: 15.5,
        fontWeight: '700',
        color: colors.textPrimary,
        lineHeight: 22,
    },

    progressHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: -6,
    },

    progressPercentBadge: {
        fontSize: 13,
        fontWeight: '800',
        color: accent.successText,
        backgroundColor: accent.successBg,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: -10,
    },

    progressBackground: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EEF0F3',
        overflow: 'hidden',
    },

    progressFill: {
        width: '25%',
        height: '100%',
        borderRadius: 4,
    },

    progressText: {
        marginTop: 10,
        fontWeight: '600',
        fontSize: 13,
        color: accent.subtleText,
    },

    documentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },

    documentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    documentDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 10,
    },

    documentTitle: {
        fontSize: 14.5,
        color: colors.textPrimary,
        fontWeight: '600',
    },

    pendingChip: {
        backgroundColor: accent.warningBg,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: accent.warningBorder,
    },

    pendingText: {
        color: accent.warningText,
        fontWeight: '700',
        fontSize: 12,
    },

    successChip: {
        backgroundColor: accent.successBg,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: accent.successBorder,
    },

    successText: {
        color: accent.successText,
        fontWeight: '700',
        fontSize: 12,
    },

    timelineRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    timelineIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    timelineInfo: {
        marginLeft: 14,
        flex: 1,
    },

    timelineTitle: {
        fontSize: 14.5,
        fontWeight: '700',
        color: colors.textPrimary,
    },

    timelineDate: {
        marginTop: 3,
        color: accent.subtleText,
        fontSize: 12.5,
        fontWeight: '500',
    },

    timelineLine: {
        width: 2,
        height: 26,
        backgroundColor: '#E9EAED',
        marginLeft: 15,
        marginVertical: 6,
    },

    buttonGroup: {
        flexDirection: 'row',
        marginHorizontal: spacing.lg,
        marginTop: 22,
        marginBottom: Platform.OS === 'ios' ? 20 : 30,
    },

    editButton: {
        width: 56,
        height: 56,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 12,
    },

    kycButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 4,
    },

    kycButtonText: {
        marginLeft: 8,
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
});