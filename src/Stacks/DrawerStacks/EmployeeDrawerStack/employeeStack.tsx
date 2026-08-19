// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import EmployeeProfile from '../../../Screen/DrawerScreen/Employee/MyProfile/EmployeeProfile'
// import AppSetting from '../../../Screen/DrawerScreen/Employee/Setting/AppSetting'
// import SecurityLockScreen from '../../../Screen/DrawerScreen/Employee/Setting/SecurityLockScreen'
// import ShareApp from '../../../Screen/DrawerScreen/Employee/Setting/ShareApp'
// import Notifications from '../../../Screen/DrawerScreen/Employee/Notifications/Notifications'
// import AllQueries from '../../../Screen/DrawerScreen/Employee/MyQueries/AllQueries'
// import EmployeeHelpCenter from '../../../Screen/DrawerScreen/Employee/Help&Support/EmployeeHelpCenter'
// import ContactSupport from '../../../Screen/DrawerScreen/Employee/Help&Support/ContactSupport'
// import EmployeeNewQueris from '../../../Screen/DrawerScreen/Employee/MyQueries/EmployeeNewQueris'
// const Stack = createNativeStackNavigator()
// const employeeStack = () => {
//   return (
//      <Stack.Navigator>
//        <Stack.Screen
//        name='Profile'
//        component={EmployeeProfile}
//        />

//        <Stack.Screen
//          name='Settings'
//          component={AppSetting}
//        />

//        <Stack.Screen
//        name='SecuritySettings'
//        component={SecurityLockScreen}
//        />
//        <Stack.Screen
//         name='ShareApplication'
//         component={ShareApp}
//         />

//         <Stack.Screen
//         name='Notifications'
//         component={Notifications}
//         />
//         '
// {/* query */}
//       <Stack.Screen
//        name='EmployeeQueries'
//        component={AllQueries}
//        />

//     <Stack.Screen
//       name='EmployeeNewQuery'
//       component={EmployeeNewQueris}
//     />
       

//        <Stack.Screen
//         name='EmployeeHelpCenter'
//         component={EmployeeHelpCenter}
//         />

//         <Stack.Screen
//         name='ContactSupport'
//         component={ContactSupport}
//         />
       
//       {/* <Stack.Screen
//        name=''
//        component={}
//        />
//        <Stack.Screen
//         name=''
//         component={}
//         />

//         <Stack.Screen
//         name=''
//         component={}
//         /> */}
       
//      </Stack.Navigator>
//   )
// }

// export default employeeStack

// const styles = StyleSheet.create({})






import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EmployeeProfile from '../../../Screen/DrawerScreen/Employee/MyProfile/EmployeeProfile';
import AppSetting from '../../../Screen/DrawerScreen/Employee/Setting/AppSetting';
import SecurityLockScreen from '../../../Screen/DrawerScreen/Employee/Setting/SecurityLockScreen';
import ShareApp from '../../../Screen/DrawerScreen/Employee/Setting/ShareApp';
import Notifications from '../../../Screen/DrawerScreen/Employee/Notifications/Notifications';
import AllQueries from '../../../Screen/DrawerScreen/Employee/MyQueries/AllQueries';
import EmployeeNewQueris from '../../../Screen/DrawerScreen/Employee/MyQueries/EmployeeNewQueris';
import EmployeeHelpCenter from '../../../Screen/DrawerScreen/Employee/Help&Support/EmployeeHelpCenter';
import ContactSupport from '../../../Screen/DrawerScreen/Employee/Help&Support/ContactSupport';
import ChatScreen from '../../../Screen/Chatbot/ClienChatbot/ChatScreen';
import RouteMapScreen from '../../../Screen/Tracking/RouteMapScreen';

const Stack = createNativeStackNavigator();

const EmployeeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      
      {/* Profile */}
      <Stack.Screen
        name="Profile"
        component={EmployeeProfile}
      />

      {/* Settings */}
      <Stack.Screen
        name="Settings"
        component={AppSetting}
      />

      {/* Security */}
      <Stack.Screen
        name="SecuritySettings"
        component={SecurityLockScreen}
      />

      {/* Share Application */}
      <Stack.Screen
        name="ShareApplication"
        component={ShareApp}
      />

      {/* Notifications */}
      <Stack.Screen
        name="Notifications"
        component={Notifications}
      />

      {/* Queries */}
      <Stack.Screen
        name="EmployeeQueries"
        component={AllQueries}
      />

      {/* New Query */}
      <Stack.Screen
        name="EmployeeNewQuery"
        component={EmployeeNewQueris}
      />

      {/* Help Center */}
      <Stack.Screen
        name="EmployeeHelpCenter"
        component={EmployeeHelpCenter}
      />

      {/* Contact Support */}
      <Stack.Screen
        name="ContactSupport"
        component={ContactSupport}
      />

       {/* ChatScreen we need also at Employee stack also ok */}
      <Stack.Screen
       name='ChatScreen'
       component={ChatScreen}
      />

{/* after testi8ng we will. remove it from here */}
      <Stack.Screen
       name='RouteMap'
       component={RouteMapScreen}
      />

    </Stack.Navigator>
  );
};

export default EmployeeStack;