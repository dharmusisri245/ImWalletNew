// import React, { useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
// } from 'react-native';

// import { NativeStackScreenProps } from '@react-navigation/native-stack';

// import PermissionService from '../../services/PermissionService';
// import {
//   MMKVStorage,
//   KeychainStorage,
// } from '../../storage';
// import LocationService from '../../services/LocationService';

// type Props = NativeStackScreenProps<any>;

// const SplashScreen = ({ navigation }: Props) => {


// const initializeApp = async () => {
//   try {
//     console.log("1. Splash Started");

//     await new Promise(resolve => setTimeout(resolve, 2000));
//     console.log("2. Delay Finished");

//     console.log("3. Before Location");

//     const locationGranted =
//       await PermissionService.requestLocationPermission();
//       // Check if GPS is enabled
//       // const enabled= await LocationService.ensureGpsEnabled();
//       // console.log("GPS Enabled:", enabled);
//       // if(!enabled){
//       //   console.log("GPS is not enabled. Please enable GPS.");
//       //   return;
//       // }
//       // navigation.replace("Login");

//     console.log("4. Location:", locationGranted);

//     console.log("5. Before Camera");

//     const cameraGranted =
//       await PermissionService.requestCameraPermission();

//     console.log("6. Camera:", cameraGranted);

//     console.log("7. Before Notification");

//     const notificationGranted =
//       await PermissionService.requestNotificationPermission();

//     console.log("8. Notification:", notificationGranted);

//     console.log("9. Before Keychain");

//     const accessToken =
//       await KeychainStorage.getAccessToken();

//     console.log("10. AccessToken:", accessToken);

//     console.log("11. Before MMKV");

//     const employee =
//       MMKVStorage.getEmployee();

//     console.log("12. Employee:", employee);

//     navigation.replace("Login");

//   } catch (e) {
//     console.log("ERROR =>", e);
//   }
// };

// // const initializeApp = async () => {
// //   await new Promise(resolve => setTimeout(resolve, 2000));

// //   navigation.replace("Login");
// // };
  


// useEffect(() => {
//     initializeApp();
//   }, []);

//   return (
//     <View style={styles.container}>

//       <Image
//         source={require('../../assets/images/logo.png')}
//         style={styles.logo}
//         resizeMode="contain"
//       />

//       <Text style={styles.title}>
//         ImWallet
//       </Text>

//       <Text style={styles.subtitle}>
//         Employee Management System
//       </Text>

//       <ActivityIndicator
//         size="large"
//         color="#2563EB"
//       />

//     </View>
//   );
// };

// export default SplashScreen;

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },

//   logo: {
//     width: 120,
//     height: 120,
//     marginBottom: 20,
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#111827',
//   },

//   subtitle: {
//     marginTop: 8,
//     marginBottom: 40,
//     color: '#64748B',
//     fontSize: 15,
//   },

// });






import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import PermissionService from '../../services/PermissionService';
import AppSecurityService from '../../services/AppSecurityService';

import {
  MMKVStorage,
  KeychainStorage,
} from '../../storage';

type Props = NativeStackScreenProps<any>;

