import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Existing Visit Stack
import VisitStack from '../Stacks/VisitStack';
import TeamDashboardScreen from '../Screen/Chatbot/TeamDashboard/TeamDashboardScreen';

// Existing Query Dashboard
// import TeamDashboardScreen from '../screens/TeamDashboard/TeamDashboardScreen';

// Temporary manager screens
// We will create the real screens next.

const ManagerHomePlaceholder = () => {
  return (
    <View style={styles.placeholder}>
    </View>
  );
};

const TeamPlaceholder = () => {
  return (
    <View style={styles.placeholder}>
    </View>
  );
};

// Temporary profile screen.
// Profile drawer can be integrated here later.
const ManagerProfilePlaceholder = () => {
  return (
    <View style={styles.placeholder}>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function ManagerBottomTab() {
  useEffect(() => {
    console.log('✅ ManagerBottomTab Mounted');
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
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
          paddingBottom: 5,
          paddingTop: 5,
        },

        tabBarIcon: ({
          focused,
          color,
          size,
        }) => {
          let iconName:
            | 'home'
            | 'home-outline'
            | 'people'
            | 'people-outline'
            | 'business'
            | 'business-outline'
            | 'chatbubbles'
            | 'chatbubbles-outline'
            | 'person'
            | 'person-outline' =
            'home-outline';

          switch (route.name) {
            // --------------------------------
            // HOME
            // --------------------------------
            case 'Home':
              iconName = focused
                ? 'home'
                : 'home-outline';
              break;

            // --------------------------------
            // TEAM
            // --------------------------------
            case 'Team':
              iconName = focused
                ? 'people'
                : 'people-outline';
              break;

            // --------------------------------
            // VISITS
            // --------------------------------
            case 'Visits':
              iconName = focused
                ? 'business'
                : 'business-outline';
              break;

            // --------------------------------
            // QUERIES
            // --------------------------------
            case 'Queries':
              iconName = focused
                ? 'chatbubbles'
                : 'chatbubbles-outline';
              break;

            // --------------------------------
            // PROFILE
            // --------------------------------
            case 'Profile':
              iconName = focused
                ? 'person'
                : 'person-outline';
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

      {/* ===================================== */}
      {/* MANAGER HOME */}
      {/* ===================================== */}

      <Tab.Screen
        name="Home"
        component={ManagerHomePlaceholder}
      />

      {/* ===================================== */}
      {/* TEAM */}
      {/* ===================================== */}

      <Tab.Screen
        name="Team"
        component={TeamPlaceholder}
      />

      {/* ===================================== */}
      {/* TEAM VISITS */}
      {/* ===================================== */}

      <Tab.Screen
        name="Visits"
        component={VisitStack}
      />

      {/* ===================================== */}
      {/* CLIENT QUERIES */}
      {/* ===================================== */}


      <Tab.Screen
        name="Queries"
        component={TeamDashboardScreen}
      />

      {/* ===================================== */}
      {/* PROFILE */}
      {/* ===================================== */}

      <Tab.Screen
        name="Profile"
        component={ManagerProfilePlaceholder}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
});