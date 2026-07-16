import LocationService from '../services/LocationService';

class TrackingService {
  private isTracking = false;

  /**
   * Start Live Tracking
   */
  startTracking(
    callback: (location: any) => void,
  ) {
    if (this.isTracking) {
      return;
    }

    this.isTracking = true;

    LocationService.startWatching(position => {
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        speed: position.coords.speed,
        heading: position.coords.heading,
        timestamp: position.timestamp,
      });
    });
  }

  /**
   * Stop Tracking
   */
  stopTracking() {
    this.isTracking = false;

    LocationService.stopWatching();
  }

  /**
   * Tracking Status
   */
  isTrackingRunning() {
    return this.isTracking;
  }
}

export default new TrackingService();