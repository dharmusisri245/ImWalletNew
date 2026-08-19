// import { EmitterSubscription } from 'react-native';
// import LocationService from '../LocationService';

// export interface EmployeeLocation {
//   latitude: number;
//   longitude: number;
//   accuracy: number;
//   altitude: number;
//   speed: number;
//   bearing: number;
//   timestamp: number;
// }

// export interface TrackingState {
//   isTracking: boolean;
//   capturedCount: number;
//   totalLocations: number;
//   locations: EmployeeLocation[];
//   lastLocation: EmployeeLocation | null;
//   startTime: number | null;
// }

// type LocationListener = (
//   location: EmployeeLocation,
//   state: TrackingState,
// ) => void;

// class EmployeeTrackingService {
//   private readonly TOTAL_LOCATIONS = 20;

//   private subscription: EmitterSubscription | null = null;

//   private state: TrackingState = {
//     isTracking: false,
//     capturedCount: 0,
//     totalLocations: this.TOTAL_LOCATIONS,
//     locations: [],
//     lastLocation: null,
//     startTime: null,
//   };

//   private listeners: Set<LocationListener> = new Set();

//   /**
//    * Start employee location tracking.
//    */
//   async startTracking(): Promise<void> {
//     if (this.state.isTracking) {
//       console.log(
//         '[EmployeeTracking] Tracking is already running',
//       );
//       return;
//     }

//     console.log(
//       '[EmployeeTracking] Starting tracking...',
//     );

//     // Reset previous tracking session
//     this.state = {
//       isTracking: true,
//       capturedCount: 0,
//       totalLocations: this.TOTAL_LOCATIONS,
//       locations: [],
//       lastLocation: null,
//       startTime: Date.now(),
//     };

//     // Listen for native location updates
//     this.subscription =
//       LocationService.onLocationChanged(
//         this.handleLocationChanged,
//       );

//     try {
//       await LocationService.startTracking();

//       console.log(
//         '[EmployeeTracking] Native tracking started',
//       );

//       this.notifyStateOnly();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Failed to start tracking:',
//         error,
//       );

//       this.cleanup();

//       throw error;
//     }
//   }

//   /**
//    * Stop employee location tracking.
//    */
//   async stopTracking(): Promise<void> {
//     if (!this.state.isTracking) {
//       console.log(
//         '[EmployeeTracking] Tracking is not running',
//       );
//       return;
//     }

//     console.log(
//       '[EmployeeTracking] Stopping tracking...',
//     );

//     try {
//       await LocationService.stopTracking();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Failed to stop native tracking:',
//         error,
//       );
//     } finally {
//       this.cleanup();
//     }
//   }

//   /**
//    * Handle location received from Kotlin/Swift native layer.
//    */
//   private handleLocationChanged = (
//     location: EmployeeLocation,
//   ): void => {
//     if (!this.state.isTracking) {
//       return;
//     }

//     console.log(
//       '[EmployeeTracking] Location received:',
//       location,
//     );

//     // Validate location before counting it.
//     if (!this.isValidLocation(location)) {
//       console.warn(
//         '[EmployeeTracking] Invalid location ignored:',
//         location,
//       );

//       return;
//     }

//     // Prevent duplicate/very-close updates.
//     if (this.isDuplicateLocation(location)) {
//       console.log(
//         '[EmployeeTracking] Duplicate location ignored',
//       );

//       return;
//     }

//     const updatedLocations = [
//       ...this.state.locations,
//       location,
//     ];

//     const capturedCount =
//       updatedLocations.length;

//     this.state = {
//       ...this.state,
//       capturedCount,
//       locations: updatedLocations,
//       lastLocation: location,
//     };

//     console.log(
//       `[EmployeeTracking] Location ${capturedCount}/${this.TOTAL_LOCATIONS}`,
//     );

//     this.notifyListeners(
//       location,
//       this.state,
//     );

//     // Automatically stop after 20 valid locations.
//     if (
//       capturedCount >=
//       this.TOTAL_LOCATIONS
//     ) {
//       console.log(
//         '[EmployeeTracking] 20 locations captured',
//       );

