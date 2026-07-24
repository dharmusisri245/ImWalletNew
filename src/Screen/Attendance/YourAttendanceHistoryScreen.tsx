// import React, { useMemo, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   SectionList,
//   Modal,
//   TextInput,
//   RefreshControl,
//   Platform,
//   StatusBar,
//   Dimensions,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// // If your project doesn't have @expo/vector-icons, swap these for
// // react-native-vector-icons or your own icon set — usage is identical.
// // import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import Ionicons from '@react-native-vector-icons/ionicons';
// import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

// // ─────────────────────────────────────────────────────────────
// // Types
// // ─────────────────────────────────────────────────────────────

// export type AttendanceType = 'check-in' | 'check-out';

// export interface AttendanceRecord {
//   id: string;
//   employeeId: string;
//   employeeName: string;
//   type: AttendanceType;
//   photoUri: string;
//   latitude: number;
//   longitude: number;
//   address: string;
//   distanceFromOfficeMeters?: number;
//   insideOfficeRadius?: boolean;
//   synced: boolean;
//   timestamp: string; // ISO string
// }

// type DateFilter = 'today' | 'week' | 'month' | 'custom';
// type TypeFilter = 'all' | 'check-in' | 'check-out';

// interface AttendanceHistoryScreenProps {
//   records?: AttendanceRecord[];
//   onRecordPress?: (record: AttendanceRecord) => void;
//   onRefresh?: () => Promise<void> | void;
// }

// // ─────────────────────────────────────────────────────────────
// // Sample data (matches the shape from //Attendance Saved log)
// // Replace with data from your store / API / SQLite table.
// // ─────────────────────────────────────────────────────────────

// const SAMPLE_RECORDS: AttendanceRecord[] = [
//   {
//     id: '1784793822726',
//     employeeId: 'EMP-4521',
//     employeeName: 'Dharmendra Gupta',
//     type: 'check-out',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018448435204777225.jpg',
//     latitude: 28.620947,
//     longitude: 77.37794,
//     address:
//       '91springboard, A Block, Sector 63, A-130, Noida, Uttar Pradesh, India',
//     distanceFromOfficeMeters: undefined,
//     insideOfficeRadius: undefined,
//     synced: false,
//     timestamp: '2026-07-23T08:03:41.756Z',
//   },
//   {
//     id: '1784790000001',
//     employeeId: 'EMP-4521',
//     employeeName: 'Dharmendra Gupta',
//     type: 'check-in',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000001.jpg',
//     latitude: 28.62101,
//     longitude: 77.37788,
//     address:
//       '91springboard, A Block, Sector 63, A-130, Noida, Uttar Pradesh, India',
//     distanceFromOfficeMeters: 42,
//     insideOfficeRadius: true,
//     synced: true,
//     timestamp: '2026-07-23T03:31:10.100Z',
//   },
//   {
//     id: '1784690000002',
//     employeeId: 'EMP-3312',
//     employeeName: 'Ananya Sharma',
//     type: 'check-in',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000002.jpg',
//     latitude: 28.6304,
//     longitude: 77.2177,
//     address: 'Connaught Place, New Delhi, Delhi, India',
//     distanceFromOfficeMeters: 890,
//     insideOfficeRadius: false,
//     synced: true,
//     timestamp: '2026-07-22T03:58:02.000Z',
//   },
//   {
//     id: '1784690000003',
//     employeeId: 'EMP-3312',
//     employeeName: 'Ananya Sharma',
//     type: 'check-out',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000003.jpg',
//     latitude: 28.6304,
//     longitude: 77.2177,
//     address: 'Connaught Place, New Delhi, Delhi, India',
//     distanceFromOfficeMeters: 910,
//     insideOfficeRadius: false,
//     synced: true,
//     timestamp: '2026-07-22T12:32:44.000Z',
//   },
//   {
//     id: '1784500000004',
//     employeeId: 'EMP-1187',
//     employeeName: 'Rohit Verma',
//     type: 'check-in',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000004.jpg',
//     latitude: 28.6209,
//     longitude: 77.3779,
//     address: '91springboard, A Block, Sector 63, Noida, Uttar Pradesh, India',
//     distanceFromOfficeMeters: 12,
//     insideOfficeRadius: true,
//     synced: true,
//     timestamp: '2026-07-18T03:29:12.000Z',
//   },
// ];

// // ─────────────────────────────────────────────────────────────
// // Design tokens (premium, muted enterprise palette)
// // ─────────────────────────────────────────────────────────────

// const COLORS = {
//   bg: '#F4F6F9',
//   surface: '#FFFFFF',
//   border: '#E7EAF0',
//   text: '#12141C',
//   textMuted: '#6B7280',
//   textFaint: '#9AA1AE',
//   primary: '#3454D1',
//   primarySoft: '#EAEEFC',
//   success: '#12875C',
//   successSoft: '#E4F6EE',
//   warning: '#B5730A',
//   warningSoft: '#FBF0DD',
//   danger: '#C2402C',
//   dangerSoft: '#FBEAE7',
//   chipBg: '#EFF1F5',
// };

// const { width: SCREEN_W } = Dimensions.get('window');

// // ─────────────────────────────────────────────────────────────
// // Date helpers
// // ─────────────────────────────────────────────────────────────

// const startOfDay = (d: Date) => {
//   const x = new Date(d);
//   x.setHours(0, 0, 0, 0);
//   return x;
// };

// const startOfWeek = (d: Date) => {
//   const x = startOfDay(d);
//   const day = x.getDay(); // 0 = Sunday
//   const diff = (day + 6) % 7; // make Monday the start
//   x.setDate(x.getDate() - diff);
//   return x;
// };

// const startOfMonth = (d: Date) => {
//   const x = startOfDay(d);
//   x.setDate(1);
//   return x;
// };

