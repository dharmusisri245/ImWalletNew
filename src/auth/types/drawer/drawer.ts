import type { ComponentProps } from 'react';
import Ionicons from "@react-native-vector-icons/ionicons";

export type DrawerIconName = ComponentProps<typeof Ionicons>['name'];

export type DrawerItem = {
  key: string;
  title: string;
  subtitle: string;
  icon: DrawerIconName;
  route: string;
};

export type DrawerUser = {
  name: string;
  designation: string;
  employeeId: string;
  avatar?: string;
  isOnline?: boolean;
};


export type UserRole = 'employee' | 'manager' | 'admin';