//       this.finishTracking();
//     }
//   };

//   /**
//    * Validate GPS location.
//    */
//   private isValidLocation(
//     location: EmployeeLocation,
//   ): boolean {
//     if (
//       typeof location.latitude !== 'number' ||
//       typeof location.longitude !== 'number'
//     ) {
//       return false;
//     }

//     if (
//       Number.isNaN(location.latitude) ||
//       Number.isNaN(location.longitude)
//     ) {
//       return false;
//     }

//     if (
//       location.latitude < -90 ||
//       location.latitude > 90
//     ) {
//       return false;
//     }

//     if (
//       location.longitude < -180 ||
//       location.longitude > 180
//     ) {
//       return false;
//     }

//     if (
//       typeof location.accuracy === 'number' &&
//       location.accuracy > 100
//     ) {
//       console.warn(
//         '[EmployeeTracking] Poor GPS accuracy:',
//         location.accuracy,
//       );

//       return false;
//     }

//     return true;
//   }

//   /**
//    * Ignore same location received repeatedly.
//    */
//   private isDuplicateLocation(
//     location: EmployeeLocation,
//   ): boolean {
//     const lastLocation =
//       this.state.lastLocation;

//     if (!lastLocation) {
//       return false;
//     }

//     const latitudeDifference =
//       Math.abs(
//         lastLocation.latitude -
//           location.latitude,
//       );

//     const longitudeDifference =
//       Math.abs(
//         lastLocation.longitude -
//           location.longitude,
//       );

//     const timestampDifference =
//       Math.abs(
//         lastLocation.timestamp -
//           location.timestamp,
//       );

//     /*
//      * Treat nearly identical GPS results received
//      * within 5 seconds as duplicates.
//      */
//     return (
//       latitudeDifference < 0.00001 &&
//       longitudeDifference < 0.00001 &&
//       timestampDifference < 5000
//     );
//   }

//   /**
//    * Finish the current tracking session.
//    */
//   private async finishTracking(): Promise<void> {
//     console.log(
//       '[EmployeeTracking] Tracking session completed',
//     );

//     try {
//       await LocationService.stopTracking();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Error stopping native tracking:',
//         error,
//       );
//     } finally {
//       this.cleanup();
//     }
//   }

//   /**
//    * Reset native listener and tracking state.
//    */
//   private cleanup(): void {
//     if (this.subscription) {
//       this.subscription.remove();
//       this.subscription = null;
//     }

//     this.state = {
//       ...this.state,
//       isTracking: false,
//     };

//     this.notifyStateOnly();

//     console.log(
//       '[EmployeeTracking] Tracking stopped',
//     );
//   }

//   /**
//    * Get current tracking state.
//    */
//   getState(): TrackingState {
//     return {
//       ...this.state,
//       locations: [
//         ...this.state.locations,
//       ],
//     };
//   }

//   /**
//    * Get all captured locations.
//    */
//   getLocations(): EmployeeLocation[] {
//     return [
//       ...this.state.locations,
//     ];
//   }

//   /**
//    * Get latest location.
//    */
//   getLastLocation(): EmployeeLocation | null {
//     return this.state.lastLocation;
//   }

//   /**
//    * Subscribe to tracking updates.
//    */
//   subscribe(
//     listener: LocationListener,
//   ): () => void {
//     this.listeners.add(listener);

//     // Immediately provide current state if location exists.
//     if (this.state.lastLocation) {
//       listener(
//         this.state.lastLocation,
//         this.state,
//       );
//     }

//     return () => {
//       this.listeners.delete(listener);
//     };
//   }

//   /**
//    * Notify subscribers when a new location arrives.
//    */
//   private notifyListeners(
//     location: EmployeeLocation,
//     state: TrackingState,
//   ): void {
//     this.listeners.forEach(listener => {
//       try {
//         listener(
//           location,
//           state,
//         );
//       } catch (error) {
//         console.error(
//           '[EmployeeTracking] Listener error:',
//           error,
//         );
//       }
//     });
//   }

//   /**
//    * Notify subscribers about state-only changes.
//    */
//   private notifyStateOnly(): void {
//     const location =
//       this.state.lastLocation;