// const formatDayLabel = (isoDate: string) => {
//   const date = new Date(isoDate);
//   const today = startOfDay(new Date());
//   const target = startOfDay(date);
//   const diffDays = Math.round(
//     (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
//   );
//   if (diffDays === 0) return 'Today';
//   if (diffDays === 1) return 'Yesterday';
//   return date.toLocaleDateString('en-IN', {
//     weekday: 'short',
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//   });
// };

// const formatTime = (isoDate: string) =>
//   new Date(isoDate).toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   });

// // ─────────────────────────────────────────────────────────────
// // Small UI atoms
// // ─────────────────────────────────────────────────────────────

// const TypeBadge: React.FC<{ type: AttendanceType }> = ({ type }) => {
//   const isIn = type === 'check-in';
//   return (
//     <View
//       style={[
//         styles.badge,
//         { backgroundColor: isIn ? COLORS.successSoft : COLORS.warningSoft },
//       ]}
//     >
//       <Ionicons
//         name={isIn ? 'log-in-outline' : 'log-out-outline'}
//         size={12}
//         color={isIn ? COLORS.success : COLORS.warning}
//       />
//       <Text
//         style={[
//           styles.badgeText,
//           { color: isIn ? COLORS.success : COLORS.warning },
//         ]}
//       >
//         {isIn ? 'Check-in' : 'Check-out'}
//       </Text>
//     </View>
//   );
// };

// const SyncBadge: React.FC<{ synced: boolean }> = ({ synced }) => (
//   <View
//     style={[
//       styles.syncPill,
//       { backgroundColor: synced ? COLORS.successSoft : COLORS.dangerSoft },
//     ]}
//   >
//     <View
//       style={[
//         styles.dot,
//         { backgroundColor: synced ? COLORS.success : COLORS.danger },
//       ]}
//     />
//     <Text
//       style={[
//         styles.syncText,
//         { color: synced ? COLORS.success : COLORS.danger },
//       ]}
//     >
//       {synced ? 'Synced' : 'Pending sync'}
//     </Text>
//   </View>
// );

// const Chip: React.FC<{
//   label: string;
//   active: boolean;
//   onPress: () => void;
//   icon?: keyof typeof Ionicons.glyphMap;
// }> = ({ label, active, onPress, icon }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     activeOpacity={0.8}
//     style={[styles.chip, active && styles.chipActive]}
//   >
//     {icon && (
//       <Ionicons
//         name={icon}
//         size={13}
//         color={active ? '#fff' : COLORS.textMuted}
//         style={{ marginRight: 4 }}
//       />
//     )}
//     <Text style={[styles.chipText, active && styles.chipTextActive]}>
//       {label}
//     </Text>
//   </TouchableOpacity>
// );

// // ─────────────────────────────────────────────────────────────
// // Attendance card
// // ─────────────────────────────────────────────────────────────

// const AttendanceCard: React.FC<{
//   record: AttendanceRecord;
//   onPress?: (r: AttendanceRecord) => void;
// }> = ({ record, onPress }) => {
//   const hasDistance = typeof record.distanceFromOfficeMeters === 'number';

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       activeOpacity={0.85}
//       onPress={() => onPress?.(record)}
//     >
//       <Image
//         source={{ uri: record.photoUri }}
//         style={styles.thumb}
//         defaultSource={undefined}
//       />

//       <View style={styles.cardBody}>
//         <View style={styles.cardTopRow}>
//           <Text style={styles.employeeName} numberOfLines={1}>
//             {record.employeeName}
//           </Text>
//           <Text style={styles.timeText}>{formatTime(record.timestamp)}</Text>
//         </View>

//         <Text style={styles.employeeId}>{record.employeeId}</Text>

//         <View style={styles.metaRow}>
//           <TypeBadge type={record.type} />
//           <SyncBadge synced={record.synced} />
//         </View>

//         <View style={styles.addressRow}>
//           <Ionicons
//             name="location-outline"
//             size={13}
//             color={COLORS.textFaint}
//             style={{ marginTop: 1 }}
//           />
//           <Text style={styles.addressText} numberOfLines={2}>
//             {record.address}
//           </Text>
//         </View>

//         <View style={styles.geoRow}>
//           {hasDistance ? (
//             <View style={styles.geoPill}>
//               <MaterialDesignIcons
//                 name={record.insideOfficeRadius ? 'map-check-outline' : 'map-marker-alert-outline'}
//                 size={13}
//                 color={record.insideOfficeRadius ? COLORS.success : COLORS.warning}
//               />
//               <Text
//                 style={[
//                   styles.geoText,
//                   {
//                     color: record.insideOfficeRadius
//                       ? COLORS.success
//                       : COLORS.warning,
//                   },
//                 ]}
//               >
//                 {record.distanceFromOfficeMeters}m from office ·{' '}
//                 {record.insideOfficeRadius ? 'Inside radius' : 'Outside radius'}
//               </Text>
//             </View>
//           ) : (
//             <View style={styles.geoPillMuted}>
//               <MaterialDesignIcons
//                 name="map-marker-question-outline"
//                 size={13}
//                 color={COLORS.textFaint}
//               />
//               <Text style={styles.geoTextMuted}>Distance not calculated</Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// // ─────────────────────────────────────────────────────────────
// // Filter sheet (weekly / monthly / date-wise)
// // ─────────────────────────────────────────────────────────────

// const FilterSheet: React.FC<{
//   visible: boolean;
//   onClose: () => void;
//   dateFilter: DateFilter;
//   setDateFilter: (f: DateFilter) => void;
//   typeFilter: TypeFilter;
//   setTypeFilter: (f: TypeFilter) => void;
//   customStart: Date | null;
//   customEnd: Date | null;
//   setCustomStart: (d: Date | null) => void;
//   setCustomEnd: (d: Date | null) => void;
// }> = ({
//   visible,
//   onClose,
//   dateFilter,
//   setDateFilter,
//   typeFilter,
//   setTypeFilter,
//   customStart,
//   customEnd,
//   setCustomStart,
//   setCustomEnd,
// }) => {
//   // Lightweight custom-range input as text fields (YYYY-MM-DD) to avoid
//   // pulling in a native date-picker dependency. Swap for
//   // @react-native-community/datetimepicker if you already use it.
//   const [startText, setStartText] = useState(
//     customStart ? customStart.toISOString().slice(0, 10) : ''
//   );
//   const [endText, setEndText] = useState(
//     customEnd ? customEnd.toISOString().slice(0, 10) : ''
//   );

