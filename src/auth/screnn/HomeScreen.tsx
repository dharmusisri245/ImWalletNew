
// import React, { useState } from 'react';
// import {
// View,
//   Text,
//   Image,

//   TouchableOpacity,
//   TextInput,
//   StyleSheet,

//   Dimensions,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

// import Feather from '@react-native-vector-icons/feather';
// import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
// import Svg, { Polyline, Circle, Path } from 'react-native-svg';
// import QuickServices from '../../components/Dashboard/QuickServices';

// const { width } = Dimensions.get('window');

// // ---------- Static data (swap with real API data) ----------
// const EMPLOYEE = {
//   name: 'Ankit Sharma',
//   empId: 'EMP-4521',
//   designation: 'Field Sales Executive',
//   region: 'Noida - Zone 3',
//   avatar: 'https://i.pravatar.cc/100?img=33',
// };

// const ATTENDANCE = {
//   status: 'Checked In', // 'Checked In' | 'Checked Out' | 'Not Marked'
//   checkInTime: '09:14 AM',
//   workingHours: '4h 32m',
// };

// const TARGET = {
//   todayTarget: 10,
//   todayAchieved: 6,
//   monthTarget: 200,
//   monthAchieved: 142,
// };

// const QUICK_SERVICES = [
//   { label: 'Register ', icon: 'store-plus', lib: 'mci', bg: '#E8F0FF', color: '#2F6BFF' },
//   { label: 'Registered', icon: 'store-check', lib: 'mci', bg: '#E8F8EE', color: '#16A34A' },
//   { label: 'KYC Verify', icon: 'card-account-details', lib: 'mci', bg: '#F1EBFE', color: '#7C3AED' },
//   { label: 'Vendor Search', icon: 'magnify', lib: 'mci', bg: '#E6F6FE', color: '#0EA5E9' },
//   { label: 'Attendance', icon: 'fingerprint', lib: 'mci', bg: '#FFF8E1', color: '#F5B301' },
//   { label: 'Leave', icon: 'calendar-remove', lib: 'mci', bg: '#FDEBEC', color: '#EF4444' },
//   { label: 'Report', icon: 'file-chart', lib: 'mci', bg: '#FFF1E6', color: '#F97316' },
//   { label: 'Target', icon: 'target', lib: 'mci', bg: '#E6F5F2', color: '#0F9D8C' },
// ];

// const RECENT_VISITS = [
//   {
//     id: '1',
//     shop: 'Sharma General Store',
//     owner: 'Ramesh Sharma',
//     status: 'Registered',
//     time: '11:20 AM',
//     color: '#16A34A',
//     icon: 'store-check',
//   },
//   {
//     id: '2',
//     shop: 'New Kirana Bhandar',
//     owner: 'Suresh Yadav',
//     status: 'KYC Pending',
//     time: '10:05 AM',
//     color: '#F5B301',
//     icon: 'card-account-details-outline',
//   },
//   {
//     id: '3',
//     shop: 'City Mobile Point',
//     owner: 'Vikas Chaudhary',
//     status: 'Registered',
//     time: '9:40 AM',
//     color: '#16A34A',
//     icon: 'store-check',
//   },
// ];

// const LEAVE = { taken: 4, remaining: 8, total: 12 };

// const CHART_POINTS = [
//   { x: 0, y: 40, label: 'M' },
//   { x: 45, y: 20, label: 'T' },
//   { x: 90, y: 32, label: 'W' },
//   { x: 135, y: 14, label: 'T' },
//   { x: 180, y: 24, label: 'F' },
//   { x: 225, y: 8, label: 'S' },
//   { x: 270, y: 18, label: 'S' },
// ];

// export default function HomeScreen() {
//   const [search, setSearch] = useState('');
//   const todayPct = Math.min(100, Math.round((TARGET.todayAchieved / TARGET.todayTarget) * 100));
//   const monthPct = Math.min(100, Math.round((TARGET.monthAchieved / TARGET.monthTarget) * 100));

