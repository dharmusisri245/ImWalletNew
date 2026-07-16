// import React from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';

// import DashboardHeader from '../../components/Dashboard/DashboardHeader';
// import SearchBar from '../../components/Dashboard/SearchBar';
// import NotificationCard from '../../components/Dashboard/NotificationCard';
// import StatsCard from '../../components/Dashboard/StatsCard';
// import AttendanceCard from '../../components/Dashboard/AttendanceCard';
// import TargetCard from '../../components/Dashboard/TargetCard';
// import WeeklyChart from '../../components/Dashboard/WeeklyChart';
// import MonthlyChart from '../../components/Dashboard/MonthlyChart';
// import RecentVisits from '../../components/Dashboard/RecentVisits';
// import QuickActions from '../../components/Dashboard/QuickActions';
// import QuickServices from '../../components/Dashboard/QuickServices';


// const DashboardScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}>

//         <DashboardHeader />

//         <SearchBar />

//         <NotificationCard />

//         <StatsCard />

//         <AttendanceCard />

//         <TargetCard />

//         <WeeklyChart />

//         <MonthlyChart />

//         <RecentVisits />

//         <QuickActions />

//         <QuickServices />

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default DashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F7FA',
//   },

//   content: {
//     padding: 16,
//     paddingBottom: 30,
//   },
// });







import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

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


const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <DashboardHeader />

        <SearchBar />

        <NotificationCard />

      {/* <AttendanceCard/> */}
       <AttendanceCard
          status="Not Checked In"
          checkInTime="09:30 AM"
          workingHours="00h 00m"
        />

        <StatsCard />

        <TargetCard />
 <QuickServices />
        <WeeklyChart />

        <MonthlyChart/>

        <RecentVisits />

        <QuickActions />

       

      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },
});



