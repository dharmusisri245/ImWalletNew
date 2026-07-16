// import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   ListRenderItemInfo,
//   RefreshControl,
//   ActivityIndicator,
//   StyleSheet,
//   Animated,
//   Easing,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import FeatherIcon from '@react-native-vector-icons/feather';

// import { colors, spacing, typography, radius } from '../../color/Colurs';

// // ---------------------------------------------------------------------------
// // Types
// // ---------------------------------------------------------------------------
// type VendorStatus = 'approved' | 'pending' | 'rejected';
// type ActivityState = 'active' | 'inactive';
// type KycStatus = 'verified' | 'pending' | 'rejected';

// type FilterKey = 'all' | 'approved' | 'pending' | 'rejected' | 'active' | 'inactive';

// export interface Vendor {
//   id: string;
//   vendorCode: string;
//   shopName: string;
//   ownerName: string;
//   mobile: string;
//   registeredOn: string;
//   status: VendorStatus;
//   kyc: KycStatus;
//   activity: ActivityState;
//   avatarLabel: string;
// }

// type Props = {
//   navigation?: {
//     goBack: () => void;
//     navigate: (screen: string, params?: Record<string, unknown>) => void;
//   };
// };

// // ---------------------------------------------------------------------------
// // Status / KYC presentation maps (kept local so this file doesn't depend on
// // palette keys that may not exist yet in the shared color file)
// // ---------------------------------------------------------------------------
// const STATUS_META: Record<VendorStatus, { label: string; fg: string; bg: string; icon: string }> = {
//   approved: { label: 'Approved', fg: '#1B8A5A', bg: '#E4F7EE', icon: 'check-circle' },
//   pending: { label: 'Pending', fg: '#B7791F', bg: '#FFF4E0', icon: 'clock' },
//   rejected: { label: 'Rejected', fg: '#C0392B', bg: '#FDEAE8', icon: 'x-circle' },
// };

// const KYC_META: Record<KycStatus, { label: string; fg: string; bg: string }> = {
//   verified: { label: 'KYC Verified', fg: '#1B6FC9', bg: '#E7F1FD' },
//   pending: { label: 'KYC Pending', fg: '#B7791F', bg: '#FFF4E0' },
//   rejected: { label: 'KYC Rejected', fg: '#C0392B', bg: '#FDEAE8' },
// };

// const FILTERS: { key: FilterKey; label: string }[] = [
//   { key: 'all', label: 'All' },
//   { key: 'approved', label: 'Approved' },
//   { key: 'pending', label: 'Pending' },
//   { key: 'rejected', label: 'Rejected' },
//   { key: 'active', label: 'Active' },
//   { key: 'inactive', label: 'Inactive' },
// ];

// // ---------------------------------------------------------------------------
// // Dummy data generator (stand-in until API integration lands)
// // ---------------------------------------------------------------------------
// // const SHOP_NAMES = [
// //   'Sharma General Store', 'Krishna Mobile Point', 'City Fashion Hub', 'Green Valley Grocers',
// //   'Sunrise Electronics', 'Om Sai Medical', 'Royal Sweets & Bakery', 'Metro Hardware',
// //   'Lakshmi Textiles', 'Star Cyber Cafe', 'New Delhi Footwear', 'Annapurna Kirana Store',
// //   'Galaxy Computers', 'Shree Ram Jewellers', 'Blue Bird Stationery', 'Punjab Dhaba',
// // ];
// const SHOP_NAMES = [
//   'Apex FinServ',
//   'Elite Payment Solutions',
//   'UrbanPay Merchant',
//   'Smart Finance Hub',
//   'Capital Connect',
//   'Digital Wallet Zone',
//   'PayLink Merchant',
//   'FinCore Services',
//   'NovaPay Solutions',
//   'MerchantOne Finance',
//   'TrustPay Center',
//   'Cashless India Store',
//   'EasyPOS Merchant',
//   'BlueChip Payments',
//   'Prime Wallet Services',
//   'Velocity FinTech',
//   'InstantPay Merchant',
//   'SecureCash Solutions',
//   'PayNest Services',
//   'Infinity FinTech',
// ];

// const OWNER_NAMES = [
//   'Rajesh Sharma', 'Anita Verma', 'Mohammed Irfan', 'Priya Nair', 'Suresh Kumar',
//   'Deepa Iyer', 'Vikram Singh', 'Neha Gupta', 'Arjun Reddy', 'Kavita Joshi',
//   'Sanjay Mehta', 'Pooja Agarwal', 'Ramesh Yadav', 'Sunita Das', 'Amit Patel', 'Farhan Khan',
// ];

// function pad(n: number, len = 4) {
//   return n.toString().padStart(len, '0');
// }

// function makeVendor(index: number): Vendor {
//   const statuses: VendorStatus[] = ['approved', 'pending', 'rejected'];
//   const kycs: KycStatus[] = ['verified', 'pending', 'rejected'];
//   const activities: ActivityState[] = ['active', 'inactive'];

//   const shopName = SHOP_NAMES[index % SHOP_NAMES.length];
//   const ownerName = OWNER_NAMES[index % OWNER_NAMES.length];
//   const status = statuses[index % statuses.length];
//   // KYC roughly follows status but varies enough to look realistic
//   const kyc = status === 'approved' ? 'verified' : kycs[(index + 1) % kycs.length];
//   const activity = activities[index % 5 === 0 ? 1 : 0];

//   const day = (index % 27) + 1;
//   const month = ((index * 3) % 12) + 1;

//   return {
//     id: `vendor-${index}`,
//     vendorCode: `IMW-${pad(1000 + index)}`,
//     shopName,
//     ownerName,
//     mobile: `9${(800000000 + index * 137).toString().slice(0, 9)}`,
//     registeredOn: `${pad(day, 2)}/${pad(month, 2)}/2026`,
//     status,
//     kyc,
//     activity,
//     avatarLabel: shopName
//       .split(' ')
//       .slice(0, 2)
//       .map((w) => w[0])
//       .join('')
//       .toUpperCase(),
//   };
// }

