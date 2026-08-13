import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#EF4444',
          paddingHorizontal: 30,
          paddingVertical: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}