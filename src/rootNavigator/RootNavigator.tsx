

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text } from 'react-native';

// import SplashScreen from '../Screen/Splash/SplashScreen';
// import LoginScreen from '../auth/LoginScreen';
// import BottomTab from './BottomTab';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Splash" component={SplashScreen} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="BottomTab" component={BottomTab} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }





import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import SplashScreen from '../Screen/Splash/SplashScreen';
import LoginScreen from '../auth/LoginScreen';

import BottomTab from './BottomTab';
import ManagerBottomTab from '../navigation/ManagerBottomTab';
// import ManagerBottomTab from './ManagerBottomTab';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >

        {/* Splash */}

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        {/* Login */}

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        {/* Employee */}

        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
        />

        {/* Manager */}

        <Stack.Screen
          name="ManagerBottomTab"
          component={ManagerBottomTab}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}