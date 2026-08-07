






// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Feather from '@react-native-vector-icons/feather';

// interface Props {
//   status: 'Checked In' | 'Checked Out' | 'Not Checked In';
//   checkInTime?: string;
//   checkOutTime?: string;
//   workingHours?: string;
//   onCheckIn?: () => void;
//   onCheckOut?: () => void;
// }

// interface AttendanceSummary {
//   status: 'Checked In' | 'Checked Out' | 'Not Checked In';
//   checkInTime?: string;
//   checkOutTime?: string;
//   workingHours?: string;
// }


// const AttendanceCard = ({
//   status,
//   checkInTime,
//   checkOutTime,
//   workingHours,
//   onCheckIn,
//   onCheckOut,
// }: Props) => {
//   const checkedIn = status === 'Checked In';

//   return (
//     <LinearGradient
//       colors={['#3B82F6', '#1D4ED8']}
//       start={{ x: 0, y: 0 }}
//       end={{ x: 1, y: 1 }}
//       style={styles.container}>

//       <View style={styles.topRow}>
//    {/* right container */}
//         <View style={styles.leftContainer}>

//           <Text style={styles.title}>
//             Today's Attendance
//           </Text>

//           <View style={styles.statusRow}>
//             <View style={styles.dot} />

//             <Text
//               style={styles.status}
//               numberOfLines={1}>
//               {status}
//             </Text>
//           </View>

//           <Text
//             style={styles.time}
//             numberOfLines={1}>
//             Check In : {checkInTime || '--:--'}
//           </Text>
//           <Text style={styles.time}>
//             Check Out : {checkOutTime || '--:--'}
//           </Text>

//           <Text
//             style={styles.time}
//             numberOfLines={1}>
//             Working : {workingHours || '00h 00m'}
//           </Text>
//         </View>


//         {/* left container */}

//         <View style={ Platform.select({
//           ios: {
//             marginTop: 15,
//           },
//           android: {
//             marginTop: 0,
//           },
//         })}>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={styles.button}
//           onPress={checkedIn ? onCheckOut : onCheckIn}>

//           <Feather
//             name={checkedIn ? 'log-out' : 'log-in'}
//             size={18}
//             color={checkedIn ? '#2563EB' : '#16A34A'}
//           />

//           <Text
//             style={[
//               styles.buttonText,
//               {
//                 color: checkedIn
//                   ? '#2563EB'
//                   : '#16A34A',
//               },
//             ]}>
//             {checkedIn ? 'Check Out' : 'Check In'}
//           </Text>

//         </TouchableOpacity>
//         </View>

//       </View>

//     </LinearGradient>
//   );
// };

// export default AttendanceCard;

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 18,
//     padding: 10,
//     marginBottom: 20,

//     ...Platform.select({
//       ios: {
//         minHeight: 70,
//         padding:-2
//       },
//       android: {},
//     }),
//   },

//   topRow: {
//     flexDirection: 'row',

//     ...Platform.select({
//       ios: {
//         alignItems: 'flex-start',
//       },
//       android: {
//         alignItems: 'center',
//       },
//     }),
//   },

//   leftContainer: {
//     flex: 1,
//     paddingRight: 12,

//     ...Platform.select({
//       ios: {
//         minWidth:0,
//         paddingLeft: 15,
//         paddingBottom: 10,
//       },
//       android: {},
//     }),
//   },

//   title: {
//     color: '#DCE7FF',
//     fontSize: 13,
//     marginBottom: 4,

//     ...Platform.select({
//       ios: {
//         lineHeight: 30,
//         paddingTop: 8,
//       },
//       android: {},
//     }),
//   },

//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },

//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#4ADE80',
//     marginRight: 6,
//   },

//   status: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//     flexShrink: 1,

//     ...Platform.select({
//       ios: {
//         lineHeight: 30,
//       },
//       android: {},
//     }),
//   },

//   time: {
//     color: '#E5E7EB',
//     fontSize: 12,
//     marginTop: 3,

//     ...Platform.select({
//       ios: {
//         lineHeight: 18,
//       },
//       android: {},
//     }),
//   },

//   button: {
//     width: 115,
//     height: 50,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
    
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     flexShrink: 0,

//     ...Platform.select({
//       ios: {
//         alignSelf: 'flex-start',
//         marginRight:20,
//         marginTop:30,
//       },
//       android: {},
//     }),
//   },