// const PAGE_SIZE = 10;
// const TOTAL_DUMMY_VENDORS = 46;
// const ALL_DUMMY_VENDORS: Vendor[] = Array.from({ length: TOTAL_DUMMY_VENDORS }, (_, i) => makeVendor(i));

// // ---------------------------------------------------------------------------
// // Reusable: Screen header (gradient, back button, title + subtitle)
// // ---------------------------------------------------------------------------
// function ScreenHeader({
//   title,
//   subtitle,
//   onBack,
// }: {
//   title: string;
//   subtitle: string;
//   onBack?: () => void;
// }) {
//   return (
//     <LinearGradient
//       colors={[colors.gradientStart, colors.gradientEnd]}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.header}
//     >
//       <TouchableOpacity style={styles.backButton} onPress={onBack} hitSlop={10}>
//         <FeatherIcon name="arrow-left" size={20} color={colors.white} />
//       </TouchableOpacity>

//       <View style={styles.headerTextWrap}>
//         <Text style={styles.headerTitle}>{title}</Text>
//         <Text style={styles.headerSubtitle}>{subtitle}</Text>
//       </View>

//       <View style={styles.headerBadge}>
//         <FeatherIcon name="users" size={18} color={colors.white} />
//       </View>
//     </LinearGradient>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Summary stat card
// // ---------------------------------------------------------------------------
// function StatCard({
//   icon,
//   label,
//   value,
//   accent,
// }: {
//   icon: React.ComponentProps<typeof FeatherIcon>['name'];
//   label: string;
//   value: number;
//   accent: string;
// }) {
//   return (
//     <View style={styles.statCard}>
//       <View style={[styles.statIconWrap, { backgroundColor: `${accent}1A` }]}>
//         <FeatherIcon name={icon} size={16} color={accent} />
//       </View>
//       <Text style={styles.statValue}>{value}</Text>
//       <Text style={styles.statLabel} numberOfLines={1}>
//         {label}
//       </Text>
//     </View>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Search bar
// // ---------------------------------------------------------------------------
// function SearchBar({
//   value,
//   onChangeText,
//   onClear,
// }: {
//   value: string;
//   onChangeText: (t: string) => void;
//   onClear: () => void;
// }) {
//   return (
//     <View style={styles.searchWrap}>
//       <FeatherIcon name="search" size={17} color={colors.textLabel} />
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search by name, shop, ID or mobile"
//         placeholderTextColor={colors.textLabel}
//         value={value}
//         onChangeText={onChangeText}
//         returnKeyType="search"
//         autoCapitalize="none"
//       />
//       {value.length > 0 && (
//         <TouchableOpacity onPress={onClear} hitSlop={8}>
//           <FeatherIcon name="x" size={16} color={colors.textLabel} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Filter chip row (horizontally scrollable)
// // ---------------------------------------------------------------------------
// function FilterChips({
//   active,
//   onSelect,
// }: {
//   active: FilterKey;
//   onSelect: (key: FilterKey) => void;
// }) {
//   return (
//     <FlatList
//       data={FILTERS}
//       horizontal
//       keyExtractor={(item) => item.key}
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={styles.chipRow}
//       renderItem={({ item }) => {
//         const isActive = item.key === active;
//         return (
//           <TouchableOpacity
//             style={[styles.chip, isActive && styles.chipActive]}
//             onPress={() => onSelect(item.key)}
//             activeOpacity={0.8}
//           >
//             <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{item.label}</Text>
//           </TouchableOpacity>
//         );
//       }}
//     />
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: small badge pill (status / kyc)
// // ---------------------------------------------------------------------------
// function Badge({ label, fg, bg, icon }: { label: string; fg: string; bg: string; icon?: string }) {
//   return (
//     <View style={[styles.badge, { backgroundColor: bg }]}>
//       {icon ? <FeatherIcon name={icon as any} size={11} color={fg} style={styles.badgeIcon} /> : null}
//       <Text style={[styles.badgeText, { color: fg }]} numberOfLines={1}>
//         {label}
//       </Text>
//     </View>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Vendor list card
// // ---------------------------------------------------------------------------
// function VendorCard({ vendor, onPress }: { vendor: Vendor; onPress: (vendor: Vendor) => void }) {
//   const statusMeta = STATUS_META[vendor.status];
//   const kycMeta = KYC_META[vendor.kyc];

//   return (
//     <TouchableOpacity style={styles.vendorCard} activeOpacity={0.75} onPress={() => onPress(vendor)}>
//       <View style={styles.vendorTopRow}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>{vendor.avatarLabel}</Text>
//         </View>

//         <View style={styles.vendorInfo}>
//           <Text style={styles.shopName} numberOfLines={1}>
//             {vendor.shopName}
//           </Text>
//           <Text style={styles.vendorCode}>{vendor.vendorCode}</Text>
//         </View>

//         <View style={styles.activityDotWrap}>
//           <View
//             style={[
//               styles.activityDot,
//               { backgroundColor: vendor.activity === 'active' ? '#1B8A5A' : colors.disabled },
//             ]}
//           />
//           <Text style={styles.activityLabel}>
//             {vendor.activity === 'active' ? 'Active' : 'Inactive'}
//           </Text>
//         </View>

//         <FeatherIcon name="chevron-right" size={19} color={colors.textLabel} style={styles.chevron} />
//       </View>

//       <View style={styles.divider} />

//       <View style={styles.vendorMetaRow}>
//         <View style={styles.metaItem}>
//           <FeatherIcon name="user" size={13} color={colors.textLabel} />
//           <Text style={styles.metaText} numberOfLines={1}>
//             {vendor.ownerName}
//           </Text>
//         </View>
//         <View style={styles.metaItem}>
//           <FeatherIcon name="phone" size={13} color={colors.textLabel} />
//           <Text style={styles.metaText}>{vendor.mobile}</Text>
//         </View>
//       </View>

