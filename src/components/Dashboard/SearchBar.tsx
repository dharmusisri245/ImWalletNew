
import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onVoicePress?: () => void;
  onScannerPress?: () => void;
  onFilterPress?: () => void;
}

const SearchBar = ({
  value = '',
  placeholder = 'Search shop / vendor by name, mobile, ID',
  onChangeText,
  onVoicePress,
  onScannerPress,
  onFilterPress,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={20}
        color="#94A3B8"
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        returnKeyType="search"
      />

      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={onVoicePress}>
        <Feather
          name="mic"
          size={20}
          color="#2563EB"
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={onScannerPress}>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={20}
          color="#16A34A"
        />
      </TouchableOpacity>
{/* 
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={onFilterPress}>
        <Feather
          name="sliders"
          size={18}
          color="#F59E0B"
        />
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 58,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});





// import { View, Text } from 'react-native'
// import React from 'react'

// const SearchBar = () => {
//   return (
//     <View>
//       <Text>SearchBar</Text>
//     </View>
//   )
// }

// export default SearchBar