//     if (!location) {
//       return;
//     }

//     this.notifyListeners(
//       location,
//       this.state,
//     );
//   }
// }

// export default new EmployeeTrackingService();






// import { EmitterSubscription } from 'react-native';
// import TrackingStorage from './TrackingStorage';
// import LocationService from '../LocationService';

// export interface EmployeeLocation {
//   latitude: number;
//   longitude: number;
//   accuracy: number;
//   altitude: number;
//   speed: number;
//   bearing: number;
//   timestamp: number;
// }

// export interface TrackingState {
//   isTracking: boolean;
//   capturedCount: number;
//   totalLocations: number;
//   locations: EmployeeLocation[];
//   lastLocation: EmployeeLocation | null;
//   startTime: number | null;
// }

// type LocationListener = (
//   location: EmployeeLocation,
//   state: TrackingState,
// ) => void;

// class EmployeeTrackingService {
//   private readonly TOTAL_LOCATIONS = 20;

//   private subscription: EmitterSubscription | null = null;

//   private state: TrackingState = {
//     isTracking: false,
//     capturedCount: 0,
//     totalLocations: this.TOTAL_LOCATIONS,
//     locations: [],
//     lastLocation: null,
//     startTime: null,
//   };

//   private listeners: Set<LocationListener> =
//     new Set();

//   /**
//    * Start employee tracking.
//    */
//   async startTracking(): Promise<void> {
//     if (this.state.isTracking) {
//       console.log(
//         '[EmployeeTracking] Already tracking',
//       );
//       return;
//     }

//     console.log(
//       '[EmployeeTracking] Starting tracking...',
//     );

//     // Start a fresh tracking session.
//     this.state = {
//       isTracking: true,
//       capturedCount: 0,
//       totalLocations: this.TOTAL_LOCATIONS,
//       locations: [],
//       lastLocation: null,
//       startTime: Date.now(),
//     };

//     // Clear previous local session.
//     await TrackingStorage.clear();

//     // Subscribe to native location events.
//     this.subscription =
//       LocationService.onLocationChanged(
//         this.handleLocationChanged,
//       );

//     try {
//       await LocationService.startTracking();

//       console.log(
//         '[EmployeeTracking] Native tracking started',
//       );

//       this.notifyStateOnly();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Failed to start:',
//         error,
//       );

//       this.cleanup();

//       throw error;
//     }
//   }

//   /**
//    * Stop employee tracking.
//    *
//    * Local tracking data is intentionally NOT cleared.
//    * This allows us to use the 20 locations later
//    * when backend/API is implemented.
//    */
//   async stopTracking(): Promise<void> {
//     if (!this.state.isTracking) {
//       return;
//     }

//     console.log(
//       '[EmployeeTracking] Stopping tracking...',
//     );

//     try {
//       await LocationService.stopTracking();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Stop error:',
//         error,
//       );
//     } finally {
//       this.cleanup();
//     }
//   }

//   /**
//    * Handle location received from
//    * Android Kotlin / iOS Swift.
//    */
//   private handleLocationChanged = async (
//     location: EmployeeLocation,
//   ): Promise<void> => {
//     if (!this.state.isTracking) {
//       return;
//     }

//     console.log(
//       '[EmployeeTracking] Location received:',
//       location,
//     );

//     // Validate GPS location.
//     if (!this.isValidLocation(location)) {
//       console.warn(
//         '[EmployeeTracking] Invalid location ignored',
//       );

//       return;
//     }

//     // Prevent duplicate location.
//     if (this.isDuplicateLocation(location)) {
//       console.log(
//         '[EmployeeTracking] Duplicate location ignored',
//       );

//       return;
//     }

//     // Never allow more than 20 locations.
//     if (
//       this.state.locations.length >=
//       this.TOTAL_LOCATIONS
//     ) {
//       return;
//     }

//     const updatedLocations = [
//       ...this.state.locations,
//       location,
//     ];

//     const capturedCount =
//       updatedLocations.length;

