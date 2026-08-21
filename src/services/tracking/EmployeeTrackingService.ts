
import {
  EmitterSubscription,
} from 'react-native';

import LocationService from '../LocationService';


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