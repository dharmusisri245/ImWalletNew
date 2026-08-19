// import type { ComponentProps } from 'react';
// import Ionicons from "@react-native-vector-icons/ionicons";

// export type DrawerIconName = ComponentProps<typeof Ionicons>['name'];

// export type DrawerItem = {
//   key: string;
//   title: string;
//   subtitle: string;
//   icon: DrawerIconName;
//   route: string;
// };

// export type DrawerUser = {
//   name: string;
//   designation: string;
//   employeeId: string;
//   avatar?: string;
//   isOnline?: boolean;
// };


// export type UserRole = 'employee' | 'manager' | 'admin';




import type {ComponentProps} from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';

// ======================================================
// DRAWER ICON
// ======================================================

export type DrawerIconName =
  ComponentProps<typeof Ionicons>['name'];

// ======================================================
// DRAWER SUB ITEM
// ======================================================

export type DrawerSubItem = {
  key: string;

  title: string;

  subtitle?: string;

  icon?: DrawerIconName;

  route: string;
};

// ======================================================
// DRAWER ITEM
// ======================================================

export type DrawerItem = {
  key: string;

  title: string;

  subtitle?: string;

  icon: DrawerIconName;

  /**
   * Direct navigation route.
   *
   * Optional because parent items can
   * contain subItems instead.
   */
  route?: string;

  /**
   * Child menu items.
   *
   * If subItems exists, DrawerMenuItem
   * should expand instead of navigating
   * directly.
   */
  subItems?: DrawerSubItem[];
};

// ======================================================
// DRAWER USER
// ======================================================

export type DrawerUser = {
  name: string;

  designation: string;

  employeeId: string;

  avatar?: string;

  isOnline?: boolean;
};

// ======================================================
// USER ROLE
// ======================================================

export type UserRole =
  | 'employee'
  | 'manager'
  | 'admin';