//   const applyCustomRange = () => {
//     const s = startText ? new Date(startText) : null;
//     const e = endText ? new Date(endText) : null;
//     setCustomStart(s && !isNaN(s.getTime()) ? s : null);
//     setCustomEnd(e && !isNaN(e.getTime()) ? e : null);
//     setDateFilter('custom');
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <View style={styles.sheetOverlay}>
//         <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
//         <View style={styles.sheet}>
//           <View style={styles.sheetHandle} />
//           <Text style={styles.sheetTitle}>Filter attendance</Text>

//           <Text style={styles.sheetLabel}>Period</Text>
//           <View style={styles.wrapRow}>
//             <Chip
//               label="Today"
//               active={dateFilter === 'today'}
//               onPress={() => setDateFilter('today')}
//               icon="today-outline"
//             />
//             <Chip
//               label="This week"
//               active={dateFilter === 'week'}
//               onPress={() => setDateFilter('week')}
//               icon="calendar-outline"
//             />
//             <Chip
//               label="This month"
//               active={dateFilter === 'month'}
//               onPress={() => setDateFilter('month')}
//               icon="calendar-number-outline"
//             />
//           </View>

//           <Text style={[styles.sheetLabel, { marginTop: 18 }]}>
//             Custom date range
//           </Text>
//           <View style={styles.rangeRow}>
//             <TextInput
//               value={startText}
//               onChangeText={setStartText}
//               placeholder="Start · YYYY-MM-DD"
//               placeholderTextColor={COLORS.textFaint}
//               style={styles.rangeInput}
//             />
//             <Text style={{ color: COLORS.textFaint, marginHorizontal: 6 }}>
//               →
//             </Text>
//             <TextInput
//               value={endText}
//               onChangeText={setEndText}
//               placeholder="End · YYYY-MM-DD"
//               placeholderTextColor={COLORS.textFaint}
//               style={styles.rangeInput}
//             />
//           </View>
//           <TouchableOpacity style={styles.applyRangeBtn} onPress={applyCustomRange}>
//             <Text style={styles.applyRangeBtnText}>Apply custom range</Text>
//           </TouchableOpacity>

//           <Text style={[styles.sheetLabel, { marginTop: 18 }]}>
//             Record type
//           </Text>
//           <View style={styles.wrapRow}>
//             <Chip
//               label="All"
//               active={typeFilter === 'all'}
//               onPress={() => setTypeFilter('all')}
//             />
//             <Chip
//               label="Check-in"
//               active={typeFilter === 'check-in'}
//               onPress={() => setTypeFilter('check-in')}
//               icon="log-in-outline"
//             />
//             <Chip
//               label="Check-out"
//               active={typeFilter === 'check-out'}
//               onPress={() => setTypeFilter('check-out')}
//               icon="log-out-outline"
//             />
//           </View>

//           <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
//             <Text style={styles.doneBtnText}>Done</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// // ─────────────────────────────────────────────────────────────
// // Main screen
// // ─────────────────────────────────────────────────────────────

// const YourAttendanceHistoryScreen: React.FC<AttendanceHistoryScreenProps> = ({
//   records = SAMPLE_RECORDS,
//   onRecordPress,
//   onRefresh,
// }) => {
//   const [search, setSearch] = useState('');
//   const [dateFilter, setDateFilter] = useState<DateFilter>('week');
//   const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
//   const [customStart, setCustomStart] = useState<Date | null>(null);
//   const [customEnd, setCustomEnd] = useState<Date | null>(null);
//   const [sheetVisible, setSheetVisible] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);

//   const handleRefresh = useCallback(async () => {
//     if (!onRefresh) return;
//     setRefreshing(true);
//     await onRefresh();
//     setRefreshing(false);
//   }, [onRefresh]);

//   const filteredRecords = useMemo(() => {
//     const now = new Date();
//     let lowerBound: Date | null = null;
//     let upperBound: Date | null = null;

//     if (dateFilter === 'today') {
//       lowerBound = startOfDay(now);
//     } else if (dateFilter === 'week') {
//       lowerBound = startOfWeek(now);
//     } else if (dateFilter === 'month') {
//       lowerBound = startOfMonth(now);
//     } else if (dateFilter === 'custom') {
//       lowerBound = customStart ? startOfDay(customStart) : null;
//       upperBound = customEnd ? startOfDay(customEnd) : null;
//     }

//     return records.filter((r) => {
//       const t = new Date(r.timestamp);

//       if (lowerBound && t < lowerBound) return false;
//       if (upperBound) {
//         const upperEnd = new Date(upperBound);
//         upperEnd.setHours(23, 59, 59, 999);
//         if (t > upperEnd) return false;
//       }
//       if (typeFilter !== 'all' && r.type !== typeFilter) return false;

//       if (search.trim()) {
//         const q = search.trim().toLowerCase();
//         const matches =
//           r.employeeName.toLowerCase().includes(q) ||
//           r.employeeId.toLowerCase().includes(q);
//         if (!matches) return false;
//       }
//       return true;
//     });
//   }, [records, dateFilter, typeFilter, customStart, customEnd, search]);

//   const sections = useMemo(() => {
//     const sorted = [...filteredRecords].sort(
//       (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//     );
//     const map = new Map<string, AttendanceRecord[]>();
//     sorted.forEach((r) => {
//       const key = startOfDay(new Date(r.timestamp)).toISOString();
//       if (!map.has(key)) map.set(key, []);
//       map.get(key)!.push(r);
//     });
//     return Array.from(map.entries()).map(([key, data]) => ({
//       title: formatDayLabel(key),
//       data,
//     }));
//   }, [filteredRecords]);