//   buttonText: {
//     marginLeft: 6,
//     fontSize: 15,
//     fontWeight: '700',
//   },
// });














import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';

interface Props {
  status: 'Checked In' | 'Checked Out' | 'Not Checked In';
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: string;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
}

interface AttendanceSummary {
  status: 'Checked In' | 'Checked Out' | 'Not Checked In';
  checkInTime?: string;
  checkOutTime?: string;
  workingHours?: string;
}


const AttendanceCard = ({
  status,
  checkInTime,
  checkOutTime,
  workingHours,
  onCheckIn,
  onCheckOut,
}: Props) => {
  const checkedIn = status === 'Checked In';

  return (
    <LinearGradient
  colors={['#3B82F6', '#1D4ED8']}
  start={{x: 0, y: 0}}
  end={{x: 1, y: 1}}
  style={styles.container}>

  <Text style={styles.title}>Today's Attendance</Text>

  <View style={styles.headerRow}>
    <View style={{flex: 1}}>
      <View style={styles.statusRow}>
        <View style={styles.checkCircle}>
          <Feather
            name={checkedIn ? 'check' : 'clock'}
            color="#fff"
            size={18}
          />
        </View>

        <Text style={styles.status}>{status}</Text>

        {/* {checkedIn && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Active</Text>
          </View>
        )} */}
      </View>
    </View>

    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={checkedIn ? onCheckOut : onCheckIn}>
      <Feather
        name={checkedIn ? 'log-out' : 'log-in'}
        size={18}
        color="#2563EB"
      />
      <Text style={styles.buttonText}>
        {checkedIn ? 'Check Out' : 'Check In'}
      </Text>
    </TouchableOpacity>
  </View>

  <View style={styles.divider} />

  <View style={styles.bottomRow}>

    <View style={styles.item}>
      <View style={styles.iconCircle}>
        <Feather name="clock" color="#fff" size={18} />
      </View>

      <Text style={styles.label}>Check In</Text>
      <Text style={styles.value}>{checkInTime || '--:--'}</Text>
    </View>

    <View style={styles.verticalDivider} />

    <View style={styles.item}>
      <View style={styles.iconCircle}>
        <Feather name="log-out" color="#fff" size={18} />
      </View>

      <Text style={styles.label}>Check Out</Text>
      <Text style={styles.value}>{checkOutTime || '--:--'}</Text>
    </View>

    <View style={styles.verticalDivider} />

    <View style={styles.item}>
      <View style={styles.iconCircle}>
        <Feather name="watch" color="#fff" size={18} />
      </View>

      <Text style={styles.label}>Working Duration</Text>
      <Text style={styles.value}>
        {workingHours || '--'}
      </Text>
    </View>

  </View>

</LinearGradient>
  );
};

export default AttendanceCard;

const styles = StyleSheet.create({
  container: {
  borderRadius: 18,
  // padding: 8,
  overflow: 'hidden',
  marginBottom:20
},

headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},

checkCircle: {
  width: 38,
  height: 38,
  borderRadius: 22,
  backgroundColor: '#22C55E',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8,
  marginLeft:10
},

statusRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

status: {
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},

activeBadge: {
  marginLeft: 12,
  backgroundColor: 'rgba(74,222,128,0.22)',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 20,
},
title:{
  marginTop:8,
  marginLeft:18,
  color:'white',
  fontSize:17

},

activeText: {
  color: '#A7F3D0',
  fontWeight: '700',
},

button: {
  width: 130,
  height: 47,
  backgroundColor: '#fff',
  borderRadius: 15,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight:10
},

buttonText: {
  color: '#2563EB',
  fontSize: 16,
  fontWeight: '700',
  marginLeft: 8,
},

divider: {
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.18)',
  marginVertical: 10,
},

bottomRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

item: {
  flex: 1,
  alignItems: 'center',
},

iconCircle: {
  width: 40,
  height: 40,
  borderRadius: 23,
  backgroundColor: 'rgba(255,255,255,0.12)',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 5,

},

label: {
  color: '#DCE7FF',
  fontSize: 13,
},

value: {
  marginTop: 6,
  color: '#fff',
  fontSize: 18,
  fontWeight: '700',
},

verticalDivider: {
  width: 1,
  backgroundColor: 'rgba(255,255,255,0.18)',
},
});