//       <View style={styles.vendorMetaRow}>
//         <View style={styles.metaItem}>
//           <FeatherIcon name="calendar" size={13} color={colors.textLabel} />
//           <Text style={styles.metaText}>{vendor.registeredOn}</Text>
//         </View>
//       </View>

//       <View style={styles.badgeRow}>
//         <Badge label={statusMeta.label} fg={statusMeta.fg} bg={statusMeta.bg} icon={statusMeta.icon} />
//         <Badge label={kycMeta.label} fg={kycMeta.fg} bg={kycMeta.bg} />
//       </View>
//     </TouchableOpacity>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Shimmering skeleton placeholder card
// // ---------------------------------------------------------------------------
// function SkeletonCard() {
//   const shimmer = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const loop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(shimmer, {
//           toValue: 1,
//           duration: 900,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//         Animated.timing(shimmer, {
//           toValue: 0,
//           duration: 900,
//           easing: Easing.inOut(Easing.ease),
//           useNativeDriver: true,
//         }),
//       ]),
//     );
//     loop.start();
//     return () => loop.stop();
//   }, [shimmer]);

//   const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] });

//   return (
//     <View style={styles.vendorCard}>
//       <View style={styles.vendorTopRow}>
//         <Animated.View style={[styles.avatar, styles.skeletonBlock, { opacity }]} />
//         <View style={styles.vendorInfo}>
//           <Animated.View style={[styles.skeletonLine, styles.skeletonLineWide, { opacity }]} />
//           <Animated.View style={[styles.skeletonLine, styles.skeletonLineNarrow, { opacity }]} />
//         </View>
//       </View>
//       <View style={styles.divider} />
//       <Animated.View style={[styles.skeletonLine, styles.skeletonLineWide, { opacity }]} />
//       <Animated.View style={[styles.skeletonLine, styles.skeletonLineMedium, { opacity }]} />
//       <View style={styles.badgeRow}>
//         <Animated.View style={[styles.skeletonBadge, { opacity }]} />
//         <Animated.View style={[styles.skeletonBadge, { opacity }]} />
//       </View>
//     </View>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Empty state
// // ---------------------------------------------------------------------------
// function EmptyState({ onReset }: { onReset: () => void }) {
//   return (
//     <View style={styles.emptyWrap}>
//       <View style={styles.emptyIllustration}>
//         <FeatherIcon name="inbox" size={40} color={colors.primary} />
//       </View>
//       <Text style={styles.emptyTitle}>No Vendors Found</Text>
//       <Text style={styles.emptySubtitle}>
//         Try adjusting your search or filters to find what you're looking for.
//       </Text>
//       <TouchableOpacity style={styles.emptyResetButton} onPress={onReset} activeOpacity={0.8}>
//         <Text style={styles.emptyResetText}>Reset filters</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // ---------------------------------------------------------------------------
// // Reusable: Footer loader (infinite scroll indicator)
// // ---------------------------------------------------------------------------
// function ListFooter({ loadingMore, hasMore }: { loadingMore: boolean; hasMore: boolean }) {
//   if (!hasMore) {
//     return (
//       <View style={styles.footerWrap}>
//         <Text style={styles.footerEndText}>You've reached the end of the list</Text>
//       </View>
//     );
//   }
//   if (!loadingMore) return null;
//   return (
//     <View style={styles.footerWrap}>
//       <ActivityIndicator size="small" color={colors.primary} />
//       <Text style={styles.footerLoadingText}>Loading more vendors…</Text>
//     </View>
//   );
// }

// // ---------------------------------------------------------------------------
// // Main screen
// // ---------------------------------------------------------------------------
// export default function RegisteredScreen({ navigation }: Props) {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const [searchText, setSearchText] = useState('');
//   const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
//   const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

//   // Simulate an initial network fetch on mount.
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1100);
//     return () => clearTimeout(timer);
//   }, []);

//   const stats = useMemo(() => {
//     const total = ALL_DUMMY_VENDORS.length;
//     const approved = ALL_DUMMY_VENDORS.filter((v) => v.status === 'approved').length;
//     const pendingKyc = ALL_DUMMY_VENDORS.filter((v) => v.kyc === 'pending').length;
//     const rejected = ALL_DUMMY_VENDORS.filter((v) => v.status === 'rejected').length;
//     return { total, approved, pendingKyc, rejected };
//   }, []);

//   const filteredVendors = useMemo(() => {
//     const query = searchText.trim().toLowerCase();

//     return ALL_DUMMY_VENDORS.filter((vendor) => {
//       const matchesQuery =
//         query.length === 0 ||
//         vendor.shopName.toLowerCase().includes(query) ||
//         vendor.ownerName.toLowerCase().includes(query) ||
//         vendor.vendorCode.toLowerCase().includes(query) ||
//         vendor.mobile.includes(query);

//       const matchesFilter =
//         activeFilter === 'all' ||
//         vendor.status === activeFilter ||
//         vendor.activity === activeFilter;

//       return matchesQuery && matchesFilter;
//     });
//   }, [searchText, activeFilter]);

//   const visibleVendors = filteredVendors.slice(0, visibleCount);
//   const hasMore = visibleCount < filteredVendors.length;

//   const handleRefresh = useCallback(() => {
//     setRefreshing(true);
//     setVisibleCount(PAGE_SIZE);
//     setTimeout(() => setRefreshing(false), 900);
//   }, []);

//   const handleLoadMore = useCallback(() => {
//     if (loadingMore || loading || !hasMore) return;
//     setLoadingMore(true);
//     setTimeout(() => {
//       setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredVendors.length));
//       setLoadingMore(false);
//     }, 700);
//   }, [loadingMore, loading, hasMore, filteredVendors.length]);

//   const handleResetFilters = useCallback(() => {
//     setSearchText('');
//     setActiveFilter('all');
//     setVisibleCount(PAGE_SIZE);
//   }, []);

//   const handleVendorPress = useCallback(
//     (vendor: Vendor) => {
//       navigation?.navigate('VendorDetailsScreen', { vendorId: vendor.id });
//     },
//     [navigation],
//   );