//   const stats = useMemo(() => {
//     const total = filteredRecords.length;
//     const checkIns = filteredRecords.filter((r) => r.type === 'check-in').length;
//     const checkOuts = filteredRecords.filter((r) => r.type === 'check-out').length;
//     const pending = filteredRecords.filter((r) => !r.synced).length;
//     return { total, checkIns, checkOuts, pending };
//   }, [filteredRecords]);

//   const periodLabel =
//     dateFilter === 'today'
//       ? 'Today'
//       : dateFilter === 'week'
//       ? 'This week'
//       : dateFilter === 'month'
//       ? 'This month'
//       : customStart && customEnd
//       ? `${customStart.toLocaleDateString('en-IN')} – ${customEnd.toLocaleDateString('en-IN')}`
//       : 'Custom range';

//   return (
//     <SafeAreaView style={styles.safeArea} edges={['top']}>
//       <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Attendance history</Text>
//           <Text style={styles.headerSubtitle}>{periodLabel}</Text>
//         </View>
//         <TouchableOpacity
//           style={styles.filterBtn}
//           onPress={() => setSheetVisible(true)}
//           activeOpacity={0.85}
//         >
//           <Ionicons name="options-outline" size={18} color={COLORS.primary} />
//         </TouchableOpacity>
//       </View>

//       {/* Search */}
//       <View style={styles.searchWrap}>
//         <Ionicons name="search-outline" size={16} color={COLORS.textFaint} />
//         <TextInput
//           value={search}
//           onChangeText={setSearch}
//           placeholder="Search employee name or ID"
//           placeholderTextColor={COLORS.textFaint}
//           style={styles.searchInput}
//         />
//         {search.length > 0 && (
//           <TouchableOpacity onPress={() => setSearch('')}>
//             <Ionicons name="close-circle" size={16} color={COLORS.textFaint} />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Quick period chips */}
//       <View style={styles.quickChipsRow}>
//         <Chip
//           label="Today"
//           active={dateFilter === 'today'}
//           onPress={() => setDateFilter('today')}
//         />
//         <Chip
//           label="Weekly"
//           active={dateFilter === 'week'}
//           onPress={() => setDateFilter('week')}
//         />
//         <Chip
//           label="Monthly"
//           active={dateFilter === 'month'}
//           onPress={() => setDateFilter('month')}
//         />
//         <Chip
//           label="Date-wise"
//           active={dateFilter === 'custom'}
//           onPress={() => setSheetVisible(true)}
//           icon="calendar-clear-outline"
//         />
//       </View>

//       {/* Stats summary */}
//       <View style={styles.statsRow}>
//         <View style={styles.statCard}>
//           <Text style={styles.statValue}>{stats.total}</Text>
//           <Text style={styles.statLabel}>Total</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={[styles.statValue, { color: COLORS.success }]}>
//             {stats.checkIns}
//           </Text>
//           <Text style={styles.statLabel}>Check-ins</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={[styles.statValue, { color: COLORS.warning }]}>
//             {stats.checkOuts}
//           </Text>
//           <Text style={styles.statLabel}>Check-outs</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Text style={[styles.statValue, { color: COLORS.danger }]}>
//             {stats.pending}
//           </Text>
//           <Text style={styles.statLabel}>Pending sync</Text>
//         </View>
//       </View>

//       {/* List */}
//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <AttendanceCard record={item} onPress={onRecordPress} />
//         )}
//         renderSectionHeader={({ section }) => (
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionHeaderText}>{section.title}</Text>
//             <Text style={styles.sectionHeaderCount}>
//               {section.data.length} record{section.data.length !== 1 ? 's' : ''}
//             </Text>
//           </View>
//         )}
//         contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
//         stickySectionHeadersEnabled={false}
//         refreshControl={
//           onRefresh ? (
//             <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
//           ) : undefined
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyWrap}>
//             <MaterialDesignIcons
//               name="calendar-remove-outline"
//               size={40}
//               color={COLORS.textFaint}
//             />
//             <Text style={styles.emptyTitle}>No records found</Text>
//             <Text style={styles.emptySubtitle}>
//               Try a different period or clear your search.
//             </Text>
//           </View>
//         }
//       />

//       <FilterSheet
//         visible={sheetVisible}
//         onClose={() => setSheetVisible(false)}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//         typeFilter={typeFilter}
//         setTypeFilter={setTypeFilter}
//         customStart={customStart}
//         customEnd={customEnd}
//         setCustomStart={setCustomStart}
//         setCustomEnd={setCustomEnd}
//       />
//     </SafeAreaView>
//   );
// };

// export default YourAttendanceHistoryScreen;

