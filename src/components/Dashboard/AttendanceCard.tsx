






// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
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

//       </View>

//     </LinearGradient>
//   );
// };

// export default AttendanceCard;

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 18,
//     padding: 18,
//     marginBottom: 20,
//   },

//   topRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // alignItems:'flex-start'
//   },

//   leftContainer: {
//     flex: 1,
//     paddingRight: 12,
//   },

//   title: {
//     color: '#DCE7FF',
//     fontSize: 13,
//     marginBottom: 4,
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
//   },
//   time: {
//     color: '#E5E7EB',
//     fontSize: 12,
//     marginTop: 3,
//   },
//   button: {
//     width: 118,
//     height: 42,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,

//     justifyContent: 'center',
//     alignItems: 'center',

//     flexDirection: 'row',

//     flexShrink: 0,
//   },

//   buttonText: {
//     marginLeft: 6,
//     fontSize: 14,
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
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>

      <View style={styles.topRow}>
   {/* right container */}
        <View style={styles.leftContainer}>

          <Text style={styles.title}>
            Today's Attendance
          </Text>

          <View style={styles.statusRow}>
            <View style={styles.dot} />

            <Text
              style={styles.status}
              numberOfLines={1}>
              {status}
            </Text>
          </View>

          <Text
            style={styles.time}
            numberOfLines={1}>
            Check In : {checkInTime || '--:--'}
          </Text>
          <Text style={styles.time}>
            Check Out : {checkOutTime || '--:--'}
          </Text>

          <Text
            style={styles.time}
            numberOfLines={1}>
            Working : {workingHours || '00h 00m'}
          </Text>
        </View>


        {/* left container */}

        <View style={ Platform.select({
          ios: {
            marginTop: 15,
          },
          android: {
            marginTop: 0,
          },
        })}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={checkedIn ? onCheckOut : onCheckIn}>

          <Feather
            name={checkedIn ? 'log-out' : 'log-in'}
            size={18}
            color={checkedIn ? '#2563EB' : '#16A34A'}
          />

          <Text
            style={[
              styles.buttonText,
              {
                color: checkedIn
                  ? '#2563EB'
                  : '#16A34A',
              },
            ]}>
            {checkedIn ? 'Check Out' : 'Check In'}
          </Text>

        </TouchableOpacity>
        </View>

      </View>

    </LinearGradient>
  );
};

export default AttendanceCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 10,
    marginBottom: 20,

    ...Platform.select({
      ios: {
        minHeight: 70,
        padding:-2
      },
      android: {},
    }),
  },

  topRow: {
    flexDirection: 'row',

    ...Platform.select({
      ios: {
        alignItems: 'flex-start',
      },
      android: {
        alignItems: 'center',
      },
    }),
  },

  leftContainer: {
    flex: 1,
    paddingRight: 12,

    ...Platform.select({
      ios: {
        minWidth:0,
        paddingLeft: 15,
        paddingBottom: 10,
      },
      android: {},
    }),
  },

  title: {
    color: '#DCE7FF',
    fontSize: 13,
    marginBottom: 4,

    ...Platform.select({
      ios: {
        lineHeight: 30,
        paddingTop: 8,
      },
      android: {},
    }),
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },

  status: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    flexShrink: 1,

    ...Platform.select({
      ios: {
        lineHeight: 30,
      },
      android: {},
    }),
  },

  time: {
    color: '#E5E7EB',
    fontSize: 12,
    marginTop: 3,

    ...Platform.select({
      ios: {
        lineHeight: 18,
      },
      android: {},
    }),
  },

  button: {
    width: 115,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 0,

    ...Platform.select({
      ios: {
        alignSelf: 'flex-start',
        marginRight:20,
        marginTop:30,
      },
      android: {},
    }),
  },

  buttonText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '700',
  },
});
