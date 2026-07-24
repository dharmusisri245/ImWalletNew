



import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';


import LinearGradient from 'react-native-linear-gradient';
import Feather from '@react-native-vector-icons/feather';

interface Props {
  status: 'Checked In' | 'Checked Out' | 'Not Checked In';
  checkInTime?: string;
  workingHours?: string;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
}

const AttendanceCard = ({
  status,
  checkInTime,
  workingHours,
  onCheckIn,
  onCheckOut,
}: Props) => {
  const checkedIn = status === 'Checked In';

  return (
    <LinearGradient
      colors={['#3B82F6', '#1D4ED8']}
      style={styles.container}>
      <View style={styles.topRow}>
        <View>

          <Text style={styles.title}>
            Today's Attendance
          </Text>

          <View style={styles.statusRow}>
            <View style={styles.dot} />

            <Text style={styles.status}>
              {status}
            </Text>
          </View>

          <Text style={styles.time}>
            Check In : {checkInTime || '--:--'}
          </Text>

          <Text style={styles.time}>
            Working : {workingHours || '00h 00m'}
          </Text>

        </View>

        {checkedIn ? (
          <TouchableOpacity
            style={styles.button}
            onPress={onCheckOut}>

            <Feather
              name="log-out"
              size={16}
              color="#2563EB"
            />

            <Text style={styles.buttonText}>
              Check Out
            </Text>

          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={onCheckIn}
            >

            <Feather
              name="log-in"
              size={16}
              color="#16A34A"
            />

            <Text
              style={[
                styles.buttonText,
                { color: '#16A34A' },
              ]}>
              Check In
            </Text>

          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default AttendanceCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    color: '#DCE7FF',
    fontSize: 13,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#4ADE80',
    marginRight: 6,
  },

  status: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },

  time: {
    color: '#E5E7EB',
    marginTop: 5,
    fontSize: 12,
  },

  button: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonText: {
    marginLeft: 8,
    color: '#2563EB',
    fontWeight: '700',
  },
});