// // ─────────────────────────────────────────────────────────────
// // Styles
// // ─────────────────────────────────────────────────────────────

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: Platform.OS === 'android' ? 12 : 4,
//     paddingBottom: 8,
//   },
//   headerTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: COLORS.text,
//     letterSpacing: -0.3,
//   },
//   headerSubtitle: {
//     fontSize: 13,
//     color: COLORS.textMuted,
//     marginTop: 2,
//   },
//   filterBtn: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: COLORS.primarySoft,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   searchWrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     backgroundColor: COLORS.surface,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingHorizontal: 12,
//     height: 42,
//     marginBottom: 10,
//   },
//   searchInput: {
//     flex: 1,
//     marginLeft: 8,
//     fontSize: 14,
//     color: COLORS.text,
//     paddingVertical: 0,
//   },
//   quickChipsRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     marginBottom: 12,
//     gap: 8,
//   },
//   statsRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     marginBottom: 14,
//     gap: 8,
//   },
//   statCard: {
//     flex: 1,
//     backgroundColor: COLORS.surface,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.text,
//   },
//   statLabel: {
//     fontSize: 11,
//     color: COLORS.textMuted,
//     marginTop: 2,
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'baseline',
//     marginTop: 14,
//     marginBottom: 8,
//   },
//   sectionHeaderText: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: COLORS.text,
//   },
//   sectionHeaderCount: {
//     fontSize: 12,
//     color: COLORS.textFaint,
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.surface,
//     borderRadius: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     padding: 12,
//     marginBottom: 10,
//     shadowColor: '#0F172A',
//     shadowOpacity: 0.04,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 1,
//   },
//   thumb: {
//     width: 56,
//     height: 56,
//     borderRadius: 12,
//     backgroundColor: COLORS.chipBg,
//     marginRight: 12,
//   },
//   cardBody: {
//     flex: 1,
//   },
//   cardTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   employeeName: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: COLORS.text,
//     flexShrink: 1,
//     marginRight: 8,
//   },
//   timeText: {
//     fontSize: 12,
//     color: COLORS.textMuted,
//     fontVariant: ['tabular-nums'],
//   },
//   employeeId: {
//     fontSize: 12,
//     color: COLORS.textFaint,
//     marginTop: 1,
//     marginBottom: 6,
//   },
//   metaRow: {
//     flexDirection: 'row',
//     gap: 6,
//     marginBottom: 6,
//   },
//   badge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 999,
//     gap: 4,
//   },
//   badgeText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   syncPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 999,
//     gap: 5,
//   },
//   dot: {
//     width: 5,
//     height: 5,
//     borderRadius: 3,
//   },
//   syncText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   addressRow: {
//     flexDirection: 'row',
//     gap: 4,
//     marginBottom: 6,
//   },
//   addressText: {
//     fontSize: 12,
//     color: COLORS.textMuted,
//     flex: 1,
//     lineHeight: 16,
//   },
//   geoRow: {
//     flexDirection: 'row',
//   },
//   geoPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   geoText: {
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   geoPillMuted: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   geoTextMuted: {
//     fontSize: 11,
//     color: COLORS.textFaint,
//     fontStyle: 'italic',
//   },
//   emptyWrap: {
//     alignItems: 'center',
//     paddingTop: 80,
//   },
//   emptyTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: COLORS.text,
//     marginTop: 10,
//   },
//   emptySubtitle: {
//     fontSize: 12,
//     color: COLORS.textMuted,
//     marginTop: 4,
//   },
//   // Filter sheet
//   sheetOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(15, 23, 42, 0.35)',
//     justifyContent: 'flex-end',
//   },
//   sheet: {
//     backgroundColor: COLORS.surface,
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 28,
//     maxHeight: '85%',
//   },
//   sheetHandle: {
//     width: 40,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: COLORS.border,
//     alignSelf: 'center',
//     marginBottom: 14,
//   },
//   sheetTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.text,
//     marginBottom: 14,
//   },
//   sheetLabel: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: COLORS.textMuted,
//     textTransform: 'uppercase',
//     letterSpacing: 0.4,
//     marginBottom: 8,
//   },
//   wrapRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   chip: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 999,
//     backgroundColor: COLORS.chipBg,
//   },
//   chipActive: {
//     backgroundColor: COLORS.primary,
//   },
//   chipText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: COLORS.textMuted,
//   },
//   chipTextActive: {
//     color: '#fff',
//   },
//   rangeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rangeInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     fontSize: 13,
//     color: COLORS.text,
//   },
//   applyRangeBtn: {
//     marginTop: 10,
//     backgroundColor: COLORS.primarySoft,
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: 'center',
//   },
//   applyRangeBtnText: {
//     color: COLORS.primary,
//     fontSize: 13,
//     fontWeight: '700',
//   },
//   doneBtn: {
//     marginTop: 22,
//     backgroundColor: COLORS.primary,
//     borderRadius: 12,
//     paddingVertical: 13,
//     alignItems: 'center',
//   },
//   doneBtnText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '700',
//   },
// });

// // ─────────────────────────────────────────────────────────────
// // Usage:
// //
// // <AttendanceHistoryScreen
// //   records={attendanceRecordsFromStore}
// //   onRecordPress={(r) => navigation.navigate('AttendanceDetail', { id: r.id })}
// //   onRefresh={async () => { await syncAttendance(); }}
// // />
// //
// // Requires: @expo/vector-icons, react-native-safe-area-context
// // (both already present in most Expo / bare RN + VisionCamera setups).
// // ─────────────────────────────────────────────────────────────





import React, { useMemo, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Modal,
  TextInput,
  RefreshControl,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import AttendanceStorage from '../../services/AttendanceStorage';
// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type AttendanceType = 'check-in' | 'check-out';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  type: AttendanceType;
  photoUri: string;
  latitude: number;
  longitude: number;
  address: string;
  distanceFromOfficeMeters?: number;
  insideOfficeRadius?: boolean;
  synced: boolean;
  timestamp: string; // ISO string
}

type DateFilter = 'today' | 'week' | 'month' | 'custom';
type TypeFilter = 'all' | 'check-in' | 'check-out';

interface AttendanceHistoryScreenProps {
  records?: AttendanceRecord[];
  onRecordPress?: (record: AttendanceRecord) => void;
  onRefresh?: () => Promise<void> | void;
}

// ─────────────────────────────────────────────────────────────
// Sample data (matches the shape from //Attendance Saved log)
// Replace with data from your store / API / SQLite table.
// ─────────────────────────────────────────────────────────────

// const SAMPLE_RECORDS: AttendanceRecord[] = [
//   {
//     id: '1784793822726',
//     employeeId: 'EMP-4521',
//     employeeName: 'Dharmendra Gupta',
//     type: 'check-out',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018448435204777225.jpg',
//     latitude: 28.620947,
//     longitude: 77.37794,
//     address:
//       '91springboard, A Block, Sector 63, A-130, Noida, Uttar Pradesh, India',
//     distanceFromOfficeMeters: undefined,
//     insideOfficeRadius: undefined,
//     synced: false,
//     timestamp: '2026-07-23T08:03:41.756Z',
//   },
//   {
//     id: '1784790000001',
//     employeeId: 'EMP-4521',
//     employeeName: 'Dharmendra Gupta',
//     type: 'check-in',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000001.jpg',
//     latitude: 28.62101,
//     longitude: 77.37788,
//     address:
//       '91springboard, A Block, Sector 63, A-130, Noida, Uttar Pradesh, India',
//     distanceFromOfficeMeters: 42,
//     insideOfficeRadius: true,
//     synced: true,
//     timestamp: '2026-07-23T03:31:10.100Z',
//   },
//   {
//     id: '1784690000002',
//     employeeId: 'EMP-3312',
//     employeeName: 'Ananya Sharma',
//     type: 'check-in',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000002.jpg',
//     latitude: 28.6304,
//     longitude: 77.2177,
//     address: 'Connaught Place, New Delhi, Delhi, India',
//     distanceFromOfficeMeters: 890,
//     insideOfficeRadius: false,
//     synced: true,
//     timestamp: '2026-07-22T03:58:02.000Z',
//   },
//   {
//     id: '1784690000003',
//     employeeId: 'EMP-3312',
//     employeeName: 'Ananya Sharma',
//     type: 'check-out',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000003.jpg',
//     latitude: 28.6304,
//     longitude: 77.2177,
//     address: 'Connaught Place, New Delhi, Delhi, India',
//     distanceFromOfficeMeters: 910,
//     insideOfficeRadius: false,
//     synced: true,
//     timestamp: '2026-07-22T12:32:44.000Z',
//   },
//   {
//     id: '1784500000004',
//     employeeId: 'EMP-1187',
//     employeeName: 'Rohit Verma',
//     type: 'check-in',
//     photoUri:
//       'file:///data/user/0/com.imwallet/cache/VisionCamera_1018440000000000004.jpg',
//     latitude: 28.6209,
//     longitude: 77.3779,
//     address: '91springboard, A Block, Sector 63, Noida, Uttar Pradesh, India',
//     distanceFromOfficeMeters: 12,
//     insideOfficeRadius: true,
//     synced: true,
//     timestamp: '2026-07-18T03:29:12.000Z',
//   },
// ];

// ─────────────────────────────────────────────────────────────
// Design tokens (premium, muted enterprise palette)
// ─────────────────────────────────────────────────────────────

const COLORS = {
  bg: '#F4F6F9',
  surface: '#FFFFFF',
  border: '#E7EAF0',
  text: '#12141C',
  textMuted: '#6B7280',
  textFaint: '#9AA1AE',
  primary: '#3454D1',
  primarySoft: '#EAEEFC',
  success: '#12875C',
  successSoft: '#E4F6EE',
  warning: '#B5730A',
  warningSoft: '#FBF0DD',
  danger: '#C2402C',
  dangerSoft: '#FBEAE7',
  chipBg: '#EFF1F5',
};

const { width: SCREEN_W } = Dimensions.get('window');

// ─────────────────────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────────────────────

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const startOfWeek = (d: Date) => {
  const x = startOfDay(d);
  const day = x.getDay(); // 0 = Sunday
  const diff = (day + 6) % 7; // make Monday the start
  x.setDate(x.getDate() - diff);
  return x;
};

const startOfMonth = (d: Date) => {
  const x = startOfDay(d);
  x.setDate(1);
  return x;
};

const formatDayLabel = (isoDate: string) => {
  const date = new Date(isoDate);
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = (isoDate: string) =>
  new Date(isoDate).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

// ─────────────────────────────────────────────────────────────
// Small UI atoms
// ─────────────────────────────────────────────────────────────

const TypeBadge: React.FC<{ type: AttendanceType }> = ({ type }) => {
  const isIn = type === 'check-in';
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: isIn ? COLORS.successSoft : COLORS.warningSoft },
      ]}
    >
      <Ionicons
        name={isIn ? 'log-in-outline' : 'log-out-outline'}
        size={12}
        color={isIn ? COLORS.success : COLORS.warning}
      />
      <Text
        style={[
          styles.badgeText,
          { color: isIn ? COLORS.success : COLORS.warning },
        ]}
      >
        {isIn ? 'Check-in' : 'Check-out'}
      </Text>
    </View>
  );
};

