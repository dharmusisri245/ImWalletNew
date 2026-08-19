// import React from 'react';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import VisitDashboardScreen from '../Screen/Visit/VisitDashboardScreen';
// import ShopVisitScreen from '../Screen/Visit/ShopVisitScreen';
// import LeadDetailsScreen from '../Screen/Visit/LeadDetailsScreen';
// import FollowUpScreen from '../Screen/Visit/FollowUpScreen';
// import VisitHistoryScreen from '../Screen/Visit/VisitHistoryScreen';
// import ChatScreen from '../Screen/Chatbot/ClienChatbot/ChatScreen';

// const Stack = createNativeStackNavigator();

// const VisitStack = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="VisitDashboard"
//       screenOptions={{
//         headerShown: false,
//         animation: 'slide_from_right',
//       }}>

//       <Stack.Screen
//         name="VisitDashboard"
//         component={VisitDashboardScreen}
//       />

//       <Stack.Screen
//         name="ShopVisit"
//         component={ShopVisitScreen}
//       />

//       <Stack.Screen
//         name="LeadDetails"
//         component={LeadDetailsScreen}
//       />

//       <Stack.Screen
//         name="FollowUp"
//         component={FollowUpScreen}
//       />

//       <Stack.Screen
//         name="VisitHistory"
//         component={VisitHistoryScreen}
//       />

//       <Stack.Screen
//       name='ChatScreen'
//       component={ChatScreen}
//       />

//     </Stack.Navigator>
//   );
// };

// export default VisitStack;





import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import AllQueries from '../Screen//DrawerScreen/Employee/MyQueries/AllQueries'
import VisitDashboardScreen from '../Screen/Visit/VisitDashboardScreen';
import ShopVisitScreen from '../Screen/Visit/ShopVisitScreen';
import LeadDetailsScreen from '../Screen/Visit/LeadDetailsScreen';
import FollowUpScreen from '../Screen/Visit/FollowUpScreen';
import VisitHistoryScreen from '../Screen/Visit/VisitHistoryScreen';
import ChatScreen from '../Screen/Chatbot/ClienChatbot/ChatScreen';

// Tracking screens
import LiveTrackingScreen from '../Screen/Tracking/LiveTrackingScreen';
import RouteMapScreen from '../Screen/Tracking/RouteMapScreen';

const Stack = createNativeStackNavigator();

const VisitStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="VisitDashboard"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >

      <Stack.Screen
        name="VisitDashboard"
        component={VisitDashboardScreen}
      />

      <Stack.Screen
        name="ShopVisit"
        component={ShopVisitScreen}
      />

      <Stack.Screen
        name="LeadDetails"
        component={LeadDetailsScreen}
      />

      <Stack.Screen
        name="FollowUp"
        component={FollowUpScreen}
      />

      <Stack.Screen
        name="VisitHistory"
        component={VisitHistoryScreen}
      />

      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
      />

      {/* ========================= */}
      {/* EMPLOYEE TRACKING */}
      {/* ========================= */}

      <Stack.Screen
        name="LiveTracking"
        component={LiveTrackingScreen}
      />

      <Stack.Screen
       name='RouteMap'
       component={RouteMapScreen}
      />

    </Stack.Navigator>
  );
};

export default VisitStack;