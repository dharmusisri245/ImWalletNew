

// class DistanceService {
  
// //  Calculate distance between two coordinates in meters.

//   static calculateDistance(
//     currentLatitude: number,
//     currentLongitude: number,
//     officeLatitude: number,
//     officeLongitude: number,
//   ): number {
//     const EARTH_RADIUS = 6371000; // meters

//     const toRadians = (value: number) => (value * Math.PI) / 180;

//     const dLat = toRadians(officeLatitude - currentLatitude);
//     const dLng = toRadians(officeLongitude - currentLongitude);

//     const lat1 = toRadians(currentLatitude);
//     const lat2 = toRadians(officeLatitude);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1) *
//         Math.cos(lat2) *
//         Math.sin(dLng / 2) *
//         Math.sin(dLng / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return Math.round(EARTH_RADIUS * c);
//   }

//   /**
//    * Optional helper for UI display.
//    */
//   static formatDistance(distanceMeters: number): string {
//     if (distanceMeters < 1000) {
//       return `${distanceMeters} m`;
//     }

//     return `${(distanceMeters / 1000).toFixed(2)} km`;
//   }
// }

// export default DistanceService;




class DistanceService {

  /**
   * Calculate distance between two coordinates.
   * Returns distance in meters.
   */
  static calculateDistance(
    currentLatitude: number,
    currentLongitude: number,
    officeLatitude: number,
    officeLongitude: number,
  ): number {
    const EARTH_RADIUS = 6371000; // meters

    const toRadians = (value: number) => (value * Math.PI) / 180;

    const dLat = toRadians(officeLatitude - currentLatitude);
    const dLng = toRadians(officeLongitude - currentLongitude);

    const lat1 = toRadians(currentLatitude);
    const lat2 = toRadians(officeLatitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(EARTH_RADIUS * c);
  }

  /**
   * Convert meters to kilometers.
   */
  static toKilometers(distanceMeters: number): number {
    return Number((distanceMeters / 1000).toFixed(2));
  }

  /**
   * Format for UI.
   */
  static formatDistance(distanceMeters: number): string {
    if (distanceMeters < 1000) {
      return `${distanceMeters} m`;
    }

    return `${this.toKilometers(distanceMeters)} km`;
  }
}

export default DistanceService;