//   const handleRegisterPress = useCallback(() => {
//     navigation?.navigate('RegisterScreen');
//   }, [navigation]);

//   const renderItem = ({ item }: ListRenderItemInfo<Vendor>) => (
//     <VendorCard vendor={item} onPress={handleVendorPress} />
//   );

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <ScreenHeader
//         title="Registered Vendors"
//         subtitle="Manage all registered vendors"
//         onBack={() => navigation?.goBack()}
//       />

//       <FlatList
//         data={loading ? [] : visibleVendors}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.primary]} tintColor={colors.primary} />
//         }
//         onEndReachedThreshold={0.4}
//         onEndReached={handleLoadMore}
//         ListHeaderComponent={
//           <>
//             {/* Statistics */}
//             <View style={styles.statsRow}>
//               <StatCard icon="users" label="Total Vendors" value={stats.total} accent={colors.primary} />
//               <StatCard icon="check-circle" label="Approved" value={stats.approved} accent="#1B8A5A" />
//               <StatCard icon="clock" label="Pending KYC" value={stats.pendingKyc} accent="#B7791F" />
//               <StatCard icon="x-circle" label="Rejected" value={stats.rejected} accent="#C0392B" />
//             </View>

//             {/* Search */}
//             <SearchBar value={searchText} onChangeText={setSearchText} onClear={() => setSearchText('')} />

//             {/* Filters */}
//             <FilterChips active={activeFilter} onSelect={setActiveFilter} />

//             {/* Loading skeletons replace the list while the initial fetch is in flight */}
//             {loading && (
//               <View style={styles.skeletonGroup}>
//                 {Array.from({ length: 4 }).map((_, i) => (
//                   <SkeletonCard key={`skeleton-${i}`} />
//                 ))}
//               </View>
//             )}

//             {!loading && filteredVendors.length > 0 && (
//               <Text style={styles.resultsCount}>
//                 {filteredVendors.length} vendor{filteredVendors.length === 1 ? '' : 's'} found
//               </Text>
//             )}
//           </>
//         }
//         ListEmptyComponent={!loading ? <EmptyState onReset={handleResetFilters} /> : null}
//         ListFooterComponent={
//           !loading && filteredVendors.length > 0 ? (
//             <ListFooter loadingMore={loadingMore} hasMore={hasMore} />
//           ) : null
//         }
//       />

//       {/* Floating action button */}
//       <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={handleRegisterPress}>
//         <LinearGradient
//           colors={[colors.gradientStart, colors.gradientEnd]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.fabGradient}
//         >
//           <FeatherIcon name="plus" size={18} color={colors.white} />
//           <Text style={styles.fabText}>Register Vendor</Text>
//         </LinearGradient>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// // ---------------------------------------------------------------------------
// // Styles
// // ---------------------------------------------------------------------------
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: colors.surface,
//   },

//   // ---- Header -------------------------------------------------------
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//     paddingTop: spacing.md,
//     paddingBottom: spacing.lg,
//     borderBottomLeftRadius: radius.lg,
//     borderBottomRightRadius: radius.lg,
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.25,
//     shadowRadius: 12,
//     elevation: 6,
//     zIndex: 2,
//   },
//   backButton: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     marginRight: spacing.md,
//   },
//   headerTextWrap: {
//     flex: 1,
//   },
//   headerTitle: {
//     fontSize: 19,
//     fontWeight: '800',
//     color: colors.white,
//     letterSpacing: 0.2,
//   },
//   headerSubtitle: {
//     fontSize: 12.5,
//     color: 'rgba(255,255,255,0.85)',
//     marginTop: 3,
//     fontWeight: '500',
//   },
//   headerBadge: {
//     width: 38,
//     height: 38,
//     borderRadius: 19,
//     backgroundColor: 'rgba(255,255,255,0.18)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   // ---- List / layout --------------------------------------------------
//   listContent: {
//     backgroundColor: colors.background,
//     paddingHorizontal: spacing.lg,
//     paddingTop: spacing.lg,
//     paddingBottom: 120,
//     flexGrow: 1,
//   },

//   // ---- Stats ----------------------------------------------------------
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: spacing.lg,
//   },
//   statCard: {
//     flexBasis: '23.5%',
//     backgroundColor: colors.surface,
//     borderRadius: radius.md,
//     paddingVertical: spacing.sm,
//     paddingHorizontal: 6,
//     borderWidth: 1,
//     borderColor: '#EFEAF8',
//     alignItems: 'flex-start',
//     shadowColor: '#2B1E4D',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     elevation: 1,
//   },
//   statIconWrap: {
//     width: 26,
//     height: 26,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 6,
//   },
//   statValue: {
//     fontSize: 17,
//     fontWeight: '800',
//     color: colors.textPrimary,
//   },
//   statLabel: {
//     fontSize: 10,
//     color: colors.textLabel,
//     marginTop: 2,
//     fontWeight: '600',
//   },

//   // ---- Search -----------------------------------------------------------
//   searchWrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: colors.surface,
//     borderRadius: radius.pill,
//     paddingHorizontal: spacing.md,
//     paddingVertical: 11,
//     borderWidth: 1,
//     borderColor: '#EFEAF8',
//     marginBottom: spacing.md,
//     shadowColor: '#2B1E4D',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.04,
//     shadowRadius: 8,
//     elevation: 1,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 13.5,
//     color: colors.textPrimary,
//     marginLeft: spacing.sm,
//     paddingVertical: 0,
//   },

//   // ---- Filter chips -------------------------------------------------
//   chipRow: {
//     paddingBottom: spacing.md,
//   },
//   chip: {
//     paddingHorizontal: spacing.md,
//     paddingVertical: 8,
//     borderRadius: radius.pill,
//     backgroundColor: colors.surface,
//     borderWidth: 1,
//     borderColor: colors.border,
//     marginRight: spacing.sm,
//   },
//   chipActive: {
//     backgroundColor: colors.primary,
//     borderColor: colors.primary,
//   },
//   chipText: {
//     fontSize: 12.5,
//     fontWeight: '600',
//     color: colors.textLabel,
//   },
//   chipTextActive: {
//     color: colors.white,
//   },

