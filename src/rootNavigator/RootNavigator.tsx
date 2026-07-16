// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import BottomTab from './BottomTab';
// import LoginScreen from '../auth/LoginScreen';
// import HomeScreen from '../auth/screnn/HomeScreen';
// // import HomeScreen from '../screnn/HomeScreen';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Login"
//         screenOptions={{ headerShown: false }}>
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen as any}
//         />

//         <Stack.Screen
//           name="BottomTab"
//           component={BottomTab}
//           options={{
//             contentStyle: { backgroundColor: '#F4F6FB' },
//           }}
//         />
//         {/* <Stack.Screen 
//         name='HomeScreen'
//         component={HomeScreen}
//         /> */}

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }









// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import BottomTab from './BottomTab';
// import LoginScreen from '../auth/LoginScreen';
// import HomeScreen from '../auth/screnn/HomeScreen';
// import SplashScreen from '../Screen/Splash/SplashScreen';
// import { View, Text } from 'react-native';

// const Stack = createNativeStackNavigator();




// export default function RootNavigator() {
//     return (
//         <NavigationContainer>

//             <Stack.Navigator
//                 initialRouteName="Splash"
//                 screenOptions={{
//                     headerShown: false
//                 }}>

//                 <Stack.Screen
//                     name="Splash"
//                     component={SplashScreen}
//                 />

//                 <Stack.Screen
//                     name="Login"
//                     component={LoginScreen}
//                 />
//                 <Stack.Screen
//                     name="BottomTab"
//                     component={BottomTab}
//                 />

//             </Stack.Navigator>

//         </NavigationContainer>
//     );
// }


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text } from 'react-native';
// import SplashScreen from '../Screen/Splash/SplashScreen';

// const Stack = createNativeStackNavigator();

// function TestScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Test Screen</Text>
//     </View>
//   );
// }

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {/* <Stack.Screen
//           name="Test"
//           component={TestScreen}
//         /> */}
//   <Stack.Screen
//     name="Splash"
//     component={SplashScreen}
//   />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import SplashScreen from '../Screen/Splash/SplashScreen';
// import LoginScreen from '../auth/LoginScreen';
// import BottomTab from './BottomTab';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen
//           name="Splash"
//           component={SplashScreen}
//         />

//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//         />

//         <Stack.Screen
//           name="BottomTab"
//           component={BottomTab}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import SplashScreen from '../Screen/Splash/SplashScreen';
import LoginScreen from '../auth/LoginScreen';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();



export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}




// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { View, Text } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../auth/LoginScreen';
// const Stack = createNativeStackNavigator();
// const TestLogin = () => (
//   <View
//     style={{
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'white',
//     }}>
//     <Text>Login Screen</Text>
//   </View>
// );
// export default function RootNavigator() {
//   return (
//     <NavigationContainer>
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen
//       name="Login"
//       component={LoginScreen}
//     />
//   </Stack.Navigator>
// </NavigationContainer>
//   );
// }