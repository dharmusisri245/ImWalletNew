import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../auth/screnn/ProfileScreen';
// import PrProfile from '../screnn/ProfileScreen';
import AttendanceManagement from '../auth/screnn/Attendance/AttendanceManagement';
import LeaveManagement from '../auth/screnn/Attendance/LeaveManagement';
import SettingsScreen from '../auth/screnn/Attendance/SettingsScreen';
import EmployeeProfile from '../auth/screnn/Attendance/EmployeeProfile';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileScreen}
      />

      <Stack.Screen
        name="EmployeeProfile"
        component={EmployeeProfile}
      />

      <Stack.Screen
        name="AttendanceManagement"
        component={AttendanceManagement}
      />

      <Stack.Screen
        name="LeaveManagement"
        component={LeaveManagement}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;