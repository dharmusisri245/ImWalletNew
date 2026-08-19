// // src/storage/MMKVStorage.ts

// import { createMMKV } from 'react-native-mmkv';
// import { StorageKeys } from './StorageKeys';

// const storage = createMMKV();

// class MMKVStorage {
//   //==========================
//   // Employee
//   //==========================

//   saveEmployee<T>(employee: T) {
//     storage.set(
//       StorageKeys.EMPLOYEE,
//       JSON.stringify(employee),
//     );
//   }

//   getEmployee<T>(): T | null {
//     try {
//       const data = storage.getString(
//         StorageKeys.EMPLOYEE,
//       );

//       return data ? JSON.parse(data) : null;
//     } catch {
//       return null;
//     }
//   }

//   removeEmployee() {
//     storage.delete(StorageKeys.EMPLOYEE);
//   }

//   //==========================
//   // Check In Status
//   //==========================

//   saveCheckInStatus(status: boolean) {
//     storage.set(StorageKeys.CHECKED_IN, status);
//   }

//   isCheckedIn() {
//     return (
//       storage.getBoolean(
//         StorageKeys.CHECKED_IN,
//       ) ?? false
//     );
//   }

//   //==========================
//   // Check In Time
//   //==========================

//   saveCheckInTime(time: string) {
//     storage.set(
//       StorageKeys.CHECK_IN_TIME,
//       time,
//     );
//   }

//   getCheckInTime() {
//     return storage.getString(
//       StorageKeys.CHECK_IN_TIME,
//     );
//   }

//   //==========================
//   // Check Out Time
//   //==========================

//   saveCheckOutTime(time: string) {
//     storage.set(
//       StorageKeys.CHECK_OUT_TIME,
//       time,
//     );
//   }

//   getCheckOutTime() {
//     return storage.getString(
//       StorageKeys.CHECK_OUT_TIME,
//     );
//   }

//   //==========================
//   // Last Location
//   //==========================

//   saveLastLocation(location: any) {
//     storage.set(
//       StorageKeys.LAST_LOCATION,
//       JSON.stringify(location),
//     );
//   }

//   getLastLocation<T>() {
//     try {
//       const data = storage.getString(
//         StorageKeys.LAST_LOCATION,
//       );

//       return data
//         ? (JSON.parse(data) as T)
//         : null;
//     } catch {
//       return null;
//     }
//   }

//   removeLastLocation() {
//     storage.delete(
//       StorageKeys.LAST_LOCATION,
//     );
//   }

//   //==========================
//   // Device Id
//   //==========================

//   saveDeviceId(id: string) {
//     storage.set(StorageKeys.DEVICE_ID, id);
//   }

//   getDeviceId() {
//     return storage.getString(
//       StorageKeys.DEVICE_ID,
//     );
//   }

//   //==========================
//   // FCM Token
//   //==========================

//   saveFCMToken(token: string) {
//     storage.set(StorageKeys.FCM_TOKEN, token);
//   }

//   getFCMToken() {
//     return storage.getString(
//       StorageKeys.FCM_TOKEN,
//     );
//   }

//   removeFCMToken() {
//     storage.delete(StorageKeys.FCM_TOKEN);
//   }

//   //==========================
//   // First Launch
//   //==========================

//   setFirstLaunchDone() {
//     storage.set(
//       StorageKeys.FIRST_LAUNCH,
//       false,
//     );
//   }

//   isFirstLaunch() {
//     return (
//       storage.getBoolean(
//         StorageKeys.FIRST_LAUNCH,
//       ) ?? true
//     );
//   }

//   //==========================
//   // Clear MMKV
//   //==========================

//   clearAll() {
//     storage.clearAll();
//   }
// }

// export default new MMKVStorage();




// src/storage/MMKVStorage.ts

import {createMMKV} from 'react-native-mmkv';
import {StorageKeys} from './StorageKeys';

const storage = createMMKV();

class MMKVStorage {
  //==========================
  // Employee
  //==========================

  saveEmployee<T>(employee: T) {
    storage.set(
      StorageKeys.EMPLOYEE,
      JSON.stringify(employee),
    );
  }

  getEmployee<T>(): T | null {
    try {
      const data = storage.getString(
        StorageKeys.EMPLOYEE,
      );

      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  removeEmployee() {
    storage.delete(StorageKeys.EMPLOYEE);
  }

  //==========================
  // Check In Status
  //==========================

  saveCheckInStatus(status: boolean) {
    storage.set(
      StorageKeys.CHECKED_IN,
      status,
    );
  }

  isCheckedIn(): boolean {
    return (
      storage.getBoolean(
        StorageKeys.CHECKED_IN,
      ) ?? false
    );
  }

  //==========================
  // Check In Time
  //==========================

  saveCheckInTime(time: string) {
    storage.set(
      StorageKeys.CHECK_IN_TIME,
      time,
    );
  }

  getCheckInTime() {
    return storage.getString(
      StorageKeys.CHECK_IN_TIME,
    );
  }

  //==========================
  // Check Out Time
  //==========================

  saveCheckOutTime(time: string) {
    storage.set(
      StorageKeys.CHECK_OUT_TIME,
      time,
    );
  }

  getCheckOutTime() {
    return storage.getString(
      StorageKeys.CHECK_OUT_TIME,
    );
  }

  //==========================
  // Last Location
  //==========================

  saveLastLocation(location: any) {
    storage.set(
      StorageKeys.LAST_LOCATION,
      JSON.stringify(location),
    );
  }

  getLastLocation<T>() {
    try {
      const data = storage.getString(
        StorageKeys.LAST_LOCATION,
      );

      return data
        ? (JSON.parse(data) as T)
        : null;
    } catch {
      return null;
    }
  }

  removeLastLocation() {
    storage.delete(
      StorageKeys.LAST_LOCATION,
    );
  }

  //==========================
  // Device Id
  //==========================

  saveDeviceId(id: string) {
    storage.set(
      StorageKeys.DEVICE_ID,
      id,
    );
  }

  getDeviceId() {
    return storage.getString(
      StorageKeys.DEVICE_ID,
    );
  }

  //==========================
  // FCM Token
  //==========================

  saveFCMToken(token: string) {
    storage.set(
      StorageKeys.FCM_TOKEN,
      token,
    );
  }

  getFCMToken() {
    return storage.getString(
      StorageKeys.FCM_TOKEN,
    );
  }

  removeFCMToken() {
    storage.delete(
      StorageKeys.FCM_TOKEN,
    );
  }

  //==========================
  // First Launch
  //==========================

  setFirstLaunchDone() {
    storage.set(
      StorageKeys.FIRST_LAUNCH,
      false,
    );
  }

  isFirstLaunch(): boolean {
    return (
      storage.getBoolean(
        StorageKeys.FIRST_LAUNCH,
      ) ?? true
    );
  }

  //==========================
  // App Security
  //==========================

  /**
   * Save App Security ON/OFF state.
   */
  setAppSecurityEnabled(
    enabled: boolean,
  ) {
    storage.set(
      StorageKeys.APP_SECURITY_ENABLED,
      enabled,
    );
  }

  /**
   * Get App Security ON/OFF state.
   *
   * Default is false.
   */
  isAppSecurityEnabled(): boolean {
    return (
      storage.getBoolean(
        StorageKeys.APP_SECURITY_ENABLED,
      ) ?? false
    );
  }

  //==========================
  // Clear MMKV
  //==========================

  clearAll() {
    storage.clearAll();
  }
}

export default new MMKVStorage();