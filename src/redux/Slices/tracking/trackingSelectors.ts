import { RootState } from '../store';

// import { RootState } from "@reduxjs/toolkit/query";

export const selectTracking =
  (state: RootState) => state.tracking;

export const selectIsTracking =
  (state: RootState) =>
    state.tracking.isTracking;

export const selectCapturedCount =
  (state: RootState) =>
    state.tracking.capturedCount;

export const selectTotalLocations =
  (state: RootState) =>
    state.tracking.totalLocations;

export const selectTrackingLocations =
  (state: RootState) =>
    state.tracking.locations;

export const selectLastLocation =
  (state: RootState) =>
    state.tracking.lastLocation;

export const selectTrackingStartTime =
  (state: RootState) =>
    state.tracking.startTime;

export const selectTrackingProgress =
  (state: RootState) => {
    const {
      capturedCount,
      totalLocations,
    } = state.tracking;

    if (totalLocations === 0) {
      return 0;
    }

    return Math.min(
      (capturedCount / totalLocations) * 100,
      100,
    );
  };

export const selectIsTrackingComplete =
  (state: RootState) =>
    state.tracking.capturedCount >=
    state.tracking.totalLocations;