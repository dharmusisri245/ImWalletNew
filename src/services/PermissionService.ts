// import { Platform } from 'react-native';
// import {
//   check,
//   request,
//   RESULTS,
//   PERMISSIONS,
//   openSettings,
// } from 'react-native-permissions';

// class PermissionService {
//   /**
//    * Request Camera Permission
//    */
//   async requestCameraPermission(): Promise<boolean> {
//     const permission =
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.CAMERA
//         : PERMISSIONS.IOS.CAMERA;

//     const status = await check(permission);

//     if (status === RESULTS.GRANTED) {
//       return true;
//     }

//     const result = await request(permission);

//     return result === RESULTS.GRANTED;
//   }

//   /**
//    * Request Fine Location
//    */
//   async requestLocationPermission(): Promise<boolean> {
//     const permission =
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//         : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

//     const status = await check(permission);

//     if (status === RESULTS.GRANTED) {
//       return true;
//     }

//     const result = await request(permission);

//     return result === RESULTS.GRANTED;
//   }

//   /**
//    * Background Location
//    */
//   async requestBackgroundLocationPermission(): Promise<boolean> {

//     if (Platform.OS !== 'android') {
//       return true;
//     }

//     const permission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

//     if (!permission) {
//       return true;
//     }

//     const status = await request(permission);

//     return status === RESULTS.GRANTED;
//   }

//   /**
//    * Notification Permission
//    */


//   async requestNotificationPermission(): Promise<boolean> {
//     if (Platform.OS !== 'android') {
//       return true;
//     }

//     const status = await request(
//       PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
//     );

//     return status === RESULTS.GRANTED;
//   }




//   // async requestNotificationPermission(): Promise<boolean> {

//   //   if (Platform.OS !== 'android') {
//   //     return true;
//   //   }

//   //   // Android 12 and below don't need runtime notification permission
//   //   if (Platform.Version < 33) {
//   //     return true;
//   //   }

//   //   const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

//   //   if (!permission) {
//   //     return true;
//   //   }

//   //   const status = await request(permission);

//   //   return status === RESULTS.GRANTED;
//   // }




//   /**
//    * Open Settings
//    */
//   openAppSettings() {
//     openSettings();
//   }
// }

// export default new PermissionService();





import { Platform } from 'react-native';
import {
  check,
  request,
  requestNotifications,
  RESULTS,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

class PermissionService {
  /**
   * Request Camera Permission
   */
  async requestCameraPermission(): Promise<boolean> {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  }

  /**
   * Request Fine Location
   */
  async requestLocationPermission(): Promise<boolean> {
    const permission =
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const status = await check(permission);

    if (status === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  }

  /**
   * Background Location
   */
  async requestBackgroundLocationPermission(): Promise<boolean> {

    if (Platform.OS !== 'android') {
      return true;
    }

    const permission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;

    if (!permission) {
      return true;
    }

    const status = await request(permission);

    return status === RESULTS.GRANTED;
  }

  /**
   * Notification Permission
   */


  async requestNotificationPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    // Android 12 and below
    if (Platform.Version < 33) {
      return true;
    }

    const { status } = await requestNotifications([
      'alert',
      'sound',
      'badge',
    ]);

    return status === RESULTS.GRANTED;
  }

/**
 * Request Camera + Location together
 */
async requestCheckInPermissions(): Promise<{
  camera: boolean;
  location: boolean;
}> {
  const camera = await this.requestCameraPermission();
  const location = await this.requestLocationPermission();

  return {
    camera,
    location,
  };
}



async hasCameraPermission(): Promise<boolean> {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA;

  const status = await check(permission);

  return status === RESULTS.GRANTED;
}

async hasLocationPermission(): Promise<boolean> {
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  const status = await check(permission);

  return status === RESULTS.GRANTED;
}



  /**
   * Open Settings
   */
  openAppSettings() {
    openSettings();
  }
}

export default new PermissionService();





// import { Platform } from 'react-native';
// import {
//   check,
//   request,
//   RESULTS,
//   PERMISSIONS,
//   openSettings,
// } from 'react-native-permissions';

// class PermissionService {
//   /**
//    * Request Camera Permission
//    */
//   async requestCameraPermission(): Promise<boolean> {
//     const permission =
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.CAMERA
//         : PERMISSIONS.IOS.CAMERA;

//     const status = await check(permission);
//     if (status === RESULTS.GRANTED) {
//       return true;
//     }

//     const result = await request(permission);
//     return result === RESULTS.GRANTED;
//   }

//   /**
//    * Request Fine Location
//    */
//   async requestLocationPermission(): Promise<boolean> {
//     const permission =
//       Platform.OS === 'android'
//         ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//         : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

//     const status = await check(permission);
//     if (status === RESULTS.GRANTED) {
//       return true;
//     }

//     const result = await request(permission);
//     return result === RESULTS.GRANTED;
//   }

//   /**
//    * Background Location (Android only — used for optional live tracking)
//    */
//   async requestBackgroundLocationPermission(): Promise<boolean> {
//     if (Platform.OS !== 'android') {
//       return true;
//     }

//     const permission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
//     if (!permission) {
//       return true;
//     }

//     const status = await request(permission);
//     return status === RESULTS.GRANTED;
//   }

//   /**
//    * Notification Permission (Android 13+ only)
//    */
//   async requestNotificationPermission(): Promise<boolean> {
//     if (Platform.OS !== 'android') {
//       return true;
//     }

//     // Android 12 and below don't need runtime notification permission
//     if (Platform.Version < 33) {
//       return true;
//     }

//     const permission = PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
//     if (!permission) {
//       return true;
//     }

//     const status = await request(permission);
//     return status === RESULTS.GRANTED;
//   }

//   /**
//    * Convenience helper — requests camera + location together.
//    * Use this right before opening the check-in / check-out camera flow.
//    */
//   async requestCheckInPermissions(): Promise<{
//     camera: boolean;
//     location: boolean;
//   }> {
//     const camera = await this.requestCameraPermission();
//     const location = await this.requestLocationPermission();
//     return { camera, location };
//   }

//   /**
//    * Open Settings — used when the user has permanently denied a permission
//    */
//   openAppSettings() {
//     openSettings();
//   }
// }

// export default new PermissionService();