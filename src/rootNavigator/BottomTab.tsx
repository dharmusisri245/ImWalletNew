
import React, { useEffect } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../auth/screnn/HomeScreen';
import ServicesScreen from '../auth/screnn/ServicesScreen';
import ReportsScreen from '../auth/screnn/ReportsScreen';
import WalletScreen from '../auth/screnn/WalletScreen';
import ProfileScreen from '../auth/screnn/ProfileScreen';
import HomeStack from '../Stacks/HomeStack';
import ProfileStack from '../Stacks/ProfileStack';
import VisitStack from '../Stacks/VisitStack';

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

            // case 'Wallet':
            //   iconName = focused ? 'wallet' : 'wallet-outline';
            //   break;

            // case 'Visit':
            //   iconName = focused ? 'storefront' : 'storefront-outline';
            //   break;

            case 'Visit':
              iconName = focused ? 'business' : 'business-outline';
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
      {/* <Tab.Screen name="Wallet" component={WalletScreen} /> */}
      <Tab.Screen name="Visit" component={VisitStack} />

      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      <Tab.Screen name="Profile" component={ProfileStack} />

    </Tab.Navigator>
  );
}







// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View} from 'react-native';

// import Ionicons from '@react-native-vector-icons/ionicons';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import ServicesScreen from '../auth/screnn/ServicesScreen';
// import ReportsScreen from '../auth/screnn/ReportsScreen';

// import HomeStack from '../Stacks/HomeStack';
// import VisitStack from '../Stacks/VisitStack';

// import ProfileDrawer from '../components/profile/ProfileDrawer';

// const Tab = createBottomTabNavigator();

// const ProfilePlaceholder = () => {
//   return <View style={styles.placeholder} />;
// };

// export default function BottomTab() {
//   // Profile drawer state
//   const [profileDrawerVisible, setProfileDrawerVisible] =
//     useState(false);

//   // useEffect(() => {
//   //   console.log('✅ BottomTab Mounted');
//   // }, []);

//   const openProfileDrawer = () => {
//     console.log('👤 Profile clicked');
//     setProfileDrawerVisible(true);
//   };

//   const closeProfileDrawer = () => {
//     setProfileDrawerVisible(false);
//   };

//   return (
//     <View style={styles.container}>
//       <Tab.Navigator
//         screenOptions={({route}) => ({
//           headerShown: false,

//           tabBarShowLabel: true,

//           tabBarActiveTintColor: '#2563EB',

//           tabBarInactiveTintColor: '#7C8798',

//           tabBarLabelStyle: {
//             fontSize: 11,
//             fontWeight: '600',
//           },

//           tabBarStyle: {
//             height: 65,
//           },

//           tabBarIcon: ({focused, color, size}) => {
//             let iconName:
//               | 'home'
//               | 'home-outline'
//               | 'grid'
//               | 'grid-outline'
//               | 'bar-chart'
//               | 'bar-chart-outline'
//               | 'business'
//               | 'business-outline'
//               | 'person'
//               | 'person-outline' = 'home-outline';

//             switch (route.name) {
//               case 'Home':
//                 iconName = focused
//                   ? 'home'
//                   : 'home-outline';
//                 break;

//               case 'Services':
//                 iconName = focused
//                   ? 'grid'
//                   : 'grid-outline';
//                 break;

//               case 'Reports':
//                 iconName = focused
//                   ? 'bar-chart'
//                   : 'bar-chart-outline';
//                 break;

//               case 'Visit':
//                 iconName = focused
//                   ? 'business'
//                   : 'business-outline';
//                 break;

//               case 'Profile':
//                 iconName = focused
//                   ? 'person'
//                   : 'person-outline';
//                 break;
//             }

//             return (
//               <Ionicons
//                 name={iconName}
//                 size={size ?? 24}
//                 color={color}
//               />
//             );
//           },
//         })}
//       >
//         {/* Home */}
//         <Tab.Screen
//           name="Home"
//           component={HomeStack}
//         />

//         {/* Services */}
//         <Tab.Screen
//           name="Services"
//           component={ServicesScreen}
//         />

//         {/* Reports */}
//         <Tab.Screen
//           name="Reports"
//           component={ReportsScreen}
//         />

//         {/* Visit */}
//         <Tab.Screen
//           name="Visit"
//           component={VisitStack}
//         />

//         {/* Profile */}
//         <Tab.Screen
//           name="Profile"
//           component={ProfilePlaceholder}
//           listeners={{
//             tabPress: e => {
//               e.preventDefault();

//               openProfileDrawer();
//             },
//           }}
//         />
//       </Tab.Navigator>

//       {/* Profile Drawer */}
//       <ProfileDrawer
//         visible={profileDrawerVisible}
//         onClose={closeProfileDrawer}

//         onProfilePress={() => {
//           closeProfileDrawer();

//           console.log('My Profile clicked');

//           // Later:
//           // navigation.navigate('ProfileDetails');
//         }}

//         onSettingsPress={() => {
//           closeProfileDrawer();

//           console.log('Settings clicked');
//         }}

//         onNotificationsPress={() => {
//           closeProfileDrawer();

//           console.log('Notifications clicked');
//         }}

//         onQueriesPress={() => {
//           closeProfileDrawer();

//           console.log('My Queries clicked');

//           // Later:
//           // navigation.navigate('ChatScreen');
//         }}

//         onHelpPress={() => {
//           closeProfileDrawer();

//           console.log('Help & Support clicked');
//         }}

//         onLogoutPress={() => {
//           closeProfileDrawer();

//           console.log('Logout clicked');

//           // Logout logic
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   placeholder: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
// });


