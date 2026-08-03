
// import React from 'react';
// import {
//   View,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// import Feather from '@react-native-vector-icons/feather';
// import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

// interface SearchBarProps {
//   value?: string;
//   placeholder?: string;
//   onChangeText?: (text: string) => void;
//   onVoicePress?: () => void;
//   onScannerPress?: () => void;
//   onFilterPress?: () => void;
// }

// const SearchBar = ({
//   value = '',
//   placeholder = 'Search shop / vendor by name, mobile, ID',
//   onChangeText,
//   onVoicePress,
//   onScannerPress,
//   onFilterPress,
// }: SearchBarProps) => {
//   return (
//     <View style={styles.container}>
//       <Feather
//         name="search"
//         size={20}
//         color="#94A3B8"
//       />

//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#94A3B8"
//         style={styles.input}
//         returnKeyType="search"
//       />

//       <TouchableOpacity
//         style={styles.iconButton}
//         activeOpacity={0.7}
//         onPress={onVoicePress}>
//         <Feather
//           name="mic"
//           size={20}
//           color="#2563EB"
//         />
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.iconButton}
//         activeOpacity={0.7}
//         onPress={onScannerPress}>
//         <MaterialCommunityIcons
//           name="qrcode-scan"
//           size={20}
//           color="#16A34A"
//         />
//       </TouchableOpacity>
// {/* 
//       <TouchableOpacity
//         style={styles.iconButton}
//         activeOpacity={0.7}
//         onPress={onFilterPress}>
//         <Feather
//           name="sliders"
//           size={18}
//           color="#F59E0B"
//         />
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// export default SearchBar;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     paddingHorizontal: 14,
//     height: 58,

//     shadowColor: '#000',
//     shadowOpacity: 0.06,
//     shadowRadius: 6,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },

//     elevation: 2,
//     marginBottom: 18,
//   },

//   input: {
//     flex: 1,
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: '#111827',
//     paddingVertical: 0,
//   },

//   iconButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: '#F8FAFC',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 6,
//   },
// });



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
}

const SearchBar = ({
  value = '',
  placeholder = 'Search with',
  onChangeText,
  onVoicePress,
  onScannerPress,
}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <View style={styles.searchIcon}>
        <Feather
          name="search"
          size={18}
          color="#2563EB"
        />
      </View>

      {/* Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        style={styles.input}
        returnKeyType="search"
      />

      {/* Voice */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.actionButton, styles.voiceButton]}
        onPress={onVoicePress}>
        <Feather
          name="mic"
          size={18}
          color="#2563EB"
        />
      </TouchableOpacity>

      {/* QR */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.actionButton, styles.qrButton]}
        onPress={onScannerPress}>
        <MaterialCommunityIcons
          name="qrcode-scan"
          size={20}
          color="#16A34A"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#FFFFFF',

    borderRadius: 15,

    paddingHorizontal: 12,

    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
    marginBottom: 18,
  },

  searchIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: '#EFF6FF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,

    marginHorizontal: 12,

    fontSize: 15,

    color: '#0F172A',

    fontWeight: '500',

    paddingVertical: 0,
  },

  actionButton: {
    width: 42,
    height: 42,

    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 8,
  },

  voiceButton: {
    backgroundColor: '#EFF6FF',
  },

  qrButton: {
    backgroundColor: '#ECFDF5',
  },
});