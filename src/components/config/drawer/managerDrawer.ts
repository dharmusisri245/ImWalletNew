// import type { DrawerItem } from '../../types/drawer';

import { DrawerIconName, DrawerItem } from "../../../auth/types/drawer/drawer";

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
    route: 'Settings',
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
    route: 'Queries',
  },

  {
    key: 'help',
    title: 'Help & Support',
    subtitle: 'Get help with ImWallet',
    icon: 'help-circle-outline',
    route: 'HelpSupport',
  },
];