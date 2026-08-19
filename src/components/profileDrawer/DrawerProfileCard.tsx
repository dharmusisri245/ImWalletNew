// import React from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';

// import Ionicons from "@react-native-vector-icons/ionicons";

// import type {DrawerUser} from '../../auth/types/drawer/drawer';

// type DrawerProfileCardProps = {
//   user: DrawerUser;
// };

// const DrawerProfileCard = ({
//   user,
// }: DrawerProfileCardProps) => {
//   return (
//     <View style={styles.card}>
      
//       <View style={styles.avatarContainer}>
//         {user?.avatar ? (
//           <Image
//             source={{uri: user.avatar}}
//             style={styles.avatar}
//           />
//         ) : (
//           <Ionicons
//             name="person"
//             size={30}
//             color="#2F6BFF"
//           />
//         )}
//       </View>

//       <View style={styles.userInfo}>
//         <Text
//           numberOfLines={1}
//           style={styles.name}>
//           {user?.name}
//         </Text>

//         <Text
//           numberOfLines={1}
//           style={styles.designation}>
//           {user?.designation}
//         </Text>

//         <View style={styles.employeeRow}>
//           <Text style={styles.employeeLabel}>
//             Employee ID
//           </Text>

//           <Text style={styles.employeeId}>
//             {user?.employeeId}
//           </Text>
//         </View>
//       </View>

//     </View>
//   );
// };

// export default DrawerProfileCard;

// const styles = StyleSheet.create({
//   card: {
//     minHeight: 100,
//     borderRadius: 26,
//     backgroundColor: '#F4F7FD',
//     paddingHorizontal: 10,
//     paddingVertical: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding:10
//   },

//   avatarContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//     backgroundColor: '#E3EDFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },

//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 50,
//   },

//   userInfo: {
//     flex: 1,
//   },

//   name: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#172033',
//   },

//   designation: {
//     marginTop: 5,
//     fontSize: 13,
//     fontWeight:600,
//     color: '#71809A',
//   },

//   employeeRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },

//   employeeLabel: {
//     fontSize: 14,
//     color: '#8B97AA',
//     fontWeight:600,
//     marginRight: 8,
//   },

//   employeeId: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#2F6BFF',
//   },
// });





import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import type {DrawerUser} from '../../auth/types/drawer/drawer';

type DrawerProfileCardProps = {
  user: DrawerUser;
};

const DrawerProfileCard = ({
  user,
}: DrawerProfileCardProps) => {
  return (
    <View style={styles.card}>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {user?.avatar ? (
          <Image
            source={{uri: user.avatar}}
            style={styles.avatar}
          />
        ) : (
          <Ionicons
            name="person"
            size={28}
            color="#2F6BFF"
          />
        )}
      </View>

      {/* User Information */}
      <View style={styles.userInfo}>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.name}>
          {user?.name || 'Employee'}
        </Text>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.designation}>
          {user?.designation || 'Employee'}
        </Text>

        <View style={styles.employeeRow}>

          <Text style={styles.employeeLabel}>
            Employee ID
          </Text>

          <Text
            numberOfLines={1}
            style={styles.employeeId}>
            {user?.employeeId || '-'}
          </Text>

        </View>

      </View>

    </View>
  );
};

export default DrawerProfileCard;

const styles = StyleSheet.create({

  card: {
    width: '100%',
    minHeight: 112,

    borderRadius: 26,

    // backgroundColor: '#F4F7FD',
backgroundColor: '#f0f1e8',
    paddingHorizontal: 16,
    paddingVertical: 18,

    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarContainer: {
    width: 62,
    height: 62,

    borderRadius: 31,

    backgroundColor: '#E3EDFF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,

    overflow: 'hidden',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  userInfo: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    fontSize: 20,
    lineHeight: 24,

    fontWeight: '700',

    color: '#172033',
  },

  designation: {
    marginTop: 4,

    fontSize: 14,
    lineHeight: 19,

    fontWeight: '500',

    color: '#71809A',
  },

  employeeRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 7,
  },

  employeeLabel: {
    fontSize: 14,
    lineHeight: 19,

    fontWeight: '500',

    color: '#8B97AA',

    marginRight: 7,
  },

  employeeId: {
    flexShrink: 1,

    fontSize: 15,
    lineHeight: 19,

    fontWeight: '700',

    color: '#2F6BFF',
  },
});