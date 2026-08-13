import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import type {DrawerItem} from '../../auth/types/drawer/drawer';
import DrawerMenuItem from './DrawerMenuItem';

type DrawerMenuSectionProps = {
  items: DrawerItem[];
  onNavigate: (route: string) => void;
};

const DrawerMenuSection = ({
  items,
  onNavigate,
}: DrawerMenuSectionProps) => {
  return (
    <View style={styles.container}>
      {items.map(item => (
        <DrawerMenuItem
          key={item.key}
          item={item}
          onPress={() => onNavigate(item.route)}
        />
      ))}
    </View>
  );
};

export default DrawerMenuSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});