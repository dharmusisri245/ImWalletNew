import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import type {DrawerItem} from '../../auth/types/drawer/drawer';
import Ionicons from '@react-native-vector-icons/ionicons';

type DrawerMenuItemProps = {
  item: DrawerItem;
  onPress: () => void;
};

const DrawerMenuItem = ({
  item,
  onPress,
}: DrawerMenuItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}>

      <View style={styles.iconContainer}>
        <Ionicons
          name={item.icon}
          size={25}
          color="#2F6BFF"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text
          numberOfLines={1}
          style={styles.subtitle}>
          {item.subtitle}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#A0A8B5"
      />

    </TouchableOpacity>
  );
};

export default DrawerMenuItem;

const styles = StyleSheet.create({
  container: {
    minHeight: 75,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#EFF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#273248',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 15,
    color: '#8B97AA',
  },
});