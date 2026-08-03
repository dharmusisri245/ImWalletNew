

// // import Geolocation from '@react-native-community/geolocation';
// // import type {
// //   GeolocationResponse as GeoPosition,
// //   GeolocationError as GeoError,
// // } from '@react-native-community/geolocation';
// // import { Alert } from 'react-native';
// import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

// import { Alert } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';

// import type {
//   GeoPosition,
//   GeoError,
// } from 'react-native-geolocation-service';

// /* -------------------------P------------------------------------------------- */
// /*                                  Interfaces                                */
// /* -------------------------------------------------------------------------- */

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

// /* -------------------------------------------------------------------------- */
// /*                            Office Configuration                            */
// /* -------------------------------------------------------------------------- */

// // Change these according to your office location
// export const OFFICE_LOCATION: Coordinates = {
//   latitude: 28.5947,
//   longitude: 77.3910,
// };

// export const OFFICE_LABEL = 'Corporate Office';

// // Office Radius (meters)
// export const OFFICE_RADIUS = 100;

// /* -------------------------------------------------------------------------- */
// /*                              Location Service                              */
// /* -------------------------------------------------------------------------- */

// class LocationService {
//   private watchId: number | null = null;

//   /* ---------------------------------------------------------------------- */
//   /*                          Get Current Location                          */
//   /* ---------------------------------------------------------------------- */



//   // getCurrentLocation(): Promise<GeoPosition> {
//   //   return new Promise((resolve, reject) => {
//   //     Geolocation.getCurrentPosition(
//   //       position => {
//   //         console.log("Location Success:", position);
//   //         resolve(position);
//   //       },
//   //       error => {
//   //         console.log("Location Error:", error);
//   //         reject(error);
//   //       },
//   //       {
//   //         enableHighAccuracy: true,
//   //         timeout: 30000,
//   //         maximumAge: 0,
//   //         forceRequestLocation: true,
//   //         showLocationDialog: true,
//   //       },
//   //     );
//   //   });
//   // }


//   // getCurrentLocation(): Promise<GeoPosition> {
//   //   console.log("STEP 1");

//   //   return new Promise((resolve, reject) => {
//   //     console.log("STEP 2");  
//   // Geolocation.getCurrentPosition(
//   //   position => {
//   //     console.log("STEP 3 SUCCESS", position);
//   //     resolve(position);
//   //   },
//   //   error => {
//   //   console.log("Location Error:", JSON.stringify(error, null, 2));
//   //   reject(error);
//   // },
//   //   {
//   //     enableHighAccuracy: false,
//   //     timeout: 30000,
//   //     maximumAge: 0,
//   //   },
//   // );
//   //     console.log("STEP 5");
//   //   });
//   // }

  
//   getCurrentLocation(): Promise<GeoPosition> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

//         let status = await check(permission);

//         if (status !== RESULTS.GRANTED) {
//           status = await request(permission);

//           if (status !== RESULTS.GRANTED) {
//             Alert.alert("Permission required");
//             return reject(new Error("Permission denied"));
//           }
//         }


// console.log("Before getCurrentPosition");

// Geolocation.getCurrentPosition(
//   position => {
//     console.log("GPS SUCCESS:", position);
//     resolve(position);
//   },
//   error => {
//     console.log("GPS ERROR:", error);
//     reject(error);
//   },
//   {
//     enableHighAccuracy: false,
//     timeout: 30000,
//     maximumAge: 0,
//   },
// );

// console.log("After getCurrentPosition call");
//         Geolocation.getCurrentPosition(
//           position => {
//             console.log("GPS SUCCESS:", position.coords);
//             resolve(position);
//           },
//           error => {
//             console.log("GPS ERROR:", error);
//             reject(error);
//           },
//           {
//             enableHighAccuracy:false,
//             timeout: 30000,
//             maximumAge: 0,
//           },
//         );

       

//       } catch (e) {
//         reject(e);
//       }
//     });
//   }


