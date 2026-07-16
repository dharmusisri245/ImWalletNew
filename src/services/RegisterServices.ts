
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.imwallet.example.com/v1'; // TODO: replace with Config.API_BASE_URL

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type PincodeLookupResult = {
  state: string;
  city: string;
  block: string;
  subAreas: { label: string; value: string }[];
};

export type DropdownOption = { label: string; value: string };

export type RegisterVendorPayload = {
  fullName: string;
  email: string;
  mobile: string;
  shopName: string;
  pincode: string;
  state: string;
  city: string;
  block: string;
  subArea: string;
  address: string;
  role: string;
  owner: string;
  monthlyBusiness: string;
  majorServices: string[];
};

/** Sends OTP to the given mobile number. */
export async function sendOtp(mobile: string): Promise<{ success: boolean; message: string }> {
  try {
    // const { data } = await apiClient.post('/auth/send-otp', { mobile });
    // return data;

    // ---- MOCK (remove once backend endpoint is live) ----
    await mockDelay(900);
    return { success: true, message: 'OTP sent successfully' };
  } catch (error) {
    return handleError(error, 'Unable to send OTP');
  }
}

/** Verifies the OTP entered by the user. */
export async function verifyOtp(
  mobile: string,
  otp: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // const { data } = await apiClient.post('/auth/verify-otp', { mobile, otp });
    // return data;

    // ---- MOCK ----
    await mockDelay(700);
    if (otp.length === 6) return { success: true, message: 'OTP verified' };
    return { success: false, message: 'Invalid OTP' };
  } catch (error) {
    return handleError(error, 'Unable to verify OTP');
  }
}

/** Looks up state / city / block / sub-areas for a given pin code. */
export async function lookupPincode(pincode: string): Promise<PincodeLookupResult | null> {
  try {
    // const { data } = await apiClient.get(`/location/pincode/${pincode}`);
    // return data;

    // ---- MOCK ----
    await mockDelay(600);
    return {
      state: 'UTTAR PRADESH',
      city: 'GAUTAM BUDDHA NAGAR',
      block: 'NA',
      subAreas: [
        { label: 'Sec 62 Noida SO', value: 'sec62_noida_so' },
        { label: 'Sec 63 Noida SO', value: 'sec63_noida_so' },
        { label: 'Sec 18 Noida SO', value: 'sec18_noida_so' },
      ],
    };
  } catch (error) {
    handleError(error, 'Unable to fetch pin code details');
    return null;
  }
}

export async function fetchOwners(): Promise<DropdownOption[]> {
  // const { data } = await apiClient.get('/vendors/owners');
  await mockDelay(400);
  return [
    { label: 'Rakesh Sharma', value: 'owner_1' },
    { label: 'Suresh Kumar', value: 'owner_2' },
    { label: 'Self / Same as applicant', value: 'owner_self' },
  ];
}

export async function fetchMonthlyBusinessRanges(): Promise<DropdownOption[]> {
  await mockDelay(200);
  return [
    { label: 'Below ₹50,000', value: 'lt_50k' },
    { label: '₹50,000 - ₹1,00,000', value: '50k_1l' },
    { label: '₹1,00,000 - ₹5,00,000', value: '1l_5l' },
    { label: 'Above ₹5,00,000', value: 'gt_5l' },
  ];
}

export async function fetchMajorServices(): Promise<DropdownOption[]> {
  await mockDelay(200);
  return [
    { label: 'AEPS', value: 'aeps' },
    { label: 'Money Transfer', value: 'money_transfer' },
    { label: 'Recharge & Bill Payment', value: 'recharge_bbps' },
    { label: 'PAN Card Services', value: 'pan_card' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Travel Booking', value: 'travel' },
  ];
}

export const ROLE_OPTIONS: DropdownOption[] = [
  { label: 'Retailer', value: 'retailer' },
  { label: 'Distributor', value: 'distributor' },
  { label: 'Master Distributor', value: 'master_distributor' },
  { label: 'Agent', value: 'agent' },
];

/** Submits the completed registration form. */
export async function registerVendor(
  payload: RegisterVendorPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    // const { data } = await apiClient.post('/vendors/register', payload);
    // return data;

    // ---- MOCK ----
    await mockDelay(1200);
    return { success: true, message: 'Vendor registered successfully' };
  } catch (error) {
    return handleError(error, 'Registration failed. Please try again.');
  }
}

function mockDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function handleError(error: unknown, fallback: string): { success: false; message: string } {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || fallback;
    return { success: false, message };
  }
  return { success: false, message: fallback };
}