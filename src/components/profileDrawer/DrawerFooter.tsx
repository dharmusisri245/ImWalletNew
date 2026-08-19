// import Ionicons from '@react-native-vector-icons/ionicons';
// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// type DrawerFooterProps = {
//   onLogout: () => void;
// };

// const DrawerFooter = ({
//   onLogout,
// }: DrawerFooterProps) => {
//   return (
//     <View style={styles.container}>

//       <View style={styles.divider} />

//       <TouchableOpacity
//         activeOpacity={0.7}
//         style={styles.logoutButton}
//         onPress={onLogout}>

//         <View style={styles.iconContainer}>
//           <Ionicons
//             name="log-out-outline"
//             size={30}
//             color="#EF3030"
//           />
//         </View>

//         <Text style={styles.logoutText}>
//           Logout
//         </Text>

//       </TouchableOpacity>

//     </View>
//   );
// };

// export default DrawerFooter;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 10,
//   },

//   divider: {
//     height: 1,
//     backgroundColor: '#E3E7EE',
//     marginBottom:5,
//   },

//   logoutButton: {
//     minHeight: 76,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   iconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 20,
//     backgroundColor: '#FFF1F1',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 20,
//   },

//   logoutText: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#EF3030',
//   },
// });




import Ionicons from '@react-native-vector-icons/ionicons';

import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type DrawerFooterProps = {
  onLogout: () => void;
};

const DrawerFooter = ({
  onLogout,
}: DrawerFooterProps) => {

  return (
    <View style={styles.container}>

      <View style={styles.divider} />

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.logoutButton}
        onPress={onLogout}>

        <View style={styles.iconContainer}>

          <Ionicons
            name="log-out-outline"
            size={30}
            color="#EF3030"
          />

        </View>

        <Text style={styles.logoutText}>
          Logout
        </Text>

      </TouchableOpacity>

    </View>
  );
};

export default DrawerFooter;

const styles = StyleSheet.create({

  container: {
    paddingTop: 8,
  },

  divider: {
    height: 1,

    backgroundColor: '#E3E7EE',

    marginBottom: 4,
  },

  logoutButton: {
    minHeight: 72,

    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 52,
    height: 52,

    borderRadius: 20,

    backgroundColor: '#FFF1F1',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 18,
  },

  logoutText: {
    fontSize: 19,
    lineHeight: 24,

    fontWeight: '700',

    color: '#EF3030',
  },

});