//   /* ---------------------------------------------------------------------- */
//   /*                        Get Latitude & Longitude                         */
//   /* ---------------------------------------------------------------------- */

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

//   /* ---------------------------------------------------------------------- */
//   /*                           Reverse Geocoding                             */
//   /* ---------------------------------------------------------------------- */

//   // async reverseGeocode({
//   //   latitude,
//   //   longitude,
//   // }: Coordinates): Promise<AddressResult> {
//   //   try {
//   //     const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

//   //     const response = await fetch(url, {
//   //       headers: {
//   //         'User-Agent': 'ImWallet-Attendance-App',
//   //       },
//   //     });

//   //     const data = await response.json();

//   //     const displayName =
//   //       data?.display_name ?? 'Address unavailable';

//   //     const shortAddress = displayName
//   //       .split(',')
//   //       .slice(0, 4)
//   //       .join(',');

//   //     return {
//   //       displayName,
//   //       shortAddress,
//   //     };
//   //   } catch {
//   //     return {
//   //       displayName: 'Address unavailable',
//   //       shortAddress: 'Unable to fetch address',
//   //     };
//   //   }
//   // }



//   /* ---------------------- USING PHOTO API WITHOUT API KEY ------------------------------------------------ */

//   async reverseGeocode({
//     latitude,
//     longitude,
//   }: Coordinates): Promise<AddressResult> {
//     try {
//       const response = await fetch(
//         `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch address");
//       }

//       const data = await response.json();

//       const props = data?.features?.[0]?.properties;

//       const displayName =
//         [
//           props?.name,
//           props?.street,
//           props?.housenumber,
//           props?.city || props?.district,
//           props?.state,
//           props?.country,
//         ]
//           .filter(Boolean)
//           .join(", ") || "Address unavailable";

//       const shortAddress =
//         [
//           props?.street,
//           props?.city || props?.district,
//         ]
//           .filter(Boolean)
//           .join(", ") || "Unknown location";

//       return {
//         displayName,
//         shortAddress,
//       };
//     } catch (error) {
//       console.log("Photon Reverse Geocode Error:", error);

//       return {
//         displayName: "Address unavailable",
//         shortAddress: "Unable to fetch address",
//       };
//     }
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                      Distance Between Two Locations                     */
//   /* ---------------------------------------------------------------------- */

//   getDistanceInMeters(
//     current: Coordinates,
//     destination: Coordinates,
//   ): number {
//     const R = 6371000;

//     const toRad = (value: number) => (value * Math.PI) / 180;

//     const dLat = toRad(destination.latitude - current.latitude);
//     const dLon = toRad(destination.longitude - current.longitude);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(current.latitude)) *
//       Math.cos(toRad(destination.latitude)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);

//     return (
//       R *
//       (2 *
//         Math.atan2(
//           Math.sqrt(a),
//           Math.sqrt(1 - a),
//         ))
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                   Distance From Office (Meters)                         */
//   /* ---------------------------------------------------------------------- */

//   getDistanceFromOffice(current: Coordinates): number {
//     return this.getDistanceInMeters(
//       current,
//       OFFICE_LOCATION,
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                     Inside Office Radius                                */
//   /* ---------------------------------------------------------------------- */

//   isInsideOfficeRadius(current: Coordinates): boolean {
//     return (
//       this.getDistanceFromOffice(current) <= OFFICE_RADIUS
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                          Live Location Tracking                         */
//   /* ---------------------------------------------------------------------- */

//   startWatching(
//     callback: (position: GeoPosition) => void,
//     errorCallback?: (error: GeoError) => void,
//   ) {
//     if (this.watchId !== null) {
//       return;
//     }

//     this.watchId = Geolocation.watchPosition(
//       position => callback(position),
//       error => {
//         console.log("Location Watch Error:", error);
//         errorCallback?.(error);
//       },
//       {
//         enableHighAccuracy: true,
//         distanceFilter: 10,
//         interval: 10000,
//         fastestInterval: 5000,
//       },
//     );
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                           Stop Live Tracking                            */
//   /* ---------------------------------------------------------------------- */