//     this.state = {
//       ...this.state,
//       capturedCount,
//       locations: updatedLocations,
//       lastLocation: location,
//     };

//     console.log(
//       `[EmployeeTracking] Location ${capturedCount}/${this.TOTAL_LOCATIONS}`,
//     );

//     // Save locally.
//     try {
//       await TrackingStorage.save({
//         isTracking: true,
//         capturedCount,
//         totalLocations:
//           this.TOTAL_LOCATIONS,
//         locations: updatedLocations,
//         startTime: this.state.startTime,
//       });

//       console.log(
//         '[EmployeeTracking] Location saved locally',
//       );
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Local storage error:',
//         error,
//       );
//     }

//     // Update UI listeners.
//     this.notifyListeners(
//       location,
//       this.state,
//     );

//     // Stop automatically at 20.
//     if (
//       capturedCount >=
//       this.TOTAL_LOCATIONS
//     ) {
//       console.log(
//         '[EmployeeTracking] 20 locations captured',
//       );

//       await this.finishTracking();
//     }
//   };

//   /**
//    * Validate GPS location.
//    */
//   private isValidLocation(
//     location: EmployeeLocation,
//   ): boolean {
//     if (
//       typeof location.latitude !== 'number' ||
//       typeof location.longitude !== 'number'
//     ) {
//       return false;
//     }

//     if (
//       Number.isNaN(location.latitude) ||
//       Number.isNaN(location.longitude)
//     ) {
//       return false;
//     }

//     if (
//       location.latitude < -90 ||
//       location.latitude > 90
//     ) {
//       return false;
//     }

//     if (
//       location.longitude < -180 ||
//       location.longitude > 180
//     ) {
//       return false;
//     }

//     // Reject very poor GPS accuracy.
//     if (
//       typeof location.accuracy === 'number' &&
//       location.accuracy > 100
//     ) {
//       console.warn(
//         '[EmployeeTracking] Poor accuracy:',
//         location.accuracy,
//       );

//       return false;
//     }

//     return true;
//   }

//   /**
//    * Check whether location is almost identical
//    * to the previous location.
//    */
//   private isDuplicateLocation(
//     location: EmployeeLocation,
//   ): boolean {
//     const lastLocation =
//       this.state.lastLocation;

//     if (!lastLocation) {
//       return false;
//     }

//     const latitudeDifference =
//       Math.abs(
//         lastLocation.latitude -
//           location.latitude,
//       );

//     const longitudeDifference =
//       Math.abs(
//         lastLocation.longitude -
//           location.longitude,
//       );

//     const timestampDifference =
//       Math.abs(
//         lastLocation.timestamp -
//           location.timestamp,
//       );

//     return (
//       latitudeDifference < 0.00001 &&
//       longitudeDifference < 0.00001 &&
//       timestampDifference < 5000
//     );
//   }

//   /**
//    * Finish after 20 locations.
//    */
//   private async finishTracking(): Promise<void> {
//     console.log(
//       '[EmployeeTracking] Tracking completed',
//     );

//     try {
//       await LocationService.stopTracking();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Finish error:',
//         error,
//       );
//     } finally {
//       this.cleanup();
//     }
//   }

//   /**
//    * Clean native event subscription.
//    */
//   private cleanup(): void {
//     if (this.subscription) {
//       this.subscription.remove();
//       this.subscription = null;
//     }

//     this.state = {
//       ...this.state,
//       isTracking: false,
//     };

//     this.notifyStateOnly();

//     console.log(
//       '[EmployeeTracking] Tracking stopped',
//     );
//   }

//   /**
//    * Get current state.
//    */
//   getState(): TrackingState {
//     return {
//       ...this.state,
//       locations: [
//         ...this.state.locations,
//       ],
//     };
//   }

//   /**
//    * Get all captured locations.
//    */
//   getLocations(): EmployeeLocation[] {
//     return [
//       ...this.state.locations,
//     ];
//   }

//   /**
//    * Get latest location.
//    */
//   getLastLocation(): EmployeeLocation | null {
//     return this.state.lastLocation;
//   }

