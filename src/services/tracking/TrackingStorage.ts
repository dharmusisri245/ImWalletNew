import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  EmployeeLocation,
} from './EmployeeTrackingService';

const TRACKING_STATE_KEY =
  '@imwallet_employee_tracking_state';

export interface StoredTrackingState {
  isTracking: boolean;
  capturedCount: number;
  totalLocations: number;
  locations: EmployeeLocation[];
  startTime: number | null;
}

class TrackingStorage {
  /**
   * Save current tracking state.
   */
  async save(
    state: StoredTrackingState,
  ): Promise<void> {
    try {
      await AsyncStorage.setItem(
        TRACKING_STATE_KEY,
        JSON.stringify(state),
      );
    } catch (error) {
      console.error(
        '[TrackingStorage] Failed to save tracking state:',
        error,
      );

      throw error;
    }
  }

  /**
   * Get saved tracking state.
   */
  async get(): Promise<StoredTrackingState | null> {
    try {
      const data =
        await AsyncStorage.getItem(
          TRACKING_STATE_KEY,
        );

      if (!data) {
        return null;
      }

      return JSON.parse(
        data,
      ) as StoredTrackingState;
    } catch (error) {
      console.error(
        '[TrackingStorage] Failed to read tracking state:',
        error,
      );

      return null;
    }
  }

  /**
   * Remove tracking state.
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(
        TRACKING_STATE_KEY,
      );
    } catch (error) {
      console.error(
        '[TrackingStorage] Failed to clear tracking state:',
        error,
      );

      throw error;
    }
  }

  /**
   * Check whether a tracking session exists.
   */
  async exists(): Promise<boolean> {
    try {
      const data =
        await AsyncStorage.getItem(
          TRACKING_STATE_KEY,
        );

      return data !== null;
    } catch (error) {
      console.error(
        '[TrackingStorage] Failed to check tracking state:',
        error,
      );

      return false;
    }
  }
}

export default new TrackingStorage();