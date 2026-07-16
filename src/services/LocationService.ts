// src/services/LocationService.ts

import Geolocation, {
  GeoPosition,
  GeoError,
} from 'react-native-geolocation-service';

class LocationService {
  private watchId: number | null = null;

  /**
   * Get Current Location
   */
  getCurrentLocation(): Promise<GeoPosition> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        (error: GeoError) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          forceRequestLocation: true,
          showLocationDialog: true,
        },
      );
    });
  }

  /**
   * Get Latitude & Longitude Only
   */
  async getLatLng() {
    const position = await this.getCurrentLocation();

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp,
    };
  }

  /**
   * Start Live Location Tracking
   */
  startWatching(
    callback: (position: GeoPosition) => void,
    errorCallback?: (error: GeoError) => void,
  ) {
    if (this.watchId !== null) {
      return;
    }

    this.watchId = Geolocation.watchPosition(
      position => {
        callback(position);
      },
      error => {
        console.log('Location Watch Error:', error);

        if (errorCallback) {
          errorCallback(error);
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 10000,
        fastestInterval: 5000,
        forceRequestLocation: true,
        showLocationDialog: true,
      },
    );
  }

  /**
   * Stop Live Tracking
   */
  stopWatching() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  /**
   * Check Tracking Status
   */
  isWatching() {
    return this.watchId !== null;
  }
}

export default new LocationService();





// import Geolocation, {
//   GeoPosition,
//   GeoError,
// } from 'react-native-geolocation-service';

// export interface Coordinates {
//   latitude: number;
//   longitude: number;
// }

// export interface LocationResult extends Coordinates {
//   accuracy: number;
//   altitude: number | null;
//   heading: number | null;
//   speed: number | null;
//   timestamp: number;
// }

// export interface AddressResult {
//   displayName: string;
//   shortAddress: string;
// }

// // TODO: replace with your organization's registered office coordinates
// export const OFFICE_LOCATION: Coordinates = {
//   latitude: 28.5947,
//   longitude: 77.391,
// };

// export const OFFICE_LABEL = 'Corporate Office';

// class LocationService {
//   private watchId: number | null = null;

//   /**
//    * Get Current Location
//    */
//   getCurrentLocation(): Promise<GeoPosition> {
//     return new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         (position) => resolve(position),
//         (error: GeoError) => reject(error),
//         {
//           enableHighAccuracy: true,
//           timeout: 15000,
//           maximumAge: 10000,
//           forceRequestLocation: true,
//           showLocationDialog: true,
//         },
//       );
//     });
//   }

//   /**
//    * Get Latitude & Longitude Only
//    */
//   async getLatLng(): Promise<LocationResult> {
//     const position = await this.getCurrentLocation();

//     return {
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//       accuracy: position.coords.accuracy,
//       altitude: position.coords.altitude,
//       heading: position.coords.heading,
//       speed: position.coords.speed,
//       timestamp: position.timestamp,
//     };
//   }

//   /**
//    * Reverse geocode coordinates into a human-readable address.
//    * Uses OpenStreetMap's free Nominatim endpoint (no API key required).
//    * Swap the URL for Google's Geocoding API if you have a billing-enabled key.
//    */
//   async reverseGeocode({ latitude, longitude }: Coordinates): Promise<AddressResult> {
//     try {
//       const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`;
//       const response = await fetch(url, {
//         headers: { 'User-Agent': 'ImWallet-Attendance-App' },
//       });
//       const data = await response.json();

//       const displayName: string = data?.display_name ?? 'Address unavailable';
//       const parts: string[] = displayName.split(',').map((p: string) => p.trim());
//       const shortAddress = parts.slice(0, 4).join(', ');

//       return { displayName, shortAddress };
//     } catch (error) {
//       return {
//         displayName: 'Address unavailable',
//         shortAddress: 'Unable to fetch address',
//       };
//     }
//   }

//   /**
//    * Haversine distance (in km) between the current position and the office.
//    */
//   getDistanceFromOffice(current: Coordinates): number {
//     const R = 6371; // Earth radius in km
//     const dLat = this.toRad(current.latitude - OFFICE_LOCATION.latitude);
//     const dLon = this.toRad(current.longitude - OFFICE_LOCATION.longitude);

//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(this.toRad(OFFICE_LOCATION.latitude)) *
//         Math.cos(this.toRad(current.latitude)) *
//         Math.sin(dLon / 2) ** 2;

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   }

//   private toRad(value: number): number {
//     return (value * Math.PI) / 180;
//   }

//   /**
//    * Start Live Location Tracking
//    */
//   startWatching(
//     callback: (position: GeoPosition) => void,
//     errorCallback?: (error: GeoError) => void,
//   ) {
//     if (this.watchId !== null) {
//       return;
//     }

//     this.watchId = Geolocation.watchPosition(
//       (position) => callback(position),
//       (error) => {
//         console.log('Location Watch Error:', error);
//         errorCallback?.(error);
//       },
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 10,
//         interval: 10000,
//         fastestInterval: 5000,
//         forceRequestLocation: true,
//         showLocationDialog: true,
//       },
//     );
//   }

//   /**
//    * Stop Live Tracking
//    */
//   stopWatching() {
//     if (this.watchId !== null) {
//       Geolocation.clearWatch(this.watchId);
//       this.watchId = null;
//     }
//   }

//   /**
//    * Check Tracking Status
//    */
//   isWatching(): boolean {
//     return this.watchId !== null;
//   }
// }

// export default new LocationService();