//   /**
//    * Restore previous local session.
//    *
//    * Useful if React Native JS restarts.
//    */
//   async restoreTracking(): Promise<TrackingState | null> {
//     try {
//       const stored =
//         await TrackingStorage.get();

//       if (!stored) {
//         return null;
//       }

//       const locations =
//         stored.locations || [];

//       this.state = {
//         isTracking:
//           stored.isTracking,
//         capturedCount:
//           locations.length,
//         totalLocations:
//           this.TOTAL_LOCATIONS,
//         locations,
//         lastLocation:
//           locations.length > 0
//             ? locations[
//                 locations.length - 1
//               ]
//             : null,
//         startTime:
//           stored.startTime,
//       };

//       console.log(
//         `[EmployeeTracking] Restored ${locations.length}/20 locations`,
//       );

//       return this.getState();
//     } catch (error) {
//       console.error(
//         '[EmployeeTracking] Restore error:',
//         error,
//       );

//       return null;
//     }
//   }

//   /**
//    * Subscribe to tracking updates.
//    */
//   subscribe(
//     listener: LocationListener,
//   ): () => void {
//     this.listeners.add(listener);

//     if (this.state.lastLocation) {
//       listener(
//         this.state.lastLocation,
//         this.state,
//       );
//     }

//     return () => {
//       this.listeners.delete(listener);
//     };
//   }

//   /**
//    * Notify all listeners.
//    */
//   private notifyListeners(
//     location: EmployeeLocation,
//     state: TrackingState,
//   ): void {
//     this.listeners.forEach(listener => {
//       try {
//         listener(
//           location,
//           state,
//         );
//       } catch (error) {
//         console.error(
//           '[EmployeeTracking] Listener error:',
//           error,
//         );
//       }
//     });
//   }

//   /**
//    * Notify state changes.
//    */
//   private notifyStateOnly(): void {
//     const location =
//       this.state.lastLocation;

//     if (!location) {
//       return;
//     }

//     this.notifyListeners(
//       location,
//       this.state,
//     );
//   }
// }

// export default new EmployeeTrackingService();












import {
  EmitterSubscription,
} from 'react-native';

import LocationService from '../LocationService';

// import AttendanceStorage from '../attendance/AttendanceStorage';

import {
  EmployeeLocation,
} from '../../auth/types/attendance';
import AttendanceStorage from '../AttendanceStorage';

export interface TrackingState {

  isTracking: boolean;

  capturedCount: number;

  totalLocations: number;

  locations: EmployeeLocation[];

  lastLocation:
    | EmployeeLocation
    | null;

  startTime: number | null;
}

type LocationListener = (
  location: EmployeeLocation,
  state: TrackingState,
) => void;

class EmployeeTrackingService {

  private readonly TOTAL_LOCATIONS = 20;

  private subscription:
    | EmitterSubscription
    | null = null;

  private state: TrackingState = {

    isTracking: false,

    capturedCount: 0,

    totalLocations:
      this.TOTAL_LOCATIONS,

    locations: [],

    lastLocation: null,

    startTime: null,
  };

  private listeners:
    Set<LocationListener> =
    new Set();

  // ============================================================
  // START TRACKING
  // ============================================================

  async startTracking(): Promise<void> {

    if (this.state.isTracking) {

      console.log(
        '[EmployeeTracking] Already tracking',
      );

      return;
    }

    console.log(
      '[EmployeeTracking] Starting tracking...',
    );

    // Make sure employee has checked in.
    const activeCheckIn =
      await AttendanceStorage.getActiveCheckIn();

    if (!activeCheckIn) {

      throw new Error(
        'Employee must check-in before tracking can start.',
      );
    }

    // Get locations already stored for
    // this attendance session.
    const existingLocations =
      await AttendanceStorage.getTrackingLocations();

    this.state = {

      isTracking: true,

      capturedCount:
        existingLocations.length,

      totalLocations:
        this.TOTAL_LOCATIONS,

      locations:
        existingLocations,

      lastLocation:
        existingLocations.length > 0
          ? existingLocations[
              existingLocations.length - 1
            ]
          : null,

      startTime:
        Date.now(),
    };

    // If already reached 20, don't start native tracking.
    if (
      existingLocations.length >=
      this.TOTAL_LOCATIONS
    ) {

      console.log(
        '[EmployeeTracking] 20 locations already stored.',
      );

      this.state = {
        ...this.state,
        isTracking: false,
      };

      this.notifyStateOnly();

      return;
    }

    // Subscribe to Kotlin / Swift events.
    this.subscription =
      LocationService.onLocationChanged(
        this.handleLocationChanged,
      );

    try {

      await LocationService.startTracking();

      console.log(
        '[EmployeeTracking] Native tracking started',
      );

      this.notifyStateOnly();

    } catch (error) {

      console.error(
        '[EmployeeTracking] Failed to start:',
        error,
      );

      this.cleanup();

      throw error;
    }
  }

