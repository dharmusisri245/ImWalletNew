// import React, { useCallback, useEffect, useState } from 'react';
// import {
//   ScrollView,
//   StyleSheet,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import DashboardHeader from '../../components/Dashboard/DashboardHeader';
// import SearchBar from '../../components/Dashboard/SearchBar';
// import NotificationCard from '../../components/Dashboard/notifications/NotificationCard';
// import StatsCard from '../../components/Dashboard/StatsCard';
// import TargetCard from '../../components/Dashboard/TargetCard';
// import WeeklyChart from '../../components/Dashboard/WeeklyChart';
// import RecentVisits from '../../components/Dashboard/RecentVisits';
// import QuickActions from '../../components/Dashboard/QuickActions';
// import QuickServices from '../../components/Dashboard/QuickServices';
// import AttendanceCard from '../../components/Dashboard/AttendanceCard';
// import MonthlyChart from '../../components/Dashboard/MonthlyChart';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import AttendanceStorage from '../../services/AttendanceStorage';
// import { useFrameCallback } from 'react-native-reanimated';



// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const [checkedIn, setCheckedIn] = useState(false);
//   const [activeMode, setActiveMode] = useState<'check-in' | 'check-out'>('check-in');

//   const [summary, setSummary] = useState({
//     checkInTime: '',
//     checkOutTime: '',
//     workingHours: '00h 00m',
//   })

//   // console.log('✅ HomeScreen Mounted');
//   useFocusEffect(
//     useCallback(() => {
//       loadAttendanceStatus();
//     }, []),
//   );

//   const formatTime = (timestamp?: string) => {
//     if (!timestamp) return '--:--';

//     return new Date(timestamp).toLocaleTimeString('en-IN', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
//   };


//   const lastAttendance = async () => {
//     const lastAttendance = await AttendanceStorage.getLastAttendance();
//   }

//   const loadAttendanceStatus = async () => {
//     const lastAttendance =
//       await AttendanceStorage.getLastAttendance();

//     console.log('Last Attendance:', lastAttendance);

//     if (!lastAttendance) {
//       setCheckedIn(false);
//       setActiveMode('check-in');
//       return;
//     }

//     if (lastAttendance.type === 'check-in') {
//       setCheckedIn(true);
//       setActiveMode('check-out');
//     } else {
//       setCheckedIn(false);
//       setActiveMode('check-in');
//     }
//   };


//   const loadAttendance = async () => {
//     const data = await AttendanceStorage.getTodayAttendanceSummary();
//     setSummary(data)
//   }

//   useFocusEffect(
//     useCallback(() => {
//       loadAttendanceStatus();
//       loadAttendance();
//     }, []),
//   );



//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>

//         {console.log('1 DashboardHeader')}
//         <DashboardHeader />

//         {console.log('2 SearchBar')}
//         <SearchBar />

//         {console.log('3 NotificationCard')}
//         <NotificationCard />

//         {console.log('4 AttendanceCard')}

//         <AttendanceCard
//           status={
//             checkedIn
//               ? 'Checked In'
//               : summary.checkOutTime
//                 ? 'Checked Out'
//                 : 'Not Checked In'
//           }
//           checkInTime={summary.checkInTime}
//           checkOutTime={summary.checkOutTime}
//           workingHours={summary.workingHours}
//           onCheckIn={() =>
//             navigation.navigate('AttendanceScreen' as never)
//           }

//           onCheckOut={() =>
//             navigation.navigate('AttendanceScreen' as never)
//           }
//         />

//         {console.log('5 StatsCard')}
//         <StatsCard />

//         {console.log('6 TargetCard')}
//         <TargetCard />

//         {console.log('7 QuickServices')}
//         <QuickServices />

//         {console.log('8 WeeklyChart')}
//         <WeeklyChart />

//         {console.log('9 MonthlyChart')}
//         <MonthlyChart achieved={142} target={200} />

//         {console.log('10 RecentVisits')}
//         <RecentVisits />

//         {console.log('11 QuickActions')}
//         <QuickActions />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//     //  backgroundColor: '#FFFFFF',
//   },

//   content: {
//     padding: 16,
//     paddingBottom: 20,
//   },
// });







import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';


const HomeScreen = () => {
  const navigation = useNavigation();
  const [checkedIn, setCheckedIn] = useState(false);
  const [activeMode, setActiveMode] = useState<'check-in' | 'check-out'>('check-in');

 
const insets = useSafeAreaInsets()

  const [summary, setSummary] = useState({
    checkInTime: '',
    checkOutTime: '',
    workingHours: '00h 00m',
  })

const scrollY = useSharedValue(0);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: event => {
    scrollY.value = event.contentOffset.y;
  },
});

  
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

  // <View style={{flex:1, paddingTop:insets.top}}>
  <SafeAreaView style={styles.container}
  edges={['top']}
  >

    <Animated.ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={scrollHandler}>

      <DashboardHeader
        scrollY={scrollY}
      />

      <SearchBar />

      <NotificationCard />

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

      <StatsCard />

      <TargetCard />

      <QuickServices />

      <WeeklyChart />

      <MonthlyChart
        achieved={142}
        target={200}
      />

      <RecentVisits />

      <QuickActions />

    </Animated.ScrollView>

  </SafeAreaView>
  // </View>
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









