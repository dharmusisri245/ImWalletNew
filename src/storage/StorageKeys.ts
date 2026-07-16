// src/storage/StorageKeys.ts

export const StorageKeys = {
  // MMKV
  EMPLOYEE: 'employee',
  CHECKED_IN: 'checkedIn',
  CHECK_IN_TIME: 'checkInTime',
  CHECK_OUT_TIME: 'checkOutTime',
  LAST_LOCATION: 'lastLocation',
  DEVICE_ID: 'deviceId',
  FCM_TOKEN: 'fcmToken',
  FIRST_LAUNCH: 'firstLaunch',

  // Keychain
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;