const SyncBadge: React.FC<{ synced: boolean }> = ({ synced }) => (
  <View
    style={[
      styles.syncPill,
      { backgroundColor: synced ? COLORS.successSoft : COLORS.dangerSoft },
    ]}
  >
    <View
      style={[
        styles.dot,
        { backgroundColor: synced ? COLORS.success : COLORS.danger },
      ]}
    />
    <Text
      style={[
        styles.syncText,
        { color: synced ? COLORS.success : COLORS.danger },
      ]}
    >
      {synced ? 'Synced' : 'Pending sync'}
    </Text>
  </View>
);

const Chip: React.FC<{
  label: string;
  active: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}> = ({ label, active, onPress, icon }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[styles.chip, active && styles.chipActive]}
  >
    {icon && (
      <Ionicons
        name={icon}
        size={13}
        color={active ? '#fff' : COLORS.textMuted}
        style={{ marginRight: 4 }}
      />
    )}
    <Text style={[styles.chipText, active && styles.chipTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ─────────────────────────────────────────────────────────────
// Attendance card
// ─────────────────────────────────────────────────────────────

const AttendanceCard: React.FC<{
  record: AttendanceRecord;
  onPress?: (r: AttendanceRecord) => void;
}> = ({ record, onPress }) => {
  const hasDistance = typeof record.distanceFromOfficeMeters === 'number';

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => onPress?.(record)}
    >
      <Image
        source={{ uri: record.photoUri }}
        style={styles.thumb}
        defaultSource={undefined}
      />

      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <Text style={styles.employeeName} numberOfLines={1}>
            {record.employeeName}
          </Text>
          <Text style={styles.timeText}>{formatTime(record.timestamp)}</Text>
        </View>

        <Text style={styles.employeeId}>{record.employeeId}</Text>

        <View style={styles.metaRow}>
          <TypeBadge type={record.type} />
          <SyncBadge synced={record.synced} />
        </View>

        <View style={styles.addressRow}>
          <Ionicons
            name="location-outline"
            size={13}
            color={COLORS.textFaint}
            style={{ marginTop: 1 }}
          />
          <Text style={styles.addressText} numberOfLines={2}>
            {record.address}
          </Text>
        </View>

        <View style={styles.geoRow}>
          {hasDistance ? (
            <View style={styles.geoPill}>
              <MaterialDesignIcons
                name={record.insideOfficeRadius ? 'map-check-outline' : 'map-marker-alert-outline'}
                size={13}
                color={record.insideOfficeRadius ? COLORS.success : COLORS.warning}
              />
              <Text
                style={[
                  styles.geoText,
                  {
                    color: record.insideOfficeRadius
                      ? COLORS.success
                      : COLORS.warning,
                  },
                ]}
              >
                {record.distanceFromOfficeMeters}m from office ·{' '}
                {record.insideOfficeRadius ? 'Inside radius' : 'Outside radius'}
              </Text>
            </View>
          ) : (
            <View style={styles.geoPillMuted}>
              <MaterialDesignIcons
                name="map-marker-question-outline"
                size={13}
                color={COLORS.textFaint}
              />
              <Text style={styles.geoTextMuted}>Distance not calculated</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// ─────────────────────────────────────────────────────────────
// Filter sheet (weekly / monthly / date-wise)
// ─────────────────────────────────────────────────────────────

const FilterSheet: React.FC<{
  visible: boolean;
  onClose: () => void;
  dateFilter: DateFilter;
  setDateFilter: (f: DateFilter) => void;
  typeFilter: TypeFilter;
  setTypeFilter: (f: TypeFilter) => void;
  customStart: Date | null;
  customEnd: Date | null;
  setCustomStart: (d: Date | null) => void;
  setCustomEnd: (d: Date | null) => void;
}> = ({
  visible,
  onClose,
  dateFilter,
  setDateFilter,
  typeFilter,
  setTypeFilter,
  customStart,
  customEnd,
  setCustomStart,
  setCustomEnd,
}) => {
  // Lightweight custom-range input as text fields (YYYY-MM-DD) to avoid
  // pulling in a native date-picker dependency. Swap for
  // @react-native-community/datetimepicker if you already use it.
  const [startText, setStartText] = useState(
    customStart ? customStart.toISOString().slice(0, 10) : ''
  );
  const [endText, setEndText] = useState(
    customEnd ? customEnd.toISOString().slice(0, 10) : ''
  );

  const applyCustomRange = () => {
    const s = startText ? new Date(startText) : null;
    const e = endText ? new Date(endText) : null;
    setCustomStart(s && !isNaN(s.getTime()) ? s : null);
    setCustomEnd(e && !isNaN(e.getTime()) ? e : null);
    setDateFilter('custom');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Filter attendance</Text>

          <Text style={styles.sheetLabel}>Period</Text>
          <View style={styles.wrapRow}>
            <Chip
              label="Today"
              active={dateFilter === 'today'}
              onPress={() => setDateFilter('today')}
              icon="today-outline"
            />
            <Chip
              label="This week"
              active={dateFilter === 'week'}
              onPress={() => setDateFilter('week')}
              icon="calendar-outline"
            />
            <Chip
              label="This month"
              active={dateFilter === 'month'}
              onPress={() => setDateFilter('month')}
              icon="calendar-number-outline"
            />
          </View>

          <Text style={[styles.sheetLabel, { marginTop: 18 }]}>
            Custom date range
          </Text>
          <View style={styles.rangeRow}>
            <TextInput
              value={startText}
              onChangeText={setStartText}
              placeholder="Start · YYYY-MM-DD"
              placeholderTextColor={COLORS.textFaint}
              style={styles.rangeInput}
            />
            <Text style={{ color: COLORS.textFaint, marginHorizontal: 6 }}>
              →
            </Text>
            <TextInput
              value={endText}
              onChangeText={setEndText}
              placeholder="End · YYYY-MM-DD"
              placeholderTextColor={COLORS.textFaint}
              style={styles.rangeInput}
            />
          </View>
          <TouchableOpacity style={styles.applyRangeBtn} onPress={applyCustomRange}>
            <Text style={styles.applyRangeBtnText}>Apply custom range</Text>
          </TouchableOpacity>

          <Text style={[styles.sheetLabel, { marginTop: 18 }]}>
            Record type
          </Text>
          <View style={styles.wrapRow}>
            <Chip
              label="All"
              active={typeFilter === 'all'}
              onPress={() => setTypeFilter('all')}
            />
            <Chip
              label="Check-in"
              active={typeFilter === 'check-in'}
              onPress={() => setTypeFilter('check-in')}
              icon="log-in-outline"
            />
            <Chip
              label="Check-out"
              active={typeFilter === 'check-out'}
              onPress={() => setTypeFilter('check-out')}
              icon="log-out-outline"
            />
          </View>

          <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
            <Text style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ─────────────────────────────────────────────────────────────
// Main screen
// ─────────────────────────────────────────────────────────────

const YourAttendanceHistoryScreen: React.FC<AttendanceHistoryScreenProps> = ({
  // records = SAMPLE_RECORDS,
  onRecordPress,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('week');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd] = useState<Date | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

 const handleRefresh = useCallback(async () => {
  setRefreshing(true);

  const data = await AttendanceStorage.getAll();
  setRecords(data);

  setRefreshing(false);
}, []);

  const filteredRecords = useMemo(() => {
    const now = new Date();
    let lowerBound: Date | null = null;
    let upperBound: Date | null = null;

    if (dateFilter === 'today') {
      lowerBound = startOfDay(now);
    } else if (dateFilter === 'week') {
      lowerBound = startOfWeek(now);
    } else if (dateFilter === 'month') {
      lowerBound = startOfMonth(now);
    } else if (dateFilter === 'custom') {
      lowerBound = customStart ? startOfDay(customStart) : null;
      upperBound = customEnd ? startOfDay(customEnd) : null;
    }

    return records.filter((r) => {
      const t = new Date(r.timestamp);

      if (lowerBound && t < lowerBound) return false;
      if (upperBound) {
        const upperEnd = new Date(upperBound);
        upperEnd.setHours(23, 59, 59, 999);
        if (t > upperEnd) return false;
      }
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;

      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matches =
          r.employeeName.toLowerCase().includes(q) ||
          r.employeeId.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [records, dateFilter, typeFilter, customStart, customEnd, search]);

  const sections = useMemo(() => {
    const sorted = [...filteredRecords].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    const map = new Map<string, AttendanceRecord[]>();
    sorted.forEach((r) => {
      const key = startOfDay(new Date(r.timestamp)).toISOString();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    });
    return Array.from(map.entries()).map(([key, data]) => ({
      title: formatDayLabel(key),
      data,
    }));
  }, [filteredRecords]);

  const stats = useMemo(() => {
    const total = filteredRecords.length;
    const checkIns = filteredRecords.filter((r) => r.type === 'check-in').length;
    const checkOuts = filteredRecords.filter((r) => r.type === 'check-out').length;
    const pending = filteredRecords.filter((r) => !r.synced).length;
    return { total, checkIns, checkOuts, pending };
  }, [filteredRecords]);


// useEffect(() => {
//   loadAttendance();
// }, []);
useFocusEffect(
  React.useCallback(() => {
    loadAttendance();
  }, []),
);

const loadAttendance = async () => {
  try {
    const data = await AttendanceStorage.getAll();
    console.log('Attendance Data:', data);
    setRecords(data);
  } catch (error) {
    console.log('Error loading attendance:', error);
  }
};

  const periodLabel =
    dateFilter === 'today'
      ? 'Today'
      : dateFilter === 'week'
      ? 'This week'
      : dateFilter === 'month'
      ? 'This month'
      : customStart && customEnd
      ? `${customStart.toLocaleDateString('en-IN')} – ${customEnd.toLocaleDateString('en-IN')}`
      : 'Custom range';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Attendance history</Text>
          <Text style={styles.headerSubtitle}>{periodLabel}</Text>
        </View>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setSheetVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="options-outline" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={16} color={COLORS.textFaint} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search employee name or ID"
          placeholderTextColor={COLORS.textFaint}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color={COLORS.textFaint} />
          </TouchableOpacity>
        )}
      </View>

      {/* Quick period chips */}
      <View style={styles.quickChipsRow}>
        <Chip
          label="Today"
          active={dateFilter === 'today'}
          onPress={() => setDateFilter('today')}
        />
        <Chip
          label="Weekly"
          active={dateFilter === 'week'}
          onPress={() => setDateFilter('week')}
        />
        <Chip
          label="Monthly"
          active={dateFilter === 'month'}
          onPress={() => setDateFilter('month')}
        />
        <Chip
          label="Date-wise"
          active={dateFilter === 'custom'}
          onPress={() => setSheetVisible(true)}
          icon="calendar-clear-outline"
        />
      </View>

      {/* Stats summary */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.success }]}>
            {stats.checkIns}
          </Text>
          <Text style={styles.statLabel}>Check-ins</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.warning }]}>
            {stats.checkOuts}
          </Text>
          <Text style={styles.statLabel}>Check-outs</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: COLORS.danger }]}>
            {stats.pending}
          </Text>
          <Text style={styles.statLabel}>Pending sync</Text>
        </View>
      </View>

      {/* List */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AttendanceCard record={item} onPress={onRecordPress} />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
            <Text style={styles.sectionHeaderCount}>
              {section.data.length} record{section.data.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
        stickySectionHeadersEnabled={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          ) : undefined
        }
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <MaterialDesignIcons
              name="calendar-remove-outline"
              size={40}
              color={COLORS.textFaint}
            />
            <Text style={styles.emptyTitle}>No records found</Text>
            <Text style={styles.emptySubtitle}>
              Try a different period or clear your search.
            </Text>
          </View>
        }
      />

      <FilterSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        customStart={customStart}
        customEnd={customEnd}
        setCustomStart={setCustomStart}
        setCustomEnd={setCustomEnd}
      />
    </SafeAreaView>
  );
};