//   return (
//     <View style={styles.screen}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F4F6FB" />
//       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
//         {/* ---------- Header ---------- */}
//         <View style={styles.header}>
//           <View style={styles.headerLeft}>
//             <Image source={{ uri: EMPLOYEE.avatar }} style={styles.avatar} />
//             <View style={{ marginLeft: 12, flex: 1 }}>
//               <Text style={styles.greeting}>Good Morning 👋</Text>
//               <Text style={styles.userName}>{EMPLOYEE.name}</Text>
//               <View style={styles.badgeRow}>
//                 <View style={styles.roleBadge}>
//                   <Text style={styles.roleBadgeText}>{EMPLOYEE.designation}</Text>
//                 </View>
//                 <Text style={styles.idText}>{EMPLOYEE.empId}</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.headerRight}>
//             <TouchableOpacity style={styles.iconCircle}>
//               <Feather name="bell" size={20} color="#1E293B" />
//               <View style={styles.notifDot}>
//                 <Text style={styles.notifDotText}>5</Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* ---------- Search Bar ---------- */}
//         <View style={styles.searchWrap}>
//           <Feather name="search" size={18} color="#94A3B8" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search shop / vendor by name, number, ID"
//             placeholderTextColor="#94A3B8"
//             value={search}
//             onChangeText={setSearch}
//           />
//           <TouchableOpacity style={styles.filterBtn}>
//             <Feather name="sliders" size={16} color="#2563EB" />
//           </TouchableOpacity>
//         </View>

//         {/* ---------- Attendance Card ---------- */}
//         <LinearGradient
//           colors={['#3D6DFF', '#1B4CD8']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.attendanceCard}
//         >
//           <View style={styles.attendanceTopRow}>
//             <View>
//               <Text style={styles.attendanceLabel}>Today's Attendance</Text>
//               <View style={styles.attendanceStatusRow}>
//                 <View style={styles.liveDot} />
//                 <Text style={styles.attendanceStatus}>{ATTENDANCE.status}</Text>
//               </View>
//               <Text style={styles.attendanceMeta}>
//                 In: {ATTENDANCE.checkInTime}  •  {ATTENDANCE.workingHours} today
//               </Text>
//             </View>

//             <TouchableOpacity style={styles.checkOutBtn}>
//               <Feather name="log-out" size={14} color="#1B4CD8" />
//               <Text style={styles.checkOutText}>Check Out</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.attendanceActionsRow}>
//             <BalanceAction icon="map-pin" label="Mark Visit" />
//             <View style={styles.balanceDivider} />
//             <BalanceAction icon="calendar" label="Apply Leave" />
//             <View style={styles.balanceDivider} />
//             <BalanceAction icon="clock" label="Shift Timing" />
//           </View>
//         </LinearGradient>

//         {/* ---------- Target Overview ---------- */}
//         <View style={styles.targetCard}>
//           <View style={styles.targetLeft}>
//             <RingProgress
//               percent={Math.round((LEAVE.remaining / LEAVE.total) * 100)}
//             />
//           </View>
//           <View style={styles.targetRight}>
//             <Text style={styles.targetTitle}>Today's Target</Text>
//             <Text style={styles.targetValue}>
//               {TARGET.todayAchieved} / {TARGET.todayTarget} <Text style={styles.targetUnit}>shops</Text>
//             </Text>
//             <View style={styles.progressBarBg}>
//               <View style={[styles.progressBarFill, { width: `${monthPct}%` }]} />
//             </View>
//             <Text style={styles.monthlyText}>
//               Monthly: {TARGET.monthAchieved}/{TARGET.monthTarget}  ({monthPct}%)
//             </Text>
//           </View>
//         </View>

//         {/* ---------- Stats Row ---------- */}
//         <View style={styles.statsCard}>
//           <StatItem circleColor="#16A34A" icon="check" label="Registered" value="142" valueColor="#16A34A" />
//           <StatItem circleColor="#F5B301" icon="clock" label="KYC Pending" value="9" valueColor="#F5B301" />
//           <StatItem circleColor="#2563EB" icon="map-pin" label="Visits Today" value="8" valueColor="#2563EB" />
//           <StatItem circleColor="#7C3AED" icon="award" label="Rank (Zone)" value="#3" valueColor="#7C3AED" />
//         </View>

//         {/* ---------- Quick Services ---------- */}
//         {/* <View style={styles.sectionRow}>
//           <Text style={styles.sectionTitle}>Quick Services</Text>
//           <TouchableOpacity style={styles.viewAllRow}>
//             <Text style={styles.viewAllText}>View All</Text>
//             <Feather name="chevron-right" size={14} color="#2563EB" />
//           </TouchableOpacity>
//         </View> */}

