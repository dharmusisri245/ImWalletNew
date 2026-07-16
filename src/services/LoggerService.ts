import Geolocation from 'react-native-geolocation-service';

class LocationService {
  /**
   * Current Location
   */
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {

          resolve(position);

        },

        error => {

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
   * Live Tracking
   */

  watchId: number | null = null;

  startWatching(
    callback: (position: any) => void,
  ) {
    this.watchId =
      Geolocation.watchPosition(
        position => {

          callback(position);

        },

        error => {

          console.log(error);

        },

        {
          enableHighAccuracy: true,

          distanceFilter: 10,

          interval: 10000,

          fastestInterval: 5000,

          showLocationDialog: true,
        },
      );
  }

  /**
   * Stop Tracking
   */

  stopWatching() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(
        this.watchId,
      );

      this.watchId = null;
    }
  }
}

export default new LocationService();