//   // ---- Results count -------------------------------------------------
//   resultsCount: {
//     fontSize: 12,
//     color: colors.textLabel,
//     fontWeight: '600',
//     marginBottom: spacing.sm,
//   },

//   // ---- Vendor card -------------------------------------------------
//   vendorCard: {
//     backgroundColor: colors.surface,
//     borderRadius: radius.lg,
//     padding: spacing.md,
//     marginBottom: spacing.md,
//     borderWidth: 1,
//     borderColor: '#EFEAF8',
//     shadowColor: '#2B1E4D',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 1,
//   },
//   vendorTopRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 14,
//     backgroundColor: colors.chipBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: spacing.sm,
//   },
//   avatarText: {
//     fontSize: 14,
//     fontWeight: '800',
//     color: colors.primary,
//   },
//   vendorInfo: {
//     flex: 1,
//   },
//   shopName: {
//     fontSize: 14.5,
//     fontWeight: '700',
//     color: colors.textPrimary,
//   },
//   vendorCode: {
//     fontSize: 11.5,
//     color: colors.textLabel,
//     marginTop: 2,
//     fontWeight: '600',
//   },
//   activityDotWrap: {
//     alignItems: 'center',
//     marginRight: spacing.sm,
//   },
//   activityDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginBottom: 3,
//   },
//   activityLabel: {
//     fontSize: 9.5,
//     color: colors.textLabel,
//     fontWeight: '600',
//   },
//   chevron: {
//     marginLeft: 2,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#F2EFF9',
//     marginVertical: spacing.sm,
//   },
//   vendorMetaRow: {
//     flexDirection: 'row',
//     marginBottom: 6,
//   },
//   metaItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   metaText: {
//     fontSize: 12.5,
//     color: colors.textLabel,
//     marginLeft: 6,
//     fontWeight: '500',
//     flexShrink: 1,
//   },
//   badgeRow: {
//     flexDirection: 'row',
//     marginTop: spacing.xs,
//   },
//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     borderRadius: radius.pill,
//     marginRight: spacing.xs,
//   },
//   badgeIcon: {
//     marginRight: 4,
//   },
//   badgeText: {
//     fontSize: 10.5,
//     fontWeight: '700',
//   },

//   // ---- Skeleton -------------------------------------------------------
//   skeletonGroup: {
//     marginTop: spacing.xs,
//   },
//   skeletonBlock: {
//     backgroundColor: colors.disabled,
//   },
//   skeletonLine: {
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: colors.disabled,
//     marginTop: 8,
//   },
//   skeletonLineWide: {
//     width: '70%',
//   },
//   skeletonLineMedium: {
//     width: '55%',
//   },
//   skeletonLineNarrow: {
//     width: '40%',
//   },
//   skeletonBadge: {
//     width: 84,
//     height: 20,
//     borderRadius: radius.pill,
//     backgroundColor: colors.disabled,
//     marginRight: spacing.xs,
//     marginTop: spacing.xs,
//   },

//   // ---- Empty state -------------------------------------------------
//   emptyWrap: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: spacing.lg * 2,
//     paddingHorizontal: spacing.lg,
//   },
//   emptyIllustration: {
//     width: 84,
//     height: 84,
//     borderRadius: 42,
//     backgroundColor: colors.chipBg,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: spacing.md,
//   },
//   emptyTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: colors.textPrimary,
//     marginBottom: 6,
//   },
//   emptySubtitle: {
//     fontSize: 13,
//     color: colors.textLabel,
//     textAlign: 'center',
//     lineHeight: 19,
//     marginBottom: spacing.lg,
//   },
//   emptyResetButton: {
//     paddingHorizontal: spacing.lg,
//     paddingVertical: 10,
//     borderRadius: radius.pill,
//     backgroundColor: colors.chipBg,
//   },
//   emptyResetText: {
//     fontSize: 12.5,
//     fontWeight: '700',
//     color: colors.primary,
//   },

//   // ---- Footer / infinite scroll ---------------------------------------
//   footerWrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: spacing.lg,
//   },
//   footerLoadingText: {
//     fontSize: 12,
//     color: colors.textLabel,
//     marginLeft: spacing.sm,
//     fontWeight: '500',
//   },
//   footerEndText: {
//     fontSize: 11.5,
//     color: colors.textLabel,
//     fontWeight: '500',
//   },

//   // ---- Floating action button ------------------------------------------
//   fab: {
//     position: 'absolute',
//     right: spacing.lg,
//     bottom: spacing.lg,
//     borderRadius: radius.pill,
//     shadowColor: colors.primary,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.35,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   fabGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: spacing.lg,
//     paddingVertical: 14,
//     borderRadius: radius.pill,
//   },
//   fabText: {
//     color: colors.white,
//     fontSize: typography.button,
//     fontWeight: '700',
//     marginLeft: spacing.sm,
//   },
// });





import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FeatherIcon from '@react-native-vector-icons/feather';

import { colors, spacing, typography, radius } from '../../color/Colurs';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type VendorStatus = 'approved' | 'pending' | 'rejected';
type ActivityState = 'active' | 'inactive';
type KycStatus = 'verified' | 'pending' | 'rejected';

type FilterKey = 'all' | 'approved' | 'pending' | 'rejected' | 'active' | 'inactive';

export interface Vendor {
  id: string;
  vendorCode: string;
  shopName: string;
  ownerName: string;
  mobile: string;
  registeredOn: string;
  status: VendorStatus;
  kyc: KycStatus;
  activity: ActivityState;
  avatarLabel: string;
}

