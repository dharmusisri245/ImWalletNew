/**
 * Employee ID
 */

export const validateEmployeeId = (
  employeeId: string,
) => {

  if (!employeeId.trim()) {

    return 'Employee ID is required';

  }

  return '';

};

/**
 * OTP
 */

export const validateOTP = (
  otp: string,
) => {

  if (!otp.trim()) {

    return 'OTP is required';

  }

  if (otp.length !== 6) {

    return 'OTP must be 6 digits';

  }

  return '';

};

/**
 * Email
 */

export const validateEmail = (
  email: string,
) => {

  const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {

    return 'Email is required';

  }

  if (!regex.test(email)) {

    return 'Invalid Email';

  }

  return '';

};

/**
 * Phone Number
 */

export const validatePhone = (
  phone: string,
) => {

  const regex = /^[6-9]\d{9}$/;

  if (!regex.test(phone)) {

    return 'Invalid Phone Number';

  }

  return '';

};

/**
 * Required
 */

export const validateRequired = (
  value: string,
  field: string,
) => {

  if (!value.trim()) {

    return `${field} is required`;

  }

  return '';

};