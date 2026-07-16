/**
 * Today's Date
 */
export const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Current Date & Time
 */
export const getCurrentDateTime = (): string => {
  return new Date().toISOString();
};

/**
 * Format Date
 * Example: 2026-07-08 -> 08 Jul 2026
 */
export const formatDate = (
  date: string | Date,
): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Format Date Time
 */
export const formatDateTime = (
  date: string | Date,
): string => {
  return new Date(date).toLocaleString('en-IN');
};

/**
 * Day Name
 */
export const getDayName = (
  date: string | Date,
): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'long',
  });
};

/**
 * Month Name
 */
export const getMonthName = (
  date: string | Date,
): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'long',
  });
};