// import React from 'react';
// import { View, Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../auth/screnn/HomeScreen';
// import ServicesScreen from '../auth/screnn/ServicesScreen';
// import ReportsScreen from '../auth/screnn/ReportsScreen';
// import WalletScreen from '../auth/screnn/WalletScreen';
// import ProfileScreen from '../auth/screnn/ProfileScreen';

// const Tab = createBottomTabNavigator();

// // const Dummy = ({ title }: { title: string }) => (
// //   <View
// //     style={{
// //       flex: 1,
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       backgroundColor: '#fff',
// //     }}>
// //     <Text>{title}</Text>
// //   </View>
// // );

// export default function BottomTab() {
//   return (
//     // <Tab.Navigator screenOptions={{ headerShown: false }}>
//     //   <Tab.Screen
//     //     name="Home"
//     //     children={() => <Dummy title="Home" />}
//     //   />
//     //   <Tab.Screen
//     //     name="Services"
//     //     children={() => <Dummy title="Services" />}
//     //   />
//     //   <Tab.Screen
//     //     name="Reports"
//     //     children={() => <Dummy title="Reports" />}
//     //   />
//     //   <Tab.Screen
//     //     name="Wallet"
//     //     children={() => <Dummy title="Wallet" />}
//     //   />
//     //   <Tab.Screen
//     //     name="Profile"
//     //     children={() => <Dummy title="Profile" />}
//     //   />
//     // </Tab.Navigator>


// <Tab.Navigator screenOptions={{ headerShown: false }}>
//   <Tab.Screen name="Home" component={HomeScreen} />
// <Tab.Screen
//   name="Services"
//   component={ServicesScreen}
// />

//   <Tab.Screen
//     name="Reports"
//     component={ReportsScreen}
//   />

//   <Tab.Screen
//     name="Wallet"
//     component={WalletScreen}
//   />

//   <Tab.Screen
//     name="Profile"
//     component={ProfileScreen}
//   />
// </Tab.Navigator>
//   );
// }






import React, { useEffect } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../auth/screnn/HomeScreen';
import ServicesScreen from '../auth/screnn/ServicesScreen';
import ReportsScreen from '../auth/screnn/ReportsScreen';
import WalletScreen from '../auth/screnn/WalletScreen';
import ProfileScreen from '../auth/screnn/ProfileScreen';
import HomeStack from '../Stacks/HomeStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    useEffect(() => {
    console.log("✅ BottomTab Mounted");
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#7C8798',

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },

        tabBarStyle: {
          height: 65,
        },

        tabBarIcon: ({ focused, color, size }) => {
          let iconName:
            | 'home'
            | 'home-outline'
            | 'grid'
            | 'grid-outline'
            | 'bar-chart'
            | 'bar-chart-outline'
            | 'wallet'
            | 'wallet-outline'
            | 'person'
            | 'person-outline' = 'home-outline';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Services':
              iconName = focused ? 'grid' : 'grid-outline';
              break;

            case 'Reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;

            case 'Wallet':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size ?? 24}
              color={color}
            />
          );
        },
      })}
    >

      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

    </Tab.Navigator>
  );
}







// import { View, Text } from 'react-native'
// import React from 'react'

// const BottomTab = () => {
//   return (
//     <View>
//       <Text>BottomTab</Text>
//     </View>
//   )
// }

// export default BottomTab





// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeStack from '../Stacks/HomeStack';

// const Tab = createBottomTabNavigator();

// export default function BottomTab() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={HomeStack}
//       />
//     </Tab.Navigator>
//   );
// }