//         {/* <View style={styles.servicesGrid}>
//           {QUICK_SERVICES.map((s) => (
//             <TouchableOpacity key={s.label} style={styles.serviceItem}>
//               <View style={[styles.serviceIconWrap, { backgroundColor: s.bg }]}>
//                 <MaterialCommunityIcons name={s.icon} size={24} color={s.color} />
//               </View>
//               <Text style={styles.serviceLabel}>{s.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View> */}

//   <QuickServices/>
//         {/* ---------- Performance + Recent Visits ---------- */}
//         <View style={styles.twoColRow}>
//           <View style={styles.colCard}>
//             <View style={styles.sectionRow}>
//               <Text style={styles.cardTitle}>Weekly Performance</Text>
//               <Text style={styles.viewAllTextSmall}>This Week ▾</Text>
//             </View>
//             <Text style={styles.overviewLabel}>Registrations</Text>
//             <View style={styles.overviewValueRow}>
//               <Text style={styles.overviewValue}>38</Text>
//               <View style={styles.growthPill}>
//                 <Text style={styles.growthPillText}>↑ 12.4%</Text>
//               </View>
//             </View>

//             {/* <MiniChart /> */}

//             <View style={styles.miniStatsRow}>
//               <View style={styles.miniStatBox}>
//                 <Text style={styles.miniStatLabel}>Avg / Day</Text>
//                 <Text style={[styles.miniStatValue, { color: '#0F172A' }]}>5.4</Text>
//               </View>
//               <View style={styles.miniStatBox}>
//                 <Text style={styles.miniStatLabel}>Best Day</Text>
//                 <Text style={[styles.miniStatValue, { color: '#16A34A' }]}>Wed - 9</Text>
//               </View>
//             </View>
//           </View>

//           <View style={styles.colCard}>
//             <View style={styles.sectionRow}>
//               <Text style={styles.cardTitle}>Leave Balance</Text>
//               <Text style={styles.viewAllTextSmall}>Apply</Text>
//             </View>

//             <RingProgress percent={Math.round((LEAVE.remaining / LEAVE.total) * 100)} size={90} stroke={9} center />

//             <View style={styles.miniStatsRow}>
//               <View style={styles.miniStatBox}>
//                 <Text style={styles.miniStatLabel}>Taken</Text>
//                 <Text style={[styles.miniStatValue, { color: '#EF4444' }]}>{LEAVE.taken}</Text>
//               </View>
//               <View style={styles.miniStatBox}>
//                 <Text style={styles.miniStatLabel}>Remaining</Text>
//                 <Text style={[styles.miniStatValue, { color: '#16A34A' }]}>{LEAVE.remaining}</Text>
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* ---------- Recent Shop Visits ---------- */}
//         <View style={styles.sectionCard}>
//           <View style={styles.sectionRow}>
//             <Text style={styles.cardTitle}>Recent Shop Visits</Text>
//             <Text style={styles.viewAllTextSmall}>View All</Text>
//           </View>
//           {RECENT_VISITS.map((t) => (
//             <View key={t.id} style={styles.txnRow}>
//               <View style={[styles.txnIconWrap, { backgroundColor: `${t.color}1A` }]}>
//                 <MaterialCommunityIcons name={t.icon} size={16} color={t.color} />
//               </View>
//               <View style={{ flex: 1, marginLeft: 10 }}>
//                 <Text style={styles.txnTitle}>{t.shop}</Text>
//                 <Text style={styles.txnSub}>{t.owner}</Text>
//               </View>
//               <View style={{ alignItems: 'flex-end' }}>
//                 <Text style={[styles.txnStatus, { color: t.color }]}>{t.status}</Text>
//                 <Text style={styles.txnTime}>{t.time}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         {/* ---------- Quick Actions ---------- */}
//         <View style={styles.quickActionsCard}>
//           <Text style={styles.cardTitle}>Quick Actions</Text>
//           <View style={styles.quickActionsRow}>
//             <QuickAction icon="store-plus" label="Register Shop" color="#2563EB" mci />
//             <QuickAction icon="card-account-details" label="Start KYC" color="#7C3AED" mci />
//             <QuickAction icon="calendar-remove" label="Apply Leave" color="#EF4444" mci />
//             <QuickAction icon="file-chart" label="Submit Report" color="#F97316" mci />
//             <QuickAction icon="headphones" label="Raise Ticket" color="#16A34A" />
//           </View>
//         </View>
//       </ScrollView>


//     </View>
//   );
// }

// // ---------- Small sub-components ----------
// function BalanceAction({ icon, label }) {
//   return (
//     <View style={styles.balanceAction}>
//       <Feather name={icon} size={18} color="#FFFFFF" />
//       <Text style={styles.balanceActionText}>{label}</Text>
//     </View>
//   );
// }

