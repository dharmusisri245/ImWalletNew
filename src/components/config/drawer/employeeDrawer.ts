// import { DrawerItem } from "../../../auth/types/drawer/drawer";

// export const employeeDrawerItems: DrawerItem[] = [
//   {
//     key: 'profile',
//     title: 'My Profile',
//     subtitle: 'View and edit profile',
//     icon: 'person-outline',
//     route: 'Profile',
    
//   },

//   {
//     key: 'settings',
//     title: 'Settings',
//     subtitle: 'App preferences',
//     icon: 'settings-outline',
//     route: 'Settings',
//   },

//   {
//     key: 'notifications',
//     title: 'Notifications',
//     subtitle: 'Manage notifications',
//     icon: 'notifications-outline',
//     route: 'Notifications',
//   },

//   {
//     key: 'queries',
//     title: 'My Queries',
//     subtitle: 'View your conversations',
//     icon: 'chatbubbles-outline',
//     route: 'Queries',
//   },

//   {
//     key: 'help',
//     title: 'Help & Support',
//     subtitle: 'Get help with ImWallet',
//     icon: 'help-circle-outline',
//     route: 'HelpSupport',
//   }, 
// ];






import {DrawerItem} from '../../../auth/types/drawer/drawer';

export const employeeDrawerItems: DrawerItem[] = [
  {
    key: 'profile',
    title: 'My Profile',
    subtitle: 'View and edit profile',
    icon: 'person-outline',
    route: 'Profile',
  },

  {
    key: 'settings',
    title: 'Settings',
    subtitle: 'App preferences',
    icon: 'settings-outline',

    subItems: [
      {
        key: 'app-settings',
        title: 'App Settings',
        subtitle: 'General preferences',
        icon: 'options-outline',
        route: 'Settings',
      },

      {
        key: 'security',
        title: 'Security & Lock',
        subtitle: 'Manage security settings',
        icon: 'lock-closed-outline',
        route: 'SecuritySettings',
      },
      {
        key: 'shareApp',
        title: 'Share Application',
        subtitle: 'Manage your App',
        icon: 'lock-closed-outline',
        route: 'ShareApplication',
      },
    ],
  },

  {
    key: 'notifications',
    title: 'Notifications',
    subtitle: 'Manage notifications',
    icon: 'notifications-outline',
    route: 'Notifications',
  },

  {
    key: 'queries',
    title: 'My Queries',
    subtitle: 'View your conversations',
    icon: 'chatbubbles-outline',

    subItems: [
      {
        key: 'all-queries',
        title: 'All Queries',
        subtitle: 'View all conversations',
        icon: 'chatbubbles-outline',
        route: 'EmployeeQueries',
      },

      {
        key: 'new-query',
        title: 'New Query',
        subtitle: 'Create a new query',
        icon: 'chatbubble-ellipses-outline',
        route: 'EmployeeNewQuery',
      },
    ],
  },

  {
    key: 'help',
    title: 'Help & Support',
    subtitle: 'Get help with ImWallet',
    icon: 'help-circle-outline',

    subItems: [
      {
        key: 'help-center',
        title: 'Help Center',
        subtitle: 'Find answers and guides',
        icon: 'information-circle-outline',
        route: 'EmployeeHelpCenter',
      },

      {
        key: 'contact-support',
        title: 'Contact Support',
        subtitle: 'Talk to support',
        icon: 'headset-outline',
        route: 'ContactSupport',
      },
    ],
  },
];