import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface VisitTimerProps {
  startTime: Date;
}

const VisitTimer: React.FC<VisitTimerProps> = ({
  startTime,
}) => {

  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date();

      const diff =
        Math.floor(
          (now.getTime() - startTime.getTime()) / 1000,
        );

      const hours =
        String(Math.floor(diff / 3600)).padStart(2, '0');

      const minutes =
        String(Math.floor((diff % 3600) / 60)).padStart(2, '0');

      const seconds =
        String(diff % 60).padStart(2, '0');

      setElapsedTime(
        `${hours}:${minutes}:${seconds}`,
      );

    }, 1000);

    return () => clearInterval(interval);

  }, [startTime]);

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <Ionicons
          name="timer-outline"
          size={24}
          color="#0936B0"
        />

        <Text style={styles.title}>
          Visit Duration
        </Text>

      </View>

      <Text style={styles.timer}>
        {elapsedTime}
      </Text>

      <View style={styles.footer}>

        <Ionicons
          name="time-outline"
          size={16}
          color="#6B7280"
        />

        <Text style={styles.startTime}>
          Started :
          {' '}
          {startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>

      </View>

    </View>
  );
};

export default React.memo(VisitTimer);

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 20,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  header: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 16,
  },

  title: {

    marginLeft: 8,

    fontSize: 18,

    fontWeight: '700',

    color: '#111827',
  },

  timer: {

    fontSize: 40,

    fontWeight: '800',

    color: '#0936B0',

    letterSpacing: 2,

    marginVertical: 12,
  },

  footer: {

    flexDirection: 'row',

    alignItems: 'center',
  },

  startTime: {

    marginLeft: 6,

    color: '#6B7280',

    fontSize: 14,

    fontWeight: '600',
  },

});