// function StatItem({ circleColor, icon, label, value, valueColor }) {
//   return (
//     <View style={styles.statItem}>
//       <View style={[styles.statCircle, { backgroundColor: circleColor }]}>
//         <Feather name={icon as any} size={16} color="#FFFFFF" />
//       </View>
//       <Text style={styles.statLabel}>{label}</Text>
//       <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
//     </View>
//   );
// }

// function QuickAction({ icon, label, color, mci }) {
//   return (
//     <TouchableOpacity style={styles.quickActionItem}>
//       {mci ? (
//         <MaterialCommunityIcons name={icon} size={16} color={color} />
//       ) : (
//         <Feather name={icon} size={16} color={color} />
//       )}
//       <Text style={styles.quickActionText}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// function TabItem({ icon, label, active, mci }) {
//   return (
//     <TouchableOpacity style={styles.tabItem}>
//       {mci ? (
//         <MaterialCommunityIcons name={icon} size={20} color={active ? '#2563EB' : '#94A3B8'} />
//       ) : (
//         <Feather name={icon} size={20} color={active ? '#2563EB' : '#94A3B8'} />
//       )}
//       <Text style={[styles.tabLabel, { color: active ? '#2563EB' : '#94A3B8' }]}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// function MiniChart() {
//   const pointsStr = CHART_POINTS.map((p) => `${p.x},${p.y}`).join(' ');
//   return (
//     <Svg width="100%" height={60} viewBox="0 0 270 50">
//       <Polyline
//         points={pointsStr}
//         fill="none"
//         stroke="#2563EB"
//         strokeWidth={2.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       {CHART_POINTS.map((p, idx) => (
//         <Circle key={idx} cx={p.x} cy={p.y} r={3} fill="#2563EB" />
//       ))}
//     </Svg>
//   );
// }

// // Circular progress ring, used for target % and leave balance %
// function RingProgress({ percent = 0, size = 84, stroke = 10, center = false }) {
//   const radius = (size - stroke) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const offset = circumference - (percent / 100) * circumference;
//   const cx = size / 2;
//   const cy = size / 2;

//   return (
//     <View style={[{ width: size, height: size }, center && { alignSelf: 'center', marginTop: 8 }]}>
//       <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//         <Circle cx={cx} cy={cy} r={radius} stroke="#EEF1F6" strokeWidth={stroke} fill="none" />
//         <Circle
//           cx={cx}
//           cy={cy}
//           r={radius}
//           stroke="#2563EB"
//           strokeWidth={stroke}
//           fill="none"
//           strokeLinecap="round"
//           strokeDasharray={`${circumference} ${circumference}`}
//           strokeDashoffset={offset}
//           rotation="-90"
//           origin={`${cx}, ${cy}`}
//         />
//       </Svg>
//       <View style={styles.ringLabelWrap}>
//         <Text style={styles.ringLabelValue}>{percent}%</Text>
//       </View>
//     </View>
//   );
// }

// // ---------- Styles ----------
// const styles = StyleSheet.create({
//   screen: { flex: 1, backgroundColor: '#F4F6FB' },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   avatar: { width: 48, height: 48, borderRadius: 24 },
//   greeting: { fontSize: 13, color: '#64748B' },
//   userName: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginTop: 1 },
//   badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, flexWrap: 'wrap' },
//   roleBadge: {
//     backgroundColor: '#2563EB',
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     borderRadius: 6,
//   },
//   roleBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
//   idText: { color: '#2563EB', fontSize: 12, marginLeft: 8, fontWeight: '600' },
//   headerRight: { flexDirection: 'row' },
//   iconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   notifDot: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#EF4444',
//     borderRadius: 8,
//     minWidth: 16,
//     height: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 3,
//   },
//   notifDotText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },

