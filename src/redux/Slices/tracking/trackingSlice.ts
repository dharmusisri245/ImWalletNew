import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrackingLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  timestamp: number;
}

interface TrackingState {
  isTracking: boolean;
  capturedCount: number;
  totalLocations: number;
  locations: TrackingLocation[];
  lastLocation: TrackingLocation | null;
  startTime: number | null;
}

const initialState: TrackingState = {
  isTracking: false,
  capturedCount: 0,
  totalLocations: 20,
  locations: [],
  lastLocation: null,
  startTime: null,
};

const trackingSlice = createSlice({
  name: 'tracking',

  initialState,

  reducers: {
    startTracking: state => {
      state.isTracking = true;
      state.capturedCount = 0;
      state.totalLocations = 20;
      state.locations = [];
      state.lastLocation = null;
      state.startTime = Date.now();
    },

    addLocation: (
      state,
      action: PayloadAction<TrackingLocation>,
    ) => {
      if (
        state.capturedCount >=
        state.totalLocations
      ) {
        return;
      }

      state.locations.push(action.payload);

      state.capturedCount =
        state.locations.length;

      state.lastLocation =
        action.payload;
    },

    stopTracking: state => {
      state.isTracking = false;
    },

    resetTracking: state => {
      state.isTracking = false;
      state.capturedCount = 0;
      state.totalLocations = 20;
      state.locations = [];
      state.lastLocation = null;
      state.startTime = null;
    },
  },
});

export const {
  startTracking,
  addLocation,
  stopTracking,
  resetTracking,
} = trackingSlice.actions;

export default trackingSlice.reducer;