


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
// }

// const SearchBar = ({
//   value = '',
//   placeholder = 'Search with',
//   onChangeText,
//   onVoicePress,
//   onScannerPress,
// }: SearchBarProps) => {
//   return (
//     <View style={styles.container}>
//       {/* Search Icon */}
//       <View style={styles.searchIcon}>
//         <Feather
//           name="search"
//           size={18}
//           color="#2563EB"
//         />
//       </View>

//       {/* Input */}
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={placeholder}
//         placeholderTextColor="#94A3B8"
//         style={styles.input}
//         returnKeyType="search"
//       />

//       {/* Voice */}
//       <TouchableOpacity
//         activeOpacity={0.8}
//         style={[styles.actionButton, styles.voiceButton]}
//         onPress={onVoicePress}>
//         <Feather
//           name="mic"
//           size={18}
//           color="#2563EB"
//         />
//       </TouchableOpacity>

//       {/* QR */}
//       <TouchableOpacity
//         activeOpacity={0.8}
//         style={[styles.actionButton, styles.qrButton]}
//         onPress={onScannerPress}>
//         <MaterialCommunityIcons
//           name="qrcode-scan"
//           size={20}
//           color="#16A34A"
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SearchBar;

// const styles = StyleSheet.create({
//   container: {
//     height: 62,
//     flexDirection: 'row',
//     alignItems: 'center',

//     backgroundColor: '#FFFFFF',

//     borderRadius: 15,

//     paddingHorizontal: 12,

//     borderWidth: 1,
//     borderColor: '#E2E8F0',

//     shadowColor: '#2563EB',
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },

//     elevation: 5,
//     marginBottom: 18,
//   },

//   searchIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,

//     backgroundColor: '#EFF6FF',

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   input: {
//     flex: 1,

//     marginHorizontal: 12,

//     fontSize: 15,

//     color: '#0F172A',

//     fontWeight: '500',

//     paddingVertical: 0,
//   },

//   actionButton: {
//     width: 42,
//     height: 42,

//     borderRadius: 12,

//     justifyContent: 'center',
//     alignItems: 'center',

//     marginLeft: 8,
//   },

//   voiceButton: {
//     backgroundColor: '#EFF6FF',
//   },

//   qrButton: {
//     backgroundColor: '#ECFDF5',
//   },
// });





import React from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const GlobalSearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.searchRow}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Search with ImWallet"
          placeholderTextColor="#999"
          autoFocus={true}
          style={styles.searchInput}
        />
        <View style={styles.icons}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={24}
            color="#2563EB"
          />
          <MaterialCommunityIcons
            name="microphone"
            size={27}
            color="#2e91e2"
          />
        </View>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 13,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  searchIcon: {
    fontSize: 22,
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginHorizontal: 6,
    height: 45
  },
  icons:{
    flexDirection:'row',
    gap:8
  }
});

export default GlobalSearchBar;