//   searchWrap: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 14,
//     paddingHorizontal: 14,
//     paddingVertical: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 1,
//   },
//   searchInput: { flex: 1, marginLeft: 8, fontSize: 13, color: '#0F172A' },
//   filterBtn: {
//     width: 30,
//     height: 30,
//     borderRadius: 8,
//     backgroundColor: '#E8F0FF',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   attendanceCard: {
//     marginHorizontal: 16,
//     marginTop: 14,
//     borderRadius: 20,
//     padding: 18,
//   },
//   attendanceTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
//   attendanceLabel: { color: '#DCE6FF', fontSize: 13 },
//   attendanceStatusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
//   liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ADE80', marginRight: 6 },
//   attendanceStatus: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
//   attendanceMeta: { color: '#DCE6FF', fontSize: 11, marginTop: 6 },
//   checkOutBtn: {
//     backgroundColor: '#FFFFFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 9,
//     borderRadius: 10,
//   },
//   checkOutText: { color: '#1B4CD8', fontWeight: '700', fontSize: 12, marginLeft: 6 },
//   attendanceActionsRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 22,
//   },
//   balanceAction: { alignItems: 'center', flex: 1 },
//   balanceActionText: { color: '#FFFFFF', fontSize: 11, marginTop: 6, textAlign: 'center' },
//   balanceDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.25)' },

//   targetCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     padding: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 1,
//   },
//   targetLeft: { marginRight: 16 },
//   targetRight: { flex: 1 },
//   targetTitle: { fontSize: 12, color: '#64748B' },
//   targetValue: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginTop: 2 },
//   targetUnit: { fontSize: 12, fontWeight: '500', color: '#64748B' },
//   progressBarBg: {
//     height: 8,
//     backgroundColor: '#EEF1F6',
//     borderRadius: 4,
//     marginTop: 10,
//     overflow: 'hidden',
//   },
//   progressBarFill: { height: 8, backgroundColor: '#2563EB', borderRadius: 4 },
//   monthlyText: { fontSize: 10, color: '#94A3B8', marginTop: 6 },

//   ringLabelWrap: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   ringLabelValue: { fontSize: 15, fontWeight: '800', color: '#0F172A' },

//   statsCard: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 16,
//     borderRadius: 16,
//     paddingVertical: 16,
//     justifyContent: 'space-between',
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 1,
//   },
//   statItem: { flex: 1, alignItems: 'center' },
//   statCircle: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 6,
//   },
//   statLabel: { fontSize: 10, color: '#64748B', textAlign: 'center' },
//   statValue: { fontSize: 13, fontWeight: '700', marginTop: 2 },

//   sectionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginTop: 22,
//     marginBottom: 12,
//   },
//   sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
//   viewAllRow: { flexDirection: 'row', alignItems: 'center' },
//   viewAllText: { color: '#2563EB', fontSize: 12, fontWeight: '600', marginRight: 2 },
//   viewAllTextSmall: { color: '#2563EB', fontSize: 11, fontWeight: '600' },

//   servicesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 10,
//   },
//   serviceItem: { width: width / 4 - 8, alignItems: 'center', marginBottom: 16, minWidth: 70 },
//   serviceIconWrap: {
//     width: 52,
//     height: 52,
//     borderRadius: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 6,
//   },
//   serviceLabel: { fontSize: 10, color: '#334155', textAlign: 'center' },

//   twoColRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 20, gap: 12 },
//   colCard: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 14,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 1,
//   },
//   sectionCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 20,
//     borderRadius: 16,
//     padding: 14,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 1,
//   },
//   cardTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A' },

//   txnRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
//   txnIconWrap: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   txnTitle: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
//   txnSub: { fontSize: 10, color: '#94A3B8', marginTop: 1 },
//   txnStatus: { fontSize: 10, fontWeight: '700' },
//   txnTime: { fontSize: 9, color: '#94A3B8', marginTop: 2 },

//   overviewLabel: { fontSize: 11, color: '#64748B', marginTop: 10 },
//   overviewValueRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
//   overviewValue: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
//   growthPill: {
//     backgroundColor: '#E7F8ED',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     marginLeft: 8,
//   },
//   growthPillText: { color: '#16A34A', fontSize: 10, fontWeight: '700' },

//   miniStatsRow: { flexDirection: 'row', marginTop: 10, gap: 8 },
//   miniStatBox: { flex: 1, backgroundColor: '#F4F6FB', borderRadius: 10, padding: 8, alignItems: 'center' },
//   miniStatLabel: { fontSize: 9, color: '#64748B' },
//   miniStatValue: { fontSize: 13, fontWeight: '700', marginTop: 2 },

//   quickActionsCard: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginTop: 20,
//     borderRadius: 16,
//     padding: 16,
//   },
//   quickActionsRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 12,
//     gap: 14,
//   },
//   quickActionItem: { flexDirection: 'row', alignItems: 'center' },
//   quickActionText: { fontSize: 11, color: '#334155', marginLeft: 6, fontWeight: '600' },

