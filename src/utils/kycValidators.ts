/**
 * utils/kycValidators.ts
 */
export const isValidPan = (value: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.trim());

export const isValidAadhaar = (value: string) => /^\d{12}$/.test(value.trim());

export const isRequired = (value?: string) => !!value && value.trim().length > 0;

export type KycFormValues = {
  panNumber: string;
  panImage: string | null;

  aadhaarNumber: string;
  aadhaarFrontImage: string | null;
  aadhaarBackImage: string | null;

  businessDocNumber: string;
  businessDocImage: string | null;

  shopLicenseNumber: string;
  shopLicenseImage: string | null;
};

export type KycFormErrors = Partial<Record<keyof KycFormValues, string>>;

export function validateKycForm(values: KycFormValues): KycFormErrors {
  const errors: KycFormErrors = {};

  if (!isRequired(values.panNumber)) errors.panNumber = 'PAN number is required';
  else if (!isValidPan(values.panNumber)) errors.panNumber = 'Enter a valid PAN (e.g. ABCDE1234F)';
  if (!values.panImage) errors.panImage = 'Upload your PAN card photo';

  if (!isRequired(values.aadhaarNumber)) errors.aadhaarNumber = 'Aadhaar number is required';
  else if (!isValidAadhaar(values.aadhaarNumber)) errors.aadhaarNumber = 'Enter a valid 12-digit Aadhaar number';
  if (!values.aadhaarFrontImage) errors.aadhaarFrontImage = 'Upload Aadhaar front side';
  if (!values.aadhaarBackImage) errors.aadhaarBackImage = 'Upload Aadhaar back side';

  if (!values.businessDocImage) errors.businessDocImage = 'Upload your business proof document';

  if (!values.shopLicenseImage) errors.shopLicenseImage = 'Upload your shop license / trade proof';

  return errors;
}