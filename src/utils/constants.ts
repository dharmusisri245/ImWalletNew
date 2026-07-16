/**
 * App
 */
export const APP_NAME = 'ImWallet';

export const APP_VERSION = '1.0.0';

/**
 * Authentication
 */
export const OTP_LENGTH = 6;

export const LOGIN_TIMEOUT = 30000;

/**
 * Tracking
 */
export const TRACKING_INTERVAL = 10000; // 10 sec

export const LOCATION_DISTANCE_FILTER = 10; // meters

/**
 * Attendance
 */
export const WORKING_HOURS = 8;

export const CHECK_IN = 'CHECK_IN';

export const CHECK_OUT = 'CHECK_OUT';

/**
 * Map
 */
export const DEFAULT_LATITUDE = 28.6139;

export const DEFAULT_LONGITUDE = 77.2090;

export const DEFAULT_ZOOM = 15;

/**
 * Image
 */
export const IMAGE_QUALITY = 0.8;

export const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

/**
 * Storage Keys
 */
export const STORAGE_KEYS = {

  TOKEN: 'token',

  EMPLOYEE: 'employee',

  CHECK_IN_STATUS: 'checkedIn',

  LAST_LOCATION: 'lastLocation',

};

/**
 * Attendance Status
 */

export const ATTENDANCE_STATUS = {

  CHECKED_IN: 'Checked In',

  CHECKED_OUT: 'Checked Out',

  NOT_CHECKED_IN: 'Not Checked In',

};