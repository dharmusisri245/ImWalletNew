


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Feather from '@react-native-vector-icons/feather';
import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
export interface Service {
  id: number;
  title: string;
  icon: string;
  color: string;
  background: string;
}

interface Props {
  services?: Service[];
  onPress?: (item: Service) => void;
}

type HomeStackParamList = {
  HomeScreen: undefined;
  RegisterScreen: undefined;
  RegisteredScreen: undefined;
  KycScreen: undefined;
  AttendanceScreen: undefined;
  LeaveScreen:undefined;
  MyReportScreen:undefined;
  TargetScreen:undefined;
};



const defaultServices: Service[] = [
  {
    id: 1,
    title: 'Register',
    icon: 'store-plus',
    color: '#2563EB',
    background: '#E8F0FF',
  },
  {
    id: 2,
    title: 'Registered',
    icon: 'store-check',
    color: '#16A34A',
    background: '#E8F8EE',
  },
  {
    id: 3,
    title: 'KYC Verify',
    icon: 'card-account-details',
    color: '#7C3AED',
    background: '#F3E8FF',
  },
  {
    id: 4,
    title: 'Search',
    icon: 'magnify',
    color: '#0EA5E9',
    background: '#E0F2FE',
  },
  {
    id: 5,
    title: 'Attendance',
    icon: 'fingerprint',
    color: '#F59E0B',
    background: '#FEF3C7',
  },
  {
    id: 6,
    title: 'Leave',
    icon: 'calendar-remove',
    color: '#EF4444',
    background: '#FEE2E2',
  },
  {
    id: 7,
    title: 'Reports',
    icon: 'file-chart',
    color: '#F97316',
    background: '#FFEDD5',
  },
  {
    id: 8,
    title: 'Target',
    icon: 'target',
    color: '#14B8A6',
    background: '#DCFCE7',
  },
];

const QuickServices = ({
  services = defaultServices,
  onPress,
}: Props) => {

  const navigation =
useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

const handleNavigation = (item: Service) => {
  switch (item.title) {
    case 'Register':
      navigation.navigate('RegisterScreen');
      break;

    case 'Registered':
      navigation.navigate('RegisteredScreen');
      break;

    case 'KYC Verify':
      navigation.navigate('KycScreen');
      break;

    case 'Attendance':
      navigation.navigate('AttendanceScreen');
      break;

    case 'Leave':
      navigation.navigate('LeaveScreen');
      break;
      
    case 'Reports':
      navigation.navigate('MyReportScreen');
      break;
      
    case 'Target':
      navigation.navigate('TargetScreen');
      break;  

    default:
      onPress?.(item);
      break;
  }
};


  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.heading}>
          Quick Services
        </Text>

        <TouchableOpacity>
          <View style={styles.viewAll}>
            <Text style={styles.viewAllText}>
              View All
            </Text>

            <Feather
              name="chevron-right"
              size={15}
              color="#2563EB"
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {services.map(item => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={item.id}
            style={styles.item}
            onPress={() => handleNavigation(item)}>

            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: item.background,
                },
              ]}>
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color={item.color}
              />
            </View>

            <Text
              numberOfLines={2}
              style={styles.title}>
              {item.title}
            </Text>

          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default QuickServices;

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 18,

    marginBottom: 20,

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 18,
  },

  heading: {
    fontSize: 17,

    fontWeight: '700',

    color: '#111827',
  },

  viewAll: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  viewAllText: {
    color: '#2563EB',

    fontSize: 13,

    fontWeight: '600',

    marginRight: 2,
  },

  grid: {
    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',
  },

  item: {
    width: '24%',

    alignItems: 'center',

    marginBottom: 18,
  },

  iconContainer: {
    width: 58,

    height: 58,

    borderRadius: 18,

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.05,

    shadowRadius: 4,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 1,
  },

  title: {
    marginTop: 10,

    fontSize: 11,

    fontWeight: '600',

    color: '#374151',

    textAlign: 'center',

    lineHeight: 15,
  },

});






// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';

// import Feather from '@react-native-vector-icons/feather';
// import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

// export interface Service {
//   id: number;
//   title: string;
//   icon: string;
//   color: string;
//   background: string;
// }

// interface Props {
//   services?: Service[];
//   onPress?: (item: Service) => void;
// }

// const defaultServices: Service[] = [
//   {
//     id: 1,
//     title: 'Register',
//     icon: 'store-plus',
//     color: '#2563EB',
//     background: '#E8F0FF',
//   },
//   {
//     id: 2,
//     title: 'Registered',
//     icon: 'store-check',
//     color: '#16A34A',
//     background: '#E8F8EE',
//   },
//   {
//     id: 3,
//     title: 'KYC Verify',
//     icon: 'card-account-details',
//     color: '#7C3AED',
//     background: '#F3E8FF',
//   },
//   {
//     id: 4,
//     title: 'Search',
//     icon: 'magnify',
//     color: '#0EA5E9',
//     background: '#E0F2FE',
//   },
//   {
//     id: 5,
//     title: 'Attendance',
//     icon: 'fingerprint',
//     color: '#F59E0B',
//     background: '#FEF3C7',
//   },
//   {
//     id: 6,
//     title: 'Leave',
//     icon: 'calendar-remove',
//     color: '#EF4444',
//     background: '#FEE2E2',
//   },
//   {
//     id: 7,
//     title: 'Reports',
//     icon: 'file-chart',
//     color: '#F97316',
//     background: '#FFEDD5',
//   },
//   {
//     id: 8,
//     title: 'Target',
//     icon: 'target',
//     color: '#14B8A6',
//     background: '#DCFCE7',
//   },
// ];

// const QuickServices = ({
//   services = defaultServices,
//   onPress,
// }: Props) => {

//   const handleNavigation = (item: Service) => {
//     console.log('Pressed =>', item.title);

//     if (onPress) {
//       onPress(item);
//     }
//   };

//   return (
//     <View style={styles.card}>

//       <View style={styles.header}>
//         <Text style={styles.heading}>
//           Quick Services
//         </Text>

//         <TouchableOpacity activeOpacity={0.8}>
//           <View style={styles.viewAll}>
//             <Text style={styles.viewAllText}>
//               View All
//             </Text>

//             <Feather
//               name="chevron-right"
//               size={15}
//               color="#2563EB"
//             />
//           </View>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.grid}>
//         {services.map(item => (
//           <TouchableOpacity
//             key={item.id}
//             activeOpacity={0.8}
//             style={styles.item}
//             onPress={() => handleNavigation(item)}
//           >
//             <View
//               style={[
//                 styles.iconContainer,
//                 {
//                   backgroundColor: item.background,
//                 },
//               ]}
//             >
//               <MaterialCommunityIcons
//                 name={item.icon}
//                 size={28}
//                 color={item.color}
//               />
//             </View>

//             <Text
//               style={styles.title}
//               numberOfLines={2}
//             >
//               {item.title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//     </View>
//   );
// };

// export default QuickServices;

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 18,
//     marginBottom: 20,

//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 8,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     elevation: 3,
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 18,
//   },

//   heading: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#111827',
//   },

//   viewAll: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   viewAllText: {
//     color: '#2563EB',
//     fontSize: 13,
//     fontWeight: '600',
//     marginRight: 2,
//   },

//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },

//   item: {
//     width: '24%',
//     alignItems: 'center',
//     marginBottom: 18,
//   },

//   iconContainer: {
//     width: 58,
//     height: 58,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',

//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     elevation: 1,
//   },

//   title: {
//     marginTop: 10,
//     fontSize: 11,
//     fontWeight: '600',
//     color: '#374151',
//     textAlign: 'center',
//     lineHeight: 15,
//   },
// });



// import { View, Text } from 'react-native'
// import React from 'react'

// const QuickServices = () => {
//   return (
//     <View>
//       <Text>QuickServices</Text>
//     </View>
//   )
// }

// export default QuickServices