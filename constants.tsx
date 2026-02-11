
import React from 'react';
import { WifiPlan, WifiPlanDuration } from './types';

export const WIFI_PLANS: WifiPlan[] = [
  {
    id: 'plan_hourly',
    name: 'Quick Access',
    duration: WifiPlanDuration.HOUR,
    price: 10,
    description: 'Perfect for a quick browse or checking emails.',
    speed: 'Up to 5 Mbps',
    color: 'bg-blue-500'
  },
  {
    id: 'plan_daily',
    name: 'Daily Power',
    duration: WifiPlanDuration.DAY,
    price: 50,
    description: 'A full day of uninterrupted browsing and streaming.',
    speed: 'Up to 10 Mbps',
    color: 'bg-indigo-600'
  },
  {
    id: 'plan_weekly',
    name: 'Weekly Stream',
    duration: WifiPlanDuration.WEEK,
    price: 250,
    description: 'Best value for regular users and video conferencing.',
    speed: 'Up to 15 Mbps',
    color: 'bg-purple-600'
  },
  {
    id: 'plan_monthly',
    name: 'Unlimited Home',
    duration: WifiPlanDuration.MONTH,
    price: 800,
    description: 'Our premium tier with the fastest speeds available.',
    speed: 'Up to 30 Mbps',
    color: 'bg-slate-900'
  }
];

export const APP_CONFIG = {
  currency: 'KES',
  supportEmail: 'support@smartwifi.cloud',
  location: 'Nairobi, Kenya'
};