//   tabBar: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     borderTopWidth: 1,
//     borderTopColor: '#EEF1F6',
//     paddingVertical: 8,
//     paddingBottom: 14,
//   },
//   tabItem: { flex: 1, alignItems: 'center' },
//   tabLabel: { fontSize: 10, marginTop: 3, fontWeight: '600' },
// });













import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '../../components/Dashboard/DashboardHeader';
import SearchBar from '../../components/Dashboard/SearchBar';
import NotificationCard from '../../components/Dashboard/notifications/NotificationCard';
import StatsCard from '../../components/Dashboard/StatsCard';
import TargetCard from '../../components/Dashboard/TargetCard';
import WeeklyChart from '../../components/Dashboard/WeeklyChart';
import RecentVisits from '../../components/Dashboard/RecentVisits';
import QuickActions from '../../components/Dashboard/QuickActions';
import QuickServices from '../../components/Dashboard/QuickServices';
import AttendanceCard from '../../components/Dashboard/AttendanceCard';
import MonthlyChart from '../../components/Dashboard/MonthlyChart';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AttendanceStorage from '../../services/AttendanceStorage';
import { useFrameCallback } from 'react-native-reanimated';



const HomeScreen = () => {
  const navigation = useNavigation();
  const [checkedIn, setCheckedIn] = useState(false);
  const [activeMode, setActiveMode] = useState<'check-in' | 'check-out'>('check-in');

  const [summary, setSummary] = useState({
    checkInTime: '',
    checkOutTime: '',
    workingHours: '00h 00m',
  })

  // console.log('✅ HomeScreen Mounted');
  useFocusEffect(
    useCallback(() => {
      loadAttendanceStatus();
    }, []),
  );

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '--:--';

    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };


  const lastAttendance = async () => {
    const lastAttendance = await AttendanceStorage.getLastAttendance();
  }

  const loadAttendanceStatus = async () => {
    const lastAttendance =
      await AttendanceStorage.getLastAttendance();

    console.log('Last Attendance:', lastAttendance);

    if (!lastAttendance) {
      setCheckedIn(false);
      setActiveMode('check-in');
      return;
    }

    if (lastAttendance.type === 'check-in') {
      setCheckedIn(true);
      setActiveMode('check-out');
    } else {
      setCheckedIn(false);
      setActiveMode('check-in');
    }
  };


  const loadAttendance = async () => {
    const data = await AttendanceStorage.getTodayAttendanceSummary();
    setSummary(data)
  }

  useFocusEffect(
    useCallback(() => {
      loadAttendanceStatus();
      loadAttendance();
    }, []),
  );



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {console.log('1 DashboardHeader')}
        <DashboardHeader />

        {console.log('2 SearchBar')}
        <SearchBar />

        {console.log('3 NotificationCard')}
        <NotificationCard />

        {console.log('4 AttendanceCard')}



        {/* <AttendanceCard
          status={checkedIn ? 'Checked In' : 'Not Checked In'}
          checkInTime={
            lastAttendance?.type === 'check-in'
              ? formatTime(lastAttendance.timestamp)
              : '--:--'
          }
          workingHours="00h 00m"
          onCheckIn={() => navigation.navigate('AttendanceScreen' as never)}
          onCheckOut={() => navigation.navigate('AttendanceScreen' as never)}
        /> */}


        <AttendanceCard
          status={
            checkedIn
              ? 'Checked In'
              : summary.checkOutTime
                ? 'Checked Out'
                : 'Not Checked In'
          }
          checkInTime={summary.checkInTime}
          checkOutTime={summary.checkOutTime}
          workingHours={summary.workingHours}
          onCheckIn={() =>
            navigation.navigate('AttendanceScreen' as never)
          }

          onCheckOut={() =>
            navigation.navigate('AttendanceScreen' as never)
          }
        />

        {console.log('5 StatsCard')}
        <StatsCard />

        {console.log('6 TargetCard')}
        <TargetCard />

        {console.log('7 QuickServices')}
        <QuickServices />

        {console.log('8 WeeklyChart')}
        <WeeklyChart />

        {console.log('9 MonthlyChart')}
        <MonthlyChart achieved={142} target={200} />

        {console.log('10 RecentVisits')}
        <RecentVisits />

        {console.log('11 QuickActions')}
        <QuickActions />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    //  backgroundColor: '#FFFFFF',
  },

  content: {
    padding: 16,
    paddingBottom: 20,
  },
});








