
/**
 * Lipana.dev Integration Service
 * Documentation: https://lipana.dev/docs
 */

const LIPANA_BASE_URL = 'https://api.lipana.dev/v1';
const API_KEY = process.env.LIPANA_API_KEY || '';

export interface StkPushResponse {
  success: boolean;
  message: string;
  data?: {
    transactionId: string;
    status: string;
    checkoutRequestID: string;
  };
}

export const initiateStkPush = async (phone: string, amount: number): Promise<StkPushResponse> => {
  // Ensure phone is in format +254...
  let formattedPhone = phone.trim();
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '+254' + formattedPhone.substring(1);
  } else if (!formattedPhone.startsWith('+')) {
    formattedPhone = '+' + formattedPhone;
  }

  try {
    const response = await fetch(`${LIPANA_BASE_URL}/transactions/push-stk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        phone: formattedPhone,
        amount: Math.round(amount),
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Payment initiation failed');
    }

    return {
      success: true,
      message: data.message || 'STK push initiated',
      data: data.data
    };
  } catch (error: any) {
    console.error('Lipana API Error:', error);
    return {
      success: false,
      message: error.message || 'Failed to connect to M-Pesa gateway',
    };
  }
};
