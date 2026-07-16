import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../auth/screnn/HomeScreen';
import AttendanceScreen from '../Screen/Attendance/AttendanceScreen';
import RegisterScreen from '../Screen/servicesScreen/RegisterScreen';
import RegisteredScreen from '../Screen/servicesScreen/RegisteredScreen';
import KycScreen from '../Screen/servicesScreen/KycScreen';
import LeaveScreen from '../Screen/servicesScreen/LeaveScreen';
import TargetScreen from '../Screen/servicesScreen/TargetScreen';
import MyReportScreen from '../Screen/servicesScreen/MyReportScreen';
import NotificationScreen from '../Screen/Dashboard/Notifications/NotificationScreen';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  function TestScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Text>TEST SCREEN</Text>
    </View>
  );
}
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
       <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      /> 
      {/* <Stack.Screen
      name='HomeScreen'
      component={TestScreen}
      /> */}

      <Stack.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="RegisteredScreen"
        component={RegisteredScreen}
      />

      <Stack.Screen
        name="KycScreen"
        component={KycScreen}
      />

      <Stack.Screen name='LeaveScreen' component={LeaveScreen}/>
      <Stack.Screen name='MyReportScreen' component={MyReportScreen}/>
      <Stack.Screen name='TargetScreen' component={TargetScreen}/>
      <Stack.Screen name='Notifications' component={NotificationScreen} />
    </Stack.Navigator>
  );
}