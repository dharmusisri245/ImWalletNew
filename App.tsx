// import React from 'react';
// import RootNavigator from './src/rootNavigator/RootNavigator';
// import Toast from 'react-native-toast-message';
// export default function App() {
//   return (
//     <>
//     {/* <RootNavigator/> */}
//     {/* <Toast/> */}
//     </>
//   );
// }



import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import RootNavigator from './src/rootNavigator/RootNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RootNavigator />
        <Toast />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}






// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// import ShopVisitScreen from './src/Screen/Visit/ShopVisitScreen';
// import VisitDashboardScreen from './src/Screen/Visit/VisitDashboardScreen';
// import LeadDetailsScreen from './src/Screen/Visit/LeadDetailsScreen';
// import FollowUpScreen from './src/Screen/Visit/FollowUpScreen';
// import VisitHistoryScreen from './src/Screen/Visit/VisitHistoryScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             {/* <Stack.Screen
//               name="VisitDashboard"
//               component={VisitDashboardScreen}
//             /> */}

//             {/* <Stack.Screen
//               name="VisitHistory"
//               component={ShopVisitScreen}
//             /> */}

//             {/* <Stack.Screen
//               name="LeadDetailsScreen"
//               component={LeadDetailsScreen}
//             /> */}

//             {/* <Stack.Screen
//               name="FollowUpScreen"
//               component={FollowUpScreen}
//             /> */}
//             <Stack.Screen
//             name='VisitHistoryScreen'
//             component={VisitHistoryScreen}
//             />
//           </Stack.Navigator>
//         </NavigationContainer>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// }




// using geature 



// import React from 'react';
// import { SafeAreaView, ScrollView } from 'react-native';

// import AttendanceCard from './src/components/Dashboard/AttendanceCard';
// import DashboardHeader from './src/components/Dashboard/DashboardHeader';
// import SearchBar from './src/components/Dashboard/SearchBar';
// import MonthlyChart from './src/components/Dashboard/MonthlyChart';
// import WeeklyChart from './src/components/Dashboard/WeeklyChart';
// import QuickServices from './src/components/Dashboard/QuickServices';
// import TargetCard from './src/components/Dashboard/TargetCard';
// import StatsCard from './src/components/Dashboard/StatsCard';
// import NotificationCard from './src/components/Dashboard/notifications/NotificationCard';
// import QuickActions from './src/components/Dashboard/QuickActions';
// import RecentVisits from './src/components/Dashboard/RecentVisits';

// export default function App() {
//   return (
//     <SafeAreaView style={{ flex: 1, padding: 20 }}>
//       <ScrollView>
//       <DashboardHeader/>
// <SearchBar/>
// <MonthlyChart/>
// <WeeklyChart/>
// <QuickServices/>
// <TargetCard/>
// <StatsCard/>
// <NotificationCard/>
// <QuickActions/>
//       <AttendanceCard
//         status="Not Checked In"
//         checkInTime="09:30 AM"
//         workingHours="00h 00m"
//       />
//       <RecentVisits/>
//       <QuickActions/>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }




// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTab from './src/rootNavigator/BottomTab';
// import HomeScreen from './src/auth/screnn/HomeScreen';

// export default function App() {
//   return (
//     <NavigationContainer>
//       {/* <BottomTab /> */}
//       <HomeScreen/>
//     </NavigationContainer>
//   );
// }







// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaView, ScrollView } from 'react-native';
// import DashboardHeader from './src/components/Dashboard/DashboardHeader';
// import SearchBar from './src/components/Dashboard/SearchBar';
// import NotificationCard from './src/components/Dashboard/notifications/NotificationCard';
// import AttendanceCard from './src/components/Dashboard/AttendanceCard';
// import TargetCard from './src/components/Dashboard/TargetCard';
// import QuickServices from './src/components/Dashboard/QuickServices';
// import WeeklyChart from './src/components/Dashboard/WeeklyChart';
// import MonthlyChart from './src/components/Dashboard/MonthlyChart';
// import RecentVisits from './src/components/Dashboard/RecentVisits';
// import QuickActions from './src/components/Dashboard/QuickActions';

// export default function App() {
//   return (
//     <NavigationContainer>
//       <SafeAreaView style={{ flex: 1 }}>
//         <ScrollView>

       
//         <DashboardHeader />
//         <SearchBar/>
//         <NotificationCard/>
//          <AttendanceCard
//          status="Not Checked In"
//          checkInTime="09:30 AM"
// workingHours="00h 00m"/>


//  {/* <StatsCard /> */}

//          <TargetCard/>

// <QuickServices />

//          <WeeklyChart/>

//          <MonthlyChart/>

//         <RecentVisits/>

//          <QuickActions />
//  </ScrollView>
//       </SafeAreaView>
//     </NavigationContainer>
//   );
// }









// import { Text } from "react-native-svg";
// import HomeScreen from "./src/auth/screnn/HomeScreen";
// import AttendanceScreen from "./src/Screen/Attendance/AttendanceScreen";
// // import DashboardScreen from "./src/Screen/Dashboard/DashboardScreen";

// export default function App() {
  
//   // <Text>Hii welcome to im Wallet </Text>
//   // return <DashboardScreen />;
//   // return <HomeScreen/>
//   // return <AttendanceScreen/>
// }


// import { View, Text } from 'react-native'
// import React from 'react'

// const App = () => {
//   return (
//     <View>
//       <Text>App mkkokfrhgr;</Text>
//     </View>
//   )
// }

// export default App