//   stopWatching() {
//     if (this.watchId !== null) {
//       Geolocation.clearWatch(this.watchId);
//       this.watchId = null;
//     }
//   }

//   /* ---------------------------------------------------------------------- */
//   /*                           Tracking Status                               */
//   /* ---------------------------------------------------------------------- */

//   isWatching(): boolean {
//     return this.watchId !== null;
//   }
// }

// export default new LocationService();







// import { NativeModules } from 'react-native';

// const { LocationModule } = NativeModules;

// class LocationService {

//   async getModuleInfo() {
//     return await LocationModule.getModuleInfo();
//   }

//   async getCurrentLocation() {
//     return await LocationModule.getCurrentLocation();
//   }

  

//   async getLastKnownLocation() {
//     return await LocationModule.getLastKnownLocation();
//   }

//   async startTracking() {
//     return await LocationModule.startTracking();
//   }

//   async stopTracking() {
//     return await LocationModule.stopTracking();
//   }

//   async isGpsEnabled() {
//     return await LocationModule.isGpsEnabled();
//   }
// }

// export default new LocationService();



// import {
//   NativeModules,
//   NativeEventEmitter,
//   EmitterSubscription,
// } from 'react-native';

// const { LocationModule } = NativeModules;

// const locationEmitter = new NativeEventEmitter(LocationModule);

// class LocationService {
//   async getModuleInfo() {
//     return await LocationModule.getModuleInfo();
//   }

//   async getCurrentLocation() {
//     return await LocationModule.getCurrentLocation();
//   }

//   async getLastKnownLocation() {
//     return await LocationModule.getLastKnownLocation();
//   }

//   async startTracking() {
//     return await LocationModule.startTracking();
//   }

//   async stopTracking() {
//     return await LocationModule.stopTracking();
//   }

//   async isGpsEnabled() {
//     return await LocationModule.isGpsEnabled();
//   }

//   async openLocationSettings() {
//     return await LocationModule.openLocationSettings();
//   }

//   /**
//    * Listen for live location updates
//    */
//   onLocationChanged(
//     listener: (location: any) => void,
//   ): EmitterSubscription {
//     return locationEmitter.addListener(
//       'onLocationChanged',
//       listener,
//     );
//   }
// }

// export default new LocationService();




// LOCATIONS SERVIVCES FOR BOTH PLATFORM LIKE ANDROID AND IOS ===

import {
  NativeModules,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

const { LocationModule } = NativeModules;

// Don't create the emitter if the native module isn't available.
const locationEmitter = LocationModule
  ? new NativeEventEmitter(LocationModule)
  : null;

class LocationService {
  private ensureModule() {
    if (!LocationModule) {
      throw new Error(
        'LocationModule is not registered. Check the iOS native module implementation.',
      );
    }
  }

  async getModuleInfo() {
    this.ensureModule();
    return await LocationModule.getModuleInfo();
  }

  async getCurrentLocation() {
    this.ensureModule();
    return await LocationModule.getCurrentLocation();
  }

  async getLastKnownLocation() {
    this.ensureModule();
    return await LocationModule.getLastKnownLocation();
  }

  async startTracking() {
    this.ensureModule();
    return await LocationModule.startTracking();
  }

  async stopTracking() {
    this.ensureModule();
    return await LocationModule.stopTracking();
  }

  async isGpsEnabled() {
    this.ensureModule();
    return await LocationModule.isGpsEnabled();
  }

  async openLocationSettings() {
    this.ensureModule();
    return await LocationModule.openLocationSettings();
  }


 async ensureGpsEnabled() {
  this.ensureModule();
  return await LocationModule.ensureGpsEnabled();
}

  onLocationChanged(
    listener: (location: any) => void,
  ): EmitterSubscription {
    this.ensureModule();

    if (!locationEmitter) {
      throw new Error('Location event emitter is not available.');
    }

    return locationEmitter.addListener(
      'onLocationChanged',
      listener,
    );
  }
}

export default new LocationService();