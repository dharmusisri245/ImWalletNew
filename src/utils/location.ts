/**
 * Format Coordinates
 */

export const formatCoordinates = (

  latitude: number,

  longitude: number,

): string => {

  return `${latitude.toFixed(
    6,
  )}, ${longitude.toFixed(6)}`;

};

/**
 * Google Map Link
 */

export const getGoogleMapUrl = (

  latitude: number,

  longitude: number,

): string => {

  return `https://www.google.com/maps?q=${latitude},${longitude}`;

};

/**
 * Validate Coordinates
 */

export const isValidCoordinate = (

  latitude: number,

  longitude: number,

): boolean => {

  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );

};

/**
 * Format Accuracy
 */

export const formatAccuracy = (

  accuracy?: number,

): string => {

  if (!accuracy) {

    return '--';

  }

  return `${accuracy.toFixed(1)} m`;

};

/**
 * Speed
 */

export const formatSpeed = (

  speed?: number,

): string => {

  if (!speed) {

    return '0 km/h';

  }

  return `${(speed * 3.6).toFixed(
    1,
  )} km/h`;

};