import React from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeychainStorage, MMKVStorage } from '../storage';

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
          onPress: async () => {
            try {
              console.log('logout succesfull');
              await KeychainStorage.removeAccessToken;
              await KeychainStorage.removeRefreshToken;

              // remove employee data
              MMKVStorage.clearAll();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (err) {
              console.log(`Logout failed pleadse again ${err}`);
            }

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