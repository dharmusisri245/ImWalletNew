import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import PermissionService from '../../services/PermissionService';
import {
  MMKVStorage,
  KeychainStorage,
} from '../../storage';

type Props = NativeStackScreenProps<any>;

const SplashScreen = ({ navigation }: Props) => {


const initializeApp = async () => {
  try {
    console.log("1. Splash Started");

    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("2. Delay Finished");

    console.log("3. Before Location");

    const locationGranted =
      await PermissionService.requestLocationPermission();

    console.log("4. Location:", locationGranted);

    console.log("5. Before Camera");

    const cameraGranted =
      await PermissionService.requestCameraPermission();

    console.log("6. Camera:", cameraGranted);

    console.log("7. Before Notification");

    const notificationGranted =
      await PermissionService.requestNotificationPermission();

    console.log("8. Notification:", notificationGranted);

    console.log("9. Before Keychain");

    const accessToken =
      await KeychainStorage.getAccessToken();

    console.log("10. AccessToken:", accessToken);

    console.log("11. Before MMKV");

    const employee =
      MMKVStorage.getEmployee();

    console.log("12. Employee:", employee);

    navigation.replace("Login");

  } catch (e) {
    console.log("ERROR =>", e);
  }
};

// const initializeApp = async () => {
//   await new Promise(resolve => setTimeout(resolve, 2000));

//   navigation.replace("Login");
// };
  


useEffect(() => {
    initializeApp();
  }, []);

  return (
    <View style={styles.container}>

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        ImWallet
      </Text>

      <Text style={styles.subtitle}>
        Employee Management System
      </Text>

      <ActivityIndicator
        size="large"
        color="#2563EB"
      />

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 40,
    color: '#64748B',
    fontSize: 15,
  },

});