export default YourAttendanceHistoryScreen;

// ─────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 4,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },
  quickChipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 14,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 14,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  sectionHeaderCount: {
    fontSize: 12,
    color: COLORS.textFaint,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: COLORS.chipBg,
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    flexShrink: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontVariant: ['tabular-nums'],
  },
  employeeId: {
    fontSize: 12,
    color: COLORS.textFaint,
    marginTop: 1,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  syncPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  syncText: {
    fontSize: 11,
    fontWeight: '600',
  },
  addressRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  addressText: {
    fontSize: 12,
    color: COLORS.textMuted,
    flex: 1,
    lineHeight: 16,
  },
  geoRow: {
    flexDirection: 'row',
  },
  geoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  geoText: {
    fontSize: 11,
    fontWeight: '600',
  },
  geoPillMuted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  geoTextMuted: {
    fontSize: 11,
    color: COLORS.textFaint,
    fontStyle: 'italic',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  // Filter sheet
  sheetOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    maxHeight: '85%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: 14,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
  },
  sheetLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 8,
  },
  wrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.chipBg,
  },
  chipActive: {
    backgroundColor: COLORS.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  chipTextActive: {
    color: '#fff',
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
    color: COLORS.text,
  },
  applyRangeBtn: {
    marginTop: 10,
    backgroundColor: COLORS.primarySoft,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  applyRangeBtnText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  doneBtn: {
    marginTop: 22,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

// ─────────────────────────────────────────────────────────────
// Usage:
//
// <AttendanceHistoryScreen
//   records={attendanceRecordsFromStore}
//   onRecordPress={(r) => navigation.navigate('AttendanceDetail', { id: r.id })}
//   onRefresh={async () => { await syncAttendance(); }}
// />
//
// Requires: @expo/vector-icons, react-native-safe-area-context
// (both already present in most Expo / bare RN + VisionCamera setups).
// ─────────────────────────────────────────────────────────────