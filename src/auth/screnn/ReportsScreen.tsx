import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Reports Screen</Text>
    </View>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FC',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
});