type Props = {
  navigation?: {
    goBack: () => void;
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
};

// ---------------------------------------------------------------------------
// Status / KYC presentation maps (kept local so this file doesn't depend on
// palette keys that may not exist yet in the shared color file)
// ---------------------------------------------------------------------------
const STATUS_META: Record<VendorStatus, { label: string; fg: string; bg: string; icon: string }> = {
  approved: { label: 'Approved', fg: '#1B8A5A', bg: '#E4F7EE', icon: 'check-circle' },
  pending: { label: 'Pending', fg: '#B7791F', bg: '#FFF4E0', icon: 'clock' },
  rejected: { label: 'Rejected', fg: '#C0392B', bg: '#FDEAE8', icon: 'x-circle' },
};

const KYC_META: Record<KycStatus, { label: string; fg: string; bg: string }> = {
  verified: { label: 'KYC Verified', fg: '#1B6FC9', bg: '#E7F1FD' },
  pending: { label: 'KYC Pending', fg: '#B7791F', bg: '#FFF4E0' },
  rejected: { label: 'KYC Rejected', fg: '#C0392B', bg: '#FDEAE8' },
};

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'approved', label: 'Approved' },
  { key: 'pending', label: 'Pending' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

// ---------------------------------------------------------------------------
// Dummy data generator (stand-in until API integration lands)
// ---------------------------------------------------------------------------
// const SHOP_NAMES = [
//   'Sharma General Store', 'Krishna Mobile Point', 'City Fashion Hub', 'Green Valley Grocers',
//   'Sunrise Electronics', 'Om Sai Medical', 'Royal Sweets & Bakery', 'Metro Hardware',
//   'Lakshmi Textiles', 'Star Cyber Cafe', 'New Delhi Footwear', 'Annapurna Kirana Store',
//   'Galaxy Computers', 'Shree Ram Jewellers', 'Blue Bird Stationery', 'Punjab Dhaba',
// ];
const SHOP_NAMES = [
  'Apex FinServ',
  'Elite Payment Solutions',
  'UrbanPay Merchant',
  'Smart Finance Hub',
  'Capital Connect',
  'Digital Wallet Zone',
  'PayLink Merchant',
  'FinCore Services',
  'NovaPay Solutions',
  'MerchantOne Finance',
  'TrustPay Center',
  'Cashless India Store',
  'EasyPOS Merchant',
  'BlueChip Payments',
  'Prime Wallet Services',
  'Velocity FinTech',
  'InstantPay Merchant',
  'SecureCash Solutions',
  'PayNest Services',
  'Infinity FinTech',
];

const OWNER_NAMES = [
  'Rajesh Sharma', 'Anita Verma', 'Mohammed Irfan', 'Priya Nair', 'Suresh Kumar',
  'Deepa Iyer', 'Vikram Singh', 'Neha Gupta', 'Arjun Reddy', 'Kavita Joshi',
  'Sanjay Mehta', 'Pooja Agarwal', 'Ramesh Yadav', 'Sunita Das', 'Amit Patel', 'Farhan Khan',
];

function pad(n: number, len = 4) {
  return n.toString().padStart(len, '0');
}

function makeVendor(index: number): Vendor {
  const statuses: VendorStatus[] = ['approved', 'pending', 'rejected'];
  const kycs: KycStatus[] = ['verified', 'pending', 'rejected'];
  const activities: ActivityState[] = ['active', 'inactive'];

  const shopName = SHOP_NAMES[index % SHOP_NAMES.length];
  const ownerName = OWNER_NAMES[index % OWNER_NAMES.length];
  const status = statuses[index % statuses.length];
  // KYC roughly follows status but varies enough to look realistic
  const kyc = status === 'approved' ? 'verified' : kycs[(index + 1) % kycs.length];
  const activity = activities[index % 5 === 0 ? 1 : 0];

  const day = (index % 27) + 1;
  const month = ((index * 3) % 12) + 1;

  return {
    id: `vendor-${index}`,
    vendorCode: `IMW-${pad(1000 + index)}`,
    shopName,
    ownerName,
    mobile: `9${(800000000 + index * 137).toString().slice(0, 9)}`,
    registeredOn: `${pad(day, 2)}/${pad(month, 2)}/2026`,
    status,
    kyc,
    activity,
    avatarLabel: shopName
      .split(' ')
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase(),
  };
}

const PAGE_SIZE = 10;
const TOTAL_DUMMY_VENDORS = 46;
const ALL_DUMMY_VENDORS: Vendor[] = Array.from({ length: TOTAL_DUMMY_VENDORS }, (_, i) => makeVendor(i));

// ---------------------------------------------------------------------------
// Reusable: Screen header (gradient, back button, title + subtitle)
// ---------------------------------------------------------------------------
function ScreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle: string;
  onBack?: () => void;
}) {
  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack} hitSlop={10}>
        <FeatherIcon name="arrow-left" size={20} color={colors.white} />
      </TouchableOpacity>

      <View style={styles.headerTextWrap}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>

      <View style={styles.headerBadge}>
        <FeatherIcon name="users" size={18} color={colors.white} />
      </View>
    </LinearGradient>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Summary stat card
// ---------------------------------------------------------------------------
function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentProps<typeof FeatherIcon>['name'];
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIconWrap, { backgroundColor: `${accent}1A` }]}>
        <FeatherIcon name={icon} size={16} color={accent} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Search bar
// ---------------------------------------------------------------------------
function SearchBar({
  value,
  onChangeText,
  onClear,
}: {
  value: string;
  onChangeText: (t: string) => void;
  onClear: () => void;
}) {
  return (
    <View style={styles.searchWrap}>
      <FeatherIcon name="search" size={17} color={colors.textLabel} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, shop, ID or mobile"
        placeholderTextColor={colors.textLabel}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} hitSlop={8}>
          <FeatherIcon name="x" size={16} color={colors.textLabel} />
        </TouchableOpacity>
      )}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Filter chip row (horizontally scrollable)