  // ============================================================
  // STOP TRACKING
  // ============================================================

  async stopTracking(): Promise<void> {

    if (!this.state.isTracking) {
      return;
    }

    console.log(
      '[EmployeeTracking] Stopping tracking...',
    );

    try {

      await LocationService.stopTracking();

    } catch (error) {

      console.error(
        '[EmployeeTracking] Stop error:',
        error,
      );

    } finally {

      this.cleanup();
    }
  }

  // ============================================================
  // LOCATION RECEIVED
  // ============================================================

  private handleLocationChanged =
    async (
      location: EmployeeLocation,
    ): Promise<void> => {

      if (!this.state.isTracking) {
        return;
      }

      console.log(
        '[EmployeeTracking] Location received:',
        location,
      );

      // Validate.
      if (
        !this.isValidLocation(location)
      ) {

        console.warn(
          '[EmployeeTracking] Invalid location ignored',
        );

        return;
      }

      // Duplicate check.
      if (
        this.isDuplicateLocation(location)
      ) {

        console.log(
          '[EmployeeTracking] Duplicate location ignored',
        );

        return;
      }

      // Never exceed 20.
      if (
        this.state.locations.length >=
        this.TOTAL_LOCATIONS
      ) {

        return;
      }

      // Add location to current JS state.
      const updatedLocations = [
        ...this.state.locations,
        location,
      ];

      const capturedCount =
        updatedLocations.length;

      this.state = {

        ...this.state,

        capturedCount,

        locations:
          updatedLocations,

        lastLocation:
          location,
      };

      console.log(
        `[EmployeeTracking] Location ${capturedCount}/${this.TOTAL_LOCATIONS}`,
      );

      // ========================================================
      // SAVE TO ATTENDANCE STORAGE
      // ========================================================

      try {

        const saved =
          await AttendanceStorage.addTrackingLocation(
            location,
          );

        if (!saved) {

          console.warn(
            '[EmployeeTracking] Location could not be saved to attendance.',
          );

          return;
        }

        console.log(
          '[EmployeeTracking] Location saved to AttendanceStorage',
        );

      } catch (error) {

        console.error(
          '[EmployeeTracking] Attendance storage error:',
          error,
        );

        return;
      }

      // Notify UI.
      this.notifyListeners(
        location,
        this.state,
      );

      // ========================================================
      // STOP AT 20
      // ========================================================

      if (
        capturedCount >=
        this.TOTAL_LOCATIONS
      ) {

        console.log(
          '[EmployeeTracking] 20 locations captured.',
        );

        await this.finishTracking();
      }
    };

  // ============================================================
  // VALIDATE LOCATION
  // ============================================================

  private isValidLocation(
    location: EmployeeLocation,
  ): boolean {

    if (
      typeof location.latitude !==
        'number' ||
      typeof location.longitude !==
        'number'
    ) {

      return false;
    }

    if (
      Number.isNaN(
        location.latitude,
      ) ||
      Number.isNaN(
        location.longitude,
      )
    ) {

      return false;
    }

    if (
      location.latitude < -90 ||
      location.latitude > 90
    ) {

      return false;
    }

    if (
      location.longitude < -180 ||
      location.longitude > 180
    ) {

      return false;
    }

    // Reject poor GPS accuracy.
    if (
      typeof location.accuracy ===
        'number' &&
      location.accuracy > 100
    ) {

      console.warn(
        '[EmployeeTracking] Poor GPS accuracy:',
        location.accuracy,
      );

      return false;
    }

    return true;
  }

