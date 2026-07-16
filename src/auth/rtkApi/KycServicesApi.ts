/**
 * services/KycServices.ts
 *
 * Mirrors the pattern used in RegisterServices - every function has the real
 * axios call commented directly above its mock. Delete the mock, uncomment,
 * done.
 */
import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://api.imwallet.example.com/v1'; // TODO: replace with Config.API_BASE_URL

export const kycApiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

export type DocumentType = 'pan' | 'aadhaar_front' | 'aadhaar_back' | 'business_doc' | 'shop_license';

export type KycSubmitPayload = {
  panNumber: string;
  panImageUrl: string;
  aadhaarNumber: string;
  aadhaarFrontUrl: string;
  aadhaarBackUrl: string;
  businessDocNumber: string;
  businessDocUrl: string;
  shopLicenseNumber: string;
  shopLicenseUrl: string;
};

/** Uploads a single document image and returns the hosted URL. */
export async function uploadKycDocument(
  docType: DocumentType,
  localUri: string,
): Promise<{ success: boolean; url?: string; message?: string }> {
  try {
    // const formData = new FormData();
    // formData.append('file', { uri: localUri, name: `${docType}.jpg`, type: 'image/jpeg' } as any);
    // formData.append('docType', docType);
    // const { data } = await kycApiClient.post('/kyc/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // });
    // return { success: true, url: data.url };

    // ---- MOCK ----
    await mockDelay(900);
    return { success: true, url: localUri };
  } catch (error) {
    return handleError(error, 'Upload failed, please try again');
  }
}

/** Submits the complete KYC application for review. */
export async function submitKyc(
  payload: KycSubmitPayload,
): Promise<{ success: boolean; message: string }> {
  try {
    // const { data } = await kycApiClient.post('/kyc/submit', payload);
    // return data;

    // ---- MOCK ----
    await mockDelay(1200);
    return { success: true, message: 'KYC submitted successfully. Verification is in progress.' };
  } catch (error) {
    return handleError(error, 'KYC submission failed. Please try again.');
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