// ---------------------------------------------------------------------------
function FilterChips({
  active,
  onSelect,
}: {
  active: FilterKey;
  onSelect: (key: FilterKey) => void;
}) {
  return (
    <FlatList
      data={FILTERS}
      horizontal
      keyExtractor={(item) => item.key}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipRow}
      renderItem={({ item }) => {
        const isActive = item.key === active;
        return (
          <TouchableOpacity
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(item.key)}
            activeOpacity={0.8}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>{item.label}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Reusable: small badge pill (status / kyc)
// ---------------------------------------------------------------------------
function Badge({ label, fg, bg, icon }: { label: string; fg: string; bg: string; icon?: string }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {icon ? <FeatherIcon name={icon as any} size={11} color={fg} style={styles.badgeIcon} /> : null}
      <Text style={[styles.badgeText, { color: fg }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Vendor list card
// ---------------------------------------------------------------------------
function VendorCard({ vendor, onPress }: { vendor: Vendor; onPress: (vendor: Vendor) => void }) {
  const statusMeta = STATUS_META[vendor.status];
  const kycMeta = KYC_META[vendor.kyc];

  return (
    <TouchableOpacity style={styles.vendorCard} activeOpacity={0.75} onPress={() => onPress(vendor)}>
      <View style={styles.vendorTopRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{vendor.avatarLabel}</Text>
        </View>

        <View style={styles.vendorInfo}>
          <Text style={styles.shopName} numberOfLines={1}>
            {vendor.shopName}
          </Text>
          <Text style={styles.vendorCode}>{vendor.vendorCode}</Text>
        </View>

        <View style={styles.activityDotWrap}>
          <View
            style={[
              styles.activityDot,
              { backgroundColor: vendor.activity === 'active' ? '#1B8A5A' : colors.disabled },
            ]}
          />
          <Text style={styles.activityLabel}>
            {vendor.activity === 'active' ? 'Active' : 'Inactive'}
          </Text>
        </View>

        <FeatherIcon name="chevron-right" size={19} color={colors.textLabel} style={styles.chevron} />
      </View>

      <View style={styles.divider} />

      <View style={styles.vendorMetaRow}>
        <View style={styles.metaItem}>
          <FeatherIcon name="user" size={13} color={colors.textLabel} />
          <Text style={styles.metaText} numberOfLines={1}>
            {vendor.ownerName}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <FeatherIcon name="phone" size={13} color={colors.textLabel} />
          <Text style={styles.metaText}>{vendor.mobile}</Text>
        </View>
      </View>

      <View style={styles.vendorMetaRow}>
        <View style={styles.metaItem}>
          <FeatherIcon name="calendar" size={13} color={colors.textLabel} />
          <Text style={styles.metaText}>{vendor.registeredOn}</Text>
        </View>
      </View>

      <View style={styles.badgeRow}>
        <Badge label={statusMeta.label} fg={statusMeta.fg} bg={statusMeta.bg} icon={statusMeta.icon} />
        <Badge label={kycMeta.label} fg={kycMeta.fg} bg={kycMeta.bg} />
      </View>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Shimmering skeleton placeholder card
// ---------------------------------------------------------------------------
function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const opacity = shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] });

  return (
    <View style={styles.vendorCard}>
      <View style={styles.vendorTopRow}>
        <Animated.View style={[styles.avatar, styles.skeletonBlock, { opacity }]} />
        <View style={styles.vendorInfo}>
          <Animated.View style={[styles.skeletonLine, styles.skeletonLineWide, { opacity }]} />
          <Animated.View style={[styles.skeletonLine, styles.skeletonLineNarrow, { opacity }]} />
        </View>
      </View>
      <View style={styles.divider} />
      <Animated.View style={[styles.skeletonLine, styles.skeletonLineWide, { opacity }]} />
      <Animated.View style={[styles.skeletonLine, styles.skeletonLineMedium, { opacity }]} />
      <View style={styles.badgeRow}>
        <Animated.View style={[styles.skeletonBadge, { opacity }]} />
        <Animated.View style={[styles.skeletonBadge, { opacity }]} />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Empty state
// ---------------------------------------------------------------------------
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIllustration}>
        <FeatherIcon name="inbox" size={40} color={colors.primary} />
      </View>
      <Text style={styles.emptyTitle}>No Vendors Found</Text>
      <Text style={styles.emptySubtitle}>
        Try adjusting your search or filters to find what you're looking for.
      </Text>
      <TouchableOpacity style={styles.emptyResetButton} onPress={onReset} activeOpacity={0.8}>
        <Text style={styles.emptyResetText}>Reset filters</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Reusable: Footer loader (infinite scroll indicator)
// ---------------------------------------------------------------------------
function ListFooter({ loadingMore, hasMore }: { loadingMore: boolean; hasMore: boolean }) {
  if (!hasMore) {
    return (
      <View style={styles.footerWrap}>
        <Text style={styles.footerEndText}>You've reached the end of the list</Text>
      </View>
    );
  }
  if (!loadingMore) return null;
  return (
    <View style={styles.footerWrap}>
      <ActivityIndicator size="small" color={colors.primary} />
      <Text style={styles.footerLoadingText}>Loading more vendors…</Text>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Main screen
// ---------------------------------------------------------------------------
export default function RegisteredScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Simulate an initial network fetch on mount.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const total = ALL_DUMMY_VENDORS.length;
    const approved = ALL_DUMMY_VENDORS.filter((v) => v.status === 'approved').length;
    const pendingKyc = ALL_DUMMY_VENDORS.filter((v) => v.kyc === 'pending').length;
    const rejected = ALL_DUMMY_VENDORS.filter((v) => v.status === 'rejected').length;
    return { total, approved, pendingKyc, rejected };
  }, []);

  const filteredVendors = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return ALL_DUMMY_VENDORS.filter((vendor) => {
      const matchesQuery =
        query.length === 0 ||
        vendor.shopName.toLowerCase().includes(query) ||
        vendor.ownerName.toLowerCase().includes(query) ||
        vendor.vendorCode.toLowerCase().includes(query) ||
        vendor.mobile.includes(query);

      const matchesFilter =
        activeFilter === 'all' ||
        vendor.status === activeFilter ||
        vendor.activity === activeFilter;

      return matchesQuery && matchesFilter;
    });
  }, [searchText, activeFilter]);

  const visibleVendors = filteredVendors.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVendors.length;

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setVisibleCount(PAGE_SIZE);
    setTimeout(() => setRefreshing(false), 900);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || loading || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredVendors.length));
      setLoadingMore(false);
    }, 700);
  }, [loadingMore, loading, hasMore, filteredVendors.length]);

  const handleResetFilters = useCallback(() => {
    setSearchText('');
    setActiveFilter('all');
    setVisibleCount(PAGE_SIZE);
  }, []);

  const handleVendorPress = useCallback(
    (vendor: Vendor) => {
      navigation?.navigate('VendorDetailsScreen', { vendorId: vendor.id });
    },
    [navigation],
  );

  const handleRegisterPress = useCallback(() => {
    navigation?.navigate('RegisterScreen');
  }, [navigation]);

  const renderItem = ({ item }: ListRenderItemInfo<Vendor>) => (
    <VendorCard vendor={item} onPress={handleVendorPress} />
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScreenHeader
        title="Registered Vendors"
        subtitle="Manage all registered vendors"
        onBack={() => navigation?.goBack()}
      />

      <FlatList
        data={loading ? [] : visibleVendors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[colors.primary]} tintColor={colors.primary} />
        }
        onEndReachedThreshold={0.4}
        onEndReached={handleLoadMore}
        ListHeaderComponent={
          <>
            {/* Statistics */}
            <View style={styles.statsRow}>
              <StatCard icon="users" label="Total Vendors" value={stats.total} accent={colors.primary} />
              <StatCard icon="check-circle" label="Approved" value={stats.approved} accent="#1B8A5A" />
              <StatCard icon="clock" label="Pending KYC" value={stats.pendingKyc} accent="#B7791F" />
              <StatCard icon="x-circle" label="Rejected" value={stats.rejected} accent="#C0392B" />
            </View>

            {/* Search */}
            <SearchBar value={searchText} onChangeText={setSearchText} onClear={() => setSearchText('')} />

            {/* Filters */}
            <FilterChips active={activeFilter} onSelect={setActiveFilter} />

            {/* Loading skeletons replace the list while the initial fetch is in flight */}
            {loading && (
              <View style={styles.skeletonGroup}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))}
              </View>
            )}

            {!loading && filteredVendors.length > 0 && (
              <Text style={styles.resultsCount}>
                {filteredVendors.length} vendor{filteredVendors.length === 1 ? '' : 's'} found
              </Text>
            )}
          </>
        }
        ListEmptyComponent={!loading ? <EmptyState onReset={handleResetFilters} /> : null}
        ListFooterComponent={
          !loading && filteredVendors.length > 0 ? (
            <ListFooter loadingMore={loadingMore} hasMore={hasMore} />
          ) : null
        }
      />

      {/* Floating action button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={handleRegisterPress}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <FeatherIcon name="plus" size={18} color={colors.white} />
          <Text style={styles.fabText}>Register Vendor</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
    
  },

  // ---- Header -------------------------------------------------------
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 2,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginRight: spacing.md,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 3,
    fontWeight: '500',
  },
  headerBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ---- List / layout --------------------------------------------------
  listContent: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 120,
    flexGrow: 1,
  },

  // ---- Stats ----------------------------------------------------------
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    flexBasis: '23.5%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#EFEAF8',
    alignItems: 'flex-start',
    shadowColor: '#2B1E4D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  statIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textLabel,
    marginTop: 2,
    fontWeight: '600',
  },

  // ---- Search -----------------------------------------------------------
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#EFEAF8',
    marginBottom: spacing.md,
    shadowColor: '#2B1E4D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    paddingVertical: 0,
  },

  // ---- Filter chips -------------------------------------------------
  chipRow: {
    paddingBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textLabel,
  },
  chipTextActive: {
    color: colors.white,
  },

  // ---- Results count -------------------------------------------------
  resultsCount: {
    fontSize: 12,
    color: colors.textLabel,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },

  // ---- Vendor card -------------------------------------------------
  vendorCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#EFEAF8',
    shadowColor: '#2B1E4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  vendorTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
  },
  vendorInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  vendorCode: {
    fontSize: 11.5,
    color: colors.textLabel,
    marginTop: 2,
    fontWeight: '600',
  },
  activityDotWrap: {
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 3,
  },
  activityLabel: {
    fontSize: 9.5,
    color: colors.textLabel,
    fontWeight: '600',
  },
  chevron: {
    marginLeft: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2EFF9',
    marginVertical: spacing.sm,
  },
  vendorMetaRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaText: {
    fontSize: 12.5,
    color: colors.textLabel,
    marginLeft: 6,
    fontWeight: '500',
    flexShrink: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginRight: spacing.xs,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
  },

  // ---- Skeleton -------------------------------------------------------
  skeletonGroup: {
    marginTop: spacing.xs,
  },
  skeletonBlock: {
    backgroundColor: colors.disabled,
  },
  skeletonLine: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.disabled,
    marginTop: 8,
  },
  skeletonLineWide: {
    width: '70%',
  },
  skeletonLineMedium: {
    width: '55%',
  },
  skeletonLineNarrow: {
    width: '40%',
  },
  skeletonBadge: {
    width: 84,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.disabled,
    marginRight: spacing.xs,
    marginTop: spacing.xs,
  },

  // ---- Empty state -------------------------------------------------
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.lg * 2,
    paddingHorizontal: spacing.lg,
  },
  emptyIllustration: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.chipBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textLabel,
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: spacing.lg,
  },
  emptyResetButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.chipBg,
  },
  emptyResetText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.primary,
  },

  // ---- Footer / infinite scroll ---------------------------------------
  footerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
  footerLoadingText: {
    fontSize: 12,
    color: colors.textLabel,
    marginLeft: spacing.sm,
    fontWeight: '500',
  },
  footerEndText: {
    fontSize: 11.5,
    color: colors.textLabel,
    fontWeight: '500',
  },

  // ---- Floating action button ------------------------------------------
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    borderRadius: radius.pill,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  fabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    borderRadius: radius.pill,
  },
  fabText: {
    color: colors.white,
    fontSize: typography.button,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
});