  // ============================================================
  // DUPLICATE CHECK
  // ============================================================

  private isDuplicateLocation(
    location: EmployeeLocation,
  ): boolean {

    const lastLocation =
      this.state.lastLocation;

    if (!lastLocation) {
      return false;
    }

    const latitudeDifference =
      Math.abs(
        lastLocation.latitude -
          location.latitude,
      );

    const longitudeDifference =
      Math.abs(
        lastLocation.longitude -
          location.longitude,
      );

    const timestampDifference =
      Math.abs(
        lastLocation.timestamp -
          location.timestamp,
      );

    return (
      latitudeDifference <
        0.00001 &&
      longitudeDifference <
        0.00001 &&
      timestampDifference <
        5000
    );
  }

  // ============================================================
  // FINISH TRACKING
  // ============================================================

  private async finishTracking(): Promise<void> {

    console.log(
      '[EmployeeTracking] Tracking completed',
    );

    try {

      await LocationService.stopTracking();

    } catch (error) {

      console.error(
        '[EmployeeTracking] Finish error:',
        error,
      );

    } finally {

      this.cleanup();
    }
  }

  // ============================================================
  // CLEANUP
  // ============================================================

  private cleanup(): void {

    if (this.subscription) {

      this.subscription.remove();

      this.subscription = null;
    }

    this.state = {

      ...this.state,

      isTracking: false,
    };

    this.notifyStateOnly();

    console.log(
      '[EmployeeTracking] Tracking stopped',
    );
  }

  // ============================================================
  // GET STATE
  // ============================================================

  getState(): TrackingState {

    return {

      ...this.state,

      locations: [
        ...this.state.locations,
      ],
    };
  }

  // ============================================================
  // GET LOCATIONS
  // ============================================================

  getLocations(): EmployeeLocation[] {

    return [
      ...this.state.locations,
    ];
  }

  // ============================================================
  // GET LAST LOCATION
  // ============================================================

  getLastLocation():
    | EmployeeLocation
    | null {

    return this.state.lastLocation;
  }

  // ============================================================
  // RESTORE FROM ATTENDANCE STORAGE
  // ============================================================

  async restoreTracking():
    Promise<TrackingState | null> {

    try {

      const locations =
        await AttendanceStorage.getTrackingLocations();

      if (
        locations.length === 0
      ) {

        return null;
      }

      this.state = {

        isTracking: false,

        capturedCount:
          locations.length,

        totalLocations:
          this.TOTAL_LOCATIONS,

        locations,

        lastLocation:
          locations[
            locations.length - 1
          ],

        startTime: null,
      };

      console.log(
        `[EmployeeTracking] Restored ${locations.length}/20 locations`,
      );

      return this.getState();

    } catch (error) {

      console.error(
        '[EmployeeTracking] Restore error:',
        error,
      );

      return null;
    }
  }

  // ============================================================
  // SUBSCRIBE
  // ============================================================

  subscribe(
    listener: LocationListener,
  ): () => void {

    this.listeners.add(listener);

    if (this.state.lastLocation) {

      listener(
        this.state.lastLocation,
        this.state,
      );
    }

    return () => {

      this.listeners.delete(
        listener,
      );
    };
  }

  // ============================================================
  // NOTIFY LISTENERS
  // ============================================================

  private notifyListeners(
    location: EmployeeLocation,
    state: TrackingState,
  ): void {

    this.listeners.forEach(
      listener => {

        try {

          listener(
            location,
            state,
          );

        } catch (error) {

          console.error(
            '[EmployeeTracking] Listener error:',
            error,
          );
        }
      },
    );
  }

  // ============================================================
  // NOTIFY STATE ONLY
  // ============================================================

  private notifyStateOnly(): void {

    const location =
      this.state.lastLocation;

    if (!location) {
      return;
    }

    this.notifyListeners(
      location,
      this.state,
    );
  }
}

export default new EmployeeTrackingService();