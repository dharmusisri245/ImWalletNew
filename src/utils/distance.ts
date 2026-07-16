/**
 * Calculate Distance (Meters)
 * Haversine Formula
 */

export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number => {

  const R = 6371e3;

  const φ1 = (lat1 * Math.PI) / 180;

  const φ2 = (lat2 * Math.PI) / 180;

  const Δφ = ((lat2 - lat1) * Math.PI) / 180;

  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) *
      Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a),
    );

  return R * c;
};

/**
 * Meter → Kilometer
 */

export const meterToKm = (
  meter: number,
): string => {

  return (meter / 1000).toFixed(2);

};

/**
 * Kilometer → Meter
 */

export const kmToMeter = (
  km: number,
): number => {

  return km * 1000;

};

/**
 * Total Distance
 */

export const totalDistance = (
  locations: {
    latitude: number;
    longitude: number;
  }[],
): number => {

  let total = 0;

  for (
    let i = 1;
    i < locations.length;
    i++
  ) {

    total += calculateDistance(
      locations[i - 1].latitude,
      locations[i - 1].longitude,
      locations[i].latitude,
      locations[i].longitude,
    );

  }

  return total;

};