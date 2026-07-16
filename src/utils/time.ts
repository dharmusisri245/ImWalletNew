/**
 * Current Time
 */

export const getCurrentTime = (): string => {

  return new Date().toLocaleTimeString(
    'en-IN',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );

};

/**
 * Greeting
 */

export const getGreeting = (): string => {

  const hour = new Date().getHours();

  if (hour < 12) {

    return 'Good Morning';

  }

  if (hour < 17) {

    return 'Good Afternoon';

  }

  return 'Good Evening';

};

/**
 * Working Hours
 */

export const calculateWorkingHours = (

  checkIn: string,

  checkOut: string,

): string => {

  const start = new Date(checkIn);

  const end = new Date(checkOut);

  const diff = end.getTime() - start.getTime();

  const hours = Math.floor(diff / 3600000);

  const minutes = Math.floor(

    (diff % 3600000) / 60000,

  );

  return `${hours}h ${minutes}m`;

};

/**
 * Seconds → HH:MM:SS
 */

export const formatDuration = (

  seconds: number,

): string => {

  const hrs = Math.floor(seconds / 3600);

  const mins = Math.floor(

    (seconds % 3600) / 60,

  );

  const secs = seconds % 60;

  return [

    hrs,

    mins,

    secs,

  ]
    .map(v => String(v).padStart(2, '0'))
    .join(':');

};