const SplashScreen = ({navigation}: Props) => {

  // const initializeApp = async () => {
  //   try {
  //     console.log('1. Splash Started');

  //     // --------------------------------
  //     // Splash Delay
  //     // --------------------------------

  //     await new Promise(resolve =>
  //       setTimeout(resolve, 2000),
  //     );

  //     console.log('2. Delay Finished');

  //     // --------------------------------
  //     // Location Permission
  //     // --------------------------------

  //     console.log(
  //       '3. Before Location',
  //     );

  //     const locationGranted =
  //       await PermissionService.requestLocationPermission();

  //     console.log(
  //       '4. Location:',
  //       locationGranted,
  //     );

  //     // --------------------------------
  //     // Camera Permission
  //     // --------------------------------

  //     console.log(
  //       '5. Before Camera',
  //     );

  //     const cameraGranted =
  //       await PermissionService.requestCameraPermission();

  //     console.log(
  //       '6. Camera:',
  //       cameraGranted,
  //     );

  //     // --------------------------------
  //     // Notification Permission
  //     // --------------------------------

  //     console.log(
  //       '7. Before Notification',
  //     );

  //     const notificationGranted =
  //       await PermissionService.requestNotificationPermission();

  //     console.log(
  //       '8. Notification:',
  //       notificationGranted,
  //     );

  //     // --------------------------------
  //     // Keychain
  //     // --------------------------------

  //     console.log(
  //       '9. Before Keychain',
  //     );

  //     const accessToken =
  //       await KeychainStorage.getAccessToken();

  //     console.log(
  //       '10. AccessToken:',
  //       accessToken,
  //     );

  //     // --------------------------------
  //     // MMKV
  //     // --------------------------------

  //     console.log(
  //       '11. Before MMKV',
  //     );

  //     const employee =
  //       MMKVStorage.getEmployee();

  //     console.log(
  //       '12. Employee:',
  //       employee,
  //     );

  //     // --------------------------------
  //     // APP SECURITY INITIALIZATION
  //     // --------------------------------

  //     console.log(
  //       '13. Initializing App Security',
  //     );

  //     AppSecurityService.initialize();

  //     console.log(
  //       '14. App Security Enabled:',
  //       AppSecurityService.isSecurityEnabled(),
  //     );

  //     // --------------------------------
  //     // Continue to Login
  //     // --------------------------------

  //     console.log(
  //       '15. Navigating to Login',
  //     );
  //     navigation.replace('Login');
      
  //   } catch (e) {
  //     console.log(
  //       'SPLASH ERROR =>',
  //       e,
  //     );
  //   }
  // };



const initializeApp = async () => {
  try {
    console.log('1. Splash Started');

    // --------------------------------
    // Splash Delay
    // --------------------------------

    await new Promise(resolve =>
      setTimeout(resolve, 2000),
    );

    console.log('2. Delay Finished');

    // --------------------------------
    // Location Permission
    // --------------------------------

    console.log('3. Before Location');

    const locationGranted =
      await PermissionService.requestLocationPermission();

    console.log('4. Location:', locationGranted);

    // --------------------------------
    // Camera Permission
    // --------------------------------

    console.log('5. Before Camera');

    const cameraGranted =
      await PermissionService.requestCameraPermission();

    console.log('6. Camera:', cameraGranted);

    // --------------------------------
    // Notification Permission
    // --------------------------------

    console.log('7. Before Notification');

    const notificationGranted =
      await PermissionService.requestNotificationPermission();

    console.log(
      '8. Notification:',
      notificationGranted,
    );

    // --------------------------------
    // Keychain
    // --------------------------------

    console.log('9. Before Keychain');

    const accessToken =
      await KeychainStorage.getAccessToken();

    console.log(
      '10. AccessToken:',
      accessToken,
    );

    // --------------------------------
    // MMKV
    // --------------------------------

    console.log('11. Before MMKV');

    const employee =
      MMKVStorage.getEmployee();

    console.log(
      '12. Employee:',
      employee,
    );

    // --------------------------------
    // APP SECURITY
    // --------------------------------

    console.log(
      '13. Initializing App Security',
    );

    AppSecurityService.initialize();

    const securityEnabled =
      AppSecurityService.isSecurityEnabled();

    console.log(
      '14. App Security Enabled:',
      securityEnabled,
    );

    // --------------------------------
    // CHECK LOGIN
    // --------------------------------

    console.log(
      '15. Checking existing login...',
    );

    const isLoggedIn =
      !!accessToken && !!employee;

    console.log(
      '16. Is Logged In:',
      isLoggedIn,
    );

    // --------------------------------
    // NO LOGIN
    // --------------------------------

    if (!isLoggedIn) {
      console.log(
        '17. No saved login → Login',
      );

      navigation.replace('Login');
      return;
    }

    // --------------------------------
    // EXISTING LOGIN
    // --------------------------------

    console.log(
      '17. Existing user found',
    );

    console.log(
      'Employee:',
      employee,
    );

    // --------------------------------
    // SECURITY CHECK
    // --------------------------------

    if (securityEnabled) {
      console.log(
        '18. Security enabled → Authentication',
      );

      const authenticated =
        await AppSecurityService.authenticateAndUnlock();

      if (!authenticated) {
        console.log(
          '19. Authentication failed → Login',
        );

        navigation.replace('Login');
        return;
      }

      console.log(
        '19. Authentication successful',
      );
    }

    // --------------------------------
    // OPEN APP
    // --------------------------------

    console.log(
      '20. Existing session → BottomTab',
    );

    navigation.replace('BottomTab');

  } catch (e) {
    console.log(
      'SPLASH ERROR =>',
      e,
    );

    navigation.replace('Login');
  }
};


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

