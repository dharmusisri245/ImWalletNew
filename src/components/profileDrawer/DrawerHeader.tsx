import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';


import Ionicons from "@react-native-vector-icons/ionicons";
type DrawerHeaderProps = {
  onClose: () => void;
};

const DrawerHeader = ({onClose}: DrawerHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.closeButton}
        onPress={onClose}>
        <Ionicons
          name="close"
          size={20}
          color="#3A3F4B"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F4F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});