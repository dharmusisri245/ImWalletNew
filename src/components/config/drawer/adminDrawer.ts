import { DrawerItem } from "../../../auth/types/drawer/drawer";

export const adminDrawerItems: DrawerItem[] = [
  {
    key: 'profile',
    title: 'My Profile',
    subtitle: 'View and edit profile',
    icon: 'person-outline',
    route: 'Profile',
  },

  {
    key: 'employees',
    title: 'Employees',
    subtitle: 'Manage employees',
    icon: 'people-outline',
    route: 'Employees',
  },

  {
    key: 'managers',
    title: 'Managers',
    subtitle: 'Manage managers',
    icon: 'people-circle-outline',
    route: 'Managers',
  },

  {
    key: 'reports',
    title: 'Reports',
    subtitle: 'View system reports',
    icon: 'bar-chart-outline',
    route: 'Reports',
  },

  {
    key: 'notifications',
    title: 'Notifications',
    subtitle: 'Manage notifications',
    icon: 'notifications-outline',
    route: 'Notifications',
  },

  {
    key: 'settings',
    title: 'Settings',
    subtitle: 'App preferences',
    icon: 'settings-outline',
    route: 'Settings',
  },

  {
    key: 'help',
    title: 'Help & Support',
    subtitle: 'Get help with ImWallet',
    icon: 'help-circle-outline',
    route: 'HelpSupport',
  },
];