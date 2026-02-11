
export enum WifiPlanDuration {
  HOUR = '1 Hour',
  DAY = '24 Hours',
  WEEK = '7 Days',
  MONTH = '30 Days'
}

export interface WifiPlan {
  id: string;
  name: string;
  duration: WifiPlanDuration;
  price: number;
  description: string;
  speed: string;
  color: string;
}

export interface PaymentRequest {
  phoneNumber: string;
  planId: string;
  amount: number;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}

export interface UserSession {
  isConnected: boolean;
  expiryTime?: Date;
  activePlan?: WifiPlan;